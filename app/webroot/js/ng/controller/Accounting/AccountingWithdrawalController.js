module.controller('AccountingWithdrawalCtrl',[
	"$rootScope",
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal",
	"$filter",
	"$sce",
	"Helpers",
 	"Modals", 
 	"Pages", 
 	"Agency",
 	"Discount", 
	"Banks",
	"Accounting",
	"Lightbox", function (
	  	$rootScope,
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal,
	  	$filter,
	  	$sce,
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Agency, 
	  	Discount, 
	  	Banks,
	  	Accounting,
	  	Lightbox) {

	$scope.userId = $cookies.get("CakeCookie[userId]");
	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.step =
	{
		currentStep : 1
	};

	$scope.globalVariable = {
		isWithdrawalCreditActive : 0,
		currentSearchDateFilter : 0,
		currentAgencyBankDetail : {}
	};

	$scope.searchFilter = {
		dateStart : new Date(),
		dateEnd : new Date()
	};

	$scope.currentFilter = {
		dateStart : new Date(),
		dateEnd : new Date()
	};

	$scope.AccountBankList = [];
	$scope.AgencyAccountBankList = [];
	$scope.WithdrawalCreditList = [];
	$scope.WithdrawalCreditDetail = {};

	$scope.initData = function()
	{
		$scope.step.currentStep = 1;
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;
			Banks.GetAccountBankForAgency($scope.userId, function(data)
			{
				$scope.AgencyAccountBankList = data.AgencyAccountBankList;
				Accounting.GetWithdrawalListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataWithdrawalCreditList)
				{
					$scope.WithdrawalCreditList = dataWithdrawalCreditList.WithdrawalCreditList;

					angular.forEach($scope.WithdrawalCreditList, function(eachData)
					{
						eachData.AccountBankTypeId = eachData.AgencyAccountBank.AccountBankTypeId;
					});

					$timeout(function(){
						$scope.recheckWithdrawalCreditData();
					}, 1000);
				});
			});
		});
	}

	$scope.recheckWithdrawalCreditData = function()
	{
		Accounting.GetWithdrawalListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, true, function(dataWithdrawalCreditList)
		{
			if(dataWithdrawalCreditList == "error")
			{
				$scope.recheckWithdrawalCreditData();
			}
			else
			{
				$scope.WithdrawalCreditList = dataWithdrawalCreditList.WithdrawalCreditList;

				angular.forEach($scope.WithdrawalCreditList, function(eachData)
				{
					eachData.AccountBankTypeId = eachData.AgencyAccountBank.AccountBankTypeId;
				});

				$timeout(function(){
					$scope.recheckWithdrawalCreditData();	
				}, 1000);
			}
		});
	}

	$scope.editWithdrawalCreditById = function(WithdrawalCreditId)
	{
		Accounting.GetWithdrawalCreditById(WithdrawalCreditId, $scope.userId, $scope.timezoneOffset, function(data)
		{
			$scope.WithdrawalCreditDetail = data;

			console.log($scope.AgencyAccountBankList[$filter("lswIndexOf")($scope.AgencyAccountBankList, { AccountBankId: $scope.WithdrawalCreditDetail.AccountBankId },'AccountBankId')]);

			Agency.GetAgencyCreditByUserId(data.UserId, false, function(credit)
			{
				$scope.step.currentStep = 2;
				$scope.AgencyCredit = credit;
			});
		});
	}

	$scope.editWithdrawalCreditByIdStep2 = function(WithdrawalCreditId)
	{
		Accounting.GetWithdrawalCreditByIdStep2(WithdrawalCreditId, $scope.userId, $scope.timezoneOffset, function(data)
		{
			$scope.WithdrawalCreditDetail = data;

			Agency.GetAgencyCreditByUserId(data.UserId, false, function(credit)
			{
				$scope.step.currentStep = 3;
				$scope.AgencyCredit = credit;
			});
		});
	}

	$scope.confirmUploadProofTransfer = function()
	{
		Accounting.ActionWithdrawalCreditStep2($scope.WithdrawalCreditDetail, $scope.timezoneOffset, function(result){
			if(result.ServiceStatus == "ACTIONWITHDRAWALCREDITSTEP2_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(result.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.initData();
			}
		});
	}

	$scope.confirmWithdrawalTransfer = function()
	{
		Accounting.ActionWithdrawalCredit($scope.WithdrawalCreditDetail, "Confirm", function(result){
			$scope.returnResult(result);
		});
	}

	$scope.rejectWithdrawalTransfer = function()
	{
		Accounting.ActionWithdrawalCredit($scope.WithdrawalCreditDetail, "Reject", function(result){
			$scope.returnResult(result);
		});
	}

	$scope.backToWithdrawalList = function()
	{
		Accounting.ActionWithdrawalCredit($scope.WithdrawalCreditDetail, "Cancel", function(result){
			$scope.step.currentStep = 1;
		});
	}

	$scope.returnResult = function(result)
	{
		if(result.ServiceStatus == "ACTIONINFORMTRANSFER_FAIL")
		{
			Modals.setAlert(Helpers.showErrorMessage(result.FailMessages));
			Modals.showAlertFail();
		}
		else
		{
			Modals.showAlertSuccess();
			$scope.initData();
		}
	}

	/*
		Search Date Option
	*/
	$scope.setDateFilter = function(startDate, endDate)
	{
		$scope.globalVariable.currentSearchDateFilter = '';
		$scope.currentFilter.dateStart = startDate;
		$scope.currentFilter.dateEnd = endDate;
		Accounting.GetWithdrawalListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataWithdrawalCreditList)
		{
			$scope.WithdrawalCreditList = dataWithdrawalCreditList.WithdrawalCreditList;

			angular.forEach($scope.WithdrawalCreditList, function(eachData)
			{
				eachData.AccountBankTypeId = eachData.AgencyAccountBank.AccountBankTypeId;
			});			
		});
	}

	$scope.searchDateFilter = function(typeFilter)
	{
		$scope.globalVariable.currentSearchDateFilter = typeFilter;
		switch(typeFilter)
		{
			case "today":
				$scope.currentFilter.dateStart = moment().format("MM/DD/YYYY");
				$scope.currentFilter.dateEnd = moment().format("MM/DD/YYYY");
				break;
			case "yesterday":
				$scope.currentFilter.dateStart = moment().add(-1, 'days').format("MM/DD/YYYY");
				$scope.currentFilter.dateEnd = moment().add(-1, 'days').format("MM/DD/YYYY");
				break;
			case "thismonth":
				$scope.currentFilter.dateStart = moment().startOf('month').format("MM/DD/YYYY");
				$scope.currentFilter.dateEnd = moment().endOf("month").format("MM/DD/YYYY");
				break;
			case "lastmonth":
				$scope.currentFilter.dateStart = moment().startOf('month').add(-1, 'months').format("MM/DD/YYYY");
				$scope.currentFilter.dateEnd = moment().endOf("month").add(-1, 'months').format("MM/DD/YYYY");
				break;
			case "all":
				$scope.currentFilter.dateStart = null;
				$scope.currentFilter.dateEnd = null;
				break;
		}

		Accounting.GetWithdrawalListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataWithdrawalCreditList)
		{
			$scope.WithdrawalCreditList = dataWithdrawalCreditList.WithdrawalCreditList;

			angular.forEach($scope.WithdrawalCreditList, function(eachData)
			{
				eachData.AccountBankTypeId = eachData.AgencyAccountBank.AccountBankTypeId;
			});			
		});
	}

	/*
		Filter Option
	*/
	$scope.filterOptionSet = function(UserId, WithdrawalCreditStatus)
	{
		$scope.lswFilterOptions.selectFilter.UserId = UserId;
		$scope.lswFilterOptions.selectFilter.WithdrawalCreditStatus = WithdrawalCreditStatus;
	}

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

	/*
		Table Function
	*/
	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.WithdrawalCreditList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	UserId : '',
            	WithdrawalCreditStatus : ''
            }
        }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };

    /*
    	Upload Transfer Payment Proof
    */
    $scope.optionsTransferPaymentProof = 
	{
		url: api + "/Accounting/UploadTransferPaymentProof?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
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

    	if(response.result.ServiceStatus == "UPLOADTRANSFERPAYMENTPROOF_SUCCESS")
    	{
    		$scope.uploadTransferPaymentProofSuccess(response.result);
    	}
    });

    $scope.$on('fileuploadfail', function(data){
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    	}
    });

	var uploadTransferPaymentProofModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Accounting/transfer-payment-proof-upload-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
    $scope.uploadTransferPaymentProof = function()
    {
    	$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
		$rootScope.$broadcast('clearqueue');
		uploadTransferPaymentProofModal.$promise.then(uploadTransferPaymentProofModal.show);
    }

    $scope.uploadTransferPaymentProofSuccess = function(data)
    {
    	$scope.WithdrawalCreditDetail.WithdrawalCreditFileUploadId = data.WithdrawalCreditFileUploadId;
		$scope.WithdrawalCreditDetail.WithdrawalCreditFileUploadUrl = data.WithdrawalCreditFileUploadUrl;
		$scope.WithdrawalCreditDetail.WithdrawalCreditFileName = data.WithdrawalCreditFileName;
		$scope.WithdrawalCreditDetail.WithdrawalCreditContentType = data.WithdrawalCreditContentType;
		$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
	    $rootScope.$broadcast('clearqueue');
		uploadTransferPaymentProofModal.$promise.then(uploadTransferPaymentProofModal.hide);
    }

    $scope.removeTransferPaymentProof = function()
    {
    	$scope.WithdrawalCreditDetail.WithdrawalCreditFileUploadId = null;
		$scope.WithdrawalCreditDetail.WithdrawalCreditFileUploadUrl = null;
		$scope.WithdrawalCreditDetail.WithdrawalCreditFileName = null;
		$scope.WithdrawalCreditDetail.WithdrawalCreditContentType = null;
    }

}]);