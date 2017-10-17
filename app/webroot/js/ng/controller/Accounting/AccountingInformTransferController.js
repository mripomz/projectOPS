module.controller('AccountingInformTransferCtrl',[
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
		isInformationTransferActive : 0,
		currentSearchDateFilter : 0
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
	$scope.AviaAccountBankList = [];
	$scope.InformTransferList = [];
	$scope.InformTransferDetail = {};

	$scope.initData = function()
	{
		$scope.step.currentStep = 1;
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;
			Banks.GetAviaAccountBankList(function(data)
			{
				$scope.AviaAccountBankList = data.AviaAccountBankList;

				$scope.searchDateFilter("today");
				Accounting.GetInformTransferListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataInformTransferList)
				{
					$scope.InformTransferList = dataInformTransferList.InformMoneyTransferList;

					angular.forEach($scope.InformTransferList, function(eachData)
					{
						eachData.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: eachData.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
					});

					$timeout(function(){
						$scope.recheckInformTransferData();
					}, 1000);
				});
			});
		});
	}

	$scope.recheckInformTransferData = function()
	{
		Accounting.GetInformTransferListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, true, function(dataInformTransferList)
		{
			if(dataInformTransferList == "error")
			{
				$scope.recheckInformTransferData();
			}
			else
			{
				$scope.InformTransferList = dataInformTransferList.InformMoneyTransferList;

				angular.forEach($scope.InformTransferList, function(eachData)
				{
					eachData.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: eachData.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
				});

				$timeout(function(){
					$scope.recheckInformTransferData();	
				}, 1000);
			}
		});
	}

	$scope.editInformTransferById = function(InformMoneyTransferId)
	{
		Accounting.GetInformTransferById(InformMoneyTransferId, $scope.userId, $scope.timezoneOffset, function(data)
		{
			$scope.step.currentStep = 2;
			$scope.InformTransferDetail = data;
			$scope.InformTransferDetail.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: $scope.InformTransferDetail.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
		});
	}

	$scope.confirmInformTransfer = function()
	{
		Accounting.ActionInformTransfer($scope.InformTransferDetail, "Confirm", function(result){
			$scope.returnResult(result);
		});
	}

	$scope.rejectInformTransfer = function()
	{
		Accounting.ActionInformTransfer($scope.InformTransferDetail, "Reject", function(result){
			$scope.returnResult(result);
		});
	}

	$scope.backToInformList = function()
	{
		Accounting.ActionInformTransfer($scope.InformTransferDetail, "Cancel", function(result){
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
		Accounting.GetInformTransferListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataInformTransferList)
		{
			$scope.InformTransferList = dataInformTransferList.InformMoneyTransferList;

			angular.forEach($scope.InformTransferList, function(eachData)
			{
				eachData.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: eachData.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
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

		Accounting.GetInformTransferListForAccounting($scope.currentFilter.dateStart, $scope.currentFilter.dateEnd, $scope.timezoneOffset, false, function(dataInformTransferList)
		{
			$scope.InformTransferList = dataInformTransferList.InformMoneyTransferList;

			angular.forEach($scope.InformTransferList, function(eachData)
			{
				eachData.AccountBankTypeId = $scope.AviaAccountBankList[$filter("lswIndexOf")($scope.AviaAccountBankList, { AviaAccountBankId: eachData.AviaAccountBankId },'AviaAccountBankId')].AccountBankTypeId;
			});			
		});
	}

	/*
		Filter Option
	*/
	$scope.filterOptionSet = function(UserId, IsConfirm, IsReject)
	{
		$scope.lswFilterOptions.selectFilter.UserId = UserId;
		$scope.lswFilterOptions.selectFilter.IsConfirm = IsConfirm;
		$scope.lswFilterOptions.selectFilter.IsReject = IsReject;
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
            list: $scope.InformTransferList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	UserId : '',
            	IsConfirm : '',
            	IsReject : ''
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