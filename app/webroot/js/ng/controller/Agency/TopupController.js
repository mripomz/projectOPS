module.controller('TopUpCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	 "Modals", 
	 "Pages", 
	 "Agency",
	  "Discount", 
	  "Banks",
	  "Tickets",
	  "$window",
	  "$location",
	  "$sce",
	  "$localStorage" ,function (
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Agency, 
	  	Discount, 
	  	Banks,
	  	Tickets,
	  	$window,
	  	$location,
	  	$sce,
	  	$localStorage) {


	$scope.topUpChoose = "transfer";
	$scope.IsPayment = true;
	$scope.changeTopUp = function(key){
		$scope.topUpChoose = key;
		console.log(key);
		if(key == 'omiseCredit')
		{
			$window.location.href ='http://localhost:8080/avia-website/agency/omisecredit';
		}
		
	}
	$scope.PaymentBaking = 
			{
				psbID : '2550885870',
				username : 'narongrit@lannasoftworks.com',
				secureCode : '67c3a30bbe2d87380358368b786dfc56',
				inv : '2009060106',
				opt_name : 'MAKKY',
				Method : 0,
				opt_name : 'test',
				Method : 0,
				amt : 0

			}


	$scope.Next = function()
	{

		if($scope.topUpChoose == 'eBanking'){
			$scope.connectPaysbuyDTO = 
			{
				psbID : '2550885870',
				username : 'lannasoft_merchant@paysbuy.com',
				secureCode : '67c3a30bbe2d87380358368b786dfc56',
				opt_name : 'MAKKY',
				Method : 0,
				
			}

			$localStorage.connectPaysbuyDTO = $scope.connectPaysbuyDTO;

			///$rootScope.$broadcast('connectPaysbuyDTO', $scope.connectPaysbuyDTO;
			Agency.GetConnectPaysbuy($scope.connectPaysbuyDTO, function(key)
		    {

			  $localStorage.connectPaysbuyDTO = $scope.connectPaysbuyDTO;
			console.log(key);			
		    });

		}
		
	}


	$scope.PaymentGetway = function()
	{
		$scope.IsPayment = false;
		$localStorage.PaymentBaking = $scope.PaymentBaking;
		Agency.GetConnectPaysbuy($scope.PaymentBaking, function(key)
		{

			$scope.PaymentBaking.inv = key.Invoice;
			$localStorage.PaymentBaking = $scope.PaymentBaking;
			////$scope.url = $sce.trustAsResourceUrl('https://demo.paysbuy.com/paynow.aspx?refid='+key.referenceId);
			///'https://demo.paysbuy.com/paynow.aspx?refid='+key.referenceId;
			////"?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
			$localStorage.referenceId =  key.referenceId;
			console.log($localStorage.PaymentBaking);
			$window.location.href ='https://demo.paysbuy.com/paynow.aspx?accessToken='+ encodeURIComponent($cookies.get('CakeCookie[accessToken]'))+'&refid='+key.referenceId;		
		});
	}

	$scope.step =
	{
		currentStep : 1
	}

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
			});
		});
	}


}]);