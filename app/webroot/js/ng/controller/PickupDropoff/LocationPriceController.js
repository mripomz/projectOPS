module.controller('LocationPriceCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	"Modals", 
	"Pages", 
	"PickupDropoff", function (
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	PickupDropoff) {

	$scope.globalVariable = 
	{
		currentProcess : 1
	}

	$scope.filter = {
		isShowStatus : "true"
	};

	
	$scope.locationPriceList = [];
	$scope.locationPriceDetail = {};

	//View Section
	$scope.initData = function()
	{
		PickupDropoff.GetPickupDropOffRates(function(data){
			$scope.locationPriceList = data.PickupDropOffRateList;
		});

		$scope.globalVariable.currentProcess = 1;
	}

	//Add Location Section
	$scope.addLocationPrice = function()
	{
		$scope.locationPriceDetail = {
			IsActived : true,
			PickupDropOffRateDistance : 0,
			PickupDropOffRatePrices : 0
		};
		$scope.globalVariable.currentProcess = 2;
	}

	//Edit Location Section
	$scope.editLocationPrice = function(PickupDropOffRateId)
	{
		PickupDropoff.GetPickupDropOffRateById(PickupDropOffRateId, function(data){
			if(data.ServiceStatus == "GetLocationById_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
			}
			else
			{
				$scope.locationPriceDetail = data;
				$scope.globalVariable.currentProcess = 2;	
			}
		});
	}

	//Save Location Section
	$scope.saveLocationPrice = function()
	{
		PickupDropoff.SavePickupDropOffRate($scope.locationPriceDetail, function(data){
			if(data.ServiceStatus == "SavePickupDropOffRate_FAIL")
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

	$scope.filterSetUp = function()
	{
		if($scope.filter.isShowStatus == "true")
		{
			$scope.lswFilterOptions.selectFilter.IsActived = true;
		}
		else if($scope.filter.isShowStatus == "false")
		{
			$scope.lswFilterOptions.selectFilter.IsActived = false;
		}
		else
		{
			$scope.lswFilterOptions.selectFilter.IsActived = "";	
		}
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
        list: $scope.locationPriceList,
        columns: [
            {
                column: "$",
                label: "All",
                type: "input"
            }
        ],
        selectFilter : {
        	IsActived : "true"
        }
    }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };
}]);
	