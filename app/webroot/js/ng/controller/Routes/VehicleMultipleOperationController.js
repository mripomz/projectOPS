module.controller('VehicleMultipleOperationCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies", 
	"$sce", 
	"$modal", 
	"$filter", 
	"Helpers", 
	"Modals", 
	"Routes", 
	"Locations", 
	"Assets", 
	"SeatCapacityArrangement", 
	function (
		$scope, 
		$timeout, 
		$cookies, 
		$sce, 
		$modal, 
		$filter, 
		Helpers, 
		Modals, 
		Routes, 
		Locations, 
		Assets, 
		SeatCapacityArrangement) {

	$scope.globalVariable = {
		currentStep : 1,
		chooseVehicleTripDate : null,
		IsMonthActive : 0
	};
	$scope.multipleDate = {
		dateStart : new Date(),
		dateEnd : new Date(),
		DayofWeek : [true,true,true,true,true,true,true],
		dateList : []
	};
	$scope.VehicleOperationList = [];
	$scope.VehicleRoute = [];

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.initData = function()
	{
		$scope.globalVariable.currentStep = 1;
		Routes.GetRouteCompletedList(true, function(vehicleRouteList){
			$scope.VehicleRoute = vehicleRouteList.RouteList;
		});
	}
	
	$scope.loadVehicleTripList = function()
	{
		$scope.VehicleOperationList = [];
		if(!angular.isUndefined($scope.globalVariable.chooseVehicleTripDate) && $scope.globalVariable.chooseVehicleTripDate != null)
		{
			//Load Route Trip
	        Routes.GetVehicleRouteTripSellTicket($scope.globalVariable.chooseVehicleTripDate, $scope.globalVariable.chooseVehicleTripDate, "", "", "","", $scope.timezoneOffset,false,
	        	function(routeTrip){
	        		$scope.VehicleOperationList = routeTrip.VehicleOperationList;

	        		angular.forEach($scope.VehicleOperationList, function(eachRouteTrip){
	        			eachRouteTrip.isSelect = true;
	        		});
	        	}
	        );	
		}
	}

	$scope.generateDateforMultipleDate = function()
	{
		var duration = moment.duration(moment($scope.multipleDate.dateEnd).diff(moment($scope.multipleDate.dateStart)));
		var daydiff = duration.asDays();
		var dateList = [];
		for(var i = 0; i <= daydiff; i++)
		{
			var currentDate = moment($scope.multipleDate.dateStart).add(i, 'days');
			var dayofweek = currentDate.format('d');

			if($scope.multipleDate.DayofWeek[dayofweek])
			{
				var customDate = moment(currentDate);
				dateList.push(
					{
						monthName : customDate.format("MMMM"),
						Date : customDate
					}
				);
			}
		}
		$scope.multipleDate.dateList = dateList;
	}

	$scope.saveVehicleMultipleOperation = function()
	{
		//Set Date data
		var newDateList = [];
		var newVehicleOperation = [];
		angular.forEach($scope.multipleDate.dateList, function(eachDate){
			newDateList.push(eachDate.Date);
		});

		angular.forEach($scope.VehicleOperationList, function(eachData){
			if(eachData.isSelect)
			{
				newVehicleOperation.push(eachData);
			}
		});

		Routes.SaveMultipleRouteTrip(newVehicleOperation, newDateList, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "SAVEMULTIPLEROUTETRIP_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.VehicleOperationList = [];
				$scope.globalVariable.currentStep = 1;
				$scope.multipleDate = {
					dateStart : new Date(),
					dateEnd : new Date(),
					DayofWeek : [true,true,true,true,true,true,true],
					dateList : []
				};
				$scope.globalVariable = {
					currentStep : 1,
					chooseVehicleTripDate : null,
					IsMonthActive : 0
				};
            }

			
		});
	}

	/*
		Helper Function
	*/
	$scope.dateParse = function(data)
	{
		return new Date(data);
	}

}]);
