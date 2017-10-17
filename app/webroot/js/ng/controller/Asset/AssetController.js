module.controller('AssetCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "$http", "Assets", "$alert", "Lightbox", "$filter", "$sce", "SeatCapacityArrangement", "Locations", function ($rootScope, $scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, $http, Assets, $alert, Lightbox, $filter, $sce, SeatCapacityArrangement, Locations) {
	
	$scope.currentState = 1;
	$scope.mainData = [];
	$scope.mainInsurance = [];
	$scope.mainAct = [];
	$scope.mainTax = [];
	$scope.mainLeasing = [];
	$scope.months = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
	$scope.selectedMonth = "";
	$scope.vehicleDetail = {
		PlateNumber : ""
	};
	$scope.vehicleInsuranceDetail = {};
	$scope.vehicleActDetail = {};
	$scope.vehicleLeasingDetail = {};
	$scope.taxDetail = {};
	$scope.taxDateDetail = {};

	$scope.currentVehicleId = "";
	$scope.currentVehicleLeaseId = "";
	$scope.VehicleTypeList = [];
	$scope.vehicleGalleryList = [];
	$scope.vehicleLeasingFileList = [];
	$scope.VehicleLeaseDetail = {
		LeasePeriodList : []
	};
	
	$scope.errorMsg = {
		isError : false,
		message : ""
	}

	$scope.globalStatus = {
		isOwnershipChanged : false,
		isInvalidDate : false,
		isActivityEdit : false,
		IsFloorManageActive : 0,
		chooseTemplateSeat : "",
		isEditSeatPlan : false,
		viewSeatCapacityActive : 0
	}

	$scope.options = {
        url: api + "/Assets/UploadFilesVehicle?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
    };

    $scope.optionsInsurance = {
    	url: api + "/Assets/UploadFilesVehicleInsurance?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))	
    }

    $scope.optionsAct = {
    	url: api + "/Assets/UploadFilesVehicleAct?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))	
    }

    $scope.optionsLeasing = {
        url: api + "/Assets/UploadFilesVehicleLease?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
    };

    $scope.optionsLeasingDetail = {
    	url: api + "/Assets/UploadFilesVehicleLeasePeriod?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
    };

    $scope.optionsTaxAnnual = {
    	url: api + "/Assets/UploadFilesVehicleTaxData?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&Type=ANNUAL"
    };

    $scope.optionsTaxHalfYear = {
    	url: api + "/Assets/UploadFilesVehicleTaxData?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&Type=HALFYEAR"
    };

    /* Status Payment Lease */
    $scope.paymentDisplay = ["ยังไม่ได้ชำระ","ชำระแล้วพร้อมใบรับชำระ","ชำระแล้วพร้อมใบเสร็จ","จ่ายปิดงวด","ปิดแล้ว"];
    $scope.paymentStatus = [
    	{
    		status : 0,
    		display : "ยังไม่ได้ชำระ"
    	},
    	{
    		status : 1,
    		display : "ชำระแล้วพร้อมใบรับชำระ"
    	},
    	{
    		status : 2,
    		display : "ชำระแล้วพร้อมใบเสร็จ"
    	},
    	{
    		status : 3,
    		display : "จ่ายปิดงวด"
    	}
    ];

    //FirstPAGE
	$scope.initData = function()
	{
		$scope.globalStatus.isOwnershipChanged = false;
		$scope.currentState = 1;
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.mainData = [];
		$scope.mainInsurance = [];
		$scope.mainAct = [];
		$scope.mainLeasing = [];

		$scope.vehicleDetail = {};
		$scope.vehicleInsuranceDetail = {};
		$scope.vehicleActDetail = {};
		$scope.vehicleLeasingDetail = {};

		$scope.currentVehicleId = "";
		$scope.vehicleGalleryList = [];
		$scope.vehicleLeasingFileList = [];
		$scope.taxDetail = {};
		$scope.taxDateDetail = {};
		$scope.taxDateDetail.StartHalfYearDueDate = 'กรุณาเลือกเดือน';
		$scope.selectedMonth = "";

		Assets.GetAllVehicle(function(data){
			$scope.mainData = data.VehicleList;
		});

		//Set duration time for route
		Assets.GetVehicleTypeList(function(data){
			$scope.VehicleTypeList = data.VehicleTypeList;
		});

		Locations.GetAllProvinces(function(data){
			$scope.ProvicesList = data;
		});
	}

	$scope.openLightboxModal = function (url) {
		var images = [
			{
				'url' : url,
				'thumbUrl' : url
			}
		];
	    Lightbox.openModal($scope, images, 0);
	};

	var addNewVehicleModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/create-vehicle-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.addNewVehicle = function()
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleDetail = {};

		addNewVehicleModal.$promise.then(addNewVehicleModal.show);
	}

	/*
		VEHICLE DETAIL
	*/
	$scope.saveVehicle = function()
	{
		Assets.CreateVehicle($scope.vehicleDetail.ChassisNumber, $scope.vehicleDetail.PlateNumber,$scope.vehicleDetail.VehicleNumber, $scope.vehicleDetail.PlateProvince, $scope.vehicleDetail.VehicleTypeId,$scope.vehicleDetail.IsServicePickupDropOff, function(data){
			if(data.ServiceStatus == "CREATEVEHICLE_FAIL")
			{

				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
				console.log($scope.errorMsg.message);
			}
			else
			{

				
				addNewVehicleModal.$promise.then(addNewVehicleModal.hide);
				$scope.options.url = api + "/Assets/UploadFilesVehicle?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&VehicleId=" + data.VehicleId;
				Assets.GetVehicleById(data.VehicleId, function(data2){
					$scope.currentVehicleId = data2.VehicleId;
					$scope.LoadVehicleFileList();
					$scope.LoadVehicleInsurance();
					$scope.LoadVehicleAct();
					$scope.LoadVehicleLeases();

					SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(themeList){
						$scope.TemplateSeatList = themeList.SeatPlanList;
					});
					
					$scope.vehicleDetail = data2;
					$scope.currentState = 2;	
				});
			}
		});
	}

	$scope.editVehicle = function(VehicleId)
	{

		$rootScope.$broadcast('clearqueue');
		$scope.currentVehicleId = VehicleId;
		Assets.GetVehicleById(VehicleId, function(data){
			$scope.vehicleDetail = {};
			SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(themeList){
				$scope.TemplateSeatList = themeList.SeatPlanList;
			});

			$scope.getVehicleTaxList();
			$scope.options.url = api + "/Assets/UploadFilesVehicle?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&VehicleId="+data.VehicleId;
			$scope.LoadVehicleFileList();
			$scope.LoadVehicleInsurance();
			$scope.LoadVehicleAct();
			$scope.LoadVehicleLeases();
			$scope.vehicleDetail = data;
			$scope.currentState = 2;	
		});
	}

	$scope.updateVehicle = function()
	{

		Assets.UpdateVehicle($scope.vehicleDetail, function(data){
			
			if(data.ServiceStatus == "UPDATEVEHICLE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				$scope.editVehicle($scope.currentVehicleId);
				Modals.showAlertSuccess();
			}
		});

		$scope.globalStatus.isOwnershipChanged = false;
	}

	$scope.removedVehicle = function(VehicleId)
	{
		Assets.RemovedVehicle(VehicleId, function(){
			$scope.initData();
		});
	}

	$scope.backtoMain = function()
	{
		$scope.initData();
	}
	/*
		END VEHICLE DETAIL
	*/
	
	/*
		VEHICLE TAX
	*/
	$scope.getVehicleTaxList = function()
	{
		Assets.GetVehicleTaxDateById($scope.currentVehicleId, function(dateData){

			$scope.taxDateDetail = dateData;
			console.log($scope.taxDateDetail);
			$scope.taxDateDetail.StartAnualTaxDueDate = $filter("jsonDate")($scope.taxDateDetail.StartAnualTaxDueDate,"MM/dd/yyyy");
			$scope.taxDateDetail.StartHalfYearDueDate = $scope.taxDateDetail.StartHalfYearDueDate;
			Assets.GetVehicleTaxListById($scope.currentVehicleId, function(data){
				$scope.mainTax = data;
				angular.forEach($scope.mainTax.TaxList, function(each){
					each.AnualDueDate = each.AnualTaxDueDate;
					each.HalfDueDate = each.HalfYearDueDate;
					each.AnualTaxDueDate = $filter("jsonDate")(each.AnualTaxDueDate,"dd/MM/yyyy");
					each.HalfYearDueDate = $filter("jsonDate")(each.HalfYearDueDate,"dd/MM/yyyy");
				});
			});
		});
	}

	var VehicleTaxModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/update-vehicle-tax-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.editVehicleTax = function(VehicleTaxId)
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		if (typeof VehicleTaxId == 'undefined')
		{
			$scope.taxDetail = {};
			$scope.taxDetail.IsActive = true;
			$scope.taxDetail.isUploadHalfYearActive = false;
			$scope.taxDetail.isUploadAnnualActive = false;
			VehicleTaxModal.$promise.then(VehicleTaxModal.show);
		}
		else
		{
			$scope.taxDetail = {};
			Assets.GetVehicleTaxById(VehicleTaxId, function(data){

				if(data.ServiceStatus == "GETVEHICLETAX_FAIL")
				{
					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
					Modals.showAlertFail();
				}
				else
				{
					$scope.taxDetail = data;
					$scope.taxDetail.AnualTaxDueDate = $filter("jsonDate")($scope.taxDetail.AnualTaxDueDate,"MM/dd/yyyy");
					$scope.taxDetail.HalfYearDueDate = $filter("jsonDate")($scope.taxDetail.HalfYearDueDate,"MM/dd/yyyy");
					$scope.taxDetail.taxDueDate = $filter("jsonDate")($scope.taxDetail.taxDueDate,"MM/dd/yyyy");
					$scope.taxDetail.isUploadHalfYearActive = false;
					$scope.taxDetail.isUploadAnnualActive = false;

					if($scope.taxDetail.AnnualCompanyVehicle == 0)
					{
						$scope.taxDetail.AnnualCompanyVehicle = "";
					}

					if($scope.taxDetail.AnnualAffiliateVehicle == 0)
					{
						$scope.taxDetail.AnnualAffiliateVehicle = "";
					}

					if($scope.taxDetail.HalfYearCompanyVehicle == 0)
					{
						$scope.taxDetail.HalfYearCompanyVehicle = "";
					}

					if($scope.taxDetail.HalfYearAffiliateVehicle == 0)
					{
						$scope.taxDetail.HalfYearAffiliateVehicle = "";
					}

					VehicleTaxModal.$promise.then(VehicleTaxModal.show);
				}
			});
		}
	}

	$scope.updateVehicleTax = function(showModal)
	{
		if (typeof myVar == 'undefined')
		{
			showModal = true;
		}

		$scope.taxDetail.VehicleId = $scope.currentVehicleId;
		Assets.UpdateVehicleTax($scope.taxDetail, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLETAX_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.getVehicleTaxList();
				VehicleTaxModal.$promise.then(VehicleTaxModal.hide);
			}
		});
	}

	$scope.updateVehicleTaxDate = function()
	{
		$scope.taxDateDetail.VehicleId = $scope.currentVehicleId;
		///$scope.taxDateDetail.StartHalfYearDueDate = $scope.selectedMonth;
		console.log($scope.taxDateDetail.StartHalfYearDueDate);
			///console.log($scope.taxDateDetail.StartHalfYearDueDate);
		Assets.UpdateVehicleTaxDate($scope.taxDateDetail, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLETAXDATE_FAIL")
			{	
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.getVehicleTaxList();
			}
		});
	}

	$scope.RemoveVehicleTax = function(VehicleTaxId)
	{
		Assets.RemoveVehicleTax(VehicleTaxId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLETAX_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();	
			}
			else
			{
				Modals.showAlertSuccess();	
				$scope.getVehicleTaxList();
			}
		});
	}

	$scope.uploadVehicleTaxDateAnnual = function(data)
	{
		$scope.taxDetail.AnnualFileUploadId = data.AnnualFileUploadId;
		$scope.taxDetail.AnnualFileUrl = data.AnnualFileUrl;
		$scope.taxDetail.AnnualContentType = data.AnnualContentType;
		$scope.taxDetail.AnnualFileName = data.AnnualFileName;

	}

	$scope.uploadVehicleTaxDateHalfYear = function(data)
	{
		$scope.taxDetail.HalfYearFileUploadId = data.HalfYearFileUploadId;
		$scope.taxDetail.HalfYearFileUrl = data.HalfYearFileUrl;
		$scope.taxDetail.HalfYearContentType = data.HalfYearContentType;
		$scope.taxDetail.HalfYearFileName = data.HalfYearFileName;
	}

	$scope.removeVehicleTaxEvidence = function(Type)
	{
		if(Type == "Annual")
		{
			$scope.taxDetail.AnnualFileUploadId = null;
			$scope.taxDetail.AnnualFileUrl = null;
			$scope.taxDetail.AnnualContentType = null;
			$scope.taxDetail.AnnualFileName = null;
		}
		else if(Type == "HalfYear")
		{
			$scope.taxDetail.HalfYearFileUploadId = null;
			$scope.taxDetail.HalfYearFileUrl = null;
			$scope.taxDetail.HalfYearContentType = null;
			$scope.taxDetail.HalfYearFileName = null;
		}
	}

	/*
		END VEHICLE TAX
	*/

	/*
		VEHICLE INSURANCE		
	*/
	var editVehicleInsuranceModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/edit-vehicle-insurance-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.addNewVehicleInsurance = function()
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleInsuranceDocDetail = [];
		$scope.vehicleInsuranceDetail = {
			VehicleId : $scope.currentVehicleId,
			IsActive : true
		};

		editVehicleInsuranceModal.$promise.then(editVehicleInsuranceModal.show);
	}

	$scope.updateVehicleInsurance = function()
	{
		console.log($scope.vehicleInsuranceDetail);
		Assets.UpdateVehicleInsurance($scope.vehicleInsuranceDetail, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLEINSURANCE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.LoadVehicleInsurance();
				editVehicleInsuranceModal.$promise.then(editVehicleInsuranceModal.hide);
			}
		});
	}

	
	$scope.editVehicleInsurance = function(VehicleInsuranceId)
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleInsuranceDocDetail = [];
		Assets.GetVehicleInsuranceById(VehicleInsuranceId, function(data){
			if(data.ServiceStatus == "GETVEHICLEINSURANCE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				$scope.vehicleInsuranceDetail = data;
				$scope.LoadVehicleInsuranceDocument();
				$scope.vehicleInsuranceDetail.StartDate = $filter("jsonDate")($scope.vehicleInsuranceDetail.StartDate,"MM/dd/yyyy");
				$scope.vehicleInsuranceDetail.EndDate = $filter("jsonDate")($scope.vehicleInsuranceDetail.EndDate,"MM/dd/yyyy");
				editVehicleInsuranceModal.$promise.then(editVehicleInsuranceModal.show);
			}
		});
	}

	$scope.removeVehicleInsurance = function(VehicleInsuranceId)
	{
		Assets.RemoveVehicleInsurance(VehicleInsuranceId, function(){
			$scope.LoadVehicleInsurance();
			$scope.vehicleInsuranceDetail.FileUploadId = null;
		});
	}

	$scope.LoadVehicleInsuranceDocument = function()
	{
		if($scope.vehicleInsuranceDetail.FileUploadId != null && $scope.vehicleInsuranceDetail.FileUploadId != '00000000-0000-0000-0000-000000000000'){
			Assets.GetVehicleInsuranceDocument($scope.vehicleInsuranceDetail.FileUploadId, function(data){
				$scope.vehicleInsuranceDocDetail = data;
			});	
		}
	}

	$scope.uploadVehicleInsurance = function(data)
	{
		$scope.vehicleInsuranceDetail.FileUploadId = data.FileUploadId;
		$scope.LoadVehicleInsuranceDocument();
	}

	$scope.removeVehicleInsuranceDoc = function(FileUploadId)
	{
		$scope.vehicleInsuranceDetail.FileUploadId = null;
		$scope.vehicleInsuranceDocDetail = {};
	}

	$scope.LoadVehicleInsurance = function()
	{
		Assets.GetAllVehicleInsurance($scope.currentVehicleId, function(data){
			$scope.mainInsurance = data;
			angular.forEach($scope.mainInsurance.SearchResults, function(each){
				each.StartDate = $filter("jsonDate")(each.StartDate,"dd/MM/yyyy");
				each.EndDate = $filter("jsonDate")(each.EndDate,"dd/MM/yyyy");
			});
		});
	}
	/*
		END VEHICLE INSURANCE
	/*

	/*
		VEHICLE ACT		
	*/
	var editVehicleActModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/edit-vehicle-act-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.addNewVehicleAct = function()
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleActDetail = {
			VehicleId : $scope.currentVehicleId,
			IsActive : true
		};
		$scope.vehicleActDocDetail = [];

		editVehicleActModal.$promise.then(editVehicleActModal.show);
	}

	$scope.editVehicleAct = function(VehicleActId)
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleActDocDetail = [];

		Assets.GetVehicleActById(VehicleActId, function(data){
			if(data.ServiceStatus == "GETVEHICLEACT_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				$scope.vehicleActDetail = data;
				$scope.LoadVehicleActDocument();
				$scope.vehicleActDetail.StartDate = $filter("jsonDate")($scope.vehicleActDetail.StartDate,"MM/dd/yyyy");
				$scope.vehicleActDetail.EndDate = $filter("jsonDate")($scope.vehicleActDetail.EndDate,"MM/dd/yyyy");
				editVehicleActModal.$promise.then(editVehicleActModal.show);
			}
		});
	}

	$scope.updateVehicleAct = function()
	{
		Assets.UpdateVehicleAct($scope.vehicleActDetail, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLEACT_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.LoadVehicleAct();
				editVehicleActModal.$promise.then(editVehicleActModal.hide);
			}
		});
	}

	$scope.removeVehicleAct = function(VehicleActId)
	{
		Assets.RemoveVehicleAct(VehicleActId, function(){
			$scope.LoadVehicleAct();
			$scope.vehicleActDetail.FileUploadId = null;
		});
	}

	$scope.LoadVehicleActDocument = function()
	{
		if($scope.vehicleActDetail.FileUploadId != null && $scope.vehicleActDetail.FileUploadId != '00000000-0000-0000-0000-000000000000'){
			Assets.GetVehicleActDocument($scope.vehicleActDetail.FileUploadId, function(data){
				$scope.vehicleActDocDetail = data;
			});	
		}
	}

	$scope.uploadVehicleAct = function(data)
	{
		$scope.vehicleActDetail.FileUploadId = data.FileUploadId;
		$scope.LoadVehicleActDocument();
	}

	$scope.removeVehicleActDoc = function(FileUploadId)
	{
		$scope.vehicleActDetail.FileUploadId = null;
		$scope.vehicleActDocDetail = {};
	}

	$scope.LoadVehicleAct = function()
	{
		Assets.GetAllVehicleAct($scope.currentVehicleId, function(data){
			$scope.mainAct = data;
			angular.forEach($scope.mainAct.SearchResults, function(each){
				each.StartDate = $filter("jsonDate")(each.StartDate,"dd/MM/yyyy");
				each.EndDate = $filter("jsonDate")(each.EndDate,"dd/MM/yyyy");
			});
		});
	}
	/*
		END VEHICLE Act
	/*



	/*
		START VEHICLE LEASING
	*/
	$scope.LoadVehicleLeases = function()
	{
		Assets.GetAllVehicleLeases($scope.currentVehicleId, function(data){
			$scope.mainLeasing = data;
			angular.forEach($scope.mainLeasing.LeaseList, function(each){
				each.VehicleLeaseDateOfPurchase = $filter("jsonDate")(each.VehicleLeaseDateOfPurchase,"dd/MM/yyyy");
				each.VehicleLeaseInstalmentDate = $filter("jsonDate")(each.VehicleLeaseInstalmentDate,"dd/MM/yyyy");
			});
		});
	}

	var VehicleLeasesModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/update-vehicle-leasing-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.editVehicleLeasing = function(VehicleLeaseId)
	{
		$rootScope.$broadcast('clearqueue');
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$scope.vehicleLeasingDocument = {};
		$scope.vehicleLeasingDetail = {};
		if (typeof VehicleLeaseId == 'undefined')
		{
			$scope.vehicleLeasingDetail.IsActive = true;
			VehicleLeasesModal.$promise.then(VehicleLeasesModal.show);
		}
		else
		{
			Assets.GetVehicleLeaseById(VehicleLeaseId, function(data){

				if(data.ServiceStatus == "GETVEHICLELEASE_FAIL")
				{
					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
					Modals.showAlertFail();
				}
				else
				{
					$scope.vehicleLeasingDetail = data;
					$scope.optionsLeasing.url = api + "/Assets/UploadFilesVehicleLease?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&VehicleLeaseId=" + data.VehicleLeaseId;
					$scope.currentVehicleLeaseId = data.VehicleLeaseId;

					$scope.vehicleLeasingDetail.VehicleLeaseDateOfPurchase = $filter("jsonDate")($scope.vehicleLeasingDetail.VehicleLeaseDateOfPurchase,"MM/dd/yyyy");
					$scope.vehicleLeasingDetail.VehicleLeaseInstalmentDate = $filter("jsonDate")($scope.vehicleLeasingDetail.VehicleLeaseInstalmentDate,"MM/dd/yyyy");			

					$scope.GetAllLeasingDocument();
					VehicleLeasesModal.$promise.then(VehicleLeasesModal.show);
				}
			});
		}
	}

	$scope.updateVehicleLeasing = function()
	{
		$scope.errorMsg = {
			isError : false,
			message : ""
		}

		$scope.vehicleLeasingDetail.VehicleId = $scope.currentVehicleId;
		Assets.UpdateVehicleLease($scope.vehicleLeasingDetail, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLELEASE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.vehicleLeasingDetail = data;
				$scope.optionsLeasing.url = api + "/Assets/UploadFilesVehicleLease?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&VehicleLeaseId=" + data.VehicleLeaseId;
				$scope.vehicleLeasingDetail.VehicleLeaseDateOfPurchase = $filter("jsonDate")($scope.vehicleLeasingDetail.VehicleLeaseDateOfPurchase,"MM/dd/yyyy");
				$scope.vehicleLeasingDetail.VehicleLeaseInstalmentDate = $filter("jsonDate")($scope.vehicleLeasingDetail.VehicleLeaseInstalmentDate,"MM/dd/yyyy");
				$scope.LoadVehicleLeases();

				VehicleLeasesModal.$promise.then(VehicleLeasesModal.hide);	
			}
		});
	}

	$scope.RemoveVehicleLeasing = function(VehicleLeaseId)
	{
		Assets.RemoveVehicleLease(VehicleLeaseId, function(){
			$scope.LoadVehicleLeases();
		});
	}

	$scope.GetAllLeasingDocument = function()
	{
		if($scope.currentVehicleLeaseId != "")
		{
			Assets.GetVehicleLeseFileList($scope.currentVehicleLeaseId, function(data){
				$scope.vehicleLeasingDocument = data;
			});	
		}
	}

	$scope.removeVehicleLeasingDoc = function(VehicleLeaseId,FileUploadId)
	{
		Assets.RemoveVehicleLeaseFile(VehicleLeaseId, FileUploadId, function(data){
			$scope.GetAllLeasingDocument();
		});
	}

	var VehicleLeasesDetailModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Assets/vehicle-leasing-detail-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.viewVehicleLeasingDetail = function(item)
	{
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
		$rootScope.$broadcast('clearqueue');
		$scope.globalStatus.isActivityEdit = false;
		$scope.currentVehicleLease = item;
		Assets.GetVehicleLeasePeriodList(item.VehicleLeaseId, function(data){
			$scope.VehicleLeaseDetail = data;

			var PeriodSort = 1;
			angular.forEach($scope.VehicleLeaseDetail.LeasePeriodList, function(each){
				each.Period = PeriodSort++;
				each.VehicleLeasePeriodDate = $filter("jsonDate")(each.VehicleLeasePeriodDate,"dd/MM/yyyy");
			});

			VehicleLeasesDetailModal.$promise.then(VehicleLeasesDetailModal.show);	
		});
	}

	$scope.addVehicleLeasePeriodDetail = function(Period)
	{
		$rootScope.$broadcast('clearqueue');
		$scope.globalStatus.isActivityEdit = true;
		var dateStart = null;
		if(Period == 1)
		{
			dateStart = $scope.currentVehicleLease.VehicleLeaseInstalmentDate;
		}
		else
		{
			dateStart = moment($scope.currentVehicleLease.VehicleLeaseInstalmentDate, "DD/MM/YYYY").add(Period-1,"months").format("DD/MM/YYYY");
		}
		$scope.VehicleLeaseDetail.LeasePeriodList.push(
			{
				VehicleLeaseId : $scope.currentVehicleLease.VehicleLeaseId,
				isEdit : true,
				Period : Period,
				VehicleLeasePeriodDate : dateStart,
				FileUploadId : null,
				VehicleLeasePeriodAmount : 0,
				IsPayment : true,
			}
		);
	}

	$scope.updateVehicleLeasingDetail = function(item)
	{
		item.VehicleLeasePeriodDate = moment(item.VehicleLeasePeriodDate, "DD/MM/YYYY").format("MM/DD/YYYY");
		Assets.UpdateVehicleLeasePeriod(item, function(data){
			if(data.ServiceStatus == "UPDATEVEHICLELEASPERIOD_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else{

				Modals.showAlertSuccess();
				$scope.globalStatus.isActivityEdit = false;
				$scope.viewVehicleLeasingDetail($scope.currentVehicleLease);		
			}
		});
		
	}

	$scope.cancleUpdateVehicleLeasingDetail = function()
	{
		$scope.viewVehicleLeasingDetail($scope.currentVehicleLease);
		$scope.globalStatus.isActivityEdit = false;
		$rootScope.$broadcast('clearqueue');
	}

	$scope.uploadVehicleLeasePeriod = function(data)
	{
		////console.log(data);
		angular.forEach($scope.VehicleLeaseDetail.LeasePeriodList, function(item){
			if(item.isEdit)
			{
				item.FileUploadId = data.FileUploadId;
				item.FileURL = data.FileURL;
				item.ContentType = data.ContentType;
			}
		});
	}

	$scope.removeVehicleLeasePeriodDoc = function()
	{
		angular.forEach($scope.VehicleLeaseDetail.LeasePeriodList, function(item){
			if(item.isEdit)
			{
				item.FileUploadId = null;
				item.FileURL = null;
				item.ContentType = null;
			}
		});
	}

	$scope.removeVehicleLeasingPeriod = function(VehicleLeasePeriodId)
	{
		Assets.RemoveVehicleLeasePeriod(VehicleLeasePeriodId, function(data){
			if(data.ServiceStatus == "REMOVEDVEHICLELEASPERIOD_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.globalStatus.isActivityEdit = false;
				$scope.viewVehicleLeasingDetail($scope.currentVehicleLease);		
			}
		});
	}
	/*
		END VEHICLE LEASING
	*/


	/*

		Validate Date
	*/
	$scope.DateCompare = function(date1, date2)
	{
		var validate = false;
		var startDate = new Date(date1);
		var endDate = new Date(date2)

		if(startDate > endDate)
		{
			validate = true;
		}

		return validate;
	}

	/*
		UPLOAD FILE
	*/
	$scope.LoadVehicleFileList = function()

	{
		
		Assets.GetVehicleGalleryList($scope.currentVehicleId, function(data){
			$scope.vehicleGalleryList = data;
			////console.log($scope.currentVehicleId);
		});
	}

	$scope.saveVehicleGallery = function(item)
	{
		Assets.SaveVehicleGallery(item, function(){
			$scope.LoadVehicleFileList();
		});
		
	}

	$scope.removeVehicleGallery = function(item)
	{	
		
		Assets.RemoveVehicleGallery(item.VehicleId, item.FileUploadId, function(){
			$scope.LoadVehicleFileList();
		});
	}

	$scope.loadingFiles = false;
    $scope.currentProcess = {
    	fileInQueue : false
    }
    $scope.queue = [];
    $scope.queueInsurance = [];

    $scope.$on('fileuploadstop', function(data, response){

    	$scope.LoadVehicleFileList();
    	$scope.GetAllLeasingDocument();
    	$scope.currentProcess.fileInQueue = false;
    	
    });

    $scope.$on('fileuploadadd', function(data){
    	$scope.currentProcess.fileInQueue = true;
    	
    });

    $scope.$on('fileuploaddone', function(data, response){
    	
    	///console.log(response);
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    		
    	}

    	if(response.result.ServiceStatus == "UPLOADVEHICLEINSURANCE_SUCCESS")
    	{
    		$scope.uploadVehicleInsurance(response.result);
    		
    	}

    	if(response.result.ServiceStatus == "UPLOADVEHICLEACT_SUCCESS")
    	{
    		$scope.uploadVehicleAct(response.result);
    		
    	}

    	if(response.result.ServiceStatus == "UPLOADVEHICLELEASEPERIOD_SUCCESS")
    	{
    		$scope.uploadVehicleLeasePeriod(response.result);
    		
    	}

    	if(response.result.ServiceStatus == "UPLOADVEHICLETAXDATEANNUAL_SUCCESS")
    	{
    		$scope.uploadVehicleTaxDateAnnual(response.result);
    		
    	}

    	if(response.result.ServiceStatus == "UPLOADVEHICLETAXDATEHALFYEAR_SUCCESS")
    	{
    		$scope.uploadVehicleTaxDateHalfYear(response.result);
    		
    	}
    });

    $scope.$on('fileuploadfail', function(data){
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    	}
    	
    });
	/*
		END UPLOAD FILE
	*/


	/*
		VEHICLE LIST TABLE
	*/
	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.showAll = false;
	$scope.lswFilterOptions = {
            list: $scope.mainData.SearchResults,
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
        filterOptions: $scope.lswFilterOptions,
        columns: [
        	{
        		label: "ทะเบียนรถ",
                column: "PlateNumber"
        	},
        	{
        		label: "เบอร์รถ",
                column: "VehicleNumber"
        	},
        	{
        		label: "ยี่ห้อ",
                column: "Brand"
        	},
        	{
        		label: "หมายเลขตัวถัง",
                column: "ChassisNumber"
        	},
        	{
        		label: "หมายเลขเครื่อง",
                column: "EngineNumber"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };

    $scope.filterOption = function()
    {
    	if($scope.showAll){
    		$scope.showAll = false;
    		$scope.lswFilterOptions.selectFilter = {
            	IsDeleted : $scope.showAll
            }
    	}else{
    		$scope.showAll = true;
    		$scope.lswFilterOptions.selectFilter = "";
    	}
    }
    /*
		END VEHICLE LIST TABLE
	*/

	/*
		VEHICLE TAX LIST TABLE
	*/

	$scope.lswPaginateOptionsTax = { pageSize: 10 }
	$scope.showTaxAll = true;
	$scope.lswFilterOptionsTax = {
            list: $scope.mainTax.TaxList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	IsActive : $scope.showTaxAll
            }
        }
    $scope.lswTableOptionsTax = {
        theadTemplate: 'theadTaxTemplate.html',
        tbodyTemplate: 'tbodyTaxTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptionsTax,
        filterOptions: $scope.lswFilterOptionsTax,
        orderBy : "AnualDueDate",
        sortBy : false,
        columns: [
        	{
        		label: "วันครบกำหนดอายุภาษี",
                column: "AnualTaxDueDate"
        	},
        	{
        		label: "เลขทะเบียน",
                column: "TaxNumber"
        	},
        	{
        		label: "เริ่มต้นวันที่",
                column: "StartDate"
        	},
        	{
        		label: "สิ้นสุดวันที่",
                column: "EndDate"
        	},
        	{
        		label: "สถานะ",
                column: "IsActive"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };
    
    $scope.filterTaxOption = function()
    {
    	if($scope.showTaxAll){
    		
    		$scope.showTaxAll = false;
    		$scope.lswFilterOptionsTax.selectFilter = "";
    	}else{
    		$scope.showTaxAll = true;
    		$scope.lswFilterOptionsTax.selectFilter = {
            	IsActive : $scope.showTaxAll
            }
    	}
    }
   
    /*
		VEHICLE INSURANCE LIST TABLE
	*/
	$scope.lswPaginateOptionsInsurance = { pageSize: 10 }
	$scope.showInsuranceAll = true;
	$scope.AssetCtrl = {
            list: $scope.mainInsurance.SearchResults,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	IsActive : $scope.showInsuranceAll
            }
        }
    $scope.lswTableOptionsInsurance = {
        theadTemplate: 'theadInsuranceTemplate.html',
        tbodyTemplate: 'tbodyInsuranceTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptionsInsurance,
        filterOptions: $scope.lswFilterOptionsInsurance,
        columns: [
        	{
        		label: "บริษัทประกันภัย",
                column: "InsuranceName"
        	},
        	{
        		label: "เลขทะเบียน",
                column: "InsuranceNumber"
        	},
        	{
        		label: "เริ่มต้นวันที่",
                column: "StartDate"
        	},
        	{
        		label: "สิ้นสุดวันที่",
                column: "EndDate"
        	},
        	{
        		label: "สถานะ",
                column: "IsActive"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };

    $scope.filterInsuranceOption = function()
    {
    	if($scope.showInsuranceAll){
    		$scope.showInsuranceAll = false;
    		$scope.lswFilterOptionsInsurance.selectFilter = "";
    	}else{
    		$scope.showInsuranceAll = true;
    		$scope.lswFilterOptionsInsurance.selectFilter = {
            	IsActive : $scope.showInsuranceAll
            }
    	}
    }

	/*
		END VEHICLE INSURANCE LIST TABLE
	*/
    
    /*
		VEHICLE ACT LIST TABLE
	*/
	$scope.lswPaginateOptionsAct = { pageSize: 10 }
	$scope.showActAll = true;
	$scope.lswFilterOptionsAct = {
            list: $scope.mainAct.SearchResults,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	IsActive : $scope.showActAll
            }
        }
    $scope.lswTableOptionsAct = {
        theadTemplate: 'theadActTemplate.html',
        tbodyTemplate: 'tbodyActTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptionsAct,
        filterOptions: $scope.lswFilterOptionsAct,
        columns: [
        	{
        		label: "บริษัทประกันภัย",
                column: "ActName"
        	},
        	{
        		label: "เลขทะเบียน",
                column: "ActNumber"
        	},
        	{
        		label: "เริ่มต้นวันที่",
                column: "StartDate"
        	},
        	{
        		label: "สิ้นสุดวันที่",
                column: "EndDate"
        	},
        	{
        		label: "สถานะ",
                column: "IsActive"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };

    $scope.filterActOption = function()
    {
    	if($scope.showActAll){
    		$scope.showActAll = false;
    		$scope.lswFilterOptionsAct.selectFilter = "";
    	}else{
    		$scope.showActAll = true;
    		$scope.lswFilterOptionsAct.selectFilter = {
            	IsActive : $scope.showActAll
            }
    	}
    }

	/*
		END VEHICLE Act LIST TABLE
	*/

	/*
        VEHICLE LEASING LIST TABLE
    */
    $scope.lswPaginateOptionsLeasing = { pageSize: 10 }
    $scope.showLeasingAll = true;
    $scope.lswFilterOptionsLeasing = {
            list: $scope.mainLeasing.SearchResults,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
                IsActive : $scope.showLeasingAll
            }
        }
    $scope.lswTableOptionsLeasing = {
        theadTemplate: 'theadLeasingTemplate.html',
        tbodyTemplate: 'tbodyLeasingTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptionsLeasing,
        filterOptions: $scope.lswFilterOptionsLeasing,
        columns: [
            {
                label: "เลขที่สัญญา",
                column: "VehicleLeaseAgreementNumber"
            },
            {
                label: "บริษัทลิสซิ่ง",
                column: "VehicleLeaseCompany"
            },
            {
                label: "ชื่อผู้ทำสัญญา",
                column: "VehicleLeaseBuyerName"
            },
            {
                label: "ราคาซื้อ",
                column: "VehicleLeasePrice"
            },
            {
                label: "วันที่ผ่อนชำระ",
                column: "VehicleLeaseInstalmentDate"
            },
            {
                label: "จำนวนการผ่อนชำระ",
                column: "VehicleLeaseNumberOfInstalment"
            },
            {
                label: "สถานะ",
                column: "IsActive"
            },
            {
                label: "",
                column: ""
            }
        ]
    };

    $scope.filterLeasingOption = function()
    {
        if($scope.showLeasingAll){
            $scope.showLeasingAll = false;
            $scope.lswFilterOptionsLeasing.selectFilter = "";
        }else{
            $scope.showLeasingAll = true;
            $scope.lswFilterOptionsLeasing.selectFilter = {
                IsActive : $scope.showLeasingAll
            }
        }
    }

    /*
        END VEHICLE LEASING LIST TABLE
    */

    $scope.clearQueue = function()
    {
    	$rootScope.$broadcast('clearqueue');
    }

    $scope.$on('modal.hide',function(){
		$scope.clearQueue();
		$scope.currentProcess.fileInQueue = false;
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
	});
}]);	