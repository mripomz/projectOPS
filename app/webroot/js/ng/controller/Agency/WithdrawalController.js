module.controller('WithDrawalCtrl',[
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

	$scope.withdrawalCreditDetail = 
	{
		AccountBankId : null,
		WithdrawalCreditAmount : 0,
		UserId : $scope.userId
	};

	$scope.AccountBankList = [];
	$scope.AgencyAccountBankList = [];
	$scope.WithdrawalList = [];
	$scope.AgencyCredit = {};

	$scope.initData = function()
	{
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;
			
			Banks.GetAccountBankForAgency($scope.userId, function(data)
			{
				$scope.AgencyAccountBankList = data.AgencyAccountBankList;
			
				Accounting.GetWithdrawalList($scope.userId, $scope.timezoneOffset, function(dataWithdrawalList)
				{
					$scope.WithdrawalList = dataWithdrawalList.WithdrawalCreditList;
					angular.forEach($scope.WithdrawalList, function(eachData)
					{
						eachData.AccountBankTypeId = $scope.AgencyAccountBankList[$filter("lswIndexOf")($scope.AgencyAccountBankList, { AccountBankId: eachData.AccountBankId },'AccountBankId')].AccountBankTypeId;
					});
					Agency.GetAgencyCreditByUserId($scope.userId, false, function(credit){
						$scope.AgencyCredit = credit;
					});
				});
			});
		});

	}

	$scope.sendWithdrawal = function()
	{
		Accounting.WithdrawalApplyRequest($scope.withdrawalCreditDetail, function(data){
			if(data.ServiceStatus == "WITHDRAWALAPPLYREQUEST_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.initData();
				$scope.withdrawalCreditDetail = 
				{
					AccountBankId : null,
					WithdrawalCreditAmount : 0,
					UserId : $scope.userId
				};
			}
		});
	}

	$scope.cancelWithdrawal = {};
	var reasonNotes =  $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Agency/reason-for-cancel-withdrawal-modal.html', show: false, placement : "center", animation : "am-fade-and-slide-top" });
	$scope.cancelWithdrawalCreditRequest = function(WithdrawalCreditId)
	{
		$scope.cancelWithdrawal = {
			WithdrawalCreditId : WithdrawalCreditId,
			Notes : "",
		};
		reasonNotes.$promise.then(reasonNotes.show);
	}

	$scope.sendCancelWithdrawal = function()
	{
		Accounting.CancelWithdrawalCredit($scope.cancelWithdrawal, function(data){
			if(data.ServiceStatus == "CANCELWITHDRAWALCREDIT_FAIL")
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
            list: $scope.WithdrawalList,
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