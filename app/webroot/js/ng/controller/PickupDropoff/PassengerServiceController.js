module.controller('PassengerServiceCtrl',[
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
	"Passengers",
	"$http",
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
	  	Passengers,
	  	$http,
	  	Locations) {

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.searchFilter = {}
	$scope.globalVariable = {};
	$scope.StopPointList = [];
	$scope.passengerList = [];
	$scope.PassengerDetail = [];
	$scope.locationList = [];
	$scope.PickupDropOffRates = [];
	$scope.PickupDropOffServicesPickup = [];
	$scope.PickupDropOffServicesDropoff = [];

$scope.PassengerDetailCode = [];

	$scope.PickupPassengers = {};
	$scope.DropOffPassengers = {};

////////// modify by makky /////////////
$scope.PickupPassengerId = '';
$scope.DropOffPassengerId = '';
$scope.ReferenceCodeForTicket =''
$scope.DropOffticket = [];
$scope.VehicleOperSeatId  = '';


$scope.PassengerId = '';

	$scope.maxDistanceKM = 0;

	$scope.maps = {};

	$scope.pickupMarkers = [];
	$scope.dropoffMarkers = [];

	$scope.initData = function()
	{
		Locations.GetLocationList(true, $scope.timezoneOffset, function(data){
			$scope.locationList = data.LocationList;
		});

		PickupDropoff.GetPickupDropOffRates(function(data){
			$scope.PickupDropOffRates = data.PickupDropOffRateList;

			angular.forEach($scope.PickupDropOffRates, function(each){
				if($scope.maxDistanceKM < each.PickupDropOffRateDistance)
				{
					$scope.maxDistanceKM = each.PickupDropOffRateDistance;
				}
			});
		});

		Routes.GetStopPointList(function(stopPointList){
			$scope.StopPointList = stopPointList.StopPointList;
		});

		$scope.searchFilter = {
			wordSearch : "",
			pickupSearch : "",
			dropoffSearch : ""
		}

		$scope.globalVariable = {
			stepOneFinish : false,
			stepTwoFinish : false,
			isChoosePickup : false,
			isChooseDropoff : false
		}

		$scope.StopPointList = [];
		$scope.passengerList = [];
		$scope.PassengerDetail = [];
		$scope.locationList = [];
		$scope.PickupDropOffRates = [];
		$scope.PickupDropOffServicesPickup = [];
		$scope.PickupDropOffServicesDropoff = [];

		$scope.PickupPassengers = {
			PickupDropOffServiceId : null,
			PassengerId : null,
			RoomNumber : "",
			LocationId : null,
			PickupDropOffRateId : null,
			PickupDropOffPassengerPrice : 0,
			VehicleOperationSeatId : null
		};
		$scope.DropOffPassengers = {
			PickupDropOffServiceId : null,
			PassengerId : null,
			RoomNumber : "",
			LocationId : null,
			PickupDropOffRateId : null,
			PickupDropOffPassengerPrice : 0,
			VehicleOperationSeatId : null
		};

		$scope.maxDistanceKM = 0;

		$scope.maps = {
			pickup : {
				center : 
				{
					latitude : 18.7992741,
					longitude : 98.9742345
				},
				zoom : 10,
			},
			dropoff : {
				center : 
				{
					latitude : 18.7992741,
					longitude : 98.9742345
				},
				zoom : 10,
			}
		}

		$scope.pickupMarkers = [];
		$scope.dropoffMarkers = [];
	}

	$scope.getPickupDropoffService = function()
	{
		var date = new Date(parseInt($scope.PassengerDetail.VehicleOperationDate.toString().substr(6)));
		PickupDropoff.GetPickupDropOffServicesPickup($scope.PassengerDetail.StopPointStartId,$scope.PassengerDetail.VehicleOperationId, date, $scope.timezoneOffset, function(data)
		{
			$scope.PickupDropOffServicesPickup = data.PickupDropOffService;
			angular.forEach($scope.locationList, function(each, index){
				var distance = calculateDistanceFormLatLong($scope.PassengerDetail.LatStart, $scope.PassengerDetail.LongStart, each.Latitude, each.Longitude);
				$scope.pickupMarkers.push(
				{
					latitude : each.Latitude,
					longitude : each.Longitude,
					title : each.LocationName,
					id : each.LocationId,
					show : false,
					typeservice : "pickup",
					events : {
						click : function(object, eventName, arge)
						{
							if($scope.globalVariable.isChoosePickup)
							{
								$scope.PickupPassengers.LocationId = arge.id;	
							}
						}
					}
				});
			});
		});

		PickupDropoff.GetPickupDropOffServicesDropoff($scope.PassengerDetail.StopPointEndId,$scope.PassengerDetail.VehicleOperationId, date, $scope.timezoneOffset, function(data)
		{
			$scope.PickupDropOffServicesDropoff = data.PickupDropOffService;

			
			angular.forEach($scope.locationList, function(each, index){
				var distance = calculateDistanceFormLatLong($scope.PassengerDetail.LatStart, $scope.PassengerDetail.LongStart, each.Latitude, each.Longitude);
				$scope.dropoffMarkers.push(
				{
					latitude : each.Latitude,
					longitude : each.Longitude,
					title : each.LocationName,
					id : each.LocationId,
					show : false,
					typeservice : "dropoff",
					events : {
						click : function(object, eventName, arge)
						{
							if($scope.globalVariable.isChooseDropoff)
							{
								$scope.DropOffPassengers.LocationId = arge.id;	
							}	      					
						}
					}
				});
			});
		});
	}

	$scope.searchPassenger = function(viewValue)
	{
		if(viewValue != "" && typeof viewValue !== 'object')
		{
			return $http.get(api + '/Passenger/SearchPassengerBoughtTicket' + "?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')), {
				params: {
					'wordsearch' : viewValue,
	                'date' : new Date(),
	                'timezoneOffset' : $scope.timezoneOffset
				}
			})
			.then(function(res) {
				return res.data.PassengerList;
				
			});
		}
	}

	$scope.selectPickupDropOffService = function(PickupDropOffServiceId, typeService)
	{
	

		if(typeService == "pickUp")
		{
			$scope.PickupPassengers.PickupDropOffServiceId = PickupDropOffServiceId;
			
		}
		else
		{
			$scope.DropOffPassengers.PickupDropOffServiceId = PickupDropOffServiceId;
	
		}

		$scope.checkStepTwo();
	}

	$scope.onClick = function(marker, eventName, model) 
	{
		//Set off modal
		if(model.typeservice == "pickup")
		{
			angular.forEach($scope.pickupMarkers, function(each){
				each.show = false;
			});
		}
		else if(model.typeservice == "dropoff")
		{
			angular.forEach($scope.dropoffMarkers, function(each){
				each.show = false;
			});
		}

        model.show = !model.show;

        $scope.checkStepTwo();
    };

    $scope.checkStepTwo = function()
    {
    	var isFinish = false;
    	if($scope.globalVariable.isChoosePickup)
    	{
    		if($scope.PickupPassengers.LocationId != null && $scope.PickupPassengers.PickupDropOffServiceId != null)
    		{
    			isFinish = true;
    			var indexLocation = $filter('lswIndexOf')($scope.locationList, { LocationId: $scope.PickupPassengers.LocationId },'LocationId');
    			if(indexLocation != -1)
    			{
    				$scope.PickupPassengers.DistanceKM = calculateDistanceFormLatLong($scope.PassengerDetail.LatStart, $scope.PassengerDetail.LongStart, $scope.locationList[indexLocation].Latitude, $scope.locationList[indexLocation].Longitude);
    				var isFoundRate = false;
    				angular.forEach($scope.PickupDropOffRates, function(eachRate, index){
    					if($scope.PickupPassengers.DistanceKM < eachRate.PickupDropOffRateDistance && !isFoundRate)
    					{
    						isFoundRate = true;
    						$scope.PickupPassengers.PickupDropOffRateId = eachRate.PickupDropOffRateId;
    						$scope.PickupPassengers.PickupDropOffPassengerPrice = eachRate.PickupDropOffRatePrices;
    					}
    					else if(!isFoundRate && (index == $scope.PickupDropOffRates.length-1))
    					{
    						$scope.PickupPassengers.PickupDropOffRateId = eachRate.PickupDropOffRateId;
    						$scope.PickupPassengers.PickupDropOffPassengerPrice = eachRate.PickupDropOffRatePrices;
    					}
    				});
    			}
    		}
    	}
    	else
    	{
			$scope.PickupPassengers.RoomNumber = "";
    		$scope.PickupPassengers.PickupDropOffServiceId = null;
    		$scope.PickupPassengers.LocationId = null;
    	}

    	if($scope.globalVariable.isChooseDropoff)
    	{
    		if($scope.DropOffPassengers.LocationId != null && $scope.DropOffPassengers.PickupDropOffServiceId != null)
    		{
    			isFinish = true;
    			var indexLocation = $filter('lswIndexOf')($scope.locationList, { LocationId: $scope.DropOffPassengers.LocationId },'LocationId');
    			if(indexLocation != -1)
    			{
    				$scope.DropOffPassengers.DistanceKM = calculateDistanceFormLatLong($scope.PassengerDetail.LatEnd, $scope.PassengerDetail.LongEnd, $scope.locationList[indexLocation].Latitude, $scope.locationList[indexLocation].Longitude);	
    				var isFoundRate = false;
    				angular.forEach($scope.PickupDropOffRates, function(eachRate, index){
    					if($scope.DropOffPassengers.DistanceKM < eachRate.PickupDropOffRateDistance && !isFoundRate)
    					{
    						isFoundRate = true;
    						$scope.DropOffPassengers.PickupDropOffRateId = eachRate.PickupDropOffRateId;
    						$scope.DropOffPassengers.PickupDropOffPassengerPrice = eachRate.PickupDropOffRatePrices;
    					}
    					else if(!isFoundRate && (index == $scope.PickupDropOffRates.length-1))
    					{
    						$scope.DropOffPassengers.PickupDropOffRateId = eachRate.PickupDropOffRateId;
    						$scope.DropOffPassengers.PickupDropOffPassengerPrice = eachRate.PickupDropOffRatePrices;
    					}
    				});
    			}
    		}
    		else
    		{
    			isFinish = false;
    		}
    	}
    	else
    	{
    		$scope.DropOffPassengers.RoomNumber = "";
    		$scope.DropOffPassengers.PickupDropOffServiceId = null;
    		$scope.DropOffPassengers.LocationId = null;
    	}

    	if(isFinish)
    	{
    		$scope.globalVariable.stepTwoFinish = true;
    	}
    	else
    	{
    		$scope.globalVariable.stepTwoFinish = false;	
    	}
    }

    /*
		Save
    */
    $scope.savePickupDropOffPassenger = function()
    {
    	var listPassenger = [];


    	if($scope.globalVariable.isChoosePickup)
    	{
    		$scope.PickupPassengers.PassengerId = $scope.PassengerId;
    		$scope.PickupPassengers.VehicleOperationSeatId = $scope.VehicleOperSeatId;
    		console.log($scope.PickupPassengers);
    		listPassenger.push($scope.PickupPassengers);

    		
    	}
    	
    	if($scope.globalVariable.isChooseDropoff)
    	{
    	
    		$scope.DropOffPassengers.PassengerId = $scope.PassengerId;
    		$scope.DropOffPassengers.VehicleOperationSeatId = $scope.VehicleOperSeatId;
    		console.log($scope.PickupPassengers);
    		listPassenger.push($scope.DropOffPassengers);
    			
    	}


    	

    	PickupDropoff.SavePassengerService(listPassenger, function(data){
    		if(data.ServiceStatus == "SavePassengerService_FAIL")
            {

				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
				
			}
			else
			{
			$scope.PickupPassengerId = '';
			$scope.DropOffPassengerId = '';

		
			 var i;
			 for(i=0;i<data.PickupDropOffPassengerList.length;i++){
			 		if(data.PickupDropOffPassengerList.length==1){
			 			if($scope.globalVariable.isChoosePickup){
			 				$scope.PickupPassengerId =  data.PickupDropOffPassengerList[i].PickupDropOffPassengerId;
			 			}else{
			 				$scope.DropOffPassengerId =  data.PickupDropOffPassengerList[i].PickupDropOffPassengerId;
			 			}
			 		
				 	}
			 	 	else{
			 	 		if(i==0){
			 	 		$scope.PickupPassengerId =  data.PickupDropOffPassengerList[i].PickupDropOffPassengerId;
			 	 		}else{
			 	 			$scope.DropOffPassengerId =  data.PickupDropOffPassengerList[i].PickupDropOffPassengerId;
			 	 		}
			 		}
			 }
		
				Modals.showAlertSuccess();
				$scope.initData();
				$scope.printTicket();
	
			
		
			}
    	});
    }


	/////print report for Pickup and Dropoff
	$scope.printTicket = function()
	{
		$scope.disableTagButton = {'visibility': 'hidden'};

		var printContents = document.getElementById("ticketPrint").innerHTML;
		var popupWin = window.open('', '_blank');
		var javascriptOption = '';


  		PickupDropoff.ReportForPickupdropOffTicket($scope.PickupPassengerId,$scope.DropOffPassengerId, $scope.ReferenceCodeForTicket,$scope.VehicleOperSeatId, function(data)
  		{
  			$scope.DropOffticket = [];
  			
  			if(data.DropoffPlateNumber!=null&&data.PickupPlateNumber!=null){
  				$scope.DropOffticket.push({
		  			'OperatorBy' : data.OperatorBy,
		  			'DropoffDrivingTime':data.DropoffDrivingTime,
		  			'VehicleOperationDate' : data.VehicleOperationDate,
		  			'PassergerfullName' : data.PassergerfullName,
		  			'pickupLocation' : data.PickupLocation,
		  			'PickupDrivingTime' : data.PickupDrivingTime,
		  			'PickupPlateNumber' : data.PickupPlateNumber,
		  			'PickupStopPoint_EN' : data.PickupStopPoint_EN,
		  			'PickupStopPoint_TH' : data.PickupStopPoint_TH,
		            'DropoffDrivingTime' : data.DropoffDrivingTime,
		             'DropoffPlateNumber' : data.DropoffPlateNumber,
		             'DropoffStopPoint_EN' : data.DropoffStopPoint_EN,
		             'DropoffStopPoint_TH' : data.DropoffStopPoint_TH,
		             'DropoffLocation' : data.DropoffLocation,
		             'TotalPrice' : data.TotalPrice,
       		 	});
  				javascriptOption += 'document.getElementById("dropoffDrivingTime_TH").innerHTML = \'' +$filter('jsonDateTHAI')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
				javascriptOption += 'document.getElementById("dropoffDrivingTime_ENG").innerHTML = \'' +$filter('jsonDateEN')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
  				javascriptOption += 'document.getElementById("fullname_th").innerHTML = \'' +$scope.DropOffticket[0].PassergerfullName  + '\';';
	  		    javascriptOption += 'document.getElementById("totalPrice").innerHTML = \'' +$scope.DropOffticket[0].TotalPrice+ '\';'
				javascriptOption += 'document.getElementById("OperatorBy").innerHTML = \'' +$scope.DropOffticket[0].OperatorBy+ '\';'

				javascriptOption += 'document.getElementById("dropoffLocation_TH").innerHTML = \'' +$scope.DropOffticket[0].DropoffLocation  + '\';';
	   			javascriptOption += 'document.getElementById("dropoffLocation_ENG").innerHTML = \'' +''+ '\';';
      		    javascriptOption += 'document.getElementById("dropoffStopPoint_TH").innerHTML = \'' +$scope.DropOffticket[0].DropoffStopPoint_TH + '\';';
                javascriptOption += 'document.getElementById("dropoffStopPoint_ENG").innerHTML = \'' +$scope.DropOffticket[0].DropoffStopPoint_EN+ '\';';
	            javascriptOption += 'document.getElementById("dropoffPlateNumber").innerHTML = \'' +$scope.DropOffticket[0].DropoffPlateNumber+ '\';'
	            javascriptOption += 'document.getElementById("dropoffDrivingTime").innerHTML = \'' +$filter('jsonDate')($scope.DropOffticket[0].DropoffDrivingTime, 'HH:mm') + 'น.'+'\';'

	  		    javascriptOption += 'document.getElementById("pickupLocation_TH").innerHTML = \'' +$scope.DropOffticket[0].pickupLocation  + '\';';
	            javascriptOption += 'document.getElementById("pickupLocation_ENG").innerHTML = \'' +''+ '\';';
                javascriptOption += 'document.getElementById("pickStopPoint_TH").innerHTML = \'' +$scope.DropOffticket[0].PickupStopPoint_TH + '\';';
                javascriptOption += 'document.getElementById("pickStopPoint_ENG").innerHTML = \'' +$scope.DropOffticket[0].PickupStopPoint_EN+ '\';';
	            javascriptOption += 'document.getElementById("pickupPlateNumber").innerHTML = \'' +$scope.DropOffticket[0].PickupPlateNumber+ '\';'
	            javascriptOption += 'document.getElementById("pickupDrivingTime").innerHTML = \'' +$filter('jsonDate')($scope.DropOffticket[0].PickupDrivingTime, 'HH:mm') +'น.' +'\';'
	  			javascriptOption += 'document.getElementById("pickupview").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview1").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview2").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview3").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview4").style.visibility = "visible";';

				javascriptOption += 'document.getElementById("dropoffview").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview1").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview2").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview3").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview4").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview5").style.visibility = "visible";';
  			
  			}
  			else if(data.PickupPlateNumber!=null){
  				$scope.DropOffticket.push({
		  			'OperatorBy' : data.OperatorBy,
		  			'DropoffDrivingTime':data.DropoffDrivingTime,
		  			'VehicleOperationDate' : data.VehicleOperationDate,
		  			'PassergerfullName' : data.PassergerfullName,
		  			'PickupDrivingTime' : data.PickupDrivingTime,
		  			'PickupPlateNumber' : data.PickupPlateNumber,
		  			'PickupStopPoint_EN' : data.PickupStopPoint_EN,
		  			'PickupStopPoint_TH' : data.PickupStopPoint_TH,
		  			'pickupLocation' : data.PickupLocation,
		  			'TotalPrice' : data.TotalPrice,
	       		});
  				javascriptOption += 'document.getElementById("pickupview").style.visibility = "visible";';

  				javascriptOption += 'document.getElementById("pickupview1").style.visibility = "visible";';
  				javascriptOption += 'document.getElementById("dropoffDrivingTime_TH").innerHTML = \'' +$filter('jsonDateTHAI')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
				javascriptOption += 'document.getElementById("dropoffDrivingTime_ENG").innerHTML = \'' +$filter('jsonDateEN')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
  				javascriptOption += 'document.getElementById("fullname_th").innerHTML = \'' +$scope.DropOffticket[0].PassergerfullName  + '\';';
	  		    javascriptOption += 'document.getElementById("totalPrice").innerHTML = \'' +$scope.DropOffticket[0].TotalPrice+ '\';'
				javascriptOption += 'document.getElementById("OperatorBy").innerHTML = \'' +$scope.DropOffticket[0].OperatorBy+ '\';'

				javascriptOption += 'document.getElementById("pickupLocation_TH").innerHTML = \'' +$scope.DropOffticket[0].pickupLocation  + '\';';
	            javascriptOption += 'document.getElementById("pickupLocation_ENG").innerHTML = \'' +''+ '\';';
                javascriptOption += 'document.getElementById("pickStopPoint_TH").innerHTML = \'' +$scope.DropOffticket[0].PickupStopPoint_TH + '\';';
                javascriptOption += 'document.getElementById("pickStopPoint_ENG").innerHTML = \'' +$scope.DropOffticket[0].PickupStopPoint_EN+ '\';';
	            javascriptOption += 'document.getElementById("pickupPlateNumber").innerHTML = \'' +$scope.DropOffticket[0].PickupPlateNumber+ '\';'
	            javascriptOption += 'document.getElementById("pickupDrivingTime").innerHTML = \'' +$filter('jsonDate')($scope.DropOffticket[0].PickupDrivingTime, 'HH:mm')+'น.' + '\';'
  				
	  			javascriptOption += 'document.getElementById("pickupview").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview1").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview2").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview3").style.visibility = "visible";';
	  			javascriptOption += 'document.getElementById("pickupview4").style.visibility = "visible";';
  			

	  			javascriptOption += 'document.getElementById("dropoffview").style.display = "none";';
	  			javascriptOption += 'document.getElementById("dropoffview1").style.display = "none";';
	  			javascriptOption += 'document.getElementById("dropoffview2").style.display = "none";';
	  			javascriptOption += 'document.getElementById("dropoffview3").style.display = "none";';
	  			javascriptOption += 'document.getElementById("dropoffview4").style.display = "none";';
	  			javascriptOption += 'document.getElementById("dropoffview5").style.display = "none";';
  			}
  			else if(data.DropoffPlateNumber!=null){
  				$scope.DropOffticket.push({
					'' : data.OperatorBy,
					'PassergerfullName' : data.PassergerfullName,
					'DropoffDrivingTime':data.DropoffDrivingTime,
					'VehicleOperationDate' : data.VehicleOperationDate,
					'DropoffDrivingTime' : data.DropoffDrivingTime,
					'DropoffPlateNumber' : data.DropoffPlateNumber,
					'DropoffStopPoint_EN' : data.DropoffStopPoint_EN,
					'DropoffStopPoint_TH' : data.DropoffStopPoint_TH,
					'DropoffLocation' : data.DropoffLocation,
					'TotalPrice' : data.TotalPrice,
       		 	});
  			

  				javascriptOption += 'document.getElementById("dropoffDrivingTime_TH").innerHTML = \'' +$filter('jsonDateTHAI')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
				javascriptOption += 'document.getElementById("dropoffDrivingTime_ENG").innerHTML = \'' +$filter('jsonDateEN')($scope.DropOffticket[0].DropoffDrivingTime, 'DD MMMM YYYY') + '\';';
  				javascriptOption += 'document.getElementById("fullname_th").innerHTML = \'' +$scope.DropOffticket[0].PassergerfullName  + '\';';
	  		    javascriptOption += 'document.getElementById("totalPrice").innerHTML = \'' +$scope.DropOffticket[0].TotalPrice+ '\';'
				javascriptOption += 'document.getElementById("OperatorBy").innerHTML = \'' +$scope.DropOffticket[0].OperatorBy+ '\';'

				javascriptOption += 'document.getElementById("dropoffLocation_TH").innerHTML = \'' +$scope.DropOffticket[0].DropoffLocation  + '\';';
	   			javascriptOption += 'document.getElementById("dropoffLocation_ENG").innerHTML = \'' +''+ '\';';
      		    javascriptOption += 'document.getElementById("dropoffStopPoint_TH").innerHTML = \'' +$scope.DropOffticket[0].DropoffStopPoint_TH + '\';';
                javascriptOption += 'document.getElementById("dropoffStopPoint_ENG").innerHTML = \'' +$scope.DropOffticket[0].DropoffStopPoint_EN+ '\';';
	            javascriptOption += 'document.getElementById("dropoffPlateNumber").innerHTML = \'' +$scope.DropOffticket[0].DropoffPlateNumber+ '\';'
	            javascriptOption += 'document.getElementById("dropoffDrivingTime").innerHTML = \'' +$filter('jsonDate')($scope.DropOffticket[0].DropoffDrivingTime, 'HH:mm') + 'น.'+'\';'

	            javascriptOption += 'document.getElementById("dropoffview").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview1").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview2").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview3").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview4").style.visibility = "visible";';
				javascriptOption += 'document.getElementById("dropoffview5").style.visibility = "visible";';

				javascriptOption += 'document.getElementById("pickupview").style.display = "none";';
				javascriptOption += 'document.getElementById("pickupview1").style.display = "none";';
				javascriptOption += 'document.getElementById("pickupview2").style.display = "none";';
				javascriptOption += 'document.getElementById("pickupview3").style.display = "none";';
				javascriptOption += 'document.getElementById("pickupview4").style.display = "none";';
  			}
  			
		javascriptOption += 'window.print();';
		javascriptOption += 'window.close();';
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><script>function doPrint(){'+ javascriptOption +'}</script></head><body onload="doPrint()">' + printContents + '</body></html>');
		popupWin.document.close();

 		});
	}

    /*
    	Watch Zone
    */
	$scope.$watch("searchFilter.wordSearch", function(data){

		if(typeof $scope.searchFilter.wordSearch === 'object')
		{
			$scope.PassengerDetail = $scope.searchFilter.wordSearch;
			console.log($scope.PassengerDetail);

			$scope.ReferenceCodeForTicket = $scope.PassengerDetail.ReferenceCode;
			$scope.globalVariable.stepOneFinish = true;



			var indexStartPoint = $filter('lswIndexOf')($scope.StopPointList, { StopPointId: $scope.PassengerDetail.StopPointStartId },'StopPointId');
			var indexEndPoint = $filter('lswIndexOf')($scope.StopPointList, { StopPointId: $scope.PassengerDetail.StopPointEndId },'StopPointId');

			if(indexStartPoint != -1)
			{
				$scope.PassengerDetail.LatStart = $scope.StopPointList[indexStartPoint].Latitude;
				$scope.PassengerDetail.LongStart = $scope.StopPointList[indexStartPoint].Longitude;		
				$scope.maps.pickup.center.latitude = $scope.PassengerDetail.LatStart;
				$scope.maps.pickup.center.longitude = $scope.PassengerDetail.LongStart;
				$scope.$evalAsync();
			}

			if(indexEndPoint != -1)
			{
				$scope.PassengerDetail.LatEnd = $scope.StopPointList[indexEndPoint].Latitude;
				$scope.PassengerDetail.LongEnd = $scope.StopPointList[indexEndPoint].Longitude;	
				$scope.maps.dropoff.center.latitude = $scope.PassengerDetail.LatEnd;
				$scope.maps.dropoff.center.longitude = $scope.PassengerDetail.LongEnd;
				$scope.$evalAsync();
			}

			$scope.PickupPassengers.PassengerId = $scope.PassengerDetail.PassengerId;
			$scope.PickupPassengers.VehicleOperationSeatId = $scope.PassengerDetail.VehicleOperationSeatId;
			$scope.DropOffPassengers.PassengerId = $scope.PassengerDetail.PassengerId;
			$scope.PassengerId =$scope.PassengerDetail.PassengerId;
			$scope.VehicleOperSeatId = $scope.PassengerDetail.VehicleOperationSeatId;

			$scope.DropOffPassengers.VehicleOperationSeatId = $scope.PassengerDetail.VehicleOperationSeatId;
			console.log($scope.PickupPassengers);
			$scope.getPickupDropoffService();
		}
		else
		{
			
			$scope.PassengerDetail = {};
			$scope.PickupPassengers = {
				PickupDropOffServiceId : null,
				PassengerId : null,
				RoomNumber : "",
				LocationId : null,
				PickupDropOffRateId : null,
				PickupDropOffPassengerPrice : 0,
				VehicleOperationSeatId : null
			};
			$scope.DropOffPassengers = {
				PickupDropOffServiceId : null,
				PassengerId : null,
				RoomNumber : "",
				LocationId : null,
				PickupDropOffRateId : null,
				PickupDropOffPassengerPrice : 0,
				VehicleOperationSeatId : null
			};

		}
	});

	$scope.$watch("searchFilter.pickupSearch", function(data){
		if(typeof $scope.searchFilter.pickupSearch === 'object')
		{
			$scope.PickupPassengers.LocationId = $scope.searchFilter.pickupSearch.LocationId;
			angular.forEach($scope.pickupMarkers, function(each){
				if(each.id == $scope.PickupPassengers.LocationId)
				{
					each.show = true;
				}
				else
				{
					each.show = false;
				}
			});	

			$scope.checkStepTwo();
		}
	});

	$scope.$watch("searchFilter.dropoffSearch", function(data){
		if(typeof $scope.searchFilter.dropoffSearch === 'object')
		{
			$scope.DropOffPassengers.LocationId = $scope.searchFilter.dropoffSearch.LocationId;
			angular.forEach($scope.dropoffMarkers, function(each){
				if(each.id == $scope.DropOffPassengers.LocationId)
				{
					each.show = true;
				}
				else 
				{
					each.show = false;
				}
			});	

			$scope.checkStepTwo();
		}
	});

	/*
		Helper Function
	*/
	var calculateDistanceFormLatLong = function(lat1, long1, lat2, long2)
	{
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(long2-long1); 
		var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	}

	var deg2rad = function(deg) 
	{
		return deg * (Math.PI/180);
	}

}]);