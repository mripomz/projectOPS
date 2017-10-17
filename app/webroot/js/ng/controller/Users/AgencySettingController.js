module.controller('AgencySettingCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "Agency", "Discount", "Banks", "Routes", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, Agency, Discount, Banks, Routes) {
	
	$scope.userList = [];
	$scope.gradeList = [];
    $scope.errorMsg = {
        isError : false,
        message : ""
    }
    $scope.currentStep = 1;
    $scope.currentAgencyPrice = {};
    $scope.agencyPriceSample = [];
    $scope.agencyPricePerRoutesList = [];
    $scope.VehicleRoute = [];

    $scope.globalVariable = 
	{
		AgencyGradePriceId : null,
		AgencyName : "",
		GradeIdBuy : 0
	};

	$scope.initData = function()
	{
		$scope.currentStep = 1;

		Discount.GetGradeList(function(dataGrade){

			$scope.gradeList = dataGrade.GradeList;

			Agency.GetAgencyManagePriceList(function(data){

				$scope.userList = data.AgencyGradePriceList;
				angular.forEach($scope.userList, function(eachUser,keys){
					eachUser.NO = (keys+1);
				})

				Routes.GetRouteCompletedList(true, function(vehicleRouteList)
				{
					$scope.VehicleRoute = vehicleRouteList.RouteList;
				});
			});
		});
	}

	$scope.AgencyManagementPrice = function(AgencyGradePriceId, AgencyName, GradeIdBuy)
	{
		$scope.globalVariable.AgencyGradePriceId = AgencyGradePriceId;
		$scope.globalVariable.AgencyName = AgencyName;
		$scope.globalVariable.GradeIdBuy = GradeIdBuy;
		Agency.GetAgencyPricePerRoutes(AgencyGradePriceId, function(data)
		{
			$scope.agencyPricePerRoutesList = data.AgencyPricePerRouteList;

			angular.forEach($scope.agencyPricePerRoutesList, function(item)
			{
				item.isEdit = false;
			});

			$scope.currentStep = 2;
		});
	}

	$scope.updateAgencyPrice = function(agencyPrice)
	{
		Agency.UpdateAgencyManagePriceByAdmin(agencyPrice, function(data){
			if(data.ServiceStatus == "UPDATEAGENCYMANAGEPRICE_FAIL")
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

	$scope.updateAgencyPricePerRoute = function(agencyPriceRoute)
	{
		Agency.UpdateAgencyManagePricePerRouteByAdmin(agencyPriceRoute, function(data){
			if(data.ServiceStatus == "UPDATEAGENCYMANAGEPRICEPERROUTE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.AgencyManagementPrice($scope.globalVariable.AgencyGradePriceId, $scope.globalVariable.AgencyName, $scope.globalVariable.GradeIdBuy);
			}
		});
	}

	var viewPriceAgencySampleModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/view-agency-price-sample-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.viewAgencyPriceSample = function(agencyPricePerRoute)
	{
		$scope.currentAgencyPrice = agencyPricePerRoute;
		Agency.GetAgencyRoutePriceSample(
			$scope.globalVariable.GradeIdBuy,
			agencyPricePerRoute.RouteId,
			function(result)
			{
				$scope.agencyPriceSample = result.RouteAgencyPrice;
				console.log($scope.agencyPriceSample);
				viewPriceAgencySampleModal.$promise.then(viewPriceAgencySampleModal.show);
			}
		);
	}

	$scope.calculatePrice = function(priceDetail,typeCalculate)
	{
		var totalPrice = 0;

		if(typeof priceDetail === 'undefined'){

		}

		else
		{
			switch(typeCalculate)
			{
				case 'current':
					totalPrice = priceDetail.RouteTotalPrice;
					break;
				case 'fixed':
					if($scope.currentAgencyPrice.IsPriceAdminPercent)
					{
						totalPrice = priceDetail.RouteTotalPrice + (priceDetail.RouteTotalPrice * ($scope.currentAgencyPrice.PriceAdminSet/100));
					}
					else
					{
						totalPrice = priceDetail.RouteTotalPrice + $scope.currentAgencyPrice.PriceAdminSet;
					}
					break;
				case 'max':
					totalPrice = priceDetail.RouteTotalPrice + $scope.currentAgencyPrice.LimitAgencyPrice;
					break;
				case 'max-percent':
					totalPrice = priceDetail.RouteTotalPrice + (priceDetail.RouteTotalPrice*($scope.currentAgencyPrice.LimitAgencyPricePercent/100));
					break;
			}

		}
		return totalPrice;
		
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.userList,
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