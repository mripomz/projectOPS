module.controller('SeatCapacityArrangementCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "$http", "SeatCapacityArrangement", "$alert", "$filter", "$sce", "Assets", function ($rootScope, $scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, $http, SeatCapacityArrangement, $alert, $filter, $sce, Assets) {
	
	$scope.currentState = 1;
	$scope.VehicleSeatPlanList = [];
	$scope.VehicleSeatFloorDetail = [];
	$scope.VehicleSeatPlan = {
		StandardAmount : 0,
		IsCompleted : 0
	};
	$scope.VehicleTypeDetail = {};
	$scope.VehicleSeatStandard = [];
	$scope.setLoopCount = 1;

	$scope.globalStatus = {
		isActivityEdit : false,
		IsFloorManageActive : 0,
		chooseTemplateSeat : "",
		typeCreate : "creaateNew",
		isEditSeatPlan : false,
		viewSeatCapacityActive : 0,
		currentVehicleSeatPlanId : null
	}

	$scope.initData = function()
	{
		$scope.globalStatus.currentVehicleSeatPlanId = 0;
		$scope.globalStatus.IsFloorManageActive = 0;
		$scope.currentState = 1;
		$scope.VehicleSeatStep = 1;

		$scope.VehicleSeatPlan = {
			StandardAmount : 0,
			IsCompleted : 0
		};
		$scope.VehicleSeatStandard = [];

		SeatCapacityArrangement.GetVehicleSeatPlanList(function(data){
			$scope.VehicleSeatPlanList = data.SeatPlanList;
		});

		//Set duration time for route
		Assets.GetVehicleTypeList(function(data){
			$scope.VehicleTypeList = data.VehicleTypeList;
		});
	}

	$scope.LoadVehicleSeat = function()
	{
		$scope.currentVehicle = 
		{
			SeatId : "",
			SeatName : ""
		}


		SeatCapacityArrangement.GetVehicleSeatPlanById($scope.globalStatus.currentVehicleSeatPlanId, function(seatPlanDetail)
		{
			
			$scope.VehicleSeatPlan = seatPlanDetail;
			$scope.VehicleSeatStep = seatPlanDetail.ProcessNumberEdit;
			//$scope.globalStatus.viewSeatCapacityActive = (seatPlanDetail.ProcessNumberEdit-1);

			SeatCapacityArrangement.GetVehicleSeatStandardList($scope.globalStatus.currentVehicleSeatPlanId, function(seatStandard)
			{
				$scope.VehicleSeatStandard = seatStandard.SeatStandardList;
			});

			//Prepare Step2
			if($scope.VehicleSeatStep > 1)
			{
				SeatCapacityArrangement.GetVehicleSeatFloorList($scope.globalStatus.currentVehicleSeatPlanId, function(seatFloor){
					console.log(seatFloor.SeatFloorList,[],$scope.seatSelect);
					$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],$scope.seatSelect);
					console.log($scope.VehicleSeatFloorDetail);
				});	
			}

			$scope.globalStatus.IsFloorManageActive = 0;
		});
	}

	/*
		Add/Edit
	*/
	$scope.editPlan = function(VehicleSeatPlanId, Step)
	{
		$scope.currentVehicle = 
		{
			SeatId : "",
			SeatName : ""
		}
		$scope.globalStatus.typeCreate = "creaateNew";
		$scope.globalStatus.chooseTemplateSeat = "";

		$scope.currentState = 2;

		SeatCapacityArrangement.GetVehicleStandardList(function(data){
			$scope.StandardTypeList = checkStandardData(data);
		});

		SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(themeList){
			$scope.TemplateSeatList = themeList.SeatPlanList;
		});

		if(VehicleSeatPlanId == 0)
		{
			//AddNew
			$scope.globalStatus.currentVehicleSeatPlanId = 0;
			$scope.VehicleSeatStep = 1;
		}
		else
		{
			//Edit
			$scope.globalStatus.currentVehicleSeatPlanId = VehicleSeatPlanId;
			SeatCapacityArrangement.GetVehicleSeatPlanById(VehicleSeatPlanId, function(seatPlanDetail)
			{
				
				$scope.VehicleSeatPlan = seatPlanDetail;

				if(Step != 0)
				{
					$scope.VehicleSeatStep = Step;
				}
				else
				{
					$scope.VehicleSeatStep = seatPlanDetail.ProcessNumberEdit;
				}
				
				$scope.globalStatus.viewSeatCapacityActive = (seatPlanDetail.ProcessNumberEdit-1);

				SeatCapacityArrangement.GetVehicleSeatStandardList(VehicleSeatPlanId, function(seatStandard)
				{
					$scope.VehicleSeatStandard = seatStandard.SeatStandardList;
				});

				//Prepare Step2
				if($scope.VehicleSeatStep > 1)
				{
					SeatCapacityArrangement.GetVehicleSeatFloorList(VehicleSeatPlanId, function(seatFloor){
						$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],$scope.seatSelect);
						if($scope.VehicleSeatFloorDetail.length == 0)
						{
							$scope.VehicleSeatFloorDetail.push(
								{
									VehicleSeatFloorId : null,
									VehicleSeatPlanId : $scope.currentVehicleSeatPlanId,
									VehicleSeatFloorLevel : 1,
									VehicleSeatFloorHorizontal : 1,
									VehicleSeatFloorVertical : 1,
									VehicleSeatFloorNumberOfRunway : 1,
									VehicleSeatFloorStyle : "1"
								}
							);
						}
					});	
				}
			});
		}
	}

	$scope.viewSeatPlan = function(VehicleSeatPlanId)
	{
		$scope.currentState = 3;
		$scope.globalStatus.currentVehicleSeatPlanId = VehicleSeatPlanId;
		SeatCapacityArrangement.GetVehicleSeatPlanById(VehicleSeatPlanId, function(seatPlanDetail)
		{
			
			$scope.VehicleSeatPlan = seatPlanDetail;
			$scope.VehicleSeatStep = seatPlanDetail.ProcessNumberEdit;
			//$scope.globalStatus.viewSeatCapacityActive = 0;

			SeatCapacityArrangement.GetVehicleSeatStandardList(VehicleSeatPlanId, function(seatStandard)
			{
				$scope.VehicleSeatStandard = seatStandard.SeatStandardList;
			});

			SeatCapacityArrangement.GetVehicleSeatFloorList(VehicleSeatPlanId, function(seatFloor){
				console.log(seatFloor.SeatFloorList,[],$scope.seatSelect);
				$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],$scope.seatSelect);
				
				Assets.GetVehicleTypeById(seatPlanDetail.VehicleTypeId, function(dataVehicleType){
					$scope.VehicleTypeDetail = dataVehicleType;
				});
			});
		});
	}

	/*
		Load SeatPlan Template
	*/
	$scope.loadTemplateSeatPlan = function()
	{
		if($scope.globalStatus.chooseTemplateSeat != "")
		{	
			SeatCapacityArrangement.LoadTemplateSeatPlan($scope.globalStatus.currentVehicleSeatPlanId, $scope.globalStatus.chooseTemplateSeat, function(data){
				if(data.ServiceStatus == "LOADTEMPLATESEATPLAN_FAIL")
				{
					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
					Modals.showAlertFail();
				}
				else
				{
					Modals.showAlertSuccess();
					$scope.globalStatus.currentVehicleSeatPlanId = data.VehicleSeatPlanId;
					
					$scope.currentVehicle = 
					{
						SeatId : "",
						SeatName : ""
					}
					console.log($scope.globalStatus.currentVehicleSeatPlanId);

					SeatCapacityArrangement.GetVehicleSeatPlanById($scope.globalStatus.currentVehicleSeatPlanId, function(seatPlanDetail)
					{
						
						$scope.VehicleSeatPlan = seatPlanDetail;
						$scope.VehicleSeatStep = seatPlanDetail.ProcessNumberEdit;
						//$scope.globalStatus.viewSeatCapacityActive = (seatPlanDetail.ProcessNumberEdit-1);

						SeatCapacityArrangement.GetVehicleSeatStandardList($scope.globalStatus.currentVehicleSeatPlanId, function(seatStandard)
						{
							$scope.VehicleSeatStandard = seatStandard.SeatStandardList;
						});

						//Prepare Step2
						if($scope.VehicleSeatStep > 1)
						{
							SeatCapacityArrangement.GetVehicleSeatFloorList($scope.globalStatus.currentVehicleSeatPlanId, function(seatFloor){
	
								$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],$scope.seatSelect);
							});	
						}
						
						$scope.globalStatus.IsFloorManageActive = 0;
						$scope.VehicleSeatStep = 1;
					});
				}
			});	
		}
	}

	$scope.editVehicleseatPlan = function()
	{
		$scope.globalStatus.typeCreate = "creaateNew";
		$scope.globalStatus.chooseTemplateSeat = "";
		$scope.editPlan($scope.globalStatus.currentVehicleSeatPlanId, $scope.globalStatus.viewSeatCapacityActive + 1);
	}


	/*
		Floor
	*/
	$scope.addVehicleSeatFloor = function(){
		var floorLevel = $scope.VehicleSeatFloorDetail.length + 1;
		$scope.VehicleSeatFloorDetail.push(
			{
				VehicleSeatFloorId : null,
				VehicleSeatPlanId : $scope.currentVehicleSeatPlanId,
				VehicleSeatFloorLevel : floorLevel,
				VehicleSeatFloorHorizontal : 1,
				VehicleSeatFloorVertical : 1,
				VehicleSeatFloorNumberOfRunway : 1,
				VehicleSeatFloorStyle : "1"
			}
		);
	}

	$scope.removeFloorLevel = function()
	{
		var temp = [];
		for(var i = 0; i < ($scope.VehicleSeatFloorDetail.length-1); i++)
		{
			temp.push($scope.VehicleSeatFloorDetail[i]);
		}
		$scope.VehicleSeatFloorDetail = temp;
	}
	/*
		Save Seat Plain
	*/
	$scope.saveVehicleSeatStep1 = function(isNext)
	{
		//Save VehicleSeatPlan
		SeatCapacityArrangement.SaveVehicleSeatPlanStep1($scope.VehicleSeatPlan, $scope.VehicleSeatStandard, !isNext, function(data){
			if(data.ServiceStatus == "SAVEVEHICLESEATPLANSTEP1_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				if(isNext)
				{
					$scope.VehicleSeatStep = 2;
					$scope.globalStatus.currentVehicleSeatPlanId = data.VehicleSeatPlanId;
					$scope.VehicleSeatPlan = data;
					///console.log($scope.VehicleSeatPlan);
					
					Assets.GetVehicleTypeById($scope.VehicleSeatPlan.VehicleTypeId, function(dataVehicleType){
						$scope.VehicleTypeDetail = dataVehicleType;
					});

					///console.log(data.VehicleSeatPlanId);

					SeatCapacityArrangement.GetVehicleSeatFloorList(data.VehicleSeatPlanId, function(seatFloor){
						console.log(seatFloor.SeatFloorList,[],$scope.seatSelect);

						$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList,[],$scope.seatSelect);
						console.log($scope.VehicleSeatFloorDetail);
						if($scope.VehicleSeatFloorDetail.length == 0){
							$scope.addVehicleSeatFloor();
						}
					});

					
				}
				else
				{
					SeatCapacityArrangement.GetVehicleSeatPlanById(data.VehicleSeatPlanId, function(seatPlanDetail)
					{
						
						$scope.VehicleSeatPlan = seatPlanDetail;

						SeatCapacityArrangement.GetVehicleSeatFloorList(data.VehicleSeatPlanId, function(seatFloor){

							Assets.GetVehicleTypeById(seatPlanDetail.VehicleTypeId, function(dataVehicleType){
								$scope.VehicleTypeDetail = dataVehicleType;
							});
							console.log(seatFloor.SeatFloorList,[],$scope.seatSelect);

							$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList);
							console.log($scope.VehicleSeatFloorDetail);
							if(data.IsCompleted)
							{
								$scope.LoadVehicleSeat();
								$scope.viewSeatPlan($scope.globalStatus.currentVehicleSeatPlanId);
								$scope.globalStatus.viewSeatCapacityActive = 0;
							}							

							Modals.showAlertSuccess();
						});
					});
				}
			}
		});	
	}

	$scope.saveVehicleSeatStep2 = function(isNext)
	{
		//Removed other JS
		console.log('sadasdasd',isNext)
		angular.forEach($scope.VehicleSeatFloorDetail, function(each){
			each.NewList = [];
			each.VehicleSeatList = [];
		});
		SeatCapacityArrangement.SaveVehicleSeatPlanStep2($scope.VehicleSeatFloorDetail, $scope.VehicleSeatPlan, !isNext, function(data){
			if(data.ServiceStatus == "SAVEVEHICLESEATPLANSTEP2_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				if(isNext)
				{
					$scope.VehicleSeatStep = 3;
					$scope.LoadVehicleSeat();
				}
				else
				{
					SeatCapacityArrangement.GetVehicleSeatPlanById($scope.globalStatus.currentVehicleSeatPlanId, function(seatPlanDetail)
					{
						if(seatPlanDetail.IsCompleted)
						{
							$scope.viewSeatPlan($scope.globalStatus.currentVehicleSeatPlanId);
							$scope.globalStatus.viewSeatCapacityActive = 1;
						}	
						else
						{
							SeatCapacityArrangement.GetVehicleSeatFloorList($scope.globalStatus.currentVehicleSeatPlanId, function(seatFloor){
								console.log(seatFloor.SeatFloorList,[],$scope.seatSelect);
								$scope.VehicleSeatFloorDetail = Helpers.prepareDataForVehicleSeat(seatFloor.SeatFloorList);
								console.log($scope.VehicleSeatFloorDetail);
								Assets.GetVehicleTypeById(seatPlanDetail.VehicleTypeId, function(dataVehicleType){
									$scope.VehicleTypeDetail = dataVehicleType;
								});
							});
						}						

						Modals.showAlertSuccess();
					});
				}
			}
		});
	}

	$scope.saveVehicleSeatStep3 = function()
	{
		//Prepare data for Step3
		var prepareData = {};
		prepareData.SeatFloorList = [];
		angular.forEach($scope.VehicleSeatFloorDetail, function(each){
			each.VehicleSeatList = [];
			angular.forEach(each.NewList, function(eachSeatRow){
				angular.forEach(eachSeatRow, function(eachSeat){
					each.VehicleSeatList.push(eachSeat);
				});
			});
			prepareData.SeatFloorList.push(each);
		});

		SeatCapacityArrangement.SaveVehicleSeatPlanStep3(prepareData, $scope.globalStatus.currentVehicleSeatPlanId, function(data){
			if(data.ServiceStatus == "SAVEVEHICLESEATPLANSTEP3_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.VehicleSeatStep = 1;
				$scope.LoadVehicleSeat();
				$scope.currentState = 3;
				$scope.globalStatus.viewSeatCapacityActive = 0;
			}
		});
	}

	$scope.removedVehiclePlan = function(VehicleSeatPlanId)
	{
		SeatCapacityArrangement.RemoveVehicleSeatPlanById(VehicleSeatPlanId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLESEATPLAN_FAIL")
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
		Seat Icon
	*/
	$scope.currentVehicle = 
	{
		SeatId : "",
		SeatName : ""
	}

	$scope.seatTypeIcon = [
		"/img/icon/grey-chair.png",
		"/img/icon/blue-chair.png",
		"/img/icon/green-chair.png",
		"/img/icon/pink-chair.png",
		"/img/icon/red-chair.png",
		"/img/icon/orange-chair.png"
	];

	$scope.SeatName = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB"];

	$scope.getArrayNumber = function(number)
	{
		return new Array(number);
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

	var selectSeatTypeModel = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/SeatCapacityArrangement/select-seat-type-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.openModalSelectSeatType = function(VehicleSeatName, VehicleSeatId)
	{
		$scope.currentVehicle = 
		{
			SeatId : VehicleSeatId,
			SeatName : VehicleSeatName
		}

		selectSeatTypeModel.$promise.then(selectSeatTypeModel.show);
	}

	$scope.selectNameChanged = function()
	{
		angular.forEach($scope.VehicleSeatFloorDetail, function(floor){
			angular.forEach(floor.NewList, function(eachSeat){
				angular.forEach(eachSeat, function(seat){
					if(seat.VehicleSeatId == $scope.currentVehicle.SeatId)
					{
						seat.VehicleSeatName = $scope.currentVehicle.SeatName;
					}
				});
			});
		});
	}

	$scope.selectSeatType = function(VehicleSeatTypeId)
	{
		angular.forEach($scope.VehicleSeatFloorDetail, function(floor){
			angular.forEach(floor.NewList, function(eachSeat){
				angular.forEach(eachSeat, function(seat){
					if(seat.VehicleSeatId == $scope.currentVehicle.SeatId)
					{
						seat.VehicleSeatName = $scope.currentVehicle.SeatName;
						seat.VehicleSeatTypeId = VehicleSeatTypeId;
						seat.IsBlockedOnline = false;
					}
				});
			});
		});
	}

	$scope.selectSeatTypeStandard = function(VehicleSeatTypeId, VehicleStandardId)
	{
		angular.forEach($scope.VehicleSeatFloorDetail, function(floor){
			angular.forEach(floor.NewList, function(eachSeat){
				angular.forEach(eachSeat, function(seat){
					if(seat.VehicleSeatId == $scope.currentVehicle.SeatId)
					{
						seat.VehicleSeatTypeId = VehicleSeatTypeId;
						seat.VehicleStandardId = VehicleStandardId;
						seat.VehicleSeatName = $scope.currentVehicle.SeatName;
						seat.IsBlockedOnline = false;
					}
				});
			});
		});
	}

	$scope.selectSeatBlockOnline = function()
	{
		angular.forEach($scope.VehicleSeatFloorDetail, function(floor){
			angular.forEach(floor.NewList, function(eachSeat){
				angular.forEach(eachSeat, function(seat){
					if(seat.VehicleSeatId == $scope.currentVehicle.SeatId)
					{
						seat.IsBlockedOnline = true;
					}
				});
			});
		});
	}

	/*
		Standard
	*/
	var addNewStandardModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/SeatCapacityArrangement/vehicle-standard-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.showStandard = function()
	{
		SeatCapacityArrangement.GetVehicleStandardList(function(data){
			if(data.ServiceStatus == "GETVEHICLESTANDARDLIST_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				$scope.StandardTypeList = checkStandardData(data);
			}
			
			addNewStandardModal.$promise.then(addNewStandardModal.show);
		});
	}

	$scope.addStandard = function(data)
	{
		$scope.VehicleSeatPlan.StandardAmount++;
		$scope.VehicleSeatStandard.push(
			{
				VehicleStandardId : data.VehicleStandardId, 
				VehicleSeatPlanId : null, 
				VehicleStandardName : data.VehicleStandardName
			}
		);
		$scope.StandardTypeList = checkStandardData($scope.StandardTypeList);
	}

	$scope.removeStandardType = function(item)
	{
		console.log($scope.StandardTypeList);
		var temp = [];
		$scope.StandardTypeList.StandardList.push(item);
		$scope.VehicleSeatPlan.StandardAmount--;
		angular.forEach($scope.VehicleSeatStandard, function(each){
			if(each.VehicleStandardId != item.VehicleStandardId)
			{
				temp.push(each);
			}
		});

		$scope.VehicleSeatStandard = temp;
	}

	/*
		Page Control
	*/
	$scope.backtoMain = function()
	{
		$scope.currentState = 1;
		$scope.initData();
	}

	$scope.changeVehicleSeatStep = function(step)
	{
		$scope.VehicleSeatStep = step;
	}

	/*
		Helper Function
	*/
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

	/*
		Table 
	*/
	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.showAll = false;
	$scope.lswFilterOptions = {
            list: $scope.VehicleSeatPlanList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	IsDeleted : $scope.showAll
            }
        }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };

    $scope.filterOption = function()
    {
    	if($scope.showAll)
    	{
    		$scope.showAll = false;
    		$scope.lswFilterOptions.selectFilter = 
    		{
            	IsDeleted : $scope.showAll
            }
    	}
    	else
    	{
    		$scope.showAll = true;
    		$scope.lswFilterOptions.selectFilter = "";
    	}
    }

}]);