module.controller('PaymentController',[
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
	"$localStorage", function (
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
	  	$localStorage) {

	$scope.userId = $cookies.get("CakeCookie[userId]");

	$scope.initData = function()
	{
		////console.log($localStorage.PaymentBaking);
		$scope.resultTransferBanking = {
			result : "",
			amt : 0.0,
			fee : 0.0,
			sum : 0.0,
			creditPoint : 0.0
		}
		$scope.psbID = $localStorage.PaymentBaking.psbID;
		$scope.biz = $localStorage.PaymentBaking.username;
		$scope.secureCode = $localStorage.PaymentBaking.secureCode;
		$scope.invoice = $localStorage.PaymentBaking.inv;
		$scope.referenceId = $localStorage.referenceId;
		Agency.getTransactionByInvoice($scope.psbID,$scope.biz,$scope.secureCode,$scope.invoice,$scope.referenceId, function(data)
		   {
		   	  $scope.resultTransferBanking.result  =  data.result;
		   	  $scope.resultTransferBanking.amt  =  data.amt;
		   	  $scope.resultTransferBanking.fee  =  data.fee;
		   	  $scope.resultTransferBanking.sum  =  data.amt - data.fee;
		   	  $scope.resultTransferBanking.creditPoint  =  data.AgencyCreditPoint;
			 			
		   });


	}

}]);