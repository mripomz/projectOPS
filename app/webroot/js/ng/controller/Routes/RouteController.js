module.controller('RouteCtrl',["$scope", "$filter", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Routes", "Locations", "Assets", function ($scope, $filter, $timeout, $cookies, $modal, Helpers, Modals, Routes, Locations, Assets) {

	$scope.RouteData = {
		RouteList : []
	};
	$scope.RouteDetail = {
		
	};
	$scope.selectVehicleTypeList = [];
	
	$scope.RouteDuration = [];
	$scope.currentState = 1;
	$scope.RouteStep = 1;
	$scope.errorMsg = {
		isError : false,
		message : ""
	}

	$scope.globalStatus = {
		isEditRoute : false,
		IsRouteProviceActive : 0,
		IsRouteViewProviceActive : 0,
		IsRouteAccountPriceViewActive : 0,
		IsRouteAgencyPriceViewActive : 0,
		IsRouteWebsitePriceViewActive : 0,
		IsRoutePriceViewActive : 0,
		IsPriceViewActive : 0,
		currentProvince : 0,
		currentRouteId : null,
		currentStartProvince : null,
		currentEndProvince : null,
		startIndex : null,
		endIndex : null,
		currentSortUpStopId : null,
		currentSortDownStopId : null,
		PriceType : "box"
	}

	$scope.filter = {
		filterStartStopPoint : "",
		filterEndStopPoint : "",
		filterSearchStopPoint : ""
	}

	$scope.ProvicesList = [];
	$scope.StopPointList = [];
	$scope.RoutePriceList = [];

	$scope.EditRouteAccountPrice = [];
	$scope.EditRoutePriceBox = [];
	$scope.EditRoutePriceAgency = [];
	$scope.EditRoutePriceWebsite = [];

	$scope.IsSlectVehicleType = false;
	$scope.IsCompleted = false;

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.initData = function()
	{
		$scope.currentState = 1;
		$scope.LoadGetRouteList();

		Locations.GetAllProvinces(function(data){
            $scope.ProvicesList = data;
        });
        
        //Set duration time for route
		Assets.GetVehicleTypeInRouteList(null,function(data){
			$scope.VehicleTypeList = data.VehicleTypeList;
			angular.forEach($scope.VehicleTypeList, function(VehicleType, key){

				VehicleType.Isselect = false;
			});
			
		});
	}

	$scope.LoadGetRouteList = function()
	{
		Routes.GetRouteList(function(data){
			$scope.RouteData = data;
		});

		Routes.GetStopPointList(function(data){
            $scope.stopPointData = data;
        });
	}
	$scope.slectVehicleType1 = function(VehicleTypeId,VehicleTypeName)
	{
	///	console.log(VehicleTypeId);
		////console.log(VehicleTypeName);


		
		/////$scope.RouteDetai.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
		if($scope.selectVehicleTypeList.length >0){
			angular.forEach($scope.selectVehicleTypeList, function(VehicleType, key){
				var KeepArray = VehicleType.split(',');
	   	    	if(KeepArray[0] == VehicleTypeId)
	   	    	{
	   	    		
	   	    		$scope.selectVehicleTypeList.splice(key, 1);
	   	    		$scope.RouteDuration.splice(key, 1)
	   	    		///console.log($scope.RouteDuration);
	   	    		console.log($scope.selectVehicleTypeList);
	   	    	}
	   	    	if($scope.selectVehicleTypeList.length -1 ==key)
	   	    	{
	   	    		
	   	    		$scope.IsSlectVehicleType = true;
	   	    		$scope.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
	   	    		$scope.RouteDuration.push(
		 				{
		 				RouteId : null,
		 				VehicleTypeId : VehicleTypeId,
		 				Duration : 0				
		 				}
		 			);
		 			console.log($scope.selectVehicleTypeList);

		 		////	console.log($scope.RouteDuration);
	   	    		////console.log($scope.selectVehicleTypeList);
	   	    	}
			 });
		}
		else{

			
			$scope.IsSlectVehicleType = true;
			$scope.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
			$scope.RouteDuration.push(
		 		{
		 			RouteId : null,
		 			VehicleTypeId : VehicleTypeId,
		 			Duration : 0				
		 		}
		 	);

		 	console.log($scope.selectVehicleTypeList);
		 	///////console.log($scope.RouteDuration);
			///console.log($scope.selectVehicleTypeList);
		}

	}


	$scope.slectVehicleType = function(VehicleTypeId,VehicleTypeName)
	{   
		////console.log(VehicleTypeId);
		///console.log(VehicleTypeName);
		///console.log($scope.selectVehicleTypeList);


		
		/////$scope.RouteDetai.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
		if($scope.selectVehicleTypeList.length >0){
			angular.forEach($scope.selectVehicleTypeList, function(VehicleType, key){
				var KeepArray = VehicleType.split(',');
				console.log(key);
	   	    	if(KeepArray[0] == VehicleTypeId)
	   	    	{
	   	    		
	   	    		$scope.selectVehicleTypeList.splice(key, 1);
	   	    		$scope.RouteDuration.splice(key, 1)
	   	    		$scope.IsSlectVehicleType = true;
	   	    		//console.log($scope.RouteDuration);
	   	    		///console.log($scope.selectVehicleTypeList);
	   	     		angular.forEach($scope.VehicleTypeList, function(VehicleTypelst,key1){
	   	     			///console.log($scope.VehicleTypeList[key1]);
	   	     			if($scope.VehicleTypeList[key1].VehicleTypeId == VehicleTypeId){
	   	    			
					 	$scope.VehicleTypeList[key1].IsSelectInRoute = false;
					 }
					 });
	   	    	}
	   	    	if($scope.selectVehicleTypeList.length -1 ==key)
	   	    	{
	   	     		angular.forEach($scope.VehicleTypeList, function(VehicleTypelst,key1){
	   	     			console.log($scope.VehicleTypeList[key1]);
	   	     			if($scope.VehicleTypeList[key1].VehicleTypeId == VehicleTypeId){
	   	     				/////console.log('makkytest');
					 	$scope.VehicleTypeList[key1].IsSelectInRoute = true;
					 }
					 	});
	   	    		$scope.IsSlectVehicleType = true;
	   	    		$scope.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
	   	    		$scope.RouteDuration.push(
		 				{
		 				RouteId : null,
		 				VehicleTypeId : VehicleTypeId,
		 				Duration : 0				
		 				}
		 	);
	   	    		///console.log($scope.RouteDuration);
	   	    		///console.log($scope.selectVehicleTypeList);
	   	    	}
			 });
		}
		else{

			 angular.forEach($scope.VehicleTypeList, function(VehicleTypelst,key1){
	    	    			///console.log($scope.VehicleTypeList[key1]);
	    	    			if($scope.VehicleTypeList[key1].VehicleTypeId == VehicleTypeId){
	    	    				console.log('makkytest');
			 			$scope.VehicleTypeList[key1].IsSelectInRoute = true;
			 		}
			 });
			$scope.IsSlectVehicleType = true;
			$scope.selectVehicleTypeList.push(VehicleTypeId+','+VehicleTypeName);
			$scope.RouteDuration.push(
		 		{
		 			RouteId : null,
		 			VehicleTypeId : VehicleTypeId,
		 			Duration : 0				
		 		}
		 	);
			///console.log($scope.selectVehicleTypeList);
		}
		
	}

	$scope.addRoute = function()
	{
		$scope.globalStatus.isEditRoute = false;
		//Clear Data
		$scope.RouteDetail = {
			RouteType : "0",
			IsEdited : true,
			IsAvailabled : true
		};

		$scope.RouteDuration = [];
		$scope.IsSlectVehicleType = false;
		$scope.IsCompleted = false;
		$scope.selectVehicleTypeList =[];

		//Set duration time for route
		// angular.forEach($scope.VehicleTypeList, function(each){
		// 	$scope.RouteDuration.push(
		// 		{
		// 			RouteId : null,
		// 			VehicleTypeId : each.VehicleTypeId,
		// 			Duration : 0				
		// 		}
		// 	);
		// });

		$scope.RouteStep = 1;
		$scope.currentState = 2;
	}

	
	$scope.editRoute = function(RouteId)
	{
		$scope.LoadGetRouteList();
		$scope.globalStatus.IsRouteProviceActive = 0;
		////$scope.globalStatus.IsRouteViewProviceActive = 0;

		$scope.globalStatus.IsRoutePriceViewActive = 0;
		$scope.globalStatus.IsRouteAccountPriceViewActive = 0;
		$scope.globalStatus.IsRouteAgencyPriceViewActive = 0;
		$scope.globalStatus.IsRouteWebsitePriceViewActive = 0;

		$scope.globalStatus.currentRouteId = RouteId;
		$scope.globalStatus.isEditRoute = true;
		$scope.selectVehicleTypeList = [];
		$scope.IsSlectVehicleType = false;
		$scope.IsCompleted = false;
		
		Routes.GetRouteById(RouteId, function(data){
			if(data.ServiceStatus == "GETROUTE_FAIL")
            {
                Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
			else
			{

				

				Assets.GetVehicleTypeInRouteList(RouteId,function(data){
					$scope.VehicleTypeList = data.VehicleTypeList;
					Routes.GetRouteInVehicleType(RouteId, function(RouteInVehicleType){
						angular.forEach(RouteInVehicleType.RouteInVehicleTypeList, function(VehicleType, key){
							$scope.selectVehicleTypeList.push(VehicleType.VehicleTypeId+','+VehicleType.VehicleTypeName);
							///$scope.slectVehicleType(VehicleType.VehicleTypeId,VehicleType.VehicleTypeName);
							console.log($scope.selectVehicleTypeList);

						});
						
					
					});
					
				});
			
			
				
			




				//Get route duration
				Routes.GetRouteDurationInVehicleTypeList(RouteId, function(route){
					$scope.RouteDuration = route.RouteDurationInVehicleTypeList;
					$scope.RouteDetail = data;
					($scope.RouteDetail.RouteType)?($scope.RouteDetail.RouteType = "1"):($scope.RouteDetail.RouteType = "0");	
					
					if(!!$scope.RouteDetail.ProcessNumberEdit || $scope.RouteDetail.IsCompleted )
					{
						///console.log('RouteStep1 ='+$scope.RouteDetail.ProcessNumberEdit);
						///$scope.IsSlectVehicleType  =true;
						if($scope.RouteDetail.ProcessNumberEdit ==2)
						{
							$scope.IsCompleted = false;
						}
						else
						{
							$scope.IsCompleted = true;
						}
						console.log('makky');
						$scope.RouteStep = $scope.RouteDetail.ProcessNumberEdit;
			
						$scope.globalStatus.IsRouteViewProviceActive = ($scope.RouteStep -1);
						Routes.GetRouteProviceList(RouteId, function(routeProviceList){
							$scope.RouteProviceList = setRouteProviceList(routeProviceList.RouteProviceList);
							Routes.GetRoutePriceByRouteId(RouteId, function(routePrice){
								///console.log(routePrice);
			            		$scope.RoutePriceList = setRoutePrice(routePrice);
			            		console.log($scope.RoutePriceList);
			            		
			            	});
						});
					}
					else
					{
						console.log('makky1');
						//$scope.IsCompleted = false;
						Routes.GetRouteProviceList(RouteId, function(routeProviceList){
							$scope.RouteProviceList = setRouteProviceList(routeProviceList.RouteProviceList);
							Routes.GetRoutePriceByRouteId(RouteId, function(routePrice){
								///console.log(routePrice);
			            		$scope.RoutePriceList = setRoutePrice(routePrice);

			            		$scope.RouteStep = 1;
			            		
			            	});
						});

						
					}
					$scope.currentState = 2;

				});
			}
		});
	
	}

	$scope.setEditRoute = function()
	{
		var currentNumberPage = 0;

		if($scope.globalStatus.IsRouteViewProviceActive >= 2)
		{
			currentNumberPage = 2;
			$scope.globalStatus.IsPriceViewActive = ($scope.globalStatus.IsRouteViewProviceActive-2);
		}

		Routes.SetEditRoute($scope.globalStatus.currentRouteId, (currentNumberPage+1), function(data){
			if(data.ServiceStatus == "SETEDITROUTE_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	console.log($scope.globalStatus.IsRouteViewProviceActive);
            	$scope.editRoute($scope.globalStatus.currentRouteId);
            }
		});
	}

	$scope.removeRoute = function(RouteId)
	{
		Routes.RemoveRoute(RouteId, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "REMOVEROUTE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
			}
			else
			{
				$scope.LoadGetRouteList();
			}
		});
	}

	$scope.PyramidPopUpData = {};
	var updateRoutePriceModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/update-route-price-modal.html', show: false });
	$scope.showRoutePrice = function(startIndex,endIndex, isEdit, typePirce)
	{
		$scope.PyramidPopUpData = {};

		var RoutePrice = {};
		var PyramidPrice = {};

		/*
			Prepare data before show title
		*/
		switch(typePirce)
		{
			case "box":
				RoutePrice = $scope.RoutePriceList.RoutePrice;
				PyramidPrice = $scope.RoutePriceList.Pyramid;
				break;
			case "account":
				RoutePrice = $scope.RoutePriceList.RouteAccountPrice;
				PyramidPrice = $scope.RoutePriceList.PyramidAccount;
				break;
			case "agency":
				RoutePrice = $scope.RoutePriceList.RouteAgencyPrice;
				PyramidPrice = $scope.RoutePriceList.PyramidAgency;
				break;
			case "website":
				RoutePrice = $scope.RoutePriceList.RouteWebsitePrice;
				PyramidPrice = $scope.RoutePriceList.PyramidWebsite;
				break;
		}

		angular.forEach(RoutePrice, function(data){
			if(data.StopPointStart == PyramidPrice[startIndex] && data.StopPointEnd == PyramidPrice[endIndex])
			{
				$scope.PyramidPopUpData.isEdit = isEdit;
				$scope.PyramidPopUpData.StopPointStart = data.StopPointStart;
				$scope.PyramidPopUpData.StopPointEnd = data.StopPointEnd;


				//$scope.PyramidPopUpData.RoutePriceList = data.RoutePriceList;
				switch(typePirce)
				{
					case "box":
						$scope.PyramidPopUpData.RoutePriceList = data.RoutePriceList;
						break;
					case "account":
						$scope.PyramidPopUpData.RouteAccountPriceList = data.RouteAccountPriceList;
						break;
					case "agency":
						$scope.PyramidPopUpData.RouteAgencyPriceList = data.RouteAgencyPriceList;
						break;
					case "website":
						$scope.PyramidPopUpData.RouteWebsitePriceList = data.RouteWebsitePriceList;
						break;
				}
			}
		});

		$scope.globalStatus.PriceType = typePirce;

		updateRoutePriceModal.$promise.then(updateRoutePriceModal.show);
	}

	$scope.getDataTitle = function(startIndex, endIndex, typePirce)
	{
		var title = "";
		var RoutePrice = {};
		var PyramidPrice = null;

		/*
			Prepare data before show title
		*/
		switch(typePirce)
		{
			case "box":
				RoutePrice = $scope.RoutePriceList.RoutePrice;
				PyramidPrice = $scope.RoutePriceList.Pyramid;
				break;
			case "account":
				RoutePrice = $scope.RoutePriceList.RouteAccountPrice;
				PyramidPrice = $scope.RoutePriceList.PyramidAccount;
				break;
			case "agency":
				RoutePrice = $scope.RoutePriceList.RouteAgencyPrice;
				PyramidPrice = $scope.RoutePriceList.PyramidAgency;
				break;
			case "website":
				RoutePrice = $scope.RoutePriceList.RouteWebsitePrice;
				PyramidPrice = $scope.RoutePriceList.PyramidWebsite;
				break;
		}

		var firstStopPointIndex = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: PyramidPrice[startIndex] },'StopPointId');
		var endStopPointIndex = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: PyramidPrice[endIndex] },'StopPointId');


		title = "<strong>" + $scope.stopPointData.StopPointList[firstStopPointIndex].StopPointName_TH + '->' + $scope.stopPointData.StopPointList[endStopPointIndex].StopPointName_TH + "</strong>";

		var PyramidPopUpData = {};
		angular.forEach(RoutePrice, function(data){
			if(data.StopPointStart == PyramidPrice[startIndex] && data.StopPointEnd == PyramidPrice[endIndex])
			{
				//PyramidPopUpData = data.RoutePriceList;
				switch(typePirce)
				{
					case "box":
						PyramidPopUpData = data.RoutePriceList;
						break;
					case "account":
						PyramidPopUpData = data.RouteAccountPriceList;
						break;
					case "agency":
						PyramidPopUpData = data.RouteAgencyPriceList;
						break;
					case "website":
						PyramidPopUpData = data.RouteWebsitePriceList;
						break;
				}
			}
		});

		//start table
		title += "<table border='1' style='background-color:#3a444e;border-color:#fff' cellpadding='10'>";
		title += "<tr><td style='padding:3px' colspan='"+$scope.RoutePriceList.VehicleStandardList.length+"' align='center'><strong>ค่าโดยสารและค่าธรรมเนียม</strong></td></tr>";

		//Vehicle Type
		title += "<tr>"
		angular.forEach($scope.RoutePriceList.VehicleTypeList, function(data){
			title += "<td style='padding:3px' colspan='" + ($scope.RoutePriceList.VehicleStandardList.length/$scope.RoutePriceList.VehicleTypeList.length) + "' align='center'><strong>" + data.VehicleTypeName + "</strong></td>";	
		});
		title += "</tr>";

		//Grade or Standard
		title += "<tr>"
		angular.forEach($scope.RoutePriceList.VehicleStandardList, function(data){
			title += "<td style='padding:3px' align='center'><strong>" + data.VehicleStandardName + "</strong></td>";
		});
		title += "</tr>";
		
		//Price
		title += "<tr>"
		angular.forEach(PyramidPopUpData, function(data){
			title += "<td style='padding:3px' align='center'><strong>" + $filter('number')(data.RouteTotalPrice,2) + "</strong></td>";
		});
		title += "</tr>";

		title += "</table>";

		return title;
	}

	$scope.saveRouteStep1 = function(isNext)
	{
		($scope.RouteDetail.RouteType == "0")?($scope.RouteDetail.RouteType = false):($scope.RouteDetail.RouteType = true);
		//Save Step1

		console.log($scope.selectVehicleTypeList);
		Routes.SaveRouteStep1($scope.RouteDetail, $scope.RouteDuration,$scope.selectVehicleTypeList, !isNext, $scope.timezoneOffset, function(route){
			if(route.ServiceStatus == "SAVEROUTESTEP1_FAIL")
			{
				($scope.RouteDetail.RouteType)?($scope.RouteDetail.RouteType = "1"):($scope.RouteDetail.RouteType = "0");
				Modals.setAlert(Helpers.showErrorMessage(route.FailMessages));
		        Modals.showAlertFail();
			}
			else
			{
				$scope.RouteDetail = route;
				($scope.RouteDetail.RouteType)?($scope.RouteDetail.RouteType = "1"):($scope.RouteDetail.RouteType = "0");
				$scope.globalStatus.currentRouteId = route.RouteId;

				if(isNext)
				{
					//Load Data Step 2
					Routes.GetRouteProviceList($scope.RouteDetail.RouteId, function(data){

						if(data.ServiceStatus == "GETROUTEPROVICELIST_FAIL")
			            {
			            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
			                Modals.showAlertFail();
			            }
			            else
			            {
			            	$scope.RouteProviceList = setRouteProviceList(data.RouteProviceList);
							$scope.RouteStep = 2;
			            }
						
					});
				}
				else
				{
					Modals.showAlertSuccess();
					$scope.editRoute($scope.globalStatus.currentRouteId);
				}
			}
		});
		
	}

	$scope.saveRouteStep2 = function(isNext)
	{
		Routes.SaveRouteStep2($scope.RouteProviceList, $scope.globalStatus.currentRouteId, !isNext, function(data){
			if(data.ServiceStatus == "SAVEROUTESTEP2_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Routes.GetRoutePriceByRouteId($scope.globalStatus.currentRouteId, function(routePrice){
            		if(routePrice.ServiceStatus == "GETROUTEPRICENLIST_FAIL")
            		{
            			Modals.setAlert(Helpers.showErrorMessage(routePrice.FailMessages));
                		Modals.showAlertFail();
            		}
            		else
            		{

	            		$scope.RoutePriceList = setRoutePrice(routePrice);
	            		if(isNext)
	            		{
	            			$scope.RouteStep = 3;		
	            		}
	            		else
	            		{
	            			Modals.showAlertSuccess();
	            			$scope.editRoute($scope.globalStatus.currentRouteId);
	            		}
	            	}
            	});
            	
            }
		});
		
	}

	$scope.saveRouteStep3 = function()
	{


		$scope.RoutePriceList.RoutePriceList = [];
		$scope.RoutePriceList.RoutePriceList = $scope.EditRoutePriceBox;
		$scope.RoutePriceList.RouteAccountPriceList = [];
		$scope.RoutePriceList.RouteAccountPriceLis = $scope.EditRouteAccountPrice;
		$scope.RoutePriceList.RouteAgencyPriceList = [];
		$scope.RoutePriceList.RouteAgencyPriceList = $scope.EditRoutePriceAgency;
		$scope.RoutePriceList.RouteWebsitePriceList = [];
		$scope.RoutePriceList.RouteWebsitePriceList = $scope.EditRoutePriceWebsite;
		console.log($scope.EditRoutePriceBox);
		//Success
		 Routes.SaveRouteStep3( $scope.globalStatus.currentRouteId, function(data){
		 	///$scope.editRoute($scope.globalStatus.currentRouteId);
		 
		 Routes.SaveRouteStep3RoutePrice($scope.RoutePriceList.VehicleStandardList,$scope.RoutePriceList.VehicleTypeList,$scope.RoutePriceList.GradeList,$scope.EditRoutePriceBox,$scope.globalStatus.currentRouteId ,function(data)
		 {
		 	Routes.SaveRouteStep3RouteAccountPrice($scope.RoutePriceList.VehicleStandardList,$scope.RoutePriceList.VehicleTypeList,$scope.RoutePriceList.GradeList,$scope.EditRouteAccountPrice,$scope.globalStatus.currentRouteId ,function(data)
		 	{
		 			Routes.SaveRouteStep3RouteAgencyPrice($scope.RoutePriceList.VehicleStandardList,$scope.RoutePriceList.VehicleTypeList,$scope.RoutePriceList.GradeList,$scope.EditRoutePriceAgency,$scope.globalStatus.currentRouteId ,function(data)
		 			{
							Routes.SaveRouteStep3RouteWebsitePrice($scope.RoutePriceList.VehicleStandardList,$scope.RoutePriceList.VehicleTypeList,$scope.RoutePriceList.GradeList,$scope.EditRoutePriceWebsite,$scope.globalStatus.currentRouteId ,function(data)
		 					{
		 						
		 						$scope.editRoute($scope.globalStatus.currentRouteId);
		 						$scope.EditRoutePriceBox = [];
		 						$scope.EditRouteAccountPrice = [];
		 						$scope.EditRoutePriceAgency = [];
		 						$scope.EditRoutePriceWebsite = [];
		 					});
		 	        });
		 	 });
		 });
		 });



	}
	$scope.addEditPriceBox = function(price)
	{
		if($scope.EditRoutePriceBox.length >0)
		{
			$scope.IsEditRoutePriceBox = true;
			$scope.i = 0;
			console.log($scope.EditRoutePriceBox);
			angular.forEach($scope.EditRoutePriceBox, function(routeBoxPrice,key){
				if(price.RouteId == routeBoxPrice.RouteId && price.StopPointIdEnd ==routeBoxPrice.StopPointIdEnd &&price.StopPointIdStart==routeBoxPrice.StopPointIdStart &&price.VehicleStandardId == routeBoxPrice.VehicleStandardId && price.VehicleTypeId == routeBoxPrice.VehicleTypeId )
				{
					if(price.RouteTotalPrice != routeBoxPrice.RouteTotalPrice)
					{
						$scope.EditRoutePriceBox.splice($scope.key, 1);
						console.log($scope.EditRoutePriceBox);

					}
					else{
						$scope.IsEditRoutePriceBox = false;
					}
				
				}

				if($scope.EditRoutePriceBox.length-1 == key&&$scope.IsEditRoutePriceBox){
					$scope.EditRoutePriceBox.push(price);
					console.log($scope.EditRoutePriceBox);
					$scope.IsEditRoutePriceBox = true;

				}
				if($scope.EditRoutePriceBox.length-1 == key)
				{

					$scope.IsEditRoutePriceBox = true;
				}
			

			});


		}
		else
		{
			$scope.EditRoutePriceBox.push(price);
			console.log(price);

		}
		
		
		

	}

	$scope.addEditPriceAgency = function(price)
	{
		if($scope.EditRoutePriceAgency.length >0)
		{
			$scope.IsEditRoutePriceAgency = true;
			$scope.i = 0;
			console.log($scope.EditRoutePriceAgency);
			angular.forEach($scope.EditRoutePriceAgency, function(routePriceAgency,key){
				if(price.RouteId == routePriceAgency.RouteId && price.StopPointIdEnd ==routePriceAgency.StopPointIdEnd &&price.StopPointIdStart==routePriceAgency.StopPointIdStart &&price.VehicleStandardId == routePriceAgency.VehicleStandardId && price.VehicleTypeId == routePriceAgency.VehicleTypeId )
				{
					if(price.RouteTotalPrice != routePriceAgency.RouteTotalPrice)
					{
						$scope.EditRoutePriceAgency.splice($scope.key, 1);
						console.log($scope.EditRoutePriceAgency);

					}
					else{
						$scope.IsEditRoutePriceAgency = false;
					}
				
				}

				if($scope.EditRoutePriceAgency.length-1 == key&&$scope.IsEditRoutePriceAgency){
					$scope.EditRoutePriceAgency.push(price);
					console.log($scope.EditRouteAccountPrice);
					$scope.IsEditRoutePriceAgency = true;

				}
				if($scope.EditRoutePriceAgency.length-1 == key)
				{

					$scope.IsEditRoutePriceAgency = true;
				}
			

			});


		}
		else
		{
			$scope.EditRoutePriceAgency.push(price);
			console.log(price);

		}
		
		
		

	}

	$scope.addEditPriceAccount = function(price)
	{
		if($scope.EditRouteAccountPrice.length >0)
		{
			$scope.IsEditRouteAccountPrice = true;
			$scope.i = 0;
			console.log($scope.EditRouteAccountPrice);
			angular.forEach($scope.EditRouteAccountPrice, function(routeAccountPrice,key){
				if(price.RouteId == routeAccountPrice.RouteId && price.StopPointIdEnd ==routeAccountPrice.StopPointIdEnd &&price.StopPointIdStart==routeAccountPrice.StopPointIdStart &&price.VehicleStandardId == routeAccountPrice.VehicleStandardId && price.VehicleTypeId == routeAccountPrice.VehicleTypeId )
				{
					if(price.RouteTotalPrice != routeAccountPrice.RouteTotalPrice)
					{
						$scope.EditRouteAccountPrice.splice($scope.key, 1);
						console.log($scope.EditRouteAccountPrice);

					}
					else{
						$scope.IsEditRouteAccountPrice = false;
					}
				
				}

				if($scope.EditRouteAccountPrice.length-1 == key&&$scope.IsEditRouteAccountPrice){
					$scope.EditRouteAccountPrice.push(price);
					console.log($scope.EditRouteAccountPrice);
					$scope.IsEditRouteAccountPrice = true;

				}
				if($scope.EditRouteAccountPrice.length-1 == key)
				{

					$scope.IsEditRouteAccountPrice = true;
				}
			

			});


		}
		else
		{
			$scope.EditRouteAccountPrice.push(price);
			console.log(price);

		}
		
		
		

	}


	$scope.addEditPriceWebsite = function(price)
	{
		if($scope.EditRoutePriceWebsite.length >0)
		{
			$scope.IsEditRoutePriceWebsite = true;
			$scope.i = 0;
			console.log($scope.EditRoutePriceWebsite);
			angular.forEach($scope.EditRoutePriceWebsite, function(routePriceWebsite,key){
				if(price.RouteId == routePriceWebsite.RouteId && price.StopPointIdEnd ==routePriceWebsite.StopPointIdEnd &&price.StopPointIdStart==routePriceWebsite.StopPointIdStart &&price.VehicleStandardId == routePriceWebsite.VehicleStandardId && price.VehicleTypeId == routePriceWebsite.VehicleTypeId )
				{
					if(price.RouteTotalPrice != routePriceWebsite.RouteTotalPrice)
					{
						$scope.EditRoutePriceWebsite.splice($scope.key, 1);
						console.log($scope.EditRoutePriceWebsite);

					}
					else{
						$scope.IsEditRoutePriceWebsite = false;
					}
				
				}

				if($scope.EditRoutePriceWebsite.length-1 == key&&$scope.IsEditRoutePriceWebsite){
					$scope.EditRoutePriceWebsite.push(price);
					console.log($scope.EditRoutePriceWebsite);
					$scope.IsEditRoutePriceWebsite = true;

				}
				if($scope.EditRoutePriceWebsite.length-1 == key)
				{

					$scope.IsEditRoutePriceWebsite = true;
				}
			

			});


		}
		else
		{
			$scope.EditRoutePriceWebsite.push(price);
			console.log(price);

		}
		
		
		

	}

	var selectStopPoint = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/select-stop-point-modal.html', show: false });
	$scope.openSelectModalStopPoint = function(ProvinceId)
	{
		$scope.globalStatus.currentProvince = ProvinceId;
		Routes.GetStopPointListByProvinceId(ProvinceId, function(data){
			if(data.ServiceStatus == "GETSTOPPOINT_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				
				//Check already select stop point
				$scope.StopPointList = setStopPointList(data.StopPointList);

				selectStopPoint.$promise.then(selectStopPoint.show);
			}
		});
	}

	$scope.addProvince = function()
	{
		$scope.RouteProviceList.push(
		{
			ProvinceId : 0,
			StopPointList : [],
			hash : Math.random().toString(36).substring(7)
		});

		$scope.globalStatus.IsRouteProviceActive = ($scope.RouteProviceList.length-1);
	}

	$scope.removeProvince = function(hash)
	{
		var temp = [];
		var currentParentIndex = 0;
		var currentProvinceOrder = 1;
		angular.forEach($scope.RouteProviceList, function(data){
			if(data.hash != hash)
			{
				angular.forEach(data.StopPointList, function(eachStopPoint){
					eachStopPoint.ProvinceOrder = currentProvinceOrder;
				});

				data.parentIndex = currentParentIndex;
				temp.push(data);	

				currentParentIndex++;
				currentProvinceOrder++;
			}
		});

		$scope.RouteProviceList = temp;
		$scope.globalStatus.IsRouteProviceActive = 0;
	}

	$scope.checkProvinceStopPoint = function()
	{
		var isError = false;
		var countStopPoint = 0;
		angular.forEach($scope.RouteProviceList, function(data){
			if(data.StopPointList == null || data.StopPointList.length == 0)
			{
				isError = true;
			}
			else
			{
				countStopPoint += data.StopPointList.length;
			}
		});

		if(countStopPoint <= 1)
		{
			isError = true;
		}

		return isError;
	}

	$scope.selectStopPoint = function(StopPointId,IsTransit)
	{
		angular.forEach($scope.RouteProviceList, function(eachProvince){
			if(eachProvince.ProvinceId == $scope.globalStatus.currentProvince)
			{
				if(eachProvince.StopPointList == null)
				{
					eachProvince.StopPointList = [];
				}

				eachProvince.StopPointList.push(
				{
					ProvinceOrder : $scope.globalStatus.IsRouteProviceActive + 1,
					RouteOrder : eachProvince.StopPointList.length + 1,
					StopPointId : StopPointId,
					IsTransit : IsTransit
				});
			}
		});

		var temp = [];
		angular.forEach($scope.StopPointList, function(each){
			if(each.StopPointId != StopPointId)
			{
				temp.push(each);
			}
		});
		$scope.StopPointList = temp;
	}

	$scope.removeStopPoint = function(StopPointId, RouteOrder, hash)
	{
		var temp = [];
		angular.forEach($scope.RouteProviceList, function(eachProvince){
			if(eachProvince.hash == hash)
			{
				angular.forEach(eachProvince.StopPointList, function(eachStopPoint)
				{
					if(eachStopPoint.StopPointId != StopPointId)
					{
						if(eachStopPoint.RouteOrder > RouteOrder)
						{
							eachStopPoint.RouteOrder = eachStopPoint.RouteOrder - 1;
						}
						temp.push(eachStopPoint);
					}
				});
				eachProvince.StopPointList = temp;
			}
		});
	}

	/*
		Sort
	*/
	$scope.sortUp = function(StopPointId, RouteOrder, hash)
	{
		$scope.globalStatus.currentSortUpStopId = StopPointId;
		$timeout(function(){
			$scope.globalStatus.currentSortUpStopId = null;
		},500);
		angular.forEach($scope.RouteProviceList, function(eachProvince){
			
			if(eachProvince.hash == hash)
			{
				angular.forEach(eachProvince.StopPointList, function(eachStopPoint)
				{
					if(eachStopPoint.StopPointId == StopPointId)
					{
						eachStopPoint.RouteOrder = eachStopPoint.RouteOrder - 1;
					}
					else if(eachStopPoint.RouteOrder == (RouteOrder-1))
					{
						eachStopPoint.RouteOrder = eachStopPoint.RouteOrder + 1;
					}
				});
			}
		});
	}

	$scope.sortDown = function(StopPointId, RouteOrder, hash)
	{
		$scope.globalStatus.currentSortDownStopId = StopPointId;
		$timeout(function(){
			$scope.globalStatus.currentSortDownStopId = null;
		},500);
		angular.forEach($scope.RouteProviceList, function(eachProvince){
			
			if(eachProvince.hash == hash)
			{
				angular.forEach(eachProvince.StopPointList, function(eachStopPoint)
				{
					if(eachStopPoint.StopPointId == StopPointId)
					{
						eachStopPoint.RouteOrder = eachStopPoint.RouteOrder + 1;
					}
					else if(eachStopPoint.RouteOrder == (RouteOrder+1))
					{
						eachStopPoint.RouteOrder = eachStopPoint.RouteOrder - 1;
					}
				});
			}
		});
	}

	$scope.sortLeft = function(Province, OldOrder)
	{
		var previousOrder = OldOrder - 1;
		var currentOrder = OldOrder;

		for(var i = 0; i < $scope.RouteProviceList.length; i++)
		{
			if(i == previousOrder)
			{
				Province.parentIndex = previousOrder;
				angular.forEach(Province.StopPointList, function(eachData){
					eachData.ProvinceOrder = Province.parentIndex - 1;
				});
				var temp = $scope.RouteProviceList[i];
				$scope.RouteProviceList[i] = Province;
				$scope.RouteProviceList[i+1] = temp;
			}
			else if(i == currentOrder)
			{
				$scope.RouteProviceList[i].parentIndex = currentOrder;
				angular.forEach($scope.RouteProviceList[i].StopPointList, function(eachData){
					eachData.ProvinceOrder = $scope.RouteProviceList[i].parentIndex + 1;
				});
			}
		}

		$scope.globalStatus.IsRouteProviceActive = previousOrder;
	}

	$scope.sortRight = function(Province, OldOrder)
	{
		var nextOrder = OldOrder + 1;
		var currentOrder = OldOrder;

		for(var i = 0; i < $scope.RouteProviceList.length; i++)
		{
			if(i == nextOrder)
			{
				Province.parentIndex = nextOrder;
				angular.forEach(Province.StopPointList, function(eachData){
					eachData.ProvinceOrder = Province.parentIndex + 1;
				});
				var temp = $scope.RouteProviceList[i];
				$scope.RouteProviceList[i] = Province;
				$scope.RouteProviceList[i-1] = temp;
				$scope.RouteProviceList[i-1].parentIndex = currentOrder;
				angular.forEach($scope.RouteProviceList[i-1].StopPointList, function(eachData){
					eachData.ProvinceOrder = $scope.RouteProviceList[i-1].parentIndex - 1;
				});
			}
		}

		$scope.globalStatus.IsRouteProviceActive = nextOrder;
	}

	/*
		Hilight Button
	*/
	$scope.hilightButton = function(startIndex, endIndex)
	{
		$scope.globalStatus.startIndex = startIndex;
		$scope.globalStatus.endIndex = endIndex;
	}

	$scope.unHilightButton = function()
	{
		$scope.globalStatus.startIndex = null;
		$scope.globalStatus.endIndex = null;
	}

	/*
		Change Step
	*/
	$scope.changeRouteStep = function(step) 
	{
		$scope.RouteStep = step;
		if(step ==1 ){
					///$scope.selectVehicleTypeList = [];
					console.log($scope.globalStatus.currentRouteId);
					Routes.GetRouteInVehicleType($scope.globalStatus.currentRouteId, function(RouteInVehicleType){
						Routes.GetRouteDurationInVehicleTypeList($scope.globalStatus.currentRouteId, function(route){
							$scope.RouteDuration = route.RouteDurationInVehicleTypeList;
							});
						///angular.forEach(RouteInVehicleType.RouteInVehicleTypeList, function(VehicleType, key){
							///var KeepArray = VehicleType.split(',');
						///	console.log(VehicleType);
							////$scope.slectVehicleType1(VehicleType.VehicleTypeId,VehicleType.VehicleTypeName);
							
							///$scope.selectVehicleTypeList.push(VehicleType.VehicleTypeId+','+VehicleType.VehicleTypeName);
							///console.log($scope.selectVehicleTypeList);

						///});
						
					
					});
					
			


		}
	}

	$scope.backToState = function(step)
	{
		$scope.currentState = step;
		$scope.initData();
	}


	/*
		Function
	*/

	$scope.resetFilter = function()
	{
		$scope.filter = {
			filterStartStopPoint : "",
			filterEndStopPoint : "",
			filterSearchStopPoint : ""
		}
	}

	$scope.numberOfRouteOrder = function(parentIndex, routeOrder)
	{
		if(parentIndex == 0)
		{
			return routeOrder;
		}
		else if(angular.isUndefined(routeOrder))
		{
			routeOrder = 0;
			for(var i = 0; i < parentIndex; i++)
			{
				routeOrder += $scope.RouteProviceList[i].StopPointList.length;
			}
		}
		else
		{
			for(var i = 0; i < parentIndex; i++)
			{
				routeOrder += $scope.RouteProviceList[i].StopPointList.length;
			}
		}
		return routeOrder;
	}

	var setRouteProviceList = function(RouteProviceList)
	{
		var loopCount = 0;
		angular.forEach(RouteProviceList, function(data){
			data.parentIndex = loopCount;
			loopCount++;
		});

		return RouteProviceList;
	}

	var setStopPointList = function(data)
	{
		var temp = [];
		angular.forEach($scope.RouteProviceList, function(eachProvince){
			if(eachProvince.ProvinceId == $scope.globalStatus.currentProvince)
			{
				angular.forEach(data, function(eachList){
					var isDupp = false;
					angular.forEach(eachProvince.StopPointList, function(eachStopPoint){

						if(eachList.StopPointId == eachStopPoint.StopPointId)
						{
							isDupp = true;
						}
					});
					if(!isDupp)
					{
						temp.push(eachList);
					}
				});
			}
		});

		return temp;
	}

	var setRoutePrice = function(data)
	{
		var temp = [];
		var tempAccount = [];
		var tempAgency = [];
		var tempWebsite = [];
		var loopCount = 0;
		var tempStartStopPoint = null;

		//Box Price
		angular.forEach(data.RoutePrice, function(eachRoutePrice){

			if(eachRoutePrice.RoutePriceList.length > 0)
			{
				if(eachRoutePrice.RoutePriceList[0].StopPointIdStart != tempStartStopPoint)
				{
					if(loopCount == 0)
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointIdStart);	
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointIdStart;
					}
					else if(loopCount == data.RoutePrice.length-1)
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointIdStart);
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointIdEnd);
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointIdEnd;
					}
					else
					{
						temp.push(eachRoutePrice.RoutePriceList[0].StopPointIdStart);
						tempStartStopPoint = eachRoutePrice.RoutePriceList[0].StopPointIdStart;
					}
				}
			}

			if(data.RoutePrice.length == 1)
			{
				temp.push(eachRoutePrice.RoutePriceList[0].StopPointIdEnd);
			}
			loopCount++;
		});
		data.Pyramid = temp;

		//Agency Price
		loopCount = 0;
		tempStartStopPoint = null;
		angular.forEach(data.RouteAgencyPrice, function(eachRoutePrice){
			if(eachRoutePrice.RouteAgencyPriceList.length > 0)
			{
				if(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart != tempStartStopPoint)
				{
					if(loopCount == 0)
					{
						tempAgency.push(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart);	
						tempStartStopPoint = eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart;
					}
					else if(loopCount == data.RoutePrice.length-1)
					{
						tempAgency.push(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart);
						tempAgency.push(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdEnd);
						tempStartStopPoint = eachRoutePrice.RouteAgencyPriceList[0].StopPointIdEnd;
					}
					else
					{
						tempAgency.push(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart);
						tempStartStopPoint = eachRoutePrice.RouteAgencyPriceList[0].StopPointIdStart;
					}
				}
			}

			if(data.RouteAgencyPrice.length == 1)
			{
				tempAgency.push(eachRoutePrice.RouteAgencyPriceList[0].StopPointIdEnd);
			}

			loopCount++;
		});
		data.PyramidAgency = tempAgency;

		//Account Price
		loopCount = 0;
		tempStartStopPoint = null;
		angular.forEach(data.RouteAccountPrice, function(eachRoutePrice){
			if(eachRoutePrice.RouteAccountPriceList.length > 0)
			{
				if(eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart != tempStartStopPoint)
				{
					if(loopCount == 0)
					{
						tempAccount.push(eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart);	
						tempStartStopPoint = eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart;
					}
					else if(loopCount == data.RoutePrice.length-1)
					{
						tempAccount.push(eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart);
						tempAccount.push(eachRoutePrice.RouteAccountPriceList[0].StopPointIdEnd);
						tempStartStopPoint = eachRoutePrice.RouteAccountPriceList[0].StopPointIdEnd;
					}
					else
					{
						tempAccount.push(eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart);
						tempStartStopPoint = eachRoutePrice.RouteAccountPriceList[0].StopPointIdStart;
					}
				}
			}

			if(data.RouteAccountPrice.length == 1)
			{
				tempAccount.push(eachRoutePrice.RouteAccountPriceList[0].StopPointIdEnd);
			}
			loopCount++;
		});
		data.PyramidAccount = tempAccount;

		//Website Price
		loopCount = 0;
		tempStartStopPoint = null;
		angular.forEach(data.RouteWebsitePrice, function(eachRoutePrice){
			if(eachRoutePrice.RouteWebsitePriceList.length > 0)
			{
				if(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart != tempStartStopPoint)
				{
					if(loopCount == 0)
					{
						tempWebsite.push(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart);	
						tempStartStopPoint = eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart;
					}
					else if(loopCount == data.RoutePrice.length-1)
					{
						tempWebsite.push(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart);
						tempWebsite.push(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdEnd);
						tempStartStopPoint = eachRoutePrice.RouteWebsitePriceList[0].StopPointIdEnd;
					}
					else
					{
						tempWebsite.push(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart);
						tempStartStopPoint = eachRoutePrice.RouteWebsitePriceList[0].StopPointIdStart;
					}
				}
			}

			if(data.RouteWebsitePrice.length == 1)
			{
				tempWebsite.push(eachRoutePrice.RouteWebsitePriceList[0].StopPointIdEnd);
			}

			loopCount++;
		});
		data.PyramidWebsite = tempWebsite;
		

		return data;
	}

	$scope.getArrayNumber = function(number)
	{
		if(number > 0)
		{
			return new Array(number);
		}
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.RouteData.RouteList,
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
