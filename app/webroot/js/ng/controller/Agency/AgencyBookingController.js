module.controller('AgencyBookingCtrl',[
	"$rootScope", 
	"$scope", 
	"$timeout", 
	"$cookies", 
	"$modal", 
	"$window",
	"Helpers", 
	"Modals", 
	"Discount", 
	"Routes", 
	"SeatCapacityArrangement",
	"Assets", 
	"$sce", 
	"$filter", 
	"Tickets", 
	"Passengers", 
	"Sales",
	"Reports",
	"Users",
	"Locations",
	"Agency",
	"PickupDropoff",
	function (
		$rootScope, 
		$scope, 
		$timeout, 
		$cookies, 
		$modal, 
		$window,
		Helpers, 
		Modals, 
		Discount, 
		Routes, 
		SeatCapacityArrangement, 
		Assets, 
		$sce, 
		$filter, 
		Tickets, 
		Passengers,
		Sales,
		Reports,
		Users,
		Locations,
		Agency,
		PickupDropoff) {


	$scope.userId = $cookies.get("CakeCookie[userId]");
	$scope.isShowFilter = true;
	$scope.VehicleRoute = [];
	$scope.VehicleSeatPlanList = [];
	$scope.SellingTicketList = [];
	$scope.minDate = moment().add(-1, 'days');
	$scope.AgencyCredit = {};

	/////makky modify
	$scope.PickupPassengerId = '';
	$scope.DropOffPassengerId = '';
	$scope.VehicleOperSeatId ='';
	$scope.ReferenceCodeForTicket ='';
	$scope.DropOffticket = [];

	$scope.globalVariable = 
	{
		UserId : 0,
		isSelectVehicleTrip : false,
		IsFloorManageActive : 0,
		currentVehicleOpreDetail : null,
		currentRouteDetail : null,
		currentPaymentKey : "",
		PassengerSelect : {},
		MoneyRecived : 0,
		currentSeatSelect : {},
		currentEditSeatSelect : {},
		isShowState : 0,
		selectSeatExchange : {},
		confirmExchange : false,
		IsSellingTicketActive : 0,
		TicketPaymentTypePrice : 0,
		IsPrintReportActive : 0,
		stepProcess : 0,
		isChoosePickup : false,
		isChooseDropoff : false,
		stepTwoFinish : false
	};

	$scope.searchFilter = 
	{
		dateStart : new Date(),
		VehicleSeatPlanId : "",
		timeStart : "00:00",
		timeEnd : "23:59",
		RouteId : "",
		pickupSearch : "",
		dropoffSearch : ""
	};

	$scope.currentSearchFilter = 
	{
		dateStart : new Date(),
		VehicleSeatPlanId : "",
		timeStart : "00:00",
		timeEnd : "23:59",
		RouteId : ""
	}

	$scope.VehicleOperationSeats = 
	{
		VehicleOperationId : null,
		VehicleSeatFloorId : null,
		PassengerId : null,
		StopPointStartId : null,
		StopPointEndId : null,
		TicketPaymentTypeId : null,
		TicketPrice : null,
		IsActive : null,
		TicketRentExpiredDate : null,
		TicketStatus : null
	};

	$scope.PassengerDetail = 
	{
		PassengerId : null,
		PassengerFirstName : null,
		PassengerLastName : null,
		PassengerPhone : null,
		PassengerIdentification : null,
		PassengerBirthDate : null,
		PassengerEmail : null
	};

	$scope.seatSelect = [];

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.VehicleOperationList = [];
	$scope.VehicleSeatPlan = {};
	$scope.dateSearchValue = new Date();

	$scope.RoutePriceList = [];
	$scope.ticketPriceDetail = [];

	/* Pickup Dropoff */
	$scope.pickupService = [];
	$scope.dropoffService = [];
	$scope.PickupPassengers = {};
	$scope.DropOffPassengers = {};
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
	$scope.DataSetting_Agency_Ticket_Setting = 
    {
    	AgencyName : "",
    	AgencyLogoFileUploadId : null,
    	AgencyBackgroundFileUploadId : null,
    	AgencyTitleDisplay : 0,
    	AgencyTitleFontSize : 26,
    	AgencyTitlePosition : 0,
    }

	var timeoutForRouteTrip = null;

	$scope.initData = function(UserId)
	{
		$scope.globalVariable.UserId = UserId;
		Agency.GetAgencyTicketSettingById($scope.globalVariable.UserId, function(data){

			$scope.DataSetting_Agency_Ticket_Setting = data;

		});

		Routes.GetRouteCompletedList(true, function(vehicleRouteList)
		{
			$scope.VehicleRoute = vehicleRouteList.RouteList;

			SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(seatPlan)
			{
				$scope.VehicleSeatPlanList = seatPlan.SeatPlanList;

				Routes.GetStopPointList(function(stopPointList)
				{
					$scope.stopPointData = stopPointList;

					Discount.GetGradeList(function(gradeList)
					{
						$scope.GradeList = gradeList.GradeList;

						SeatCapacityArrangement.GetVehicleStandardList(function(vehicleStandardList)
						{
							$scope.VehicleStandardList = vehicleStandardList.StandardList;

							Tickets.GetTicketPaymentTypeListByAgency(true,function(ticketPaymentType)
							{
								$scope.TicketPaymentTypeList = ticketPaymentType.TicketPlaymentList;
								$scope.calculateFee("Money");
								Assets.GetVehicleTypeList(function(vehicleTypeList)
								{
									$scope.VehicleTypeList = vehicleTypeList.VehicleTypeList;

									Locations.GetAllProvinces(function(provicesList)
									{
										$scope.ProvicesList = provicesList;

										Agency.GetAgencyCreditByUserId($scope.userId, false, function(credit)
										{
											$scope.AgencyCredit = credit;

											//Load Route Trip
											Routes.GetVehicleRouteTripSellTicket(
												$scope.currentSearchFilter.dateStart, 
												$scope.currentSearchFilter.dateStart, 
												$scope.currentSearchFilter.VehicleSeatPlanId,
												$scope.currentSearchFilter.timeStart, 
												$scope.currentSearchFilter.timeEnd, 
												$scope.currentSearchFilter.RouteId, 
												$scope.timezoneOffset,
												false,
												function(routeTrip){
													$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList);
													$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
													$scope.reloadRealTimeRouteTrip();
												}
											);
										});
									});	
								});
							});
						});
					});
				});
			});
		});

		Locations.GetLocationList(true, $scope.timezoneOffset, function(data){
			$scope.locationList = data.LocationList;
		});
	}

	/*
		RealTime Update
	*/
	$scope.reloadRealTimeRouteTrip = function()
	{
		Agency.GetAgencyCreditByUserId($scope.userId, true, function(credit){
			
			$scope.AgencyCredit = credit;
			
			Routes.GetVehicleRouteTripSellTicket(
				$scope.currentSearchFilter.dateStart, 
				$scope.currentSearchFilter.dateStart, 
				$scope.currentSearchFilter.VehicleSeatPlanId, 
				$scope.currentSearchFilter.timeStart, 
				$scope.currentSearchFilter.timeEnd, 
				$scope.currentSearchFilter.RouteId, 
				$scope.timezoneOffset,
				true,
				function(routeTrip){
					if(routeTrip == "error")
					{
						timeoutForRouteTrip = $timeout(function(){
							$scope.reloadRealTimeRouteTrip();
						},3000);
					}
					else
					{
						$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
						$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);

						if($scope.globalVariable.isSelectVehicleTrip)
						{					
							var RouteDetail = $scope.VehicleOperationList[$filter('lswIndexOf')($scope.VehicleOperationList, { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId },'RouteId')];
							var VehicleSeatPlanDetail = RouteDetail.VehicleOperationList[$filter('lswIndexOf')(RouteDetail.VehicleOperationList, { VehicleOperationId: $scope.VehicleOperationSeats.VehicleOperationId },'VehicleOperationId')];
							$scope.selectVehicleTripReload(VehicleSeatPlanDetail);
						}
						else
						{
							timeoutForRouteTrip = $timeout(function(){
								$scope.reloadRealTimeRouteTrip();
							},3000);
						}
					}
					
				}
			);
		});
	}
	
	$scope.selectVehicleTripReload = function(VehicleSeatPlanDetail)
	{
		$scope.globalVariable.currentVehicleOpreDetail = VehicleSeatPlanDetail;
		$scope.VehicleOperationSeats.VehicleOperationId = VehicleSeatPlanDetail.VehicleOperationId;
		
		Tickets.GetSeatAvailableList(VehicleSeatPlanDetail.RouteId, VehicleSeatPlanDetail.VehicleOperationId, VehicleSeatPlanDetail.VehicleSeatPlanId, $scope.VehicleOperationSeats.StopPointStartId, $scope.VehicleOperationSeats.StopPointEndId, true, function(seatFloor)
		{
			if(seatFloor == "error")
			{
				timeoutForRouteTrip = $timeout(function(){
					$scope.reloadRealTimeRouteTrip();
				},3000);
			}
			else
			{
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList, $scope.seatSelect);

				//Check selectSeat && seat available
				angular.forEach($scope.VehicleSeatFloorDetail, function(eachFloorList){
					angular.forEach(eachFloorList.VehicleSeatList, function(eachSeatList){

						if(!eachSeatList.IsAvailable)
						{
							checkCurrentSeatAvailable(eachSeatList.VehicleSeatId);
						}

					});
				});

				timeoutForRouteTrip = $timeout(function(){
					$scope.reloadRealTimeRouteTrip();
				},3000);
			}
		});
	}

	var checkCurrentSeatAvailable = function(VehicleSeatId)
	{
		var searchIndex = $filter('lswIndexOf')($scope.seatSelect, { VehicleSeatId: VehicleSeatId },'VehicleSeatId');

		if(searchIndex != null && searchIndex != -1)
		{
			$scope.seatSelect.splice(searchIndex, 1);
		}
	}

	$scope.searchRouteTrip = function(searchFilter)
	{
		$scope.currentSearchFilter = 
		{
			dateStart : searchFilter.dateStart,
			VehicleSeatPlanId : searchFilter.VehicleSeatPlanId,
			timeStart : searchFilter.timeStart,
			timeEnd : searchFilter.timeEnd,
			RouteId : searchFilter.RouteId
		}

		if($scope.currentSearchFilter.dateStart == '' || $scope.currentSearchFilter.dateStart == null)
		{
			$scope.currentSearchFilter.dateStart = new Date();
		}

		//Load Route Trip
		Routes.GetVehicleRouteTripSellTicket(
			$scope.currentSearchFilter.dateStart, 
			$scope.currentSearchFilter.dateStart, 
			$scope.currentSearchFilter.VehicleSeatPlanId, 
			$scope.currentSearchFilter.timeStart, 
			$scope.currentSearchFilter.timeEnd, 
			$scope.currentSearchFilter.RouteId, 
			$scope.timezoneOffset,
			false,
			function(routeTrip){
				$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
				$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
				$timeout.cancel(timeoutForRouteTrip);
				$scope.reloadRealTimeRouteTrip();
			}
		);

		$scope.globalVariable.isSelectVehicleTrip = false;
	}

	$scope.changedisShowFilter = function()
	{
		$scope.isShowFilter = !$scope.isShowFilter;
		$rootScope.checkHeightSellingTicket($scope.isShowFilter);
	}


	/*
		Step 2 : Select vehicle trip
	*/
	$scope.selectVehicleTrip = function(VehicleSeatPlanDetail)
	{
		//Clean Data
		$scope.PassengerDetail = 
		{
			PassengerId : null,
			PassengerFirstName : null,
			PassengerLastName : null,
			PassengerPhone : null,
			PassengerIdentification : null,
			PassengerBirthDate : null,
			PassengerEmail : null
		};


		$scope.globalVariable.currentPaymentKey = 0;
		$scope.globalVariable.PassengerSelect = {};
		$scope.globalVariable.MoneyRecived = 0;
		$scope.globalVariable.currentSeatSelect = {};
		$scope.globalVariable.currentEditSeatSelect = {};
		$scope.globalVariable.IsSellingTicketActive = 0;

		$scope.VehicleOperationSeats = 
		{
			VehicleOperationId : null,
			VehicleSeatFloorId : null,
			PassengerId : null,
			TicketPaymentTypeId : null,
			TicketPrice : null,
			IsActive : null,
			TicketRentExpiredDate : null,
			TicketStatus : null
		};

		$scope.seatSelect = [];

		$scope.globalVariable.isSelectVehicleTrip = true;
		$scope.globalVariable.currentVehicleOpreDetail = VehicleSeatPlanDetail;

		/*
			SET TITLE
		*/
		$scope.globalVariable.titlePrimary = ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute , { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId }, 'RouteId')].RouteMainNumber) + '-' + ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute, { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId }, 'RouteId')].RouteNumber) + ' ' + ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute, { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId } ,'RouteId')].RouteName_TH) + ' / ' + $filter('date')($scope.dateSearchValue, 'dd MMMM yyyy') + ' ' + $filter('jsonDate')($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate,'HH:mm น.') + ' / ' + ($scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanName);

		$scope.VehicleOperationSeats.VehicleOperationId = VehicleSeatPlanDetail.VehicleOperationId;

		$scope.globalVariable.currentRouteDetail = $scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute, { RouteId: VehicleSeatPlanDetail.RouteId },'RouteId')];
		
		Agency.GetAgencyManagePriceByUserId($scope.userId, function(priceDetail)
		{
			Agency.GetAgencyPricePerRoutesByRouteId(priceDetail.AgencyGradePriceId, VehicleSeatPlanDetail.RouteId, function(pricePerRouteDetail)
			{
				$scope.agencyPriceDetail = pricePerRouteDetail;
				$scope.agencyPriceDetail.GradeIdBuy = priceDetail.GradeIdBuy;

				Routes.GetRouteProviceList(VehicleSeatPlanDetail.RouteId, function(routeProviceList){
								
					$scope.RouteProviceList = setRouteProviceList(routeProviceList.RouteProviceList);

					if($scope.RouteProviceList.length > 0)
					{
						Sales.GetSalesRegionByUserId($scope.globalVariable.UserId, function(salesRegion){
							var isAlready = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: salesRegion.StopPointId },'StopPointId');
							if(isAlready <= 0)
							{
								$scope.selectStartStopPoint($scope.RouteProviceList[0].StopPointId, true);
							}
							else
							{
								$scope.selectStartStopPoint(salesRegion.StopPointId, true);
							}

							$scope.selectEndStopPoint($scope.RouteProviceList[$scope.RouteProviceList.length - 1].StopPointId, true);
							$scope.VehicleOperationSeats.VehicleStandardId = $scope.VehicleStandardList[0].VehicleStandardId;
							$scope.calculatePrice();

							SeatCapacityArrangement.GetVehicleSeatPlanById(VehicleSeatPlanDetail.VehicleSeatPlanId, function(seatDetail)
							{
								$scope.VehicleSeatPlan = seatDetail;
								Tickets.GetSeatAvailableList(VehicleSeatPlanDetail.RouteId, VehicleSeatPlanDetail.VehicleOperationId, VehicleSeatPlanDetail.VehicleSeatPlanId, $scope.VehicleOperationSeats.StopPointStartId, $scope.VehicleOperationSeats.StopPointEndId, false, function(seatFloor)
								{
									$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList,$scope.seatSelect);
									$scope.globalVariable.IsFloorManageActive = 0;

									Routes.GetRoutePriceByRouteId(VehicleSeatPlanDetail.RouteId, function(routePrice)
									{
										$scope.RoutePriceList = routePrice;
									
										Agency.GetSellingTicketListByAgency($scope.VehicleOperationSeats.VehicleOperationId, $scope.userId, function(dataSellingTicket)
										{
											$scope.SellingTicketList = dataSellingTicket.VehicleOperationSeatList;
										});

										$scope.calculatePriceDetail();
									});
								});
							});
						});
					}
				});
			});
		});
		
		$scope.calculateFee("Money");
	}

	$scope.PassengerList = [];
	$scope.searchPassenger = function()
	{
		Passengers.SearchPassenger($scope.globalVariable.PassengerSelect, function(data){
			$scope.PassengerList = data.PassengerList;
		});

		if(typeof $scope.globalVariable.PassengerSelect === 'object')
		{
			$scope.PassengerDetail = $scope.globalVariable.PassengerSelect;
			$scope.PassengerDetail.PassengerBirthDate = $filter("jsonDate")($scope.PassengerDetail.PassengerBirthDate,"dd/MM/yyyy");
		}
	}

	$scope.selectStartStopPoint = function(stopPointId, isFirst)
	{

		if(angular.isUndefined(isFirst))
		{
			isFirst = false;
		}

		$scope.VehicleOperationSeats.StopPointStartId = stopPointId;


		//Find Index
		var indexStopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId },'StopPointId');
		var nextStopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId },'StopPointId');

		for(var i = 0; i < $scope.RouteProviceList.length; i++)
		{
			if(i <= indexStopPoint)
			{
				$scope.RouteProviceList[i].IsActive = false;
			}
			else
			{
				$scope.RouteProviceList[i].IsActive = true;
			}
		}

		if(nextStopPoint <= indexStopPoint)
		{
			$scope.VehicleOperationSeats.StopPointEndId = $scope.RouteProviceList[indexStopPoint+1].StopPointId;
		}

		if(!isFirst)
		{
			Tickets.GetSeatAvailableList(
				$scope.globalVariable.currentVehicleOpreDetail.RouteId, 
				$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, 
				$scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanId, 
				$scope.VehicleOperationSeats.StopPointStartId, 
				$scope.VehicleOperationSeats.StopPointEndId,
				false, function(seatFloor)
			{
				console.log(seatFloor);
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList,$scope.seatSelect);
				
				$scope.calculatePrice();
				$scope.calculatePriceDetail();
				$scope.calculateFee("Money");

			});
		}

		Routes.GetStopPointByStopPointId($scope.globalVariable.currentVehicleOpreDetail.RouteId, $scope.VehicleOperationSeats.StopPointStartId, $scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(stopPointTerminal){
			if(stopPointTerminal.VehicleOperationStopPointList.length > 0)
			{
				$scope.TerminalName = stopPointTerminal.VehicleOperationStopPointList[0].VehicleOperationStopPointName;
			}
		});
	}

	$scope.selectEndStopPoint = function(stopPointId, isFirst)
	{

		if(angular.isUndefined(isFirst))
		{
			isFirst = false;
		}

		$scope.VehicleOperationSeats.StopPointEndId = stopPointId;  

		//Find Index
		var indexStopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId },'StopPointId');
		var nextStopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId },'StopPointId');

		for(var i = 0; i < $scope.RouteProviceList.length; i++)
		{
			if(i <= indexStopPoint)
			{
				$scope.RouteProviceList[i].IsActive = false;
			}
			else
			{
				$scope.RouteProviceList[i].IsActive = true;
			}
		}

		if(nextStopPoint <= indexStopPoint)
		{
			$scope.VehicleOperationSeats.StopPointEndId = $scope.RouteProviceList[indexStopPoint+1].StopPointId;
		}

		if(!isFirst)
		{
			Tickets.GetSeatAvailableList(
				$scope.globalVariable.currentVehicleOpreDetail.RouteId, 
				$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId,
				$scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanId, 
				$scope.VehicleOperationSeats.StopPointStartId, 
				$scope.VehicleOperationSeats.StopPointEndId,
				false, function(seatFloor)
			{
				console.log(seatFloor);
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList,$scope.seatSelect);
				$scope.calculatePrice();
				console.log('calculatePrice');
				$scope.calculatePriceDetail();
				$scope.calculateFee("Money");

			});
		}
		
	}

	/*
		Seat Management
	*/
	var selectSeatModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/select-seat-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.selectSeat = function(seat)
	{
		var isNotExist = true;
		var Gender = null;
		//First check seat already exist in seatSelect
		angular.forEach($scope.seatSelect, function(each){
			if(seat.VehicleSeatId == each.VehicleSeatId)
			{
				isNotExist = false;

				if(each.Gender != null && !!each.Gender)
				{
					Gender = each.Gender;
				}
				else
				{
					Gender = 0;
				}
			}
		});

		$scope.globalVariable.currentSeatSelect = seat;
		$scope.globalVariable.currentSeatSelect.isNotExist = isNotExist;
		$scope.globalVariable.currentSeatSelect.Gender = Gender;

		$scope.calculatePrice();
		selectSeatModal.$promise.then(selectSeatModal.show);
	}

	$scope.selectBooking = function(Gender)
	{
		var seatSelect = [];
		var VehicleOperationSeats = {};
		var isNotExist = true;

		$scope.globalVariable.currentSeatSelect.Gender = Gender;

		//First check seat already exist in seatSelect
		angular.forEach($scope.seatSelect, function(each){
			if($scope.globalVariable.currentSeatSelect.VehicleSeatId == each.VehicleSeatId)
			{
				isNotExist = false;
			}
			else
			{
				seatSelect.push(each);
			}
		});

		if(isNotExist)
		{
			seatSelect.push($scope.globalVariable.currentSeatSelect);  
		}

		$scope.seatSelect = seatSelect;

		//Update Gender to
		$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat($scope.VehicleSeatFloorDetail, $scope.VehicleStandardList, $scope.seatSelect);

		$scope.calculatePrice();
		$scope.calculateFee($scope.globalVariable.currentPaymentKey);
	}

	var editSeatModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/agency-edit-seat-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.editSeatSelect = function(seatPassenger, seat)
	{

		Agency.CheckReturnTicket( 
				$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, 
				$scope.timezoneOffset,
				 function(seatFloor)
				{
					if(seatFloor.IsAgencyReturnTicket)
					{
						$scope.globalVariable.currentEditSeatSelect = seatPassenger;
						$scope.globalVariable.currentSeatSelect = seat;
						$scope.globalVariable.IsReturnTicket = seatFloor.IsAgencyReturnTicket;
						editSeatModal.$promise.then(editSeatModal.show);
					}
					else{
						$scope.globalVariable.currentEditSeatSelect = seatPassenger;
						$scope.globalVariable.currentSeatSelect = seat;
						$scope.globalVariable.IsReturnTicket = seatFloor.IsAgencyReturnTicket;
						editSeatModal.$promise.then(editSeatModal.show);

					}
				
			});
	}

	$scope.editSeatFromSeatReport = function(detail)
	{
		$scope.globalVariable.currentEditSeatSelect = detail;
		angular.forEach($scope.VehicleSeatFloorDetail, function(eachSeatData){
			angular.forEach(eachSeatData.VehicleSeatList, function(each){
				if(each.VehicleSeatId == detail.VehicleSeatId)
				{
					$scope.globalVariable.currentSeatSelect = each;
				}
			});
		});
		editSeatModal.$promise.then(editSeatModal.show);
	}

	var showMapDirectionModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Location/show-maps-direction-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.map = {};
	$scope.showMapsDirection = function(detail)
	{
		$scope.map = {
			center : {},
			zoom : 14
		};
		var indexLocation = $filter('lswIndexOf')($scope.locationList, { LocationId: detail.LocationId },'LocationId');

		//Set map focus
		$scope.map.center.latitude = $scope.locationList[indexLocation].Latitude;
		$scope.map.center.longitude = $scope.locationList[indexLocation].Longitude;
		$scope.map.title = $scope.locationList[indexLocation].LocationName;
		$scope.map.showInfo = true;
		$scope.map.dataMap = $scope.locationList[indexLocation];

		//Set marker
		$scope.map.marker = 
		{
			id : $scope.locationList[indexLocation].LocationId,
			coords: {
				latitude : $scope.locationList[indexLocation].Latitude,
				longitude : $scope.locationList[indexLocation].Longitude
			},
      		options: { draggable: false }
		}

		showMapDirectionModal.$promise.then(showMapDirectionModal.show);
	}

	$scope.loadListExchangeSeat = function(StopPointStartId, StopPointEndId, VehicleStandardId)
	{
		$scope.globalVariable.selectSeatExchange = {};
		$scope.VehicleSeatExchangeFloorDetail = [];

		Tickets.GetSeatAvailableList(
			$scope.globalVariable.currentVehicleOpreDetail.RouteId, 
			$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, 
			$scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanId, 
			StopPointStartId, 
			StopPointEndId,
			false, function(seatFloor)
		{
			var tempAvailable = [];
			var temp = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList,$scope.seatSelect);

			angular.forEach(temp, function(eachFloor){
				angular.forEach(eachFloor.VehicleSeatList, function(eachSeat){
					if(eachSeat.IsAvailable && eachSeat.VehicleStandardId == VehicleStandardId && eachSeat.VehicleSeatTypeId == 3)
					{
						tempAvailable.push(eachSeat);
					}
				});
			});
			$scope.VehicleSeatExchangeFloorDetail = tempAvailable;
		});
	}

	$scope.seatExchange = function(VehicleOperationSeatId, currentSeatId, targetSeatId)
	{
		Agency.SeatExchange(VehicleOperationSeatId, currentSeatId, targetSeatId, function(data){
			if(data.ServiceStatus == "SEATEXCHANGE_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	//Load Route Trip
				Routes.GetVehicleRouteTripSellTicket(
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.VehicleSeatPlanId, 
					$scope.currentSearchFilter.timeStart, 
					$scope.currentSearchFilter.timeEnd, 
					$scope.currentSearchFilter.RouteId, 
					$scope.timezoneOffset,
					false,
					function(routeTrip){
						$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
						$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
						$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
					}
				);
            }
		});
	}

	$scope.returnTicket = function(VehicleOperationSeatId, VehicleSeatId)
	{
		console.log('returnTicket');
		Agency.ReturnTicketByAgency(VehicleOperationSeatId, VehicleSeatId, function(data){
			if(data.ServiceStatus == "RETURNTICKET_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	//Load Route Trip
				Routes.GetVehicleRouteTripSellTicket(
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.VehicleSeatPlanId, 
					$scope.currentSearchFilter.timeStart, 
					$scope.currentSearchFilter.timeEnd, 
					$scope.currentSearchFilter.RouteId, 
					$scope.timezoneOffset,
					false,
					function(routeTrip){
						Routes.GetVehicleRouteTripById($scope.VehicleOperationSeats.VehicleOperationId, $scope.timezoneOffset, function(vehicleRouteTrip)
						{							
							$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
							$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
							$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						});
					}
				);
            }
		});
	}

	$scope.printTicket = function(ticketList, VehicleOperationSeatDetail, TypePrint)
	{
		var popupWin = $window.open('', '_blank');
		var printContents = document.getElementById("ticketPrint").innerHTML;
		var javascriptOption = '';
		var discountDetail = null;
		console.log(ticketList);

		if(TypePrint == "BuyNow")
		{
			angular.forEach(ticketList, function(eachTicket,index){
				var totalDiscountPrice = 0;
				console.log(eachTicket);

				if($scope.agencyPriceDetail.IsPriceAgencyPercent)
				{
					eachTicket.TicketPrice = eachTicket.TicketPrice + (eachTicket.TicketPrice * $scope.agencyPriceDetail.PriceAgencySet/100);
				}
				else
				{
					eachTicket.TicketPrice = eachTicket.TicketPrice + $scope.agencyPriceDetail.PriceAgencySet;
				}

				
				///javascriptOption += 'document.getElementById("totalPrice_left").innerHTML = \'' + (eachTicket.TicketPrice) + '\';';
				javascriptOption += 'document.getElementById("totalPrice_center").innerHTML = \'' + (eachTicket.TicketPrice) + '\';';
				///javascriptOption += 'document.getElementById("totalPrice_right").innerHTML = \'' + (eachTicket.TicketPrice) + '\';';
				///javascriptOption += 'document.getElementById("totalDiscount_center").innerHTML = \'' + (totalDiscountPrice) + '\';';
				///javascriptOption += 'document.getElementById("seat_no_left").innerHTML = \'' + eachTicket.VehicleSeatName + '\';';
				javascriptOption += 'document.getElementById("seat_no").innerHTML = \'' + eachTicket.VehicleSeatName + '\';';
				///javascriptOption += 'document.getElementById("seat_no_right").innerHTML = \'' + eachTicket.VehicleSeatName + '\';';
				///javascriptOption += 'document.getElementById("passenger_left").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerPhone) + '\';';
				javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerPhone) + '\';';
				
				javascriptOption += 'document.getElementById("qrcode").innerHTML = \'' + '' + '\';';
				////javascriptOption += 'document.getElementById("passenger_right").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerPhone) + '\';';
				javascriptOption += ' var qrcode'+index+ '= new QRCode(document.getElementById("qrcode"), { ';
				javascriptOption += ' text: \"'+ eachTicket.ReferenceCode +'\",';
				javascriptOption += ' width: 50,';
				javascriptOption += ' height: 50,';
				javascriptOption += ' colorDark : "#000000",';
				javascriptOption += ' colorLight : "#ffffff",';
				javascriptOption += ' correctLevel : QRCode.CorrectLevel.H ';
				javascriptOption += ' });';

				javascriptOption += 'window.print();';

			});
		}
		else
		{
			var totalDiscountPrice = 0;
			var TicketPrice = 0;
			var PassengerDetail = ticketList.Passenger;
			agencyPriceDetail = $scope.agencyPriceDetail;

			TicketPrice = ticketList.TicketPrice + ticketList.AdminPriceDiff + ticketList.AgencyPriceDiff;

			///javascriptOption += 'document.getElementById("totalPrice_left").innerHTML = \'' + (TicketPrice) + '\';';
			javascriptOption += 'document.getElementById("totalPrice_center").innerHTML = \'' + (TicketPrice) + '\';';
			///javascriptOption += 'document.getElementById("totalPrice_right").innerHTML = \'' + (TicketPrice) + '\';';
			///javascriptOption += 'document.getElementById("totalDiscount_center").innerHTML = \'' + (totalDiscountPrice) + '\';';
			//javascriptOption += 'document.getElementById("seat_no_left").innerHTML = \'' + ($scope.globalVariable.currentSeatSelect.VehicleSeatName) + '\';';
			javascriptOption += 'document.getElementById("seat_no").innerHTML = \'' + ($scope.globalVariable.currentSeatSelect.VehicleSeatName) + '\';';
			///javascriptOption += 'document.getElementById("seat_no_right").innerHTML = \'' + ($scope.globalVariable.currentSeatSelect.VehicleSeatName) + '\';';
			//javascriptOption += 'document.getElementById("passenger_left").innerHTML = \'' + (PassengerDetail.PassengerFirstName + ' ' + PassengerDetail.PassengerPhone) + '\';';
			javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + (PassengerDetail.PassengerFirstName + ' ' + PassengerDetail.PassengerPhone) + '\';';
			//javascriptOption += 'document.getElementById("passenger_right").innerHTML = \'' + (PassengerDetail.PassengerFirstName + ' ' + PassengerDetail.PassengerPhone) + '\';';
			javascriptOption += 'document.getElementById("qrcode").innerHTML = \'' + '' + '\';';

			 javascriptOption += ' var qrcode = new QRCode(document.getElementById("qrcode"), { ';
			 javascriptOption += ' text: \"'+ $scope.ReferenceCode +'\",';
			 javascriptOption += ' width: 50,';
			 javascriptOption += ' height: 50,';
			 javascriptOption += ' colorDark : "#000000",';
			 javascriptOption += ' colorLight : "#ffffff",';
			 javascriptOption += ' correctLevel : QRCode.CorrectLevel.H ';
			 javascriptOption += ' });';

			javascriptOption += 'window.print();';
		}

		javascriptOption += 'window.close();';
		$scope.PassengerDetail = {};

		try{
			// /* Prepare Ticket */

			popupWin.document.open();
			popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><link rel="stylesheet" type="text/css" href="/avia-website/css/app.css"/><script src="../js/ng/lib/qrcodejs/qrcode.js"></script><script>function doPrint(){'+ javascriptOption +'}</script></head><body onload="doPrint()">' + printContents + '</body></html>');
			popupWin.document.close();
			

			if($scope.globalVariable.isChooseDropoff||$scope.globalVariable.isChoosePickup){
				$scope.pickupDropoffticketPrint();
				console.log("select");	
			}else{
				console.log("not select");
			}
			//$scope.pickupDropoffticketPrint();	
		}
		catch(err) 
		{
			Modals.setModal("การบล็อกป๊อปอัพ" , "โปรดปลดบล๊อกการเปิดป็อปอัพในเว็บบราว์เซอร์ เพื่อทำการพิมพ์ตั๋วที่นั่ง");
			Modals.showError();
		}
		

		if(TypePrint != "RePrint")
		{

			Agency.GetAgencyCreditByUserId($scope.userId, true, function(credit){
			
				$scope.AgencyCredit = credit;
				
				Routes.GetVehicleRouteTripSellTicket(
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.dateStart, 
					$scope.currentSearchFilter.VehicleSeatPlanId, 
					$scope.currentSearchFilter.timeStart, 
					$scope.currentSearchFilter.timeEnd, 
					$scope.currentSearchFilter.RouteId, 
					$scope.timezoneOffset,
					true,
					function(routeTrip){
						$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
						$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
						$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						$scope.seatSelect = [];
					}
				);
			});
		}
	}



$scope.pickupDropoffticketPrint = function()
	{





console.log($scope.PickupPassengerId);
console.log($scope.DropOffPassengerId);
console.log($scope.VehicleOperSeatId);
console.log($scope.ReferenceCodeForTicket);


		var printContents = document.getElementById("pickupDropoffticketPrint").innerHTML;
		var popupWin = window.open('', '_blank');
		var javascriptOption = '';
console.log('sdfsdfsdfsdf');

  PickupDropoff.ReportForPickupdropOffTicket($scope.PickupPassengerId,$scope.DropOffPassengerId, $scope.ReferenceCodeForTicket,$scope.VehicleOperSeatId, function(data)
  		{
  			console.log(data);
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
  			//$scope.disableTagButton = {'visibility': 'visible'};
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
  			'OperatorBy' : data.OperatorBy,
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
  			console.log('makky'+$scope.DropOffticket[0].PassergerfullName);
  			console.log('makky'+$scope.DropOffticket[0].OperatorBy);

  		



		javascriptOption += 'window.print();';
		javascriptOption += 'window.close();';
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><script>function doPrint(){'+ javascriptOption +'}</script></head><body onload="doPrint()">' + printContents + '</body></html>');
		popupWin.document.close();

	 			
			
 		});




	}










	/*
		Save Ticket
	*/
	var confirmSellingBoxModel = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/agency-confirm-selling-box-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top", backdrop: "static" });
	$scope.confirmSellBoxTicket = function()
	{


		//Init Default data
		$scope.globalVariable.stepProcess = 0;
		$scope.searchFilter.pickupSearch = "";
		$scope.searchFilter.dropoffSearch = "";
		$scope.PickupPassengers = {
			PickupDropOffServiceId : null,
			PassengerId : null,
			RoomNumber : "",
			LocationId : null,
			//PickupDropOffRateId : null, //For agency all service pickup dropoff are free
			PickupDropOffPassengerPrice : 0
		};
		$scope.DropOffPassengers = {
			PickupDropOffServiceId : null,
			PassengerId : null,
			RoomNumber : "",
			LocationId : null,
			//PickupDropOffRateId : null, //For agency all service pickup dropoff are free
			PickupDropOffPassengerPrice : 0
		};

		//Set StartPoint and StopPoint
		var indexStartPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId },'StopPointId');
		var indexEndPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId },'StopPointId');

		if(indexStartPoint != -1)
		{
			$scope.PassengerDetail.LatStart = $scope.stopPointData.StopPointList[indexStartPoint].Latitude;
			$scope.PassengerDetail.LongStart = $scope.stopPointData.StopPointList[indexStartPoint].Longitude;		
			$scope.maps.pickup.center.latitude = $scope.PassengerDetail.LatStart;
			$scope.maps.pickup.center.longitude = $scope.PassengerDetail.LongStart;
			$scope.$evalAsync();
		}

		if(indexEndPoint != -1)
		{
			$scope.PassengerDetail.LatEnd = $scope.stopPointData.StopPointList[indexEndPoint].Latitude;
			$scope.PassengerDetail.LongEnd = $scope.stopPointData.StopPointList[indexEndPoint].Longitude;	
			$scope.maps.dropoff.center.latitude = $scope.PassengerDetail.LatEnd;
			$scope.maps.dropoff.center.longitude = $scope.PassengerDetail.LongEnd;
			$scope.$evalAsync();
		}

		//Before comfirm check pickup dropoff service
		///console.log($scope.VehicleOperationSeats);VehicleOperationId

		var date = new Date(parseInt($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate.toString().substr(6)));
		PickupDropoff.GetPickupDropOffServicesPickup($scope.VehicleOperationSeats.StopPointStartId,$scope.VehicleOperationSeats.VehicleOperationId, date, $scope.timezoneOffset, function(data)
		{
			$scope.pickupService = data.PickupDropOffService;
			angular.forEach($scope.locationList, function(each, index){
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
			PickupDropoff.GetPickupDropOffServicesDropoff($scope.VehicleOperationSeats.StopPointEndId,$scope.VehicleOperationSeats.VehicleOperationId, date, $scope.timezoneOffset, function(data)
			{
				$scope.dropoffService = data.PickupDropOffService;
				angular.forEach($scope.locationList, function(each, index){
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
				confirmSellingBoxModel.$promise.then(confirmSellingBoxModel.show);
			});
		});
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

	$scope.saveSellingBoxVehicleTrip = function()
	{

		
		Agency.SellerBoxBookingTicket(
			$scope.seatSelect, 
			$scope.VehicleOperationSeats, 
			$scope.PassengerDetail, 
			$scope.globalVariable.currentVehicleOpreDetail.RouteId, 
			$scope.VehicleSeatPlan.VehicleTypeId, 
			$scope.globalVariable.isChoosePickup,
			$scope.globalVariable.isChooseDropoff,
			$scope.PickupPassengers,
			$scope.DropOffPassengers,
			$scope.timezoneOffset, 
			function(data){
			if(data.ServiceStatus == "SELLERBOXBOOKINGTICKET_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	//Get Current Type Print
            	console.log(data);

				if($scope.globalVariable.isChoosePickup){
					$scope.PickupPassengerId = data.PickupPassengerId;
				}
				else{
					$scope.PickupPassengerId = '';
				}
				if($scope.globalVariable.isChooseDropoff){
					$scope.DropOffPassengerId = data.DropOffPassengerId;
				}
				else{
					$scope.DropOffPassengerId = '';
				}

				$scope.seatSelect = [];
				angular.forEach(data.VehicleSeatList, function(seatSelect,index)
			{
				$scope.seatSelect.push(seatSelect);
				if(index == data.VehicleSeatList.length-1){
					$scope.ReferenceCode = seatSelect.ReferenceCode;
					$scope.VehicleOperSeatId = seatSelect.VehicleOperationSeatId;
					$scope.printTicket($scope.seatSelect, $scope.VehicleOperationSeats, "BuyNow");

				}
			});

            	// $scope.DropOffPassengerId = data.DropOffPassengerId;
            	// $scope.PickupPassengerId = data.PickupPassengerId;
				
            ///	console.log('SellerBoxBooking'+data.DropOffPassengerId);
            ///	console.log('SellerBoxBooking'+data.PickupPassengerId);
            ////	console.log('SellerBoxBooking'+data.VehicleOperationSeatId);
            	///$scope.printTicket($scope.seatSelect, $scope.VehicleOperationSeats, "BuyNow");	
            }
		});
	}
	/*
		Calculate Price
	*/
	$scope.calculatePrice = function()
	{   
		//Calculate Price in route
		var startPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId },'StopPointId');
		var stopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId },'StopPointId');
		console.log($scope.seatSelect);
		angular.forEach($scope.seatSelect, function(seat){
			angular.forEach($scope.RoutePriceList.RouteAgencyPrice, function(routePrice)
			{
				console
				if(($scope.RouteProviceList[startPoint].StopPointId == routePrice.StopPointStart) && ($scope.RouteProviceList[stopPoint].StopPointId == routePrice.StopPointEnd))
				{
					angular.forEach(routePrice.RouteAgencyPriceList, function(price)
					{
						if((price.VehicleStandardId == seat.VehicleStandardId) && (price.VehicleTypeId == $scope.VehicleSeatPlan.VehicleTypeId))
						{
							seat.TicketPrice = price.RouteTotalPrice;
							if($scope.agencyPriceDetail.IsPriceAdminPercent)
							{
								console.log('test1');
								seat.TicketPrice = seat.TicketPrice + (seat.TicketPrice * $scope.agencyPriceDetail.PriceAdminSet/100);
							}
							else
							{
								console.log('test2')
								seat.TicketPrice = seat.TicketPrice + $scope.agencyPriceDetail.PriceAdminSet;
							}
						}
					});
				}
			});
		});
	}

	$scope.calculatePriceDetail = function()
	{
		var ticketPriceDetail = [];
		angular.forEach($scope.VehicleStandardList, function(eachStandard){

			var tempStandard = {};
			var startPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId },'StopPointId');
			var stopPoint = $filter('lswIndexOf')($scope.RouteProviceList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId },'StopPointId');
			var feeDetail = $scope.TicketPaymentTypeList[$filter('lswIndexOf')($scope.TicketPaymentTypeList, { TicketPaymentKey: $scope.globalVariable.currentPaymentKey },'TicketPaymentKey')];

			//Init Data
			tempStandard = {
				VehicleStandardName : eachStandard.VehicleStandardName,
				currentPrice : 0,
				finalPrice : 0,
				sellTicketPrice : 0
			}

			angular.forEach($scope.RoutePriceList.RouteAgencyPrice, function(routePrice)
			{
				if(($scope.RouteProviceList[startPoint].StopPointId == routePrice.StopPointStart) && ($scope.RouteProviceList[stopPoint].StopPointId == routePrice.StopPointEnd))
				{
					angular.forEach(routePrice.RouteAgencyPriceList, function(price)
					{
						if((price.VehicleStandardId == eachStandard.VehicleStandardId) && (price.VehicleTypeId == $scope.VehicleSeatPlan.VehicleTypeId))
						{
							tempStandard.currentPrice = price.RouteTotalPrice;
							if($scope.agencyPriceDetail.IsPriceAdminPercent)
							{
								tempStandard.currentPrice = tempStandard.currentPrice + (tempStandard.currentPrice * $scope.agencyPriceDetail.PriceAdminSet/100);
								///console.log(tempStandard.currentPrice);
							}
							else
							{
								tempStandard.currentPrice = tempStandard.currentPrice + $scope.agencyPriceDetail.PriceAdminSet;
								///console.log(tempStandard.currentPrice);
							}
						}
					});
				}
			});
			//console.log(feeDetail);
			if(feeDetail.IsPercentage)
			{
				tempStandard.finalPrice = tempStandard.currentPrice + (tempStandard.currentPrice*(feeDetail.TicketPaymentTypeFee/100));
			}
			else
			{
				tempStandard.finalPrice = tempStandard.currentPrice + feeDetail.TicketPaymentTypeFee;
			}
			////tempStandard.finalPrice = tempStandard.currentPrice + feeDetail.TicketPaymentTypeFee;

			if($scope.agencyPriceDetail.IsPriceAgencyPercent)
			{
				tempStandard.sellTicketPrice = tempStandard.currentPrice + (tempStandard.currentPrice * $scope.agencyPriceDetail.PriceAgencySet/100);
			}
			else
			{
				tempStandard.sellTicketPrice = tempStandard.currentPrice + $scope.agencyPriceDetail.PriceAgencySet;
			}

			ticketPriceDetail.push(tempStandard);
		});

		$scope.ticketPriceDetail = ticketPriceDetail;
	}

	$scope.calculateFee = function(Key)
	{
		$scope.globalVariable.currentPaymentKey = Key;
		console.log($scope.TicketPaymentTypeList);
		angular.forEach($scope.TicketPaymentTypeList, function(data){
			console.log(data);
			if(data.TicketPaymentKey == Key)
			{
				$scope.VehicleOperationSeats.TicketPaymentTypeId = data.TicketPaymentTypeId;
				$scope.TicketPaymentKey = data;
				var totalPrice = 0;

				if(data.IsPercentage)
				{
					console.log($scope.seatSelect);
					
					angular.forEach($scope.seatSelect, function(dataPrice){
						totalPrice += dataPrice.TicketPrice * (data.TicketPaymentTypeFee/100);
						console.log(dataPrice.TicketPrice);
					});


					$scope.globalVariable.TicketPaymentTypePrice = totalPrice;
				}
				else
				{
					angular.forEach($scope.seatSelect, function(dataPrice){
						totalPrice +=  data.TicketPaymentTypeFee;
						console.log(dataPrice.TicketPrice);
					});
					console.log(data.TicketPaymentTypeFee);
					$scope.globalVariable.TicketPaymentTypePrice = totalPrice ;
				}
			}
		});

		$scope.VehicleOperationSeats.TicketPaymentFee = $scope.globalVariable.TicketPaymentTypePrice;

	}

	


	// }


	/*
		View Helper Function
	*/
	$scope.showSelectBooking = function(VehicleSeatId)
	{
		var isMatch = false;

		angular.forEach($scope.seatSelect, function(each){
			if(VehicleSeatId == each.VehicleSeatId)
			{
				isMatch = true;
			}
		});

		return isMatch;
	}

	/*
		Helper Function
	*/
	$scope.sliceStopPoint = function(start, end, stopPointList)
	{
		if(!!stopPointList && stopPointList.length > 0)
		{
			return stopPointList.slice(start,end);  
		}
		else
		{
			return [];
		}
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

	$scope.checkTypeShow = function(VehicleSeatTypeId)
	{
		var isShow = true;
		if(VehicleSeatTypeId != 3)
		{
			isShow = false;
		}

		return isShow;
	}

	$scope.calculateLastPrice = function()
	{
		var totalPrice = 0;

		angular.forEach($scope.seatSelect, function(eachPrice){
			totalPrice += eachPrice.TicketPrice;
		});
	
			totalPrice = totalPrice + $scope.globalVariable.TicketPaymentTypePrice;

	
		if(totalPrice < 0)
		{
			totalPrice = 0;
		}

		return totalPrice;
	}
	
	var setRouteProviceList = function(RouteProviceList)
	{
		var temp = [];
		var time = new Date(parseInt($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate.replace('/Date(', '')));
		angular.forEach(RouteProviceList, function(data){
			angular.forEach(data.StopPointList, function(stoppoint){
				if(stoppoint.Duration == null)
				{
					stoppoint.Duration = 0;
				}
				stoppoint.Time = time = new Date(time.getTime() + (stoppoint.Duration * 60 * 1000));


				//Add StopPointName
				stoppoint.StopPointName_TH = $scope.stopPointData.StopPointList[$filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: stoppoint.StopPointId },'StopPointId')].StopPointName_TH;

				temp.push(stoppoint);
			});
		});
		return temp;
	}

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

	/*
		Table
	*/
	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.showAll = false;
	$scope.lswFilterOptions = {
            list: $scope.SellingTicketList,
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

	/*
		Watch
    */
    var w = angular.element($window);
    w.bind('resize', function (value) {
        $rootScope.checkHeightSellingTicket($scope.isShowFilter);
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
}]);