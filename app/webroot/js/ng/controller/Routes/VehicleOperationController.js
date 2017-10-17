module.controller('VehicleOperationCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "$sce", "$modal", "$filter", "Helpers", "Modals", "Routes", "Locations", "Assets", "SeatCapacityArrangement", function ($rootScope, $scope, $timeout, $cookies, $sce, $modal, $filter, Helpers, Modals, Routes, Locations, Assets, SeatCapacityArrangement) {


	$scope.openMultipleDateSelect = {
		dateList : [],
		dateDup : [],
		IsOnline : true
	};
	$scope.currentStep = 1;
	$scope.VehicleOperationList = [];
	$scope.VehicleOperationListForDeleteAll = [];

	$scope.VehicleRoute = [];	
	$scope.VehicleRouteStopPoint = [];

	$scope.VehicleSeatPlanList = [];
	$scope.VehicleList = [];
	$scope.chooseVehicleId = "";
	$scope.VehicleDetail = {};
	$scope.all = false;

	$scope.IsAllDelete = false;
	$scope.searchFilter = {
		dateStart : new Date(),
		dateEnd : new Date(),
		timeStart : "",
		timeEnd : "",
		RouteId : ""
	};

	$scope.globalVariable = {
		chooseVehicle : null,
		chooseVehicleSeatPlan : null,
		chooseVehicleRoute : null,
		chooseDate : null,
		IsFloorManageActive : 0,
		IsMonthActive : 0,
		isShowFilter : true
	};

	$scope.modalElement = {
		content : ""
	}

	$scope.modal = {
		content : "",
		key : ""
	};

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.initData = function()
	{
		$scope.vehicleRouteTrip = {
			dateList : [],
			dateDup : [],
			IsOnline : true,
			DiscountAllowNumber : 5
		};
		$scope.VehicleSeatPlan = null;
		$scope.VehicleSeatStandard = null;
		$scope.VehicleSeatFloorDetail = null;
		$scope.StandardTypeList = null;
		$scope.globalVariable.chooseVehicleSeatPlan = null;
		$scope.globalVariable.chooseVehicleRoute = null;
		$scope.VehicleRouteStopPoint = [];
		$scope.VehicleList = [];
		$scope.chooseVehicleId = "";
		$scope.VehicleDetail = {};
		$scope.VehicleOperationListForDeleteAll = [];
		$scope.IsAllDelete = false;


		$scope.currentStep = 1;
		//$scope.getAllVehicleCompleted();
		$scope.getRouteCompleted();
		
		Routes.GetStopPointList(function(data){
            $scope.stopPointData = data;
        });

        $scope.VehicleOperationRelateList = [];

        //Load Route Trip
        Routes.GetVehicleRouteTrip(
        	$scope.searchFilter.dateStart, 
        	$scope.searchFilter.dateEnd, 
        	$scope.searchFilter.timeStart, 
        	$scope.searchFilter.timeEnd, 
        	$scope.searchFilter.RouteId, 
        	$scope.timezoneOffset,
        	function(routeTrip){
        		console.log(routeTrip);
        		$scope.VehicleOperationList = routeTrip.VehicleOperationList;

        	}
        );

        Locations.GetAllProvinces(function(data){
			$scope.ProvicesList = data;
		});	
	}



  
	//// check  delete multiple  vihicle {
		$scope.IsMultipleRoute = function(){
			$scope.IsAllDelete = !$scope.IsAllDelete;
			$scope.VehicleOperationListForDeleteAll = [];
			 angular.forEach($scope.VehicleOperationList, function(vehicleOperation) {
       			 vehicleOperation.selected = false;
   			 });


		}

		//// check  delete multiple  vihicle {
		$scope.SelectAllRoute = function(){

		 	$scope.i = 0;
		 	$scope.VehicleOperationListKeep = [];
		 	$scope.VehicleOperationDelete = {
							VehicleOperationId : null,
							IsPassenger : null
						};
			 angular.forEach($scope.VehicleOperationList, function(vehicleOperation) {
			 		console.log(vehicleOperation);

	        			 if(vehicleOperation.NumberPassenger <=0)
	        			 {
	        			 	vehicleOperation.selected = true;
	        			 	$scope.VehicleOperationListForDeleteAll.push(vehicleOperation.VehicleOperationId);
	        			 }
	        			 
	       			 
	   			 });

			//  Routes.BeforeRemoveVehicleOperationList($scope.VehicleOperationList, $scope.timezoneOffset, function(data){
						
			// 				angular.forEach(data.VehicleOperationList, function(vehicleOperationListData) {
			// 					$scope.VehicleOperationListForDeleteAll.push(vehicleOperationListData.VehicleOperationId);
			// 				});
			// 						///$scope.removeVehicleOperation(VehicleOperationId);
			// });
			 	
			// $scope.IsAllDelete = !$scope.IsAllDelete;
			// $scope.VehicleOperationListForDeleteAll = [];
			//  angular.forEach($scope.VehicleOperationList, function(vehicleOperation) {
   //     			 vehicleOperation.selected = false;
   // 			 });


		}
		$scope.IsDate = function(date){
			$scope.today= new Date();
			//////console.log($scope.today);
			var todaycompare =  $filter('date')($scope.today, 'yyyy-MM-dd-hh-mm ').split('-');
		 	var datecompare =  $filter('jsonDate')(date, 'yyyy-MM-dd-hh-mm').split('-');
		 	console.log(datecompare[0]);

		 	var todayformat = new Date($filter('date')($scope.today, 'yyyy-MM-dd HH:mm:ss'));
  			var dateformat = new Date($filter('jsonDate')(date, 'yyyy-MM-dd HH:mm:ss'));
  			console.log(todayformat+","+dateformat)
		

			if(dateformat.getTime() <todayformat.getTime())
			{

				return false;
			}
			
			else{
				console.log('sadasd2');
			return true;
			}

		}

		$scope.ClearSelectAllRoute = function(){
			$scope.VehicleOperationListForDeleteAll = [];
			 angular.forEach($scope.VehicleOperationList, function(vehicleOperation) {
       			 vehicleOperation.selected = false;
   			 });


		}

		$scope.RemoveMultipleRoute = function(){
			///console.log('makkypompom');
			console.log($scope.VehicleOperationListForDeleteAll);
			if($scope.VehicleOperationListForDeleteAll.length>0){
				Routes.RemoveVehicleOperationList($scope.VehicleOperationListForDeleteAll, function(data){
					///console.log('sdfsdfsdfsdf');
					console.log(data);
					if(data.ServiceStatus == "REMOVEVEHICLEOPERATIONLIST_FAIL")
					{
						console.log('sdfsdfsdfsdf');
						$scope.initData();
            			Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
               			Modals.showAlertFail();
					}
					else
					{
						/////console.log('sdfsdfsdfsdf1234');
						Modals.showAlertSuccess();
						///Modals.showAlertSuccess('ลบเที่ยวรถที่เลือกสำเร');
						$scope.initData();	
					}
				});

			}
		}




	///// add route to delete
		$scope.beforeRemoveVehicleOperationAll = function(route){
			////console.log(route);
			console.log(route);
			$scope.IsDuplicate = false;
			$scope.i = 0;
			if($scope.VehicleOperationListForDeleteAll.length>0){
			angular.forEach($scope.VehicleOperationListForDeleteAll, function(vehicleOperation) {
				if(vehicleOperation ==route )
				{
					$scope.IsDuplicate = true;
					$scope.VehicleOperationListForDeleteAll.splice($scope.i, 1);

				}
				if($scope.i == ($scope.VehicleOperationListForDeleteAll.length-1)&&!$scope.IsDuplicate)
				{
					$scope.VehicleOperationListForDeleteAll.push(route)

				}
				$scope.i = $scope.i+1;
				console.log($scope.VehicleOperationListForDeleteAll);

			});
			}
			else
			{
				$scope.VehicleOperationListForDeleteAll.push(route);

			}
		}


			// console.log('makkypompom');
			// $scope.VehicleOperationDelete = {
			// 				VehicleOperationId : null,
			// 				IsPassenger : null
			// 			}
			// 	$scope.IsDuplicate = true;
			// 	$scope.i = 0;
			// if($scope.VehicleOperationListForDeleteAll.length>0){
			// angular.forEach($scope.VehicleOperationListForDeleteAll, function(vehicleOperation) {
   //     			 if(vehicleOperation.VehicleOperationId == route){
   //     			 	$scope.IsDuplicate = true;
   //     			 	$scope.VehicleOperationListForDeleteAll.splice($scope.i, 1);
   //     			 	console.log('asASDSFSDF');
   //     			 	///console.log($scope.VehicleOperationListForDeleteAll);

   //     			 }
   //     			 if($scope.i == ($scope.VehicleOperationListForDeleteAll.length)&&!$scope.IsDuplicate){
   //     			 	Routes.BeforeRemoveVehicleOperation(route, $scope.timezoneOffset, function(data){
			// 			if(data.ServiceStatus == "BEFOREREMOVEVEHICLEOPERATION_FAIL")
			// 			{
			// 				///console.log('ASasASGFDGDFG');
			// 				$scope.VehicleOperationDelete.IsPassenger = true;
			// 				$scope.VehicleOperationDelete.VehicleOperationId = route
			// 				$scope.VehicleOperationListForDeleteAll.push($scope.VehicleOperationDelete);
			// 				///route.FailMessages = data.FailMessages.Seat.DefaultMSG;
			//                 // $scope.modal.content = data.FailMessages.Seat.DefaultMSG;
			//                 // $scope.modal.key = VehicleOperationId;
			//                 // confirmRemoveVehicleTrip.$promise.then(confirmRemoveVehicleTrip.show);
			// 			}
			// 			else
			// 			{
			// 				$scope.VehicleOperationDelete.IsPassenger = false;
			// 				$scope.VehicleOperationDelete.VehicleOperationId = route
			// 				$scope.VehicleOperationListForDeleteAll.push($scope.VehicleOperationDelete);
			// 				////console.log($scope.VehicleOperationListForDeleteAll);
			// 				///$scope.removeVehicleOperation(VehicleOperationId);
			// 			}
			// 		});
   //     			 	///$scope.VehicleOperationListForDeleteAll.push(route);
   //     			 }
   //     			 $scope.IsDuplicate = false;
   //     			 $scope.i = $scope.i+1;
   // 			 });
			// }
			// else{

			// 	Routes.BeforeRemoveVehicleOperation(route, $scope.timezoneOffset, function(data){
			// 		if(data.ServiceStatus == "BEFOREREMOVEVEHICLEOPERATION_FAIL")
			// 		{
		 //                ///console.log('ASasASGFDGDFG12');
			// 				$scope.VehicleOperationDelete.IsPassenger = true;
			// 				$scope.VehicleOperationDelete.VehicleOperationId = route
			// 				$scope.VehicleOperationListForDeleteAll.push($scope.VehicleOperationDelete);
			// 		}
			// 		else
			// 		{
			// 				$scope.VehicleOperationDelete.IsPassenger = false;
			// 				$scope.VehicleOperationDelete.VehicleOperationId = route
			// 				$scope.VehicleOperationListForDeleteAll.push($scope.VehicleOperationDelete);
			// 			////console.log($scope.VehicleOperationListForDeleteAll);
			// 			///$scope.removeVehicleOperation(VehicleOperationId);
			// 		}
			// 	});
			// 	///$scope.VehicleOperationListForDeleteAll.push(route);
			// }

			// // Routes.BeforeRemoveVehicleOperation(VehicleOperationId, $scope.timezoneOffset, function(data){
			// // 	if(data.ServiceStatus == "BEFOREREMOVEVEHICLEOPERATION_FAIL")
			// // 	{
	  // //               $scope.modal.content = data.FailMessages.Seat.DefaultMSG;
	  // //               $scope.modal.key = VehicleOperationId;
	  // //               confirmRemoveVehicleTrip.$promise.then(confirmRemoveVehicleTrip.show);
			// // 	}
			// // 	else
			// // 	{
			// // 		$scope.removeVehicleOperation(VehicleOperationId);
			// // 	}
			// // });


			
		///}



	/*
	Load dropdown list
	*/
	$scope.getRouteCompleted = function()
	{
		Routes.GetRouteCompletedList(true, function(vehicleRouteList){
			$scope.VehicleRoute = vehicleRouteList.RouteList;
			console.log($scope.VehicleRoute);
		});
	}

	$scope.getStopPointByRouteId = function()
	{
		Routes.GetStopPointByRouteId($scope.globalVariable.chooseVehicleRoute, null, function(vehicleRouteStopPoint){
			$scope.VehicleRouteStopPoint = vehicleRouteStopPoint.VehicleOperationStopPointList;
		});


		//Set RouteId
		$scope.vehicleRouteTrip.RouteId = $scope.globalVariable.chooseVehicleRoute;
		SeatCapacityArrangement.GetVehicleSeatPlanListCompletedForBooking($scope.vehicleRouteTrip.RouteId, function(seatPlan){
			$scope.VehicleSeatPlanList = seatPlan.SeatPlanList;
		});

		$scope.GetVehicleRouteTripRelate($scope.vehicleRouteTrip.dateList, $scope.vehicleRouteTrip.RouteId);
	}





	/*
		Search Function
	*/
	$scope.searchRouteTrip = function()
	{
        //Load Route Trip
        Routes.GetVehicleRouteTrip(
        	$scope.searchFilter.dateStart, 
        	$scope.searchFilter.dateEnd, 
        	$scope.searchFilter.timeStart, 
        	$scope.searchFilter.timeEnd, 
        	$scope.searchFilter.RouteId, 
        	$scope.timezoneOffset,
        	function(routeTrip){
        		console.log(routeTrip);
        		$scope.VehicleOperationList = routeTrip.VehicleOperationList;
        	}
        );
	}

	/*
		Add new / Update
	*/
	$scope.addVehicleTrip = function()
	{
		$scope.globalVariable.chooseDate = null;
		$scope.currentStep = 2;
		 SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(seatPlan){
		 	$scope.currentStep = 2;
		 	$scope.VehicleSeatPlanList = seatPlan.SeatPlanList;
		 });
	}

	$scope.editVehicleTrip = function(VehicleOperationId, isViewMode)
	{
		console.log(VehicleOperationId);
		$scope.VehicleOperationRelateList = [];
		SeatCapacityArrangement.GetVehicleSeatPlanListCompletedForBookingOperation(VehicleOperationId,function(seatPlan){

			$scope.VehicleSeatPlanList = seatPlan.SeatPlanList;

			Routes.GetVehicleRouteTripById(VehicleOperationId, $scope.timezoneOffset, function(data){

				$scope.vehicleRouteTrip = data;

				
				$scope.vehicleRouteTrip.VehicleOperationDate = $filter("jsonDate")($scope.vehicleRouteTrip.VehicleOperationDate,"MM/dd/yyyy HH:mm");

				$scope.globalVariable.chooseVehicleRoute = $scope.vehicleRouteTrip.RouteId;

				$scope.VehicleSeatPlan = $scope.globalVariable.chooseVehicleSeatPlan = $scope.VehicleSeatPlanList[$filter('lswIndexOf')($scope.VehicleSeatPlanList, { VehicleSeatPlanId: $scope.vehicleRouteTrip.VehicleSeatPlanId },'VehicleSeatPlanId')];

				$scope.vehicleRouteTrip.VehicleSeatPlanId = $scope.VehicleSeatPlan.VehicleSeatPlanId;

				$scope.GetVehicleRouteTripRelate($scope.vehicleRouteTrip.dateList, $scope.vehicleRouteTrip.RouteId);

				SeatCapacityArrangement.GetVehicleSeatFloorList($scope.VehicleSeatPlan.VehicleSeatPlanId, function(seatFloor){
					
					$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],[]);

					Assets.GetVehicleTypeById($scope.VehicleSeatPlan.VehicleTypeId, function(dataVehicleType){

						$scope.VehicleTypeDetail = dataVehicleType;
					});

					//Load Vehicle
					Assets.GetVehicleByVehicleSeatPlan($scope.vehicleRouteTrip.VehicleSeatPlanId, function(vehicleList){

						$scope.VehicleList = vehicleList.VehicleList;
						var VehicleIndex = $filter('lswIndexOf')($scope.VehicleList, { VehicleId: $scope.vehicleRouteTrip.VehicleId },'VehicleId');
						if(VehicleIndex != -1)
						{
							$scope.globalVariable.chooseVehicle = $scope.VehicleList[VehicleIndex];	
						}

						$scope.loadVehicleDetail();

						Routes.GetStopPointByRouteId($scope.vehicleRouteTrip.RouteId, VehicleOperationId, function(vehicleRouteStopPoint){
							$scope.VehicleRouteStopPoint = vehicleRouteStopPoint.VehicleOperationStopPointList;
							
							if(isViewMode)
							{
								$scope.currentStep = 4;
							}
							else
							{
								$scope.currentStep = 3;	
							}
							
						});
					});
				});
			});
		});
	}

	$scope.removeVehicleTrip = function(VehicleOperationId)
	{
		//Remove function
		$scope.initData();
	}

	$scope.loadVehicleSeatPlan = function()
	{
	
		if($scope.globalVariable.chooseVehicleSeatPlan == null)
		{
			$scope.VehicleSeatPlan = null;
			$scope.VehicleSeatStandard = null;
			$scope.VehicleSeatFloorDetail = null;
			$scope.StandardTypeList = null;
			$scope.VehicleOperationRelateList = [];

			$scope.globalVariable.chooseVehicle = null;
			$scope.vehicleRouteTrip.VehicleSeatPlanId = null;
			$scope.vehicleRouteTrip.VehicleId = null;
			$scope.VehicleDetail = {};	//Clear Vehicle Detail
		}
		else
		{



		$scope.VehicleSeatPlan = $scope.globalVariable.chooseVehicleSeatPlan;

			Assets.GetVehicleTypeById($scope.VehicleSeatPlan.VehicleTypeId, function(dataVehicleType){

				$scope.VehicleTypeDetail = dataVehicleType;

				$scope.vehicleRouteTrip.VehicleSeatPlanId = $scope.VehicleSeatPlan.VehicleSeatPlanId;

				$scope.GetVehicleRouteTripRelate($scope.vehicleRouteTrip.dateList, $scope.vehicleRouteTrip.RouteId);

				Assets.GetVehicleByVehicleSeatPlan($scope.VehicleSeatPlan.VehicleSeatPlanId, function(vehicleList){
					$scope.VehicleList = vehicleList.VehicleList;
				});

				SeatCapacityArrangement.GetVehicleSeatStandardList($scope.VehicleSeatPlan.VehicleSeatPlanId, function(seatStandard){
					$scope.VehicleSeatStandard = seatStandard.SeatStandardList;
				});

				SeatCapacityArrangement.GetVehicleSeatFloorList($scope.VehicleSeatPlan.VehicleSeatPlanId, function(seatFloor){
					$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],[]);
				});

				SeatCapacityArrangement.GetVehicleStandardList(function(data){
					$scope.StandardTypeList = checkStandardData(data);
				});
			});
		}
	}

	$scope.loadVehicleDetail = function()
	{
		if($scope.globalVariable.chooseVehicle == null)
		{
			$scope.globalVariable.chooseVehicle = null;
			$scope.vehicleRouteTrip.VehicleId = null;
			$scope.VehicleDetail = {};
		}
		else
		{
			$scope.VehicleDetail = $scope.globalVariable.chooseVehicle;
			$scope.vehicleRouteTrip.VehicleId = $scope.VehicleDetail.VehicleId;
		}
	}

	$scope.multipleDate = {};

	var selectMultipleDate = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/select-multiple-date-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.openMultipleDateSelect = function()
	{
		var date = new Date();
		date.setHours(0,0,0,0);
		$scope.multipleDate = {
			dateStart : date,
			dateEnd : date,
			timeStart : [
				{ time : "00:00" }
			],
			DayofWeek : [true,true,true,true,true,true,true],
			dateList : []
		};
		$scope.generateDateforMultipleDate();
		selectMultipleDate.$promise.then(selectMultipleDate.show);
	}

	$scope.addTimeToMultipleDate = function()
	{
		var timePrev = $scope.multipleDate.timeStart[$scope.multipleDate.timeStart.length-1];
		$scope.multipleDate.timeStart.push(
			{
				time : moment(timePrev.time, 'HH:mm').add(60, 'minutes').format('HH:mm')
			}
		);
		$scope.generateDateforMultipleDate();
	}

	$scope.removeTimeforMultipleDate = function(Index)
	{
		$scope.multipleDate.timeStart.splice(Index, 1);
		$scope.generateDateforMultipleDate();
	}

	$scope.generateDateforMultipleDate = function()
	{
		//$scope.multipleDate.dateList = [];
		//Duration
		var duration = moment.duration(moment($scope.multipleDate.dateEnd).diff(moment($scope.multipleDate.dateStart)));
		var daydiff = duration.asDays();
		var dateList = [];
		for(var i = 0; i <= daydiff; i++)
		{
			var currentDate = moment($scope.multipleDate.dateStart).add(i, 'days');
			var dayofweek = currentDate.format('d');

			if($scope.multipleDate.DayofWeek[dayofweek])
			{
				angular.forEach($scope.multipleDate.timeStart, function(eachTime){
					var customDate = moment(currentDate.format("DD/MM/YYYY") + ' ' + eachTime.time, "DD/MM/YYYY HH:mm");
					dateList.push(
						{
							monthName : customDate.format("MMMM"),
							Date : customDate
						}
					);
				});
			}
		}
		$scope.multipleDate.dateList = dateList;
		///console.log($scope.multipleDate.dateList);
	}

	$scope.addMultipleDateToDateList = function()
	{
		var isDup = false;
		console.log($scope.vehicleRouteTrip);

		angular.forEach($scope.multipleDate.dateList, function(eachDate){

			isDup = false;
			angular.forEach($scope.vehicleRouteTrip.dateList, function(curEachDate){
			
				if(new Date(curEachDate).getTime() === new Date(eachDate.Date).getTime())
				{
					isDup = true;
				}
			});

			if(!isDup)
			{
				$scope.vehicleRouteTrip.dateList.push(eachDate.Date);	
			}
		});

		selectMultipleDate.$promise.then(selectMultipleDate.hide);
		$scope.GetVehicleRouteTripRelate($scope.vehicleRouteTrip.dateList, $scope.vehicleRouteTrip.RouteId);
	}


	$scope.addDateToList = function()
	{
		var isDup = false;
		angular.forEach($scope.vehicleRouteTrip.dateList, function(eachDate){
			
			if(new Date(eachDate).getTime() === new Date($scope.globalVariable.chooseDate).getTime())
			{
				isDup = true;
			}
		});

		if(isDup)
		{
			Modals.setModal("ข้อมูลไม่ถูกต้อง" , "วันที่ "+$filter("date")($scope.globalVariable.chooseDate,"MM/dd/yyyy HH:mm")+" ถูกเลือกแล้ว");
			Modals.showError();
		}
		else
		{
			$scope.vehicleRouteTrip.dateList.push($scope.globalVariable.chooseDate);
			$scope.GetVehicleRouteTripRelate($scope.vehicleRouteTrip.dateList, $scope.vehicleRouteTrip.RouteId);
		}

		$scope.globalVariable.chooseDate = null;
	}

	$scope.removeDateFromList = function(date)
	{
		var temp = [];
		angular.forEach($scope.vehicleRouteTrip.dateList, function(eachDate){
			if(eachDate != date)
			{
				temp.push(eachDate);
			}
		});
		$scope.vehicleRouteTrip.dateList = temp;
	}

	$scope.GetVehicleRouteTripRelate = function(dateList, RouteId)
	{
		if(!angular.isUndefined(dateList))
		{
			Routes.GetVehicleRouteTripRelate(dateList, RouteId, $scope.timezoneOffset, function(data){
				$scope.VehicleOperationRelateList = data.VehicleOperationList;
			});
		}
	}

	var confirmVehicleTripModel = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/confirm-vehicle-trip-dup.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.beforeSaveRouteTrip = function()
	{
		if(!$scope.vehicleRouteTrip.IsSupplement)
		{
			if($scope.VehicleOperationRelateList.length > 0)
			{
				$scope.vehicleRouteTrip.dateDup = [];
				angular.forEach($scope.VehicleOperationRelateList, function(relate){
					angular.forEach($scope.vehicleRouteTrip.dateList, function(date){
						var date1 = $filter("jsonDate")(relate.VehicleOperationDate,"MM/dd/yyyy HH:mm");
						var date2 = $filter("date")(date,"MM/dd/yyyy HH:mm");
						if(date1 == date2)
						{
							$scope.vehicleRouteTrip.dateDup.push(date);
						}
					});
				});

				if($scope.vehicleRouteTrip.dateDup.length > 0)
				{
					confirmVehicleTripModel.$promise.then(confirmVehicleTripModel.show);	
				}
				else
				{
					$scope.saveRouteTrip();
				}
			}
			else
			{
				$scope.saveRouteTrip();
			}
		}
		else
		{
			$scope.saveRouteTrip();
		}
	}

	$scope.saveRouteTrip = function()
	{
		Routes.SaveRouteTrip($scope.vehicleRouteTrip, $scope.VehicleRouteStopPoint, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "SAVEVEHICLETRIP_FAIL")
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

	$scope.updateRouteTrip = function(loadInit)
	{
		if(angular.isUndefined(loadInit))
		{
			loadInit = true;
		}

		Routes.UpdateRouteTrip($scope.vehicleRouteTrip, $scope.VehicleRouteStopPoint, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "SAVEVEHICLETRIP_FAIL")
            {
                Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
			else
			{
				Modals.showAlertSuccess();

				if(loadInit){
					$scope.initData();	
				}
			}

			$rootScope.$broadcast('updateRouteTrip');
		});
	}

	var confirmRemoveVehicleTrip = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/confirm-remove-vehicle-trip.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.beforeRemoveVehicleOperation = function(VehicleOperationId)
	{
		Routes.BeforeRemoveVehicleOperation(VehicleOperationId, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "BEFOREREMOVEVEHICLEOPERATION_FAIL")
			{
                $scope.modal.content = data.FailMessages.Seat.DefaultMSG;
                $scope.modal.key = VehicleOperationId;
                confirmRemoveVehicleTrip.$promise.then(confirmRemoveVehicleTrip.show);
			}
			else
			{
				$scope.removeVehicleOperation(VehicleOperationId);
			}
		});
	}

	$scope.removeVehicleOperation = function(VehicleOperationId)
	{
		Routes.RemoveVehicleOperation(VehicleOperationId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLEOPERATION_FAIL")
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
	


	/*
		Function
	*/
	$scope.dateParse = function(data)
	{
		return new Date(data);
	}

	$scope.backToMain = function()
	{
		$scope.initData()
	}

	$scope.seatTypeIconColor = function(seatTypeId)
	{
		var color = {};
		switch(seatTypeId)
		{
			case 1:
				color = { 'color' : '#3498DB' };
				break;
			case 2:
				color = { 'color' : '#15B43E' };
				break;
			case 3:
				color = { 'color' : '#F640D6' };
				break;
			case 4:
				color = { 'color' : '#FF0000' };
				break;
			case 5:
				color = { 'color' : '#FFB300' };
				break;
			case 6:
				color = { 'color' : '#0006FF' };
				break;
			default :
				color = { 'color' : '#000000' };
		}
		return color;
	}

	$scope.showIconImage = function(VehicleSeatTypeId, VehicleStandard, IsBlockedOnline)
	{
		/*
			VehicleStandard
			1	ป.1
			2	ป.2
			3	VIP24
			4	VIP34

			Seat Types
			1	Driver
			2	Aviable
			3	Blank
			4	Seat
			5	Ladder
			6	Walkway
			7	Toilet
			8	SpecialSeat
		*/
		var imageURL = "";
		
		switch(VehicleSeatTypeId) {
		    case 1:
		        imageURL = '<i class="avia avia-driver"></i>';
		        break;
		    case 2:
		        imageURL = '<i class="avia avia-Sign"></i>';
		        break;
	        case 3:
	        	var currentColor = $scope.seatTypeIconColor(VehicleStandard);
	        	if(IsBlockedOnline)
				{
					imageURL = '<span class="avia avia-block"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span></span>';
				}
		        else
		        {
		        	imageURL = '<span style="color:'+ currentColor.color +'"><i class="avia avia-seat"></i></span>';
		        }
		        break;
	        case 4:
		        imageURL = '<i class="avia avia-stairs"></i>';
		        break;
	        case 5:
		        imageURL = '<i class="avia avia-footprint"></i>';
		        break;
	        case 6:
		        imageURL = '<i class="avia avia-toilets_unisex"></i>';
		        break;
		}

		return $sce.trustAsHtml(imageURL);
	}

	var checkStandardData = function(data)
	{
		var temp = [];

		angular.forEach(data.StandardList, function(each1){
			var isDup = false;
			angular.forEach($scope.VehicleSeatStandard, function(each2){
				if(each1.VehicleStandardId == each2.VehicleStandardId)
				{
					isDup = true;
				}
			});

			if(!isDup)
			{
				temp.push(each1);
			}
		});
		
		data.StandardList = temp;	
		
		return data;
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.VehicleOperationList,
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


    $scope.lswPaginateRelateOptions = { pageSize: 20 }
    $scope.lswFilterRelateOptions = {
        list: $scope.VehicleOperationRelateList,
        columns: [
            {
                column: "$",
                label: "All",
                type: "input"
            }
        ]
    }
    $scope.lswTableRelateOptions = {
        theadTemplate: 'theadRelateTemplate.html',
        tbodyTemplate: 'tbodyRelateTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateRelateOptions,
        filterOptions: $scope.lswFilterRelateOptions
    };
}]);