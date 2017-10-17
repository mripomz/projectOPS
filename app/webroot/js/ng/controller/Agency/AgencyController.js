module.controller('AgencyCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "Agency", "Discount", "Banks", "Lightbox", "Routes", function ($rootScope, $scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, Agency, Discount, Banks, Lightbox, Routes) {
	
	$scope.userId = $cookies.get("CakeCookie[userId]");
	$scope.AccountBankList = [];
	$scope.AgencyAccountBankList = [];
	$scope.gradeList = [];
    $scope.errorMsg = {
        isError : false,
        message : ""
    }

    $scope.globalVariable = {
    	DataSetting_IsEdit : false,
    	currentDate : new Date(),
    	AgencyGradePriceId : null,
		AgencyName : "",
		GradeIdBuy : 0,
		isAgencySettingActive : 0
    }

    $scope.DataSetting_Agency_Ticket_Setting = 
    {
    	AgencyName : "",
    	AgencyLogoFileUploadId : null,
    	AgencyBackgroundFileUploadId : null,
    	AgencyTitleDisplay : 0,
    	AgencyTitleFontSize : 26,
    	AgencyTitlePosition : 0,
    }

    $scope.agencyPriceDetail = {};

	$scope.DataSetting_init = function()
	{
		Agency.GetAgencyTicketSettingById($scope.userId, function(data){

			$scope.DataSetting_Agency_Ticket_Setting = data;

			Banks.GetAccountBankList(function(bankList)
			{
				Routes.GetRouteCompletedList(true, function(vehicleRouteList)
				{
					$scope.VehicleRoute = vehicleRouteList.RouteList;
				});
				$scope.AccountBankList = bankList.AccountBankTypeList;
				$scope.DataSetting_loadData();
			});
		});

		Discount.GetGradeList(function(dataGrade){

			$scope.gradeList = dataGrade.GradeList;

			Agency.GetAgencyManagePriceByUserId($scope.userId, function(priceDetail)
			{
				$scope.agencyPriceDetail = priceDetail;

				$scope.AgencyManagementPrice(
					$scope.agencyPriceDetail.AgencyGradePriceId, 
					($scope.agencyPriceDetail.FirstName + ' ' + $scope.agencyPriceDetail.LastName), 
					$scope.agencyPriceDetail.GradeIdBuy);
			});
		});
	}

	$scope.DataSetting_loadData = function()
	{
		Banks.GetAccountBankForAgency($scope.userId, function(data)
		{
			$scope.AgencyAccountBankList = data.AgencyAccountBankList;
			angular.forEach($scope.AgencyAccountBankList, function(each){
				each.IsEdit = false;
			});
		});
	}

	$scope.DataSetting_addBankAccount = function()
	{
		var data = {       
	        UserId : $scope.userId,
	        AccountBankTypeId : 0,
	        AccountBankNumber : "",
	        AccountType : "ออมทรัพย์",
	        AccountBankName : "",
	        AccountBankBranch : "",
	        AccountBankNotes : "",
	        IsEdit : true,
	        IsActived : true
		};

		$scope.AgencyAccountBankList.push(data);

		console.log($scope.AgencyAccountBankList);
		$scope.globalVariable.DataSetting_IsEdit = true;
	}

	$scope.DataSetting_SaveBankAccount = function(data)
	{
		Banks.SaveAccountForAgency(data, function(result){
			if(result.ServiceStatus == "UPDATEAGENCYMANAGEPRICE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(result.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.DataSetting_loadData();
			}
		});
	}

	$scope.DataSetting_RemoveBankAccount = function(AccountId)
	{
		Banks.RemoveAccountForAgency(AccountId, function(result){
			if(result.ServiceStatus == "REMOVEACCOUNTFORAGENCY_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(result.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.DataSetting_loadData();
			}
		});
	}

	$scope.UpdateAgencySetting = function()
	{
		Agency.UpdateAgencySetting($scope.DataSetting_Agency_Ticket_Setting, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLETAX_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();	
			}
			else
			{
				Modals.showAlertSuccess();	
				$scope.DataSetting_Agency_Ticket_Setting = data;
			}
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
		});
	}

	$scope.updateAgencyPricePerRoute = function(agencyPrice)
	{
		Agency.UpdateAgencyManagePricePerRouteByAgency(agencyPrice, function(data){
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

	var viewPriceAgencySampleModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/view-agency-profit-price-sample-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.viewAgencyPriceSample = function(agencyPricePerRoute)
	{
		$scope.currentAgencyPrice = agencyPricePerRoute;
		Agency.GetAgencyRoutePriceSample(
			$scope.globalVariable.GradeIdBuy,
			agencyPricePerRoute.RouteId,
			function(result)
			{

				$scope.agencyPriceSample = result.RouteAgencyPrice;
				viewPriceAgencySampleModal.$promise.then(viewPriceAgencySampleModal.show);
			}
		);
	}

	$scope.calculatePrice = function(priceDetail,typeCalculate)
	{
		var totalPrice = 0;
		var beforeFixed = 0;
		
		
		if($scope.currentAgencyPrice.IsPriceAdminPercent)
		{
			beforeFixed = priceDetail.RouteTotalPrice + (priceDetail.RouteTotalPrice * ($scope.currentAgencyPrice.PriceAdminSet/100));
		}
		else
		{
			beforeFixed = priceDetail.RouteTotalPrice + $scope.currentAgencyPrice.PriceAdminSet;
		}

		switch(typeCalculate)
		{
			case 'current':
				totalPrice = beforeFixed;
				break;
			case 'fixed':
				if($scope.currentAgencyPrice.IsPriceAgencyPercent)
				{
					totalPrice = beforeFixed + (beforeFixed * ($scope.currentAgencyPrice.PriceAgencySet/100));
				}
				else
				{
					totalPrice = beforeFixed + $scope.currentAgencyPrice.PriceAgencySet;
				}
				break;
			case 'profit':
				if($scope.currentAgencyPrice.IsPriceAgencyPercent)
				{
					/////console.log('IsPriceAgencyPercent');
					totalPrice = beforeFixed + (beforeFixed * ($scope.currentAgencyPrice.PriceAgencySet/100));
				}
				else
				{
					console.log($scope.currentAgencyPrice.PriceAgencySet);
					totalPrice = beforeFixed + $scope.currentAgencyPrice.PriceAgencySet;
				}
				totalPrice = totalPrice - beforeFixed;
				break;
		}

		return totalPrice;
		
	}

	/*
		AgencySetting Upload File
	*/
	var uploadAgencyLogoModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/upload-agency-logo-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.DataSetting_UploadAgencyLogo = function()
	{
		uploadAgencyLogoModal.$promise.then(uploadAgencyLogoModal.show);
	}

	var uploadAgencyBackgroundModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/upload-agency-background-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.DataSetting_UploadAgencyBackground = function()
	{
		uploadAgencyBackgroundModal.$promise.then(uploadAgencyBackgroundModal.show);
	}

	$scope.uploadAgencyLogoSuccess = function(data)
	{
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileUploadId = data.AgencyLogoFileUploadId;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileUploadUrl = data.AgencyLogoFileUploadUrl;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileName = data.AgencyLogoFileName;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoContentType = data.AgencyLogoContentType;
		$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
	    $rootScope.$broadcast('clearqueue');
		uploadAgencyLogoModal.$promise.then(uploadAgencyLogoModal.hide);
	}

	$scope.removeAgencyLogo = function()
	{
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileUploadId = null;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileUploadUrl = "";
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoFileName = "";
		$scope.DataSetting_Agency_Ticket_Setting.AgencyLogoContentType = "";
	}

	$scope.uploadAgencyBackgroundSuccess = function(data)
	{
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileUploadId = data.AgencyBackgroundFileUploadId;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileUploadUrl = data.AgencyBackgroundFileUploadUrl;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileName = data.AgencyBackgroundFileName;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundContentType = data.AgencyBackgroundContentType;
		$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
	    $rootScope.$broadcast('clearqueue');
		uploadAgencyBackgroundModal.$promise.then(uploadAgencyBackgroundModal.hide);
	}

	$scope.removeAgencyBackground = function(Test)
	{
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileUploadId = null;
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileUploadUrl = "";
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileName ="";
		$scope.DataSetting_Agency_Ticket_Setting.AgencyBackgroundContentType = "";
	}


	
	$scope.loadingFiles = false;
    $scope.currentProcess = {
    	fileInQueue : false
    }
    $scope.queue = [];
    $scope.queueInsurance = [];

    $scope.$on('fileuploadstop', function(data, response){
    	$scope.currentProcess.fileInQueue = false;
    });

    $scope.$on('fileuploadadd', function(data){
    	$scope.currentProcess.fileInQueue = true;
    });

    $scope.$on('fileuploaddone', function(data, response){

    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    	}

    	if(response.result.ServiceStatus == "UPLOADAGENCYLOGO_SUCCESS")
    	{
    		$scope.uploadAgencyLogoSuccess(response.result);
    	}
    	else if(response.result.ServiceStatus == "UPLOADAGENCYBACKGROUND_SUCCESS")
    	{
    		$scope.uploadAgencyBackgroundSuccess(response.result);
    	}
    });

    $scope.$on('fileuploadfail', function(data){
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    	}
    });

	$scope.optionsAgencyLogo = {
    	url: api + "/Agencies/UploadAgencyLogo?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&userId=" + $scope.userId
    };
    $scope.optionsAgencyBackground = {
    	url: api + "/Agencies/UploadAgencyBackground?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&userId=" + $scope.userId
    };

	/*
		HELPER FUNCTION
	*/
	$scope.openLightboxModal = function (url) {
		var images = [
			{
				'url' : url,
				'thumbUrl' : url
			}
		];
	    Lightbox.openModal($scope, images, 0);
	};

}]);