module.controller('AviaBankCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	 "Modals", 
	 "Pages", 
	 "Agency",
	  "Discount", 
	  "Banks", function (
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Agency, 
	  	Discount, 
	  	Banks) {

	$scope.AccountBankList = [];
	$scope.AviaAccountBankList = [];
	$scope.globalVariable = {
		IsEdit : false
	};

	$scope.initData = function()
	{
		$scope.globalVariable.IsEdit = false;
		Banks.GetAccountBankList(function(bankList)
		{
			$scope.AccountBankList = bankList.AccountBankTypeList;
			Banks.GetAviaAccountBankList(function(aviaBankList)
			{
				$scope.AviaAccountBankList = aviaBankList.AviaAccountBankList;
				angular.forEach($scope.AviaAccountBankList, function(each){
					each.IsEdit = false;
				});
			});
		});
	}

	$scope.addAviaBankAccount = function()
	{
		var data = {       
	        AccountBankTypeId : 0,
	        AccountBankNumber : "",
	        AccountType : "ออมทรัพย์",
	        AccountBankName : "",
	        AccountBankBranch : "",
	        AccountBankNotes : "",
	        IsEdit : true
		};

		$scope.AviaAccountBankList.push(data);
		$scope.globalVariable.IsEdit = true;
	}

	$scope.updateAviaAccount = function(data)
	{
		Banks.UpdateAviaAccountBank(data, function(result){
			if(result.ServiceStatus == "UPDATEAVIAACCOUNTBANK_FAIL")
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

	$scope.removeAviaAccount = function(AviaAccountBankId)
	{
		console.log(AviaAccountBankId);
		Banks.RemoveAviaAccountBank(AviaAccountBankId, function(data){
			if(data.ServiceStatus == "REMOVEAVIAACCOUNTBANK_FAIL")
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
}]);
	