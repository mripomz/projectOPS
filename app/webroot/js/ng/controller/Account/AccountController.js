module.controller('BookingCtrl',[
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
		Locations) {

	$scope.isShowFilter = true;
	$scope.VehicleRoute = [];
	$scope.VehicleSeatPlanList = [];
	$scope.DiscountTypeList = [];
	$scope.SellingTicketList = [];

	$scope.globalVariable = 
	{
		UserId : 0,
		isSelectVehicleTrip : false,
		IsFloorManageActive : 0,
		currentVehicleOpreDetail : null,
		currentRouteDetail : null,
		currentDiscount : 0,
		currentPaymentKey : "",
		PassengerSelect : {},
		MoneyRecived : 0,
		currentSeatSelect : {},
		currentEditSeatSelect : {},
		isShowState : 0,
		selectSeatExchange : {},
		confirmExchange : false,
		IsSellingTicketActive : 0,
		DiscountCode : "",
		TicketPaymentTypePrice : 0,
		resonForRePrint : "",
		fontThaiSize : '28px',
		fontThaiLineHeight : '21px',
		fontEngSize : '28px',
		fontEngLineHeight : '21px',
		fontTerminalName : '26px',
		fontTerminalNameLineHeight : '37px',
	};

	$scope.searchFilter = 
	{
		dateStart : new Date(),
		VehicleSeatPlanId : "",
		timeStart : "00:00",
		timeEnd : "23:59",
		RouteId : ""
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
		DiscountTypeId : null,
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
	$scope.locationList = [];
	$scope.ReferenceCode = '';
	
	var timeoutForRouteTrip = null;

	$scope.initData = function(UserId)
	{
		$scope.globalVariable.UserId = UserId;

		Routes.GetRouteCompletedList(true, function(vehicleRouteList)
		{
			$scope.VehicleRoute = vehicleRouteList.RouteList;

			SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(seatPlan)
			{
				$scope.VehicleSeatPlanList = seatPlan.SeatPlanList;

				Routes.GetStopPointList(function(stopPointList)
				{
					$scope.stopPointData = stopPointList;

					Discount.GetDiscountList(true,function(discountList)
					{
						$scope.DiscountTypeList = discountList.DiscountList;

						Discount.GetGradeList(function(gradeList)
						{
							$scope.GradeList = gradeList.GradeList;

							SeatCapacityArrangement.GetVehicleStandardList(function(vehicleStandardList)
							{
								$scope.VehicleStandardList = vehicleStandardList.StandardList;

								Tickets.GetTicketPaymentTypeListByNormal(function(ticketPaymentType)
								{
									$scope.TicketPaymentTypeList = ticketPaymentType.TicketPlaymentList;
									$scope.calculateFee("Money");
									Assets.GetVehicleTypeList(function(vehicleTypeList)
									{
										$scope.VehicleTypeList = vehicleTypeList.VehicleTypeList;

										Locations.GetAllProvinces(function(provicesList)
										{
											$scope.ProvicesList = provicesList;

											Users.GetAllRoles(function(roleData)
											{
												$scope.rolesList = roleData.RoleList;

												angular.forEach($scope.rolesList, function(eachRole){
													if(eachRole.RoleName == "Sales")
													{
														$scope.currentRoleId = eachRole.RoleId;
														Users.SearchUserInfo("UserId", "", "UserId", "ASC", null, false, $scope.currentRoleId, 1000, 1, function(dataUser){
															//Using for report in tab 4
															$scope.userList = dataUser.SearchResults;
														});
													}
												});

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
		});

		Locations.GetLocationList(true, $scope.timezoneOffset, function(data){
			$scope.locationList = data.LocationList;
		});
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

		if($scope.currentSearchFilter.dateStart == '' || $scope.currentSearchFilter.dateStart == null || $scope.searchFilter.dateStart == null || $scope.searchFilter.dateStart == '')
		{
			$scope.currentSearchFilter.dateStart = new Date();
			$scope.searchFilter.dateStart = new Date();
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

	$scope.searchDiscountCode = function()
	{
		var indexDiscount = $filter('lswIndexOf')($scope.DiscountTypeList, { DiscountTypeCode: $scope.globalVariable.DiscountCode },'DiscountTypeCode');
		if(indexDiscount != -1)
		{
			var discountDetail = $scope.DiscountTypeList[indexDiscount];
			$scope.VehicleOperationSeats.DiscountTypeId = discountDetail.DiscountTypeId;
			$scope.calculateDiscountPrice();	
		}
		else
		{
			Modals.setAlert(Helpers.showErrorMessage({ERROR_MESSAGE:"โค้ท/รหัสที่ ไม่มีในระบบ หรือ อาจถูกลบไปแล้ว"}));
            Modals.showAlertFail();
		}
		$scope.globalVariable.DiscountCode = "";
	}

	$scope.changedisShowFilter = function()
	{
		$scope.isShowFilter = !$scope.isShowFilter;
		$rootScope.checkHeightSellingTicket($scope.isShowFilter);
	}

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
		$scope.globalVariable.currentDiscount = 0;
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
			DiscountTypeId : null,
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
							$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList, $scope.seatSelect);
							$scope.globalVariable.IsFloorManageActive = 0;

							Routes.GetRoutePriceByRouteId(VehicleSeatPlanDetail.RouteId, function(routePrice)
							{
								$scope.RoutePriceList = setRoutePrice(routePrice);

								Tickets.GetSellingTicketList($scope.VehicleOperationSeats.VehicleOperationId, function(dataSellingTicket)
								{
									$scope.SellingTicketList = dataSellingTicket.VehicleOperationSeatList;
									$scope.loadDataForTab3(VehicleSeatPlanDetail.VehicleOperationId);
								});
							});
						});
					});
				});
			}
		});

		$scope.calculateFee("Money");
	}


	$scope.loadSellingTicketList = function()
	{
		Tickets.GetSellingTicketList($scope.VehicleOperationSeats.VehicleOperationId, function(dataSellingTicket)
		{
			$scope.SellingTicketList = dataSellingTicket.VehicleOperationSeatList;
		});
	}
	/*
		RealTime Update
	*/
	$scope.reloadRealTimeRouteTrip = function()
	{
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
	/*
		End RealTime Update
	*/

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

		if(nextStopPoint <= indexStopPoint && (nextStopPoint >= 0))
		{
			$scope.VehicleOperationSeats.StopPointEndId = $scope.RouteProviceList[indexStopPoint+1].StopPointId;
		}
		else
		{
			$scope.VehicleOperationSeats.StopPointEndId = $scope.RouteProviceList[$scope.RouteProviceList.length-1].StopPointId;
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
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,$scope.VehicleStandardList, $scope.seatSelect);
				$scope.calculatePrice();
				$scope.calculateFee($scope.globalVariable.currentPaymentKey);
			});
		}

		Routes.GetStopPointByStopPointId($scope.globalVariable.currentVehicleOpreDetail.RouteId, $scope.VehicleOperationSeats.StopPointStartId, $scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(stopPointTerminal){
			if(stopPointTerminal.VehicleOperationStopPointList.length > 0)
			{
				$scope.TerminalName = stopPointTerminal.VehicleOperationStopPointList[0].VehicleOperationStopPointName;
				var fontLength = $scope.TerminalName.length;

				if(fontLength < 6)
				{
					$scope.globalVariable.fontTerminalName = '26px';
					$scope.globalVariable.fontTerminalNameLineHeight = '37px';
				}
				else if(fontLength < 13)
				{
					$scope.globalVariable.fontTerminalName = '22px';
					$scope.globalVariable.fontTerminalNameLineHeight = '16px';
				}
				else if(fontLength < 15)
				{
					$scope.globalVariable.fontTerminalName = '18px';
					$scope.globalVariable.fontTerminalNameLineHeight = '17px';
				}
				else if(fontLength < 22)
				{
					$scope.globalVariable.fontTerminalName = '16px';
					$scope.globalVariable.fontTerminalNameLineHeight = '18px';
				}
				else if(fontLength < 28)
				{
					$scope.globalVariable.fontTerminalName = '14px';
					$scope.globalVariable.fontTerminalNameLineHeight = '12px';
				}
			}
		});

		$scope.calculateFonts();
		///console.log('makkyloveschool');
		///console..log($scope.globalVariable.currentPaymentKey);
		

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

		if(indexStopPoint == $scope.RouteProviceList.length-1)
		{
			indexStopPoint = indexStopPoint-1;
		}

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

		if(nextStopPoint < indexStopPoint)
		{
			$scope.VehicleOperationSeats.StopPointEndId = $scope.RouteProviceList[indexStopPoint+1].StopPointId;
		}
		else
		{
			$scope.VehicleOperationSeats.StopPointStartId = $scope.RouteProviceList[indexStopPoint].StopPointId;
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
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList, $scope.VehicleStandardList, $scope.seatSelect);
				$scope.calculatePrice();
				$scope.calculateFee($scope.globalVariable.currentPaymentKey);
			});
		}
		
		$scope.calculateFonts();
	}

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
		//$scope.globalVariable.currentSeatSelect.TicketPrice



		$scope.calculatePrice();
		selectSeatModal.$promise.then(selectSeatModal.show);
	}

	$scope.selectBooking = function(Gender)
	{
		var seatSelect = [];
		var VehicleOperationSeats = {};
		var isNotExist = true;

		$scope.globalVariable.currentSeatSelect.Gender = Gender;

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

		//Calculate Price
		$scope.calculatePrice();

		//Calculate Fee
		$scope.calculateFee($scope.globalVariable.currentPaymentKey);
	}

	var editSeatModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/edit-seat-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.editSeatSelect = function(seatPassenger, seat)
	{
		$scope.globalVariable.currentEditSeatSelect = seatPassenger;
		$scope.globalVariable.currentSeatSelect = seat;
		editSeatModal.$promise.then(editSeatModal.show);
	}

	var showMapDirectionModalPickup = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Location/show-maps-direction-modal-pickup.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	var showMapDirectionModalDropoff = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Location/show-maps-direction-modal-dropoff.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.map = {};
	$scope.showMapsDirectionPickup = function(detail)
	{
		console.log(detail);

		if(detail.PickupPassengerId !=null|| detail.PickupPassengerId != '')
		{
			$scope.map = {
				center : {},
				zoom : 14
			};
			var indexLocation = $filter('lswIndexOf')($scope.locationList, { LocationId: detail.PickupLocationId },'LocationId');

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

			showMapDirectionModalPickup.$promise.then(showMapDirectionModalPickup.show);
		}
		
	}
	$scope.showMapsDirectionDropoff = function(detail)
	{
	

		
		if(detail.DropOffPassengerId !=null|| detail.DropOffPassengerId != '')
		{
			$scope.map = {
				center : {},
				zoom : 14
			};
			var indexLocation = $filter('lswIndexOf')($scope.locationList, { LocationId: detail.DropOffLocationId },'LocationId');

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

			showMapDirectionModalDropoff.$promise.then(showMapDirectionModalDropoff.show);

		}
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
			var temp = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList, $scope.VehicleStandardList, $scope.seatSelect);

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
		Tickets.SeatExchange(VehicleOperationSeatId, currentSeatId, targetSeatId, function(data){
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
						$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = routeTrip.DiscountAllowNumberUsage;
						$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
						$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
						$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
					}
				);
            }
		});
	}

	$scope.seatDisclaim = function(VehicleOperationSeatId, VehicleSeatId)
	{
		Tickets.SeatDisclaim(VehicleOperationSeatId, VehicleSeatId, function(data){
			if(data.ServiceStatus == "SEATDISCLAIM_FAIL")
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
							$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = vehicleRouteTrip.DiscountAllowNumberUsage;
							$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
							$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
							$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						});
					}
				);
            }
		});
	}

	$scope.seatPay = function(VehicleOperationSeatId, VehicleSeatId)
	{
		Tickets.SeatPay(VehicleOperationSeatId, VehicleSeatId, function(data){
			if(data.ServiceStatus == "SEATPAY_FAIL")
  			{
  				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
  				Modals.showAlertFail();
  			}
  			else
  			{
  				Modals.showAlertSuccess();
  			$scope.printTicket($scope.globalVariable.currentEditSeatSelect, null, "Buy");
  			/////////$scope.printDiv('ticketPrint');
            }
		});
	}


	$scope.returnTicket = function(VehicleOperationSeatId, VehicleSeatId)
	{
		Tickets.ReturnTicketByNormal(VehicleOperationSeatId, VehicleSeatId, function(data){
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
							$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = vehicleRouteTrip.DiscountAllowNumberUsage;
							$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
							$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
							$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						});
					}
				);
            }
		});
	}

	$scope.changedNotesForBookingSeat = function(currentSeatSelect)
	{
		Tickets.ChangedNotesForBookingSeat(currentSeatSelect, function(data){
			if(data.ServiceStatus == "CHANGEDNOTESFORBOOKINGSEAT_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	editSeatModal.$promise.then(editSeatModal.hide);
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
							$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = vehicleRouteTrip.DiscountAllowNumberUsage;
							$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
							$scope.dateSearchValue = new Date($scope.currentSearchFilter.dateStart);
							$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						});
					}
				);
            }
		});
	}

	/*
		Report	
	*/
	$scope.SummaryReport = {
		SalesSummaryReportList : []
	};
	$scope.SummaryCommission = [];
	$scope.dateTimeNow = new Date();
	$scope.VehicleDetail = {};
	$scope.vehicleInsuranceDetail = {};
	$scope.loadSummaryReport = function()
	{
		$scope.VehicleDetail = {};
		$scope.globalVariable.currentStopPointReportChoose = "";
		$scope.globalVariable.currentUserIdReportChoose = "";
		$scope.globalVariable.printDivDetail = "printSummaryReportAll";
		$scope.globalVariable.reportSummaryShowType = "ReportBookingSimple";
		$scope.globalVariable.currentStopPointDeparturedReportChoose = $scope.RouteProviceList[0].StopPointId;
		$scope.globalVariable.startStopPointDeparturedReport = $scope.RouteProviceList[0].StopPointId;

		Reports.ReportForSeatPlan(
			$scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanId,
			$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId,
			null,
			0,
			$scope.timezoneOffset,
			function(data)
			{
				Routes.GetVehicleRouteTripById($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, $scope.timezoneOffset, function(dataRoute)
				{
					$scope.vehicleRouteTripDetail = dataRoute;
					////console.log($scope.vehicleRouteTripDetail);

					$scope.SummaryReport = data;
					$scope.totalPriceAgency = 0;
					$scope.totalPriceSale = 0;
					angular.forEach(data.SeatFloorList, function(floors, key){
                  		angular.forEach(floors.VehicleSeatList, function(VehicleSeatList, key){
                  			angular.forEach(VehicleSeatList.vehicleOperationSeatList, function(value, key){
                  				if(value.IsAgencyBooking)
                  				{
                  					$scope.totalPriceAgency = $scope.totalPriceAgency +(value.TicketPrice - value.DiscountPrice);

                  				}
                  				else
                  				{
                  					$scope.totalPriceSale = $scope.totalPriceSale +(value.TicketPrice - value.DiscountPrice);

                  				}
                  				
                  			
                		});
                	});
                });
					
					$scope.SummarySeatFloorBooking = Helpers.prepareDataForVehicleSeat(data.SeatFloorList, $scope.VehicleStandardList, $scope.seatSelect);
					console.log($scope.SummarySeatFloorBooking );
					$scope.ReportForDeparturedEachStopPoint();
					$scope.changedShowingReportType();

					var time = new Date(parseInt($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate.replace('/Date(', '')));
					Reports.ReportForSummaryStaticVehicleTransport($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, $scope.globalVariable.currentVehicleOpreDetail.RouteId, function(Passenger){
						$scope.StaticVehicleTransport = Passenger.SummaryCustomerList;
						var totalSeat = 0;
						var isFirst = true;
						angular.forEach($scope.StaticVehicleTransport, function(detail){
							detail.WithVehicle = totalSeat;

							//Calculate
							totalSeat = totalSeat + detail.GetIn - detail.GetOut;
							detail.Total = totalSeat;

							//Calculate Time
							detail.Time = time = new Date(time.getTime() + (detail.Duration * 60 * 1000));
						});

						if($scope.vehicleRouteTripDetail.VehicleId != null && $scope.vehicleRouteTripDetail.VehicleId != '')
						{
							Assets.GetVehicleById($scope.vehicleRouteTripDetail.VehicleId, function(dataVehicle){
								$scope.VehicleDetail = dataVehicle;

								//Get Insurance Detail of Vehicle
								Assets.GetVehicleInsuranceActiveByVehicleId($scope.vehicleRouteTripDetail.VehicleId, function(insuranceDetail){
									$scope.vehicleInsuranceDetail = insuranceDetail;
								});
							});	
						}
					});
				});

				Reports.ReportForSummaryCommission($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(commissionList){
					$scope.SummaryCommission = commissionList.CommissionPerSalesList;
				});
			}
		);
	}

	$scope.searchSummaryReport = function()
	{
		Reports.ReportForSeatPlan(
			$scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanId,
			$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId,
			$scope.globalVariable.currentStopPointReportChoose,
			$scope.globalVariable.currentUserIdReportChoose,
			$scope.timezoneOffset,
			function(data){
				
				$scope.SummaryReport = data;
				// $scope.totalPriceAgency = 0;
				// $scope.totalPriceSale = 0;
				// angular.forEach(data.SeatFloorList, function(floors, key){
    //               	angular.forEach(floors.VehicleSeatList, function(VehicleSeatList, key){
    //               		angular.forEach(VehicleSeatList.vehicleOperationSeatList, function(value, key){
    //               				if(value.IsAgencyBooking)
    //               				{
    //               					$scope.totalPriceAgency = value.TicketPrice - value.DiscountPrice;

    //               				}
    //               				else
    //               				{


    //               				}
                  				
                  			
    //             		});
    //             	});
    //             });


				////console.log($scope.SummaryReport);
				$scope.SummarySeatFloorBooking = Helpers.prepareDataForVehicleSeat(data.SeatFloorList, $scope.VehicleStandardList, $scope.seatSelect);
		});
	}

	$scope.DeparturedEachStopPoint = {};
	$scope.ReportForDeparturedEachStopPoint = function()
	{
		Reports.ReportForDeparturedEachStopPoint(
			$scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId,
			$scope.globalVariable.currentStopPointDeparturedReportChoose,
			function(data){
				$scope.DeparturedEachStopPoint = data.DeparturedEachStopPoint;
		});
	}

	/*
		Report each type
			-ReportBookingSimple
			-ReportBookedSimple
			-ReportSold
			-ReportSameDay
			-Passenger
			-Expense
			-Parcel
	*/
	$scope.ReportBookingSimple = [];
	$scope.ReportBookedSimple = [];
	$scope.ReportBookedSimpleShowPhone = [];
	$scope.ReportSoldList = [];
	$scope.ReportSameDayList = [];
	$scope.PassengerList = [];
	$scope.Expenseist = [];
	$scope.ParcelList = [];
	$scope.changedShowingReportType = function()
	{
		switch($scope.globalVariable.reportSummaryShowType)
		{
			case 'ReportBookingSimple':
				Reports.ReportForBookingSimple($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(ReportBookingSimple){
					$scope.ReportBookingSimple = ReportBookingSimple.VehicleOperationSeatList;
				});
				break;
			case 'ReportBookedSimple':
				Reports.ReportForBookedSimple($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(ReportBookedSimple){
					$scope.ReportBookingSimple = ReportBookedSimple.VehicleOperationSeatList;
				});
				break;
			case 'ReportBookedSimpleShowPhone':
				Reports.ReportForBookingSimpleShowPhone($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(ReportBookedSimpleShowPhone){
					$scope.ReportBookedSimpleShowPhone = ReportBookedSimpleShowPhone.VehicleOperationSeatList;
				});
				break;
			case 'ReportSold':
				Reports.ReportForSummaryOtherDay($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(ReportSold){
					$scope.ReportSoldList = ReportSold.VehicleOperationSeatList;
				});
				break;
			case 'ReportSameDay':
				Reports.ReportForSummarySameDay($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(ReportSameDay){
					$scope.ReportSameDayList = ReportSameDay.VehicleOperationSeatList;
				});
				break;
			case 'Passenger':
				Reports.ReportForSummaryCustomer($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, $scope.globalVariable.currentVehicleOpreDetail.RouteId, function(Passenger){
					$scope.PassengerList = Passenger.SummaryCustomerList;
				});
				break;
			case 'Expense':
				Reports.ReportForSummaryCost($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(Expense){
					$scope.Expenseist = Expense.VehicleOperationCostList;
				});
				break;
			case 'Parcel':
				Reports.ReportForSummaryFreight($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId, function(Parcel){
					$scope.ParcelList = Parcel.VehicleOperationFreightList;
				});
				break;
		}
	}

	/*Print Section*/
	$scope.printDiv = function(divName) {
		////console.log(divName);
		$scope.dateTimeNow = new Date();
		var printContents = document.getElementById($scope.globalVariable.printDivDetail).innerHTML;
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><link rel="stylesheet" type="text/css" href="/avia-website/css/app.css"/></head><body onload="setTimeout(function(){window.print();window.close();}, 2000)">' + printContents + '</body></html>');
		popupWin.document.close();
	}

	$scope.rePrintTicket = function(resonForRePrint, ticketList, VehicleOperationSeatDetail, TypePrint)
	{
		Tickets.SaveVehicleOperationPrintTicketLog({
			VehicleOperationSeatId : ticketList.VehicleOperationSeatId,
			UserId : $scope.globalVariable.UserId,
			ReasonForRePrintTicket : resonForRePrint
		},function(data){
			if(data.ServiceStatus == "SELLERBOXBOOKINGTICKET_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {

            	$scope.ReferenceCode = data.ReferenceCode;
            	$scope.printTicket(ticketList, VehicleOperationSeatDetail, TypePrint);ticketPrint
            	///$scope.printDiv('ticketPrint');
				$scope.globalVariable.isShowState = 0
				$scope.globalVariable.resonForRePrint = "";
            }
			
		});
	}

 

	$scope.printTicket = function(ticketList, VehicleOperationSeatDetail, TypePrint)
	{
		var popupWin = $window.open('', '_blank');
		var printContents = document.getElementById("ticketPrint").innerHTML;
		var javascriptOption = '';
		var discountDetail = null;

		///console.log(ticketList);
	///	console.log('makky');
		

		if(TypePrint == "BuyNow")
		{
			if(VehicleOperationSeatDetail.DiscountTypeId != "" && VehicleOperationSeatDetail.DiscountTypeId != null)
			{
				discountDetail = $scope.DiscountTypeList[$filter('lswIndexOf')($scope.DiscountTypeList, { DiscountTypeId: VehicleOperationSeatDetail.DiscountTypeId },'DiscountTypeId')];
			}


			angular.forEach(ticketList, function(eachTicket){
				var totalDiscountPrice = 0;
				if(discountDetail != null)
				{
					if(discountDetail.IsPercentage)
					{
						totalDiscountPrice = eachTicket.TicketPrice * (discountDetail.DiscountTypePrice/100);
					}
					else
					{
						totalDiscountPrice = discountDetail.DiscountTypePrice;
					}
				}
				///$scope.ReferenceCode
				///
				javascriptOption += 'document.getElementById("totalPrice_center").innerHTML = \'' + (eachTicket.TicketPrice - totalDiscountPrice) + '\';';
				javascriptOption += 'document.getElementById("seat_no").innerHTML = \'' + eachTicket.VehicleSeatName + '\';';
				if($scope.PassengerDetail.PassengerLastName == null || $scope.PassengerDetail.PassengerLastName =='')
				{
					javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName )+ '\';';
				}
				else{
					javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerLastName) + '\';';
				}

				javascriptOption += 'document.getElementById("qrcode").innerHTML = \'' + '' + '\';';
				javascriptOption += ' var qrcode = new QRCode(document.getElementById("qrcode"), { ';
				javascriptOption += ' text: \"'+ eachTicket.ReferenceCode  +'\",';
				javascriptOption += ' width: 80,';
				javascriptOption += ' height: 80,';
				javascriptOption += ' colorDark : "#000000",';
				javascriptOption += ' colorLight : "#ffffff",';
				javascriptOption += ' correctLevel : QRCode.CorrectLevel.H ';
				javascriptOption += ' });';
				javascriptOption += 'window.print();';
			});
		}
		else
		{
			$scope.PassengerDetail = ticketList.Passenger;
			if(ticketList.DiscountTypeId != "" && ticketList.DiscountTypeId != null)
			{
				discountDetail = $scope.DiscountTypeList[$filter('lswIndexOf')($scope.DiscountTypeList, { DiscountTypeId: ticketList.DiscountTypeId },'DiscountTypeId')];
			}

			var totalDiscountPrice = 0;
			if(discountDetail != null)
			{
				if(discountDetail.IsPercentage)
				{
					totalDiscountPrice = ticketList.TicketPrice * (discountDetail.DiscountTypePrice/100);
				}
				else
				{
					totalDiscountPrice = discountDetail.DiscountTypePrice;
				}
			}

			javascriptOption += 'document.getElementById("totalPrice_center").innerHTML = \'' + (ticketList.TicketPrice - totalDiscountPrice) + '\';';
			javascriptOption += 'document.getElementById("seat_no").innerHTML = \'' + ($scope.globalVariable.currentSeatSelect.VehicleSeatName) + '\';';
			///javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerLastName) + '\';';
			if($scope.PassengerDetail.PassengerLastName == null || $scope.PassengerDetail.PassengerLastName =='')
				{
					javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName )+ '\';';
				}
				else{
					javascriptOption += 'document.getElementById("passenger_center").innerHTML = \'' + ($scope.PassengerDetail.PassengerFirstName + ' ' + $scope.PassengerDetail.PassengerLastName) + '\';';
				}
			javascriptOption += 'document.getElementById("qrcode").innerHTML = \'' + '' + '\';';
			javascriptOption += ' var qrcode = new QRCode(document.getElementById("qrcode"), { ';
			javascriptOption += ' text: \"'+ $scope.ReferenceCode  +'\",';
			javascriptOption += ' width: 80,';
			javascriptOption += ' height: 80,';
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
// <script >
// var qrcode = new QRCode(document.getElementById("qrcode"), {
// 	text: "http://jindo.dev.naver.com/collie",
// 	width: 128,
// 	height: 128,
// 	colorDark : "#000000",
// 	colorLight : "#ffffff",
// 	correctLevel : QRCode.CorrectLevel.H
// });
// </script>

			// var javascriptQrCode = '<script >';
			// javascriptQrCode += ' var qrcode = new QRCode(document.getElementById("qrcode"), { ';
			// javascriptQrCode += ' text: "http://jindo.dev.naver.com/collie",';
			// javascriptQrCode += ' width: 400,';
			// javascriptQrCode += ' height: 400,';
			// javascriptQrCode += ' colorDark : "#000000",';
			// javascriptQrCode += ' colorLight : "#ffffff",';
			// javascriptQrCode += ' correctLevel : QRCode.CorrectLevel.H';
			// javascriptQrCode += ' });';
			// javascriptQrCode += ' </script>';
			popupWin.document.open();
			popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><script src="../js/ng/lib/qrcodejs/qrcode.js"></script><script> function doPrint(){'+ javascriptOption +'}</script></head><body onload="doPrint()">' + printContents + '</body></html>');
			popupWin.document.close();

		}
		catch(err) 
		{
			Modals.setModal("การบล็อกป๊อปอัพ" , "โปรดปลดบล๊อกการเปิดป็อปอัพในเว็บบราว์เซอร์ เพื่อทำการพิมพ์ตั๋วที่นั่ง");
			Modals.showError();
		}
		

		if(TypePrint != "RePrint")
		{
			$scope.globalVariable.resonForRePrint = "";
			//Load Route Trip
			Routes.GetVehicleRouteTripSellTicket(
				$scope.searchFilter.dateStart, 
				$scope.searchFilter.dateStart, 
				$scope.searchFilter.VehicleSeatPlanId, 
				$scope.searchFilter.timeStart, 
				$scope.searchFilter.timeEnd, 
				$scope.searchFilter.RouteId, 
				$scope.timezoneOffset,
				false,
				function(routeTrip){
					Routes.GetVehicleRouteTripById($scope.VehicleOperationSeats.VehicleOperationId, $scope.timezoneOffset, function(vehicleRouteTrip)
					{
						$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = vehicleRouteTrip.DiscountAllowNumberUsage;
						$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
						$scope.dateSearchValue = new Date($scope.searchFilter.dateStart);
						$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
						$scope.seatSelect = [];
					});
				}
			);
		}
	}

	/*
		Display
	*/
	$scope.showGender = function(GenderTypeId)
	{
		var textReturn = "";
		/*
			'avia avia-male':(seat.Gender == 0),
			'avia avia-female':(seat.Gender == 1),
			'avia avia-boy':(seat.Gender == 2),
			'avia avia-girl':(seat.Gender == 3),
			'avia avia-monk':(seat.Gender == 4),
			'avia avia-soldier':(seat.Gender == 5),
		*/
		switch(GenderTypeId)
		{
			case 0:
				textReturn = "ผู้ชาย";
				break;
			case 1:
				textReturn = "ผู้หญิง";
				break;
			case 2:
				textReturn = "เด็กชาย";
				break;
			case 3:
				textReturn = "เด็กหญิง";
				break;
			case 4:
				textReturn = "พระ";
				break;
			case 5:
				textReturn = "ทหาร";
				break;
		}

		return "[" + textReturn + "]";
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

	$scope.currentDetailTicket = {};
	var TicketDetailModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/ticket-detail-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.showTicketDetail = function(detail)
	{
		$scope.currentDetailTicket = detail;
		TicketDetailModal.$promise.then(TicketDetailModal.show);
	}

	$scope.showDataTooltip = function(detail)
	{
		var html = "";
		var firstStopPointIndex = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: detail.StopPointStartId },'StopPointId');
		var endStopPointIndex = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: detail.StopPointEndId },'StopPointId');
	
		html = "<table border='1' style='background-color:#3a444e;border-color:#fff' cellpadding='10'>";

		//Detail
		html += "<tr><td align='right' style='padding:3px'>เดินทาง: </td><td align='left' style='padding:3px'><strong>" + $scope.stopPointData.StopPointList[firstStopPointIndex].StopPointName_TH + ' -> ' + $scope.stopPointData.StopPointList[endStopPointIndex].StopPointName_TH + "</strong></td></tr>";
		html += "<tr><td align='right' style='padding:3px'>ชื่อ: </td><td align='left' style='padding:3px'>"+ detail.Passenger.PassengerFirstName + ' ' + detail.Passenger.PassengerLastName +"</td></tr>";
		html += "<tr><td align='right' style='padding:3px'>เบอร์โทร: </td><td align='left' style='padding:3px'>"+ detail.Passenger.PassengerPhone +"</td></tr>";
		html += "<tr><td align='right' style='padding:3px'>หมายเหตุ: </td><td align='left' style='padding:3px'>"+ (detail.Notes || '-') +"</td></tr>";
		html += "<tr><td align='right' style='padding:3px'>ขายโดย: </td><td align='left' style='padding:3px'>"+ detail.CreatedBy +"</td></tr>";
		
		html += "</table>";

		return html;
	}

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
		Save Ticket
	*/
	var confirmSellingBoxModel = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/confirm-selling-box-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.confirmSellBoxTicket = function()
	{
		confirmSellingBoxModel.$promise.then(confirmSellingBoxModel.show);
	}

	$scope.saveSellingBoxVehicleTrip = function()
	{

		if($scope.PassengerDetail.PassengerFirstName == null || $scope.PassengerDetail.PassengerFirstName == '')
		{
			$scope.PassengerDetail.PassengerFirstName = generateCustomerName();
			$scope.PassengerDetail.PassengerLastName = "-";	
		}
		
		$scope.Isbooked = false;
		angular.forEach($scope.seatSelect, function(seatSelect, key) {

	 		Tickets.IsBooked($scope.VehicleOperationSeats.VehicleOperationId,seatSelect.VehicleSeatFloorId,seatSelect.VehicleSeatId, function(data){
					///console.log('test1');
					if(!$scope.Isbooked){
					$scope.Isbooked = data.Isbooked;
					}  
					
					if(key==$scope.seatSelect.length-1){
						if($scope.Isbooked){
						Modals.setAlert('Ticket is Booked');
	                	Modals.showAlertFail();
	                	}
	               	else{

	                		Tickets.SellerBoxBookingTicket($scope.seatSelect, $scope.VehicleOperationSeats, $scope.PassengerDetail, $scope.timezoneOffset, function(data){
								$scope.ReferenceCode = data.ReferenceCode;
								if(data.ServiceStatus == "SELLERBOXBOOKINGTICKET_FAIL")
	            					{
	            						///console.log('test2');
	            					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
	                				Modals.showAlertFail();
	            				}
	            				else
	           					{
	            				Modals.showAlertSuccess();
	            				//Get Current Type Print
	            				var TicketPaymentTypeDetail = $scope.TicketPaymentTypeList[$filter('lswIndexOf')($scope.TicketPaymentTypeList, { TicketPaymentTypeId: $scope.VehicleOperationSeats.TicketPaymentTypeId }, 'TicketPaymentTypeId')];
	            				if(TicketPaymentTypeDetail.TicketPaymentKey == 'Money' || TicketPaymentTypeDetail.TicketPaymentKey == 'CreditCard')
	            				{

	            					$scope.seatSelect =[];
	            					angular.forEach(data.VehicleSeatList, function(seatSelect,index)
									{
										$scope.ReferenceCode;
										$scope.seatSelect.push(seatSelect);
										if(index == data.VehicleSeatList.length-1){
										///$scope.VehicleOperSeatId = seatSelect.VehicleOperationSeatId;
										$scope.printTicket($scope.seatSelect, $scope.VehicleOperationSeats, "BuyNow");
										////$scope.printDiv('ticketPrint');

										}
									});
	            					////$scope.printTicket($scope.seatSelect, $scope.VehicleOperationSeats, "BuyNow");	
	            				}
	            				else
	            				{
	            				//Load Route Trip
									Routes.GetVehicleRouteTripSellTicket(
									$scope.searchFilter.dateStart, 
									$scope.searchFilter.dateStart, 
									$scope.searchFilter.VehicleSeatPlanId, 
									$scope.searchFilter.timeStart, 
									$scope.searchFilter.timeEnd, 
									$scope.searchFilter.RouteId, 
									$scope.timezoneOffset,
									false,
									function(routeTrip){
									Routes.GetVehicleRouteTripById($scope.VehicleOperationSeats.VehicleOperationId, $scope.timezoneOffset, function(vehicleRouteTrip)
									{
										$scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber = vehicleRouteTrip.DiscountAllowNumberUsage;
										$scope.VehicleOperationList = Helpers.prepareDataListForVehicleRoute(routeTrip.VehicleOperationList, $scope.VehicleStandardList);
										$scope.dateSearchValue = new Date($scope.searchFilter.dateStart);
										$scope.selectVehicleTrip($scope.globalVariable.currentVehicleOpreDetail);
										$scope.seatSelect = [];
									});
									});
	            				}
	            				}
						});
	                }
					}
			});
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
		///console.log($scope.RoutePriceList);
		///console.log($scope.seatSelect);
		angular.forEach($scope.seatSelect, function(seat){
			angular.forEach($scope.RoutePriceList.RoutePrice, function(routePrice)
			{
				if(($scope.RouteProviceList[startPoint].StopPointId == routePrice.StopPointStart) && ($scope.RouteProviceList[stopPoint].StopPointId == routePrice.StopPointEnd))
				{
					angular.forEach(routePrice.RoutePriceList, function(price)
					{


						///console.log($scope.VehicleSeatPlan);
						if((price.VehicleStandardId == seat.VehicleStandardId) && (price.VehicleTypeId == $scope.VehicleSeatPlan.VehicleTypeId))
						{
							///console.log(price,seat);
							seat.TicketPrice = price.RouteTotalPrice;
							///console.log('csczxczxc');
						}
					});
				}
			});
		});

		if(($scope.globalVariable.currentVehicleOpreDetail.DiscountAllowNumber - $scope.seatSelect.length) < 0)
		{
			$scope.VehicleOperationSeats.DiscountTypeId = null;
		}

		$scope.calculateDiscountPrice();
	}

	$scope.calculateDiscountPrice = function()
	{
		var discountDetail = null;
		//Check discount
		if($scope.VehicleOperationSeats.DiscountTypeId != "" && $scope.VehicleOperationSeats.DiscountTypeId != null)
		{
			discountDetail = $scope.DiscountTypeList[$filter('lswIndexOf')($scope.DiscountTypeList, { DiscountTypeId: $scope.VehicleOperationSeats.DiscountTypeId },'DiscountTypeId')];

			if(discountDetail.IsPercentage)
			{
				var totalDiscountPrice = 0;
				angular.forEach($scope.seatSelect, function(dataPrice){
					totalDiscountPrice += (dataPrice.TicketPrice * (discountDetail.DiscountTypePrice/100));
				});

				$scope.globalVariable.currentDiscount = totalDiscountPrice;
			}
			else
			{
				$scope.globalVariable.currentDiscount = $scope.seatSelect.length * discountDetail.DiscountTypePrice;
			}
		}
		else
		{
			$scope.globalVariable.currentDiscount = 0;
		}

		$scope.VehicleOperationSeats.DiscountPrice = $scope.globalVariable.currentDiscount;
	}

	


	$scope.calculateFee = function(Key)
	{
		///console.log(Key);
		$scope.globalVariable.currentPaymentKey = Key;
		angular.forEach($scope.TicketPaymentTypeList, function(data){
			if(data.TicketPaymentKey == Key)
			{
				$scope.VehicleOperationSeats.TicketPaymentTypeId = data.TicketPaymentTypeId;

				if(data.IsPercentage)
				{
					var totalPrice = 0;
					angular.forEach($scope.seatSelect, function(dataPrice,key){
						///console.log(dataPrice);
						totalPrice += dataPrice.TicketPrice * (data.TicketPaymentTypeFee/100);
						if(key == $scope.seatSelect.length -1)
						{
							///console.log(dataPrice.TicketPrice,data.TicketPaymentTypeFee,totalPrice);
							$scope.globalVariable.TicketPaymentTypePrice = totalPrice;
						}
					});

					//totalPrice = totalPrice - $scope.globalVariable.currentDiscount;

					
				}
				else
				{
					$scope.globalVariable.TicketPaymentTypePrice = $scope.seatSelect.length * data.TicketPaymentTypeFee;
				}
			}
		});

		/*
			Ticket Status
			0 : Aviable
			1 : Rental for Booking and 7-11
			2 : Sold
		*/

		if(Key == 'Booking' || Key == '711')
		{
			$scope.VehicleOperationSeats.TicketStatus = 1;
			$scope.VehicleOperationSeats.TicketRentExpiredDate = new Date(parseInt($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate.replace('/Date(', '')));
			$scope.VehicleOperationSeats.TicketRentExpiredDate = new Date($scope.VehicleOperationSeats.TicketRentExpiredDate.getTime() - (60* 60 * 1000));
		}
		else
		{
			$scope.VehicleOperationSeats.TicketStatus = null;
			$scope.VehicleOperationSeats.TicketRentExpiredDate = null;	
		}

		$scope.VehicleOperationSeats.TicketPaymentFee = $scope.globalVariable.TicketPaymentTypePrice;
	}

	/*
		Tab 3rd
	*/
	$scope.vehicleOperationLogList = [];
	$scope.vehicleOperationCostList = [];
	$scope.vehicleOperationFreightList = [];
	$scope.vehicleOperationNoteList = [];
	$scope.loadDataForTab3 = function(VehicleOperationId)
	{
		Tickets.GetVehicleOperationLogsById(VehicleOperationId, $scope.timezoneOffset, function(log)
		{
			$scope.vehicleOperationLogList = log.VehicleOperationLogList;

			Tickets.GetVehicleOperationCostsById(VehicleOperationId, function(costs)
			{
				$scope.vehicleOperationCostList = costs.VehicleOperationCostList;

				Tickets.GetVehicleOperationFreightsById(VehicleOperationId, function(freight)
				{
					$scope.vehicleOperationFreightList = freight.VehicleOperationFreightList;

					Tickets.GetVehicleOperationNotesById(VehicleOperationId, $scope.timezoneOffset, function(notes)
					{
						$scope.vehicleOperationNoteList = notes.VehicleOperationNote;
					});
				});
			});
		});

		$scope.globalVariable.titlePrimary = ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute , { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId }, 'RouteId')].RouteMainNumber) + '-' + ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute, { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId }, 'RouteId')].RouteNumber) + ' ' + ($scope.VehicleRoute[$filter('lswIndexOf')($scope.VehicleRoute, { RouteId: $scope.globalVariable.currentVehicleOpreDetail.RouteId } ,'RouteId')].RouteName_TH) + ' / ' + $filter('date')($scope.dateSearchValue, 'dd MMMM yyyy') + ' ' + $filter('jsonDate')($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationDate,'HH:mm น.') + ' / ' + ($scope.globalVariable.currentVehicleOpreDetail.VehicleSeatPlanName);
	}

	$scope.operationCostDetail = {};
	var openVehicleOperationCostsModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/ticket-cost-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.AddVehicleOperationCosts = function()
	{
		$scope.operationCostDetail = {
			VehicleOperationCostDesc : "",
			VehicleOperationCostPrice : 0,
			VehicleOperationCostUnit : 0,
			VehicleOperationId : $scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId
		};

		openVehicleOperationCostsModal.$promise.then(openVehicleOperationCostsModal.show);
	}

	$scope.SaveVehicleOperationCosts = function()
	{
		Tickets.SaveVehicleOperationCosts($scope.operationCostDetail, function(data){
			if(data.ServiceStatus == "SAVEVEHICLEOPERATIONCOST_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            	openVehicleOperationCostsModal.$promise.then(openVehicleOperationCostsModal.hide);
            }
		});
	}

	$scope.RemoveVehicleOperationCosts = function(VehicleOperationCostId)
	{
		Tickets.RemoveVehicleOperationCosts(VehicleOperationCostId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLEOPERATIONCOST_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            }
		});
	}

	$scope.operationFreightsDetail = {};
	var openVehicleOperationFreights = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/ticket-freight-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.AddVehicleOperationFreights = function()
	{
		$scope.operationFreightsDetail = {
			VehicleOperationFreightDesc : "",
			VehicleOperationFreightPrice : 0,
			VehicleOperationFreightUnit : 0,
			VehicleOperationId : $scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId
		};

		openVehicleOperationFreights.$promise.then(openVehicleOperationFreights.show);
	}

	$scope.SaveVehicleOperationFreights = function()
	{
		Tickets.SaveVehicleOperationFreights($scope.operationFreightsDetail, function(data){
			if(data.ServiceStatus == "SAVEVEHICLEOPERATIONFREIHT_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            	openVehicleOperationFreights.$promise.then(openVehicleOperationFreights.hide);
            }
		});
	}

	$scope.RemoveVehicleOperationFreights = function(VehicleOperationFreightId)
	{
		Tickets.RemoveVehicleOperationFreights(VehicleOperationFreightId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLEOPERATIONFREIHT_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            }
		});
	}

	$scope.operationNoteDetail = {};
	var openVehicleOperationNotes = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Ticket/ticket-note-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.AddVehicleOperationNotes = function()
	{
		$scope.operationNoteDetail = {
			VehicleOperationNoteDesc : "",
			VehicleOperationId : $scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId
		};

		openVehicleOperationNotes.$promise.then(openVehicleOperationNotes.show);
	}

	$scope.SaveVehicleOperationNotes = function()
	{
		Tickets.SaveVehicleOperationNotes($scope.operationNoteDetail, function(data){
			if(data.ServiceStatus == "SAVEVEHICLEOPERATIONNOTE_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            	openVehicleOperationNotes.$promise.then(openVehicleOperationNotes.hide);
            }
		});
	}

	$scope.RemoveVehicleOperationNote = function(VehicleOperationNoteId)
	{
		Tickets.RemoveVehicleOperationNote(VehicleOperationNoteId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLEOPERATIONNOTE_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
            }
		});
	}

	/*
		Helper Function
	*/

	$scope.calculateFonts = function()
	{
		var indexStartPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: $scope.VehicleOperationSeats.StopPointStartId }, 'StopPointId');
		var indexEndPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: $scope.VehicleOperationSeats.StopPointEndId }, 'StopPointId');
		var ThaiStopPointStartName = $scope.stopPointData.StopPointList[indexStartPoint].StopPointName_TH;
		var EngStopPointStartName = $scope.stopPointData.StopPointList[indexStartPoint].StopPointName_EN;
		var ThaiStopPointEndName = $scope.stopPointData.StopPointList[indexEndPoint].StopPointName_TH;
		var EngStopPointEndName = $scope.stopPointData.StopPointList[indexEndPoint].StopPointName_EN;

		var maxFontThaiLength = 0;
		if(ThaiStopPointStartName.length > ThaiStopPointEndName.length)
		{
			maxFontThaiLength = ThaiStopPointStartName.length;
		}
		else
		{
			maxFontThaiLength = ThaiStopPointEndName.length;
		}

		if(maxFontThaiLength < 12)
		{
			$scope.globalVariable.fontThaiSize = '28px';
			$scope.globalVariable.fontThaiLineHeight = '21px';
		}
		else if(maxFontThaiLength <= 17)
		{
			$scope.globalVariable.fontThaiSize = '20px';
			$scope.globalVariable.fontThaiLineHeight = '13px';
		}
		else if(maxFontThaiLength > 17)
		{
			$scope.globalVariable.fontThaiSize = '18px';
			$scope.globalVariable.fontThaiLineHeight = '13px';
		}

		var maxFontEngLength = 0;
		if(EngStopPointStartName.length > EngStopPointEndName.length)
		{
			maxFontEngLength = EngStopPointStartName.length;
		}
		else
		{
			maxFontEngLength = EngStopPointEndName.length;
		}

		if(maxFontEngLength < 12)
		{
			$scope.globalVariable.fontEngSize = '28px';
			$scope.globalVariable.fontEngLineHeight = '21px';
		}
		else if(maxFontEngLength <= 17)
		{
			$scope.globalVariable.fontEngSize = '20px';
			$scope.globalVariable.fontEngLineHeight = '13px';
		}
		else if(maxFontEngLength > 17)
		{
			$scope.globalVariable.fontEngSize = '18px';
			$scope.globalVariable.fontEngLineHeight = '13px';
		}
	}

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

	var setRoutePrice = function(data)
	{
		var temp = [];
		var loopCount = 0;
		var tempStartStopPoint = null;

		angular.forEach(data.RoutePrice, function(eachRoutePrice){
			if(eachRoutePrice.RoutePriceList.length > 0)
			{
				if(eachRoutePrice.RoutePriceList[0].StopPointStartId != tempStartStopPoint)
				{
					if(loopCount == 0)
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointStartId);   
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointStartId;
					}
					else if(loopCount == data.RoutePrice.length-1)
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointStartId);
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointEndId);
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointEndId;
					}
					else
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointStartId);
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointStartId;
					}
				}
			}
			loopCount++;
		});

		data.Pyramid = temp;

		return data;
	}

	var generateCustomerName = function()
	{
		var customerName = "ลูกค้า " + Math.floor((Math.random() * 10000) + 1);
		return customerName;
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

    $rootScope.$on('updateRouteTrip', function(){
    	//Refresh
    	$timeout.cancel(timeoutForRouteTrip);
		$scope.reloadRealTimeRouteTrip();
		$scope.loadDataForTab3($scope.globalVariable.currentVehicleOpreDetail.VehicleOperationId);
		$scope.selectStartStopPoint($scope.VehicleOperationSeats.StopPointStartId, false);
		///$scope.calculateFee($scope.globalVariable.currentPaymentKey);

    });
}]);