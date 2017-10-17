module.controller('PickupDropoffServiceCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	"Modals", 
	"Pages", 
	"PickupDropoff",
	"$filter",
	"Routes",
	"Locations", function (
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	PickupDropoff,
	  	$filter,
	  	Routes,
	  	Locations) {


	$scope.searchFilter = {
		dateStart : new Date(),
		dateEnd : new Date(),
		timeStart : "00:00",
		timeEnd : "23:59",
		RouteId : ""
	}

	$scope.globalVariable = {
		isShowFilter : true
	}


	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.PickupDropoffServicesList = [];
	$scope.PickupDropoffServiceDetail = {};

	$scope.VehicleList = [];
	$scope.StopPointList = [];
	$scope.LocationPassengerList = [];
	$scope.VehicleOperationList = [];
	$scope.PassengerMarkers = [];
	$scope.IsTimeDate = false;
	$scope.IsDate = false;
	$scope.maps = {};

	$scope.initData = function()
	{
		PickupDropoff.PickupDropoffServices(
			$scope.searchFilter.dateStart,
			$scope.searchFilter.dateEnd,
			$scope.searchFilter.timeStart,
			$scope.searchFilter.timeEnd,
			$scope.timezoneOffset,
			function(data){
				$scope.PickupDropoffServicesList = data.PickupDropOffService;
				console.log($scope.PickupDropoffServicesList);
		});

		PickupDropoff.GetVehiclePickupDropoffServices(function(data){
			$scope.VehicleList = data.VehicleList;
		});

		Routes.GetRouteCompletedList(true, function(vehicleRouteList){
			$scope.VehicleRoute = vehicleRouteList.RouteList;
		});

		Routes.GetStopPointList(function(stopPointList){
			$scope.StopPointList = stopPointList.StopPointList;
		});
		$scope.IsTimeDate = false;
		$scope.IsDate = false;
	}

	$scope.searchRouteTrip = function()
	{
		PickupDropoff.PickupDropoffServices(
			$scope.searchFilter.dateStart,
			$scope.searchFilter.dateEnd,
			$scope.searchFilter.timeStart,
			$scope.searchFilter.timeEnd,
			$scope.timezoneOffset,
			function(data){
				$scope.PickupDropoffServicesList = data.PickupDropOffService;
		});
	}

	var viewLocationPassengerModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Location/show-location-passenger-modal.html', show: false });
	$scope.viewLocationList = function(PickupDropOffService)
	{
		$scope.maps = {
			center : 
			{
				latitude : 18.7992741,
				longitude : 98.9742345
			},
			zoom : 10,
		};
		$scope.PassengerMarkers = [];

		Locations.GetLocationListByPickupDropOffServiceId(PickupDropOffService.PickupDropOffServiceId, $scope.timezoneOffset, function(data){
			$scope.LocationPassengerList = data.LocationList;

			$scope.maps = {
				center : 
				{
					latitude : PickupDropOffService.Latitude,
					longitude : PickupDropOffService.Longitude
				},
				zoom : 10
			}

			//Set Marks
			angular.forEach($scope.LocationPassengerList, function(each){
				$scope.PassengerMarkers.push(
				{
					latitude : each.Latitude,
					longitude : each.Longitude,
					title : each.LocationName,
					id : each.LocationId,
					show : false
				});
			});

			viewLocationPassengerModal.$promise.then(viewLocationPassengerModal.show);
		});
	}



	

	


	$scope.changeDate = function(){
		var offset = new Date().getTimezoneOffset();
				if($scope.PickupDropoffServiceDetail.TimeService != null){
					PickupDropoff.GetVehicleOperations($scope.PickupDropoffServiceDetail.TimeService,$scope.PickupDropoffServiceDetail.TypeOfService,offset,
	 	  				function(data){
	 	  					if(data.serviceStatus == 'GETVEHICLEOPERATIONLISTDTO_FAIL'){
	 	  						console.log(data.serviceStatus);
	 	  					}
	 	  					else{
	 	  						$scope.VehicleOperationList = $scope.JsonThaidate(data.VehicleOperationList);
	 	  						console.log($scope.VehicleOperationList);
	 	  					}
	 	   			});
	 	   		}	
				
			
	}	

	$scope.JsonThaidate = function(VehicleOperationList)
	{
		angular.forEach(VehicleOperationList, function(each){
				each.VehicleOperationDate = $filter('jsonDateTHAI')(each.VehicleOperationDate, 'DD MMMM YYYY') +$filter('jsonDate')(each.VehicleOperationDate, ' HH:mm')+'น.';
			});

		return VehicleOperationList;
	}

	 

	var addPickupDropoffServiceModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/PickupDropoff/edit-pickupdropoff-services-modal.html', show: false });
	$scope.addPickupDropoffService = function()
	{	

		// var offset = new Date().getTimezoneOffset();
		// console.log(offset);
		// PickupDropoff.GetVehicleOperations(,offset
		// 	function(data){
		// 		$scope.VehicleOperationList = data;
		// 		console.log($scope.VehicleOperationList);
		// });

		$scope.PickupDropoffServiceDetail = {};
		var d = new Date();
		d = d.setHours(0,0,0,0);

		$scope.PickupDropoffServiceDetail = {
			PickupDropOffServiceMaxLimit : 12,
            TimeService : d,
            TypeOfService : false,
            StopPointId : "",
            VehicleId : "",
            IsActived : true
		};

		addPickupDropoffServiceModal.$promise.then(addPickupDropoffServiceModal.show);
	}

	$scope.editPickupDropoffService = function(PickupDropOffServiceId)
	{
		PickupDropoff.GetPickupDropoffServiceById(PickupDropOffServiceId,  $scope.timezoneOffset, function(dataPickup)
		{
			$scope.PickupDropoffServiceDetail = dataPickup;
			var date = new Date(parseInt($scope.PickupDropoffServiceDetail.TimeService.toString().substr(6)));
			$scope.PickupDropoffServiceDetail.TimeService = date;

			//Shift StopPointId to first array
			var IndexStopPoint = $filter('lswIndexOf')($scope.StopPointList, { StopPointId: $scope.PickupDropoffServiceDetail.StopPointId },'StopPointId');
			if(IndexStopPoint != -1)
			{
				var tempData = $scope.StopPointList[IndexStopPoint];
				$scope.StopPointList.splice(IndexStopPoint, 1);
				$scope.StopPointList.unshift(tempData);
			}

			addPickupDropoffServiceModal.$promise.then(addPickupDropoffServiceModal.show);
		});
	}

	$scope.savePickupDropoffService = function()
	{
		console.log($scope.PickupDropoffServiceDetail.VehicleOperationId);

		PickupDropoff.SavePickupDropoffServices($scope.PickupDropoffServiceDetail, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "SavePickupDropoffServices_FAIL")
            {
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				addPickupDropoffServiceModal.$promise.then(addPickupDropoffServiceModal.hide);
				$scope.initData();
			}
		});
	}

	$scope.checkDateBeforeEdit = function(date)
	{
		var canEdit = true;
		if(new Date(parseInt(date.toString().substr(6))) > new Date())
		{
			canEdit = false;
		}

		return canEdit;
	}
}]);