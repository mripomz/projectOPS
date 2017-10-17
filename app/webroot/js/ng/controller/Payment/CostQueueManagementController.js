module.controller('CostQueueManagementCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Routes", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Routes) {

	$scope.TicketPaymentTypeList = [];
	$scope.RouteList = [];

	$scope.globalVariable = 
	{
		isEdit : false
	}

	$scope.initData = function()
	{
		$scope.globalVariable.isEdit = false;
		Routes.GetRouteCompletedList(false, function(route){
			$scope.RouteList = route.RouteList;

			angular.forEach($scope.RouteList, function(dataRoute){
				dataRoute.isEdit = false;
			});
		});
	}

	$scope.updateCostQueue = function(routeDetail)
	{
		Routes.UpdateRouteCostOfQueue(routeDetail, function(data){
			if(data.ServiceStatus == "UPDATEROUTECOSTOFQUEUE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.initData();
			}
		});
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.RouteList,
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