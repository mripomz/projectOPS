module.controller('InformTransferCtrl',[
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

	$scope.informDetail = 
	{
		AviaAccountBankId : null,
		InformMoneyTransferDate : new Date(),
		InformMoneyTransferType : 'โอนเงินออนไลน์',
		InformMoneyTransferProofUploadId : null,
		InformMoneyTransferAmount : 0,
		UserId : $scope.userId
	};

	$scope.AccountBankList = [];
	$scope.AviaAccountBankList = [];
	$scope.InformTransferList = [];

	$scope.initData = function()
	{
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;
			Banks.GetAviaAccountBankList(function(data)
			{
				$scope.AviaAccountBankList = data.AviaAccountBankList;

				Accounting.GetInformTransferList($scope.userId, $scope.timezoneOffset, function(dataInformTransferList)
				{
					$scope.InformTransferList = dataInformTransferList.InformMoneyTransferList;

					angular.forEach($scope.InformTransferList, function(eachData)
					{
						eachData.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: eachData.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
					});
				});
			});
		});

	}

	$scope.sendInformTransfer = function()
	{
		Accounting.InformTransfer($scope.informDetail, $scope.timezoneOffset, function(data){
			if(data.ServiceStatus == "INFORMTRANSFER_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.initData();
				$scope.informDetail = 
				{
					AviaAccountBankId : null,
					InformMoneyTransferDate : new Date(),
					InformMoneyTransferType : 'โอนเงินออนไลน์',
					InformMoneyTransferProofUploadId : null,
					InformMoneyTransferAmount : 0,
					UserId : $scope.userId
				};
			}
		});
	}

	/*
		Upload File Section
	*/

	$scope.optionsInformTransfer = 
	{
		url: api + "/Accounting/UploadInformTransfer?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
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

    	if(response.result.ServiceStatus == "UPLOADINFORMTRANSFER_SUCCESS")
    	{
    		$scope.uploadInformTransferSuccess(response.result);
    	}
    });

    $scope.$on('fileuploadfail', function(data){
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    	}
    });

	var uploadInformTransferModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/upload-agency-inform-transfer-modal.html', show: false, placement : "top", animation : "am-fade-and-slide-top" });
	$scope.UploadInformTransfer = function()
	{
		$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
		$rootScope.$broadcast('clearqueue');
		uploadInformTransferModal.$promise.then(uploadInformTransferModal.show);
	}

	$scope.uploadInformTransferSuccess = function(data)
	{
		$scope.informDetail.InformMoneyTransferProofUploadId = data.InformMoneyTransferProofUploadId;
		$scope.informDetail.InformMoneyTransferFileUploadUrl = data.InformMoneyTransferFileUploadUrl;
		$scope.informDetail.InformMoneyTransferFileName = data.InformMoneyTransferFileName;
		$scope.informDetail.InformMoneyTransferContentType = data.InformMoneyTransferContentType;
		$scope.loadingFiles = false;
	    $scope.currentProcess = {
	    	fileInQueue : false
	    }
	    $scope.queue = [];
	    $scope.queueInsurance = [];
	    $rootScope.$broadcast('clearqueue');
		uploadInformTransferModal.$promise.then(uploadInformTransferModal.hide);
	}

	$scope.removeInformTransfer = function()
	{
		$scope.informDetail.InformMoneyTransferProofUploadId = null;
		$scope.informDetail.InformMoneyTransferFileUploadUrl = null;
		$scope.informDetail.InformMoneyTransferFileName = null;
		$scope.informDetail.InformMoneyTransferContentType = null;
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
	$scope.lswPaginateOptions = { pageSize: 5 }
	$scope.lswFilterOptions = {
            list: $scope.InformTransferList,
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