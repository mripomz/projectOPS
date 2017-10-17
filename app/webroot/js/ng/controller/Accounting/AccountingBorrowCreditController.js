module.controller('AccountingBorrowCreditCtrl',[
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


	$scope.userList = [];
	$scope.gradeList = [];
    $scope.errorMsg = {
        isError : false,
        message : ""
    }
    $scope.currentStep = 1;
    $scope.AgencyCredit = {};
    $scope.currentAgencyManagementDetail = {};

    $scope.borrowCredit = {
    	CreditAmount : 0,
    	CreditNotes : "",
    	BorrowCreditType : "borrow"
    }

    $scope.reduceCredit = {
    	CreditAmount : 0,
    	CreditNotes : "",
    	ReduceFromCreditType : "credit"
    }

	$scope.initData = function()
	{
		$scope.currentStep = 1;

		$scope.borrowCredit = {
	    	CreditAmount : 0,
	    	CreditNotes : "",
	    	BorrowCreditType : "borrow"
	    }

	    $scope.reduceCredit = {
	    	CreditAmount : 0,
	    	CreditNotes : "",
	    	ReduceFromCreditType : "credit"
	    }

		Discount.GetGradeList(function(dataGrade){

			$scope.gradeList = dataGrade.GradeList;

			Agency.GetAgencyManagePriceList(function(data){

				$scope.userList = data.AgencyGradePriceList;

				angular.forEach($scope.userList, function(eachUser,keys){
					eachUser.NO = (keys+1);
				})
			});
		});
	}

	$scope.AgencyCreditManagement = function(data)
	{
		$scope.currentAgencyManagementDetail = data;
		//Get Agency Credit
		Agency.GetAgencyCreditByUserId(data.UserId, false, function(credit)
		{
			$scope.AgencyCredit = credit;
			$scope.currentStep = 2;
		});
	}

	$scope.AddCredit = function()
	{
		Accounting.AddCredit(
			$scope.AgencyCredit.AgencyCreditId,
			$scope.borrowCredit.CreditAmount, 
			$scope.borrowCredit.CreditNotes, 
			$scope.borrowCredit.BorrowCreditType, 
			function(data){
				if(data.ServiceStatus == "ADDCREDIT_FAIL" || data == 'error')
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

	$scope.ReduceCredit = function()
	{
		Accounting.ReduceCredit(
			$scope.AgencyCredit.AgencyCreditId,
			$scope.reduceCredit.CreditAmount,
    		$scope.reduceCredit.CreditNotes,
    		$scope.reduceCredit.ReduceFromCreditType,
    		function(data){
    			if(data.ServiceStatus == "REDUCECREDIT_FAIL" || data == 'error')
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

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
        list: $scope.userList,
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