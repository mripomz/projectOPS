module.controller('SalesCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "Users", "Sales", "Routes", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, Users, Sales, Routes) {
	
	$scope.rolesList = [];

	$scope.userList = [];
	$scope.currentRoleName = "";
	$scope.currentRoleId = "";
	$scope.currentLevel = 0;
	$scope.currentUserId = 0;
	$scope.currentUserName = "";
	$scope.userId = $cookies.get("CakeCookie[userId]");

	$scope.RouteList = [];
	$scope.RouteMissingList = [];

	$scope.VehicleRoute = [];

	$scope.stopPointData  = [];
	$scope.salesRegion = {
		UserId : 0,
		StopPointId : null
	}

    $scope.errorMsg = {
        isError : false,
        message : ""
    }

	$scope.initData = function()
	{
		$scope.userList = [];

		Users.GetAllRoles(function(data){
			$scope.rolesList = data.RoleList;

			angular.forEach($scope.rolesList, function(role){
				if(role.RoleName == "Sales")
				{
					$scope.currentRoleId = role.RoleId;
					Users.SearchUserInfo("UserId", "", "UserId", "ASC", null, false, $scope.currentRoleId, 1000, 1, function(data){
						$scope.userList = data.SearchResults;
					});
				}
			});
		});

		Routes.GetRouteCompletedList(true, function(vehicleRouteList){
			$scope.VehicleRoute = vehicleRouteList.RouteList;
		});
	}

	$scope.editUser = function(User)
	{
		$scope.currentUserName = User.Email + " / " + User.FirstName + ' ' + User.LastName;
		$scope.currentUserId = User.UserId;
		$scope.salesRegion.UserId = User.UserId;
		Routes.GetStopPointList(function(data){

            $scope.stopPointData = data;

            Sales.GetSalesRegionByUserId(User.UserId, function(salesRegion){

				$scope.salesRegion = salesRegion;
				$scope.salesRegion.UserId = User.UserId;
				Sales.GetRouteByUserId(User.UserId, function(stopPointManage){
					$scope.RouteList = stopPointManage.RoutesInSaleList;
					$scope.currentLevel = 1;
				});
			});
        });
	}

	$scope.updateSalesRegion = function()
	{
		Sales.UpdateSalesRegion($scope.salesRegion, function(data){
			if(data.ServiceStatus == "UPDATESALESREGION_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
			}
		});
	}

	$scope.backToState = function(state)
	{
		$scope.currentLevel = state;
		$scope.initData();
	}

	var addRouteModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Sales/add-route-modal.html', show: false });
	$scope.addRoute = function()
	{
		Sales.GetRouteMissingByUserId($scope.currentUserId, function(data){
			if(data.ServiceStatus == "GETROUTEMISSINGBYUSERID_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				$scope.RouteMissingList = data.RouteList;
				addRouteModal.$promise.then(addRouteModal.show);
			}
		});

	}

	$scope.saveRoute = function(RouteId)
	{
		Sales.AddRouteToUser($scope.currentUserId, RouteId, function(data){
			if(data.ServiceStatus == "ADDROUTETOUSER_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Sales.GetRouteMissingByUserId($scope.currentUserId, function(data){
					if(data.ServiceStatus == "GETROUTEMISSINGBYUSERID_FAIL")
					{
						$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
						$scope.errorMsg.isError = true;
					}
					else
					{
						$scope.RouteMissingList = data.RouteList;
						Sales.GetRouteByUserId($scope.currentUserId, function(data){
							$scope.RouteList = data.RoutesInSaleList;
						});
					}
				});
			}
		});
	}

	$scope.removeRoute = function(UserId, RouteId)
	{
		Sales.RemoveRouteFromSales(UserId, RouteId, function(){
			Sales.GetRouteByUserId($scope.currentUserId, function(data){
				$scope.RouteList = data.RoutesInSaleList;
			});
		});
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.userList.SearchResults,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ]
        }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };
}]);