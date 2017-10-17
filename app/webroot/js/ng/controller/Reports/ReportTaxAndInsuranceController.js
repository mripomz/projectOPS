module.controller('TaxInsuranceCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "$http", "Assets", "$alert", "Lightbox", "$filter", "$sce", "SeatCapacityArrangement", "Locations","Reports", function ($rootScope, $scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, $http, Assets, $alert, Lightbox, $filter, $sce, SeatCapacityArrangement, Locations,Reports) {







	 $scope.AnualTaxDueDate = []; 
	 $scope.conditionReportAnualTaxDueDate = {
	 	DateStart : new Date(),
	 	DateEnd	: new Date(),
	 	TimeStart : '00:00',
	 	TimeEnd : '23:59',
	 }

	 $scope.conditionReportHalfYearDueDate = {
	 	months : ''
	 }

	 $scope.globalVariable ={

	 	isShowReport : false
	 }
	 $scope.globalVariable.isReportTypeActive = 0;
	 var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();
	$scope.months = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
	$scope.mainAct = [];
	$scope.years = [];
	$scope.conditionReportVehicleAct = {};
	$scope.globalVariable ={

	 	isShowReportVehicleAct : false
	 };
	 $scope.dateTimeNow = new Date();



	 	$scope.initData = function(type)
	 {
	 		$scope.conditionReport = {
	 		DateStart : new Date(),
	 		DateEnd	: new Date(),
	 		TimeStart : "00:00",
	 		TimeEnd : "23:59"
	 		}
	 		$scope.globalVariable ={

	 			isShowReport : false
	 		}
	 		if(type == 1){

	 			Reports.getMinAndMaxYear(
				function(data){
				if(data.getMin !=0 && data.getMax !=0 )
				{	
					for(var i=data.getMin;i<=data.getMax;i++){
							$scope.years.push(i);
					}
				}				
					
			});

	 		}
	 		if(type == 2){

	 			Reports.getMinAndMaxYearTaxAndInspection(
				function(data){
					if(data.getMin !=0 && data.getMax !=0 )
				{
					for(var i=data.getMin;i<=data.getMax;i++){
							$scope.years.push(i);
					}
				}	
				});

	 		}
	 		if(type == 3){

	 			Reports.getMinAndMaxYearInsurance(
				function(data){
					if(data.getMin !=0 && data.getMax !=0 )
				{
					for(var i=data.getMin;i<=data.getMax;i++){
							$scope.years.push(i);
					}
				}
				});

	 		}
	 		

	 		

	 		$scope.globalVariable.isReportTypeActive = 0;


		
	 }


	

	 $scope.checkReportVehicleAct = function(){
	 	$scope.globalVariable.isShowReport = false;
	 	if(angular.isUndefined($scope.conditionReportVehicleAct.years) || $scope.conditionReportVehicleAct.years === null ){
	 		$scope.globalVariable.isShowReportVehicleAct = false;
	 	}
	 	else{
	 		$scope.globalVariable.isShowReportVehicleAct = true;
	 	}
	 }


 $scope.generateReportTaxAndInspection = function()
	 {
	 	console.log('asdasdasd');
	 	$scope.globalVariable.isShowReport = true;
		Reports.reportTaxAndInspection(
				$scope.conditionReportVehicleAct.years,
				$scope.timezoneOffset,
				function(data){
					$scope.VehicleDateTax = data;
					console.log($scope.VehicleDateTax);
			});


	 }
	  $scope.generateReportInsurance = function()
	 {
		Reports.reportInsurance(
				$scope.conditionReportVehicleAct.years,
				function(data){
					console.log(data);
					if(data.ServiceStatus == 'REPORTHALFYEARDUEDATE_FAIL')
					{
						Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                		Modals.showAlertFail();
                		$scope.globalVariable.isShowReport = false;
					}else{
						$scope.Insurance = data;
						$scope.globalVariable.isShowReport = true;	
					}
		
			});


	 }

	  $scope.generateReportVehicleAct = function()
	 {

	
		Reports.reportVehicleAct($scope.conditionReportVehicleAct.years,function(data){
			$scope.mainAct = data;
			console.log($scope.mainAct);
			
			$scope.globalVariable.isShowReport = true;

			});
	 }


	 $scope.resetReport = function()
	 {
	 	$scope.globalVariable.isShowReport = false;
	 }




	$scope.lswPaginateOptionsAct = { pageSize: 10 }
	 $scope.showActAll = true;
	 $scope.lswFilterOptionsAct = {
             list: $scope.mainAct.reportVehicleActListDTO,
             columns: [
                 {
                     column: "ActName",
                     label: "All",
                     type: "input"
                 }
             ],
             selectFilter : {
             	IsActive : $scope.showActAll
             }
         }
     $scope.lswTableOptionsAct = {
         theadTemplate: 'theadActTemplate.html',
         tbodyTemplate: 'tbodyActTemplate.html',
         tableClass: 'table table-hover table-condensed',
         paginateOptions: $scope.lswPaginateOptionsAct,
         filterOptions: $scope.lswFilterOptionsAct,
         columns: [
         	{
         		label: "บริษัทประกันภัย",
                 column: "ActName"
         	},
         	{
         		label: "เลขทะเบียน",
                 column: "ActNumber"
         	},

         ]
     };
      $scope.filterActOption = function()
    {
    	if($scope.showActAll){
    		$scope.showActAll = false;
    		$scope.lswFilterOptionsAct.selectFilter = "";
    	}else{
    		$scope.showActAll = true;
    		$scope.lswFilterOptionsAct.selectFilter = {
            	IsActive : $scope.showActAll
            }
    	}
    }


    $scope.printDiv = function(type) {
		$scope.dateTimeNow = new Date();
		console.log($scope.globalVariable.currentReports);
		console.log($scope.globalVariable.currentReports);
		var printContents;
		if(type ==1){
			printContents = document.getElementById('ReportVehicleAct').outerHTML;
		}
		else if(type ==2){
			printContents = document.getElementById('ReportForTaxAndInspection').outerHTML;
		}
		else if(type ==3)
		{
			printContents = document.getElementById('ReportForInsurance').outerHTML;
		}
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><link rel="stylesheet" type="text/css" href="/avia-website/css/app.css"/></head><body onload="setTimeout(function(){window.print();window.close();}, 2000)">' + printContents + '</body></html>');
		popupWin.document.close();
	}


	   /*
		VEHICLE INSURANCE LIST TABLE
	*/
	


	
}]);