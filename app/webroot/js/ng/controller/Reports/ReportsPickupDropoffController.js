module.controller('ReportsPickupDropoffCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies", 
	"$modal", 
	"Helpers", 
	"Modals", 
	"Pages", 
	"Users", 
	"Sales", 
	"Routes",
	"Reports",
	"$filter",
	"PickupDropoff", 
	function (
		$scope, 
		$timeout, 
		$cookies, 
		$modal, 
		Helpers, 
		Modals, 
		Pages, 
		Users, 
		Sales, 
		Routes,
		Reports,
		$filter,
		PickupDropoff) {

	$scope.conditionReport = 
	{
		DateStart : new Date(),
		TimeStart : "00:00",
		TimeEnd : "23:59",
		TypeOfService : "",
		StopPointId : ""
	}

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.passengerPickupDropOffService = [];
	$scope.globalVariable = {
		isShowResult : false
	}
	
	$scope.initData = function()
	{
		Routes.GetStopPointList(function(stopPointList){
			$scope.StopPointList = stopPointList.StopPointList;
		});
	}

	$scope.searchPassengerPickupDropOff = function()
	{
		PickupDropoff.ReportForPickupdropOffServices(
			$scope.conditionReport.DateStart, 
			$scope.conditionReport.TimeStart, 
			$scope.conditionReport.TimeEnd, 
			$scope.conditionReport.TypeOfService, 
			$scope.conditionReport.StopPointId,
			$scope.timezoneOffset,
			function(data){
				$scope.passengerPickupDropOffService = data.PickupDropoffServiceList;
				$scope.globalVariable.isShowResult = true;
		});
	}

	$scope.printDivById = function(id) {
		$scope.dateTimeNow = new Date();
		var printContents = document.getElementById(id).outerHTML;
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><link rel="stylesheet" type="text/css" href="/avia-website/css/app.css"/></head><body onload="setTimeout(function(){window.print();window.close();}, 2000)">' + printContents + '</body></html>');
		popupWin.document.close();
	}

	$scope.generateExcel = function()
	{
		$scope.exportHref = Helpers.tableToExcel($scope.globalVariable.currentReports,'Report Sheet');
        $timeout(function(){
        	var link = document.createElement('a');
			  if (typeof link.download === 'string') {
			    link.href = $scope.exportHref;
			    link.download = $scope.conditionReport.ReportType + '-' + moment(new Date()).format('YYYY-MM-DD'); + '.xls';
			    document.body.appendChild(link);
			    link.click();
			    document.body.removeChild(link);
			  } 
			  else 
			  {
			    location.href=$scope.exportHref;
			  }
        },100);
	}

	$scope.generateExcelbyId = function(id)
	{
		$scope.exportHref = Helpers.tableToExcel(id,'sheet name');
        $timeout(function(){location.href=$scope.exportHref;},100);
	}
}]);