module.controller('AgencyHistoryCtrl',[
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
	"Lightbox",
	"Agency", function (
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
	  	Lightbox,
	  	Agency) {

	$scope.userId = $cookies.get("CakeCookie[userId]");
	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();
	$scope.searchFilter = {
		dateStart : new Date(),
		dateEnd : new Date()
	};

	$scope.currentFilter = {
		dateStart : new Date(),
		dateEnd : new Date()
	};

	$scope.globalVariable = {
		isAgencyHistoryActive : 0,
		currentSearchDateFilter : 0
	};

	$scope.agencyCreditHistoryList = [];
	$scope.transactionDetail = {};
	$scope.AccountBankList = [];
	$scope.AviaAccountBankList = [];


	$scope.initData = function()
	{
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;

			Banks.GetAviaAccountBankList(function(data)
			{
				
				$scope.AviaAccountBankList = data.AviaAccountBankList;
				$scope.searchDateFilter('thismonth');
			});
		});
	}

	/*
		Search Date Option
	*/
	$scope.setDateFilter = function(startDate, endDate)
	{
		$scope.globalVariable.currentSearchDateFilter = '';
		$scope.currentFilter.dateStart = startDate;
		$scope.currentFilter.dateEnd = endDate;
		Agency.GetAgencyCreditHistoryByUserId(
			$scope.userId, 
			$scope.currentFilter.dateStart, 
			$scope.currentFilter.dateEnd, 
			$scope.timezoneOffset, 
			function(dataList)
			{
				$scope.agencyCreditHistoryList = dataList.AgencyCreditHistoryList;
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
				$scope.currentFilter.dateStart = moment().subtract(1, 'months').startOf('month').format("MM/DD/YYYY");
				$scope.currentFilter.dateEnd = moment().subtract(1, 'months').endOf('month').format("MM/DD/YYYY");
				break;
			case "all":
				$scope.currentFilter.dateStart = null;
				$scope.currentFilter.dateEnd = null;
				break;
		}

		Agency.GetAgencyCreditHistoryByUserId(
			$scope.userId, 
			$scope.currentFilter.dateStart, 
			$scope.currentFilter.dateEnd, 
			$scope.timezoneOffset, 
			function(dataList)
			{
				$scope.agencyCreditHistoryList = dataList.AgencyCreditHistoryList;
			});
	}

	/*
		Show Transaction
		1 = TopUp Transaction
		2 = Withdrawal Transaction
	*/
	var viewTransactionModal = null;
	$scope.viewTransaction = function(TransactionType, TransactionId)
	{
		var typeOfModalHtml = "";
		switch(TransactionType)
		{
			case 1:
				typeOfModalHtml = 'modals/Agency/view-top-up-transaction-modal.html';
				Agency.GetTransactionByTypeTopUp(TransactionId, $scope.timezoneOffset, function(dataTransaction){
					$scope.transactionDetail = dataTransaction;
					angular.forEach($scope.AviaAccountBankList, function(eachAviaBank)
					{
						if(eachAviaBank.AviaAccountBankId == $scope.transactionDetail.AviaAccountBankId)
						{
							$scope.transactionDetail.AccountBank = eachAviaBank;
						}
					});
					viewTransactionModal = $modal({ scope: $scope, templateUrl: rootUrl + typeOfModalHtml, show: false, placement : "top", animation : "am-fade-and-slide-top" });
					viewTransactionModal.$promise.then(viewTransactionModal.show);
				});
				break;
			case 2:
				typeOfModalHtml = 'modals/Agency/view-withdrawal-transaction-modal.html';
				Agency.GetTransactionByTypeWithdrawal(TransactionId, $scope.timezoneOffset, function(dataTransaction){
					$scope.transactionDetail = dataTransaction;
					viewTransactionModal = $modal({ scope: $scope, templateUrl: rootUrl + typeOfModalHtml, show: false, placement : "top", animation : "am-fade-and-slide-top" });
					viewTransactionModal.$promise.then(viewTransactionModal.show);
				});
				break;
			case 3:
				typeOfModalHtml = 'modals/Agency/view-agency-buy-ticket-transaction-modal.html';
				Agency.GetTransactionByBuyTicket(TransactionId, $scope.timezoneOffset, function(dataTransaction){
					$scope.transactionDetail = dataTransaction.VehicleOperationSeatList;
					viewTransactionModal = $modal({ scope: $scope, templateUrl: rootUrl + typeOfModalHtml, show: false, placement : "top", animation : "am-fade-and-slide-top" });
					viewTransactionModal.$promise.then(viewTransactionModal.show);
				});

		}
	}

	/*
		Status for withdrawal
	*/
	$scope.displayWithdrawalStatus = function(WithdrawalCreditStatus)
	{
		
	}

	/*
		Filter Option
	*/
	$scope.filterOptionSet = function(TransactionType)
	{
		$scope.lswFilterOptions.selectFilter.TransactionType = TransactionType;
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
            list: $scope.agencyCreditHistoryList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	TransactionType : ''
            }
        }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };
}]);