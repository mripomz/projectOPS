module.controller('ReportsCtrl',[
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
	"SeatCapacityArrangement", 
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
		SeatCapacityArrangement) {
	
	$scope.globalVariable = 
	{
		isReportTypeActive : 0,
		isShowReport : false,
		currentReports : ""
	};

	$scope.reportType = {
		ChangeInformationType : "ReportForChangeNotes",
		TicketBooking : "ReportForCurrentBookingTicket",
		ProgressOperation : "ReportForOperationIndividual",
		RevenueTicket : "ReportForRevenueFromTicketSales"
	}

	$scope.conditionReport = 
	{
		DateStart : new Date(),
		DateEnd	: new Date(),
		TimeStart : "00:00",
		TimeEnd : "23:59",
		TypeSearch : "Transaction",
		ReportType : "",
		VehicleOperationId : null,
		StopPoint : null,
		UserId : "",
		VehicleSeatPlanId : null,
		RouteType : "All",
		PrePay : "Yes",
		PersonType : "No",
		SummaryTypeDays : false,
		SummaryTypeTrips : false,
		SummaryType : "",
		Conditions : 3,
		Routes : []
	}

	$scope.filterReport = 
	{
		searchValue : ''
	}

	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();
	$scope.dateTimeNow = new Date();
	$scope.dataReport = [];
	$scope.stopPointData = {};
	$scope.salesList = [];
	$scope.vehicleSeatPlanList = [];
	$scope.salesRoleId = 0;

	$scope.initData = function(type)
	{
		Routes.GetStopPointList(function(stopPointList)
		{
			$scope.stopPointData = stopPointList;
		});

		//Set duration time for route
		SeatCapacityArrangement.GetVehicleSeatPlanListCompleted(function(vehicleSeatPlan){
			$scope.vehicleSeatPlanList = vehicleSeatPlan.SeatPlanList;
		});

		Routes.GetRouteCompletedList(true, function(vehicleRouteList)
		{
			$scope.VehicleRoute = vehicleRouteList.RouteList;
			angular.forEach($scope.VehicleRoute, function(eachVehicle){
				$scope.conditionReport.Routes.push(eachVehicle.RouteId);
			});
		});

		$scope.loadEmployeeList();
		if(type ==1)
		{
			$scope.conditionReport.ReportType = "TicketBooking"

		}
		else if(type == 2)
		{
			$scope.conditionReport.ReportType = "OperationIndividual"
		}
		else if(type == 3)
		{
			$scope.conditionReport.ReportType = "RevenueBySales"
			
		}
	}

	$scope.loadEmployeeList = function()
	{
		$scope.salesList = [];
		$scope.conditionReport.UserId = "";

		Sales.GetSaleListBySaleRegion($scope.conditionReport.StopPoint, function(data){
			$scope.salesList = data.SalesList;
			if($scope.conditionReport.ReportType == 'OperationIndividual_Thermal' && $scope.conditionReport.StopPoint != ''  && $scope.conditionReport.StopPoint != null)
			{
				if($scope.salesList.length > 0)
				{
					$scope.conditionReport.UserId = $scope.salesList[0].UserId;	
				}
				else
				{
					$scope.conditionReport.UserId = "";
				}
			}
			$scope.globalVariable.isShowReport = false;
		});
	}

	$scope.generateReport = function(reportType)
	{
		$scope.dateTimeNow = new Date();
		$scope.globalVariable.isShowReport = false;
		$scope.globalVariable.currentReports = reportType;

		console.log(reportType);

		if(reportType == "ReportForChangeNotes")
		{
			Reports.GeneralReportForChangeNotes(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForCurrentBookingTicket")
		{
			Reports.GeneralReportForCurrentBookingTicket(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.conditionReport.TypeSearch,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					angular.forEach($scope.dataReport.CurrentBookingTicketList, function(each){
						var indexStartPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: each.StopPointStartId }, 'StopPointId');
						var indexEndPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: each.StopPointEndId }, 'StopPointId');
						each.StopPointStart = $scope.stopPointData.StopPointList[indexStartPoint].StopPointName_TH;
						each.StopPointEnd = $scope.stopPointData.StopPointList[indexEndPoint].StopPointName_TH;


						each.VehicleOperationDateSort = $filter('date')(parseInt(each.VehicleOperationDate.substr(6)), 'MM/dd/yyyy h:mma');
						each.CreatedDateSort = $filter('date')(parseInt(each.CreatedDate.substr(6)), 'MM/dd/yyyy h:mma');
						each.UpdatedDateSort = $filter('date')(parseInt(each.UpdatedDate.substr(6)), 'MM/dd/yyyy h:mma');


						each.UpdatedTime = $filter('jsonDate')(each.UpdatedDate, 'HH:mm');
						each.UpdatedDate = $filter('jsonDate')(each.UpdatedDate, 'dd/MM/yyyy');
						each.TicketRentExpiredTime = $filter('jsonDate')(each.TicketRentExpiredDate, 'HH:mm');
						each.TicketRentExpiredDate = $filter('jsonDate')(each.TicketRentExpiredDate, 'dd/MM/yyyy');
						each.VehicleOperationTime = $filter('jsonDate')(each.VehicleOperationDate, 'HH:mm');
						each.VehicleOperationDate = $filter('jsonDate')(each.VehicleOperationDate, 'dd/MM/yyyy');
						each.CreatedTime = $filter('jsonDate')(each.CreatedDate, 'HH:mm');
						each.CreatedDate = $filter('jsonDate')(each.CreatedDate, 'dd/MM/yyyy');
					});
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForCancelBookingTicket")
		{
			Reports.GeneralReportForCancelBookingTicket(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TypeSearch,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.dataReport.CancelBookingTicketList = setStopPointName($scope.dataReport.CancelBookingTicketList);
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForOperationIndividual")
		{
			if($scope.conditionReport.ReportType == 'OperationIndividual')
			{
				Reports.GeneralReportForOperationIndividual(
					$scope.conditionReport.DateStart,
					$scope.conditionReport.DateEnd,
					$scope.conditionReport.TimeStart,
					$scope.conditionReport.TimeEnd,
					$scope.conditionReport.TypeSearch,
					$scope.conditionReport.VehicleOperationId, 
					$scope.conditionReport.StopPoint,
					$scope.conditionReport.UserId,
					$scope.conditionReport.VehicleSeatPlanId,
					$scope.timezoneOffset,
					function(data){
						$scope.dataReport = data;
						$scope.dataReport.DirectSellingPointList = setStopPointName($scope.dataReport.DirectSellingPointList);
						$scope.dataReport.NotDirectSellingPointList = setStopPointName($scope.dataReport.NotDirectSellingPointList);
						$scope.dataReport.PreSaleList = setStopPointName($scope.dataReport.PreSaleList);
						$scope.dataReport.ReturnTicketDayTripList = setStopPointName($scope.dataReport.ReturnTicketDayTripList);
						$scope.dataReport.ReturnTicketOtherDayList = setStopPointName($scope.dataReport.ReturnTicketOtherDayList);
						$scope.globalVariable.isShowReport = true;
				});
			}
			else if($scope.conditionReport.ReportType == 'OperationIndividual_Thermal')
			{
				Reports.GeneralReportForOperationIndividual_Thermal(
					$scope.conditionReport.DateStart,
					$scope.conditionReport.DateEnd,
					$scope.conditionReport.StopPoint,
					$scope.conditionReport.UserId,
					$scope.timezoneOffset,
					function(data){
						$scope.dataReport = data;
						$scope.globalVariable.isShowReport = true;
				});
			}
			
		}
		else if(reportType	== "ReportForOperationIndividualByTicketNumber")
		{
			Reports.GeneralReportForOperationIndividualByTicketNumber(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.StopPoint,
				$scope.conditionReport.VehicleSeatPlanId,
				$scope.conditionReport.UserId,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.dataReport.ReportByTicketNumberSalesList = setStopPointName($scope.dataReport.ReportByTicketNumberSalesList);
					$scope.dataReport.ReportByTicketNumberReturnList = setStopPointName($scope.dataReport.ReportByTicketNumberReturnList);
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType	== "ReportForLoginLogOut")
		{
			Reports.GeneralReportForLoginLogOut(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateStart,
				$scope.conditionReport.StopPoint,
				$scope.conditionReport.UserId,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					var todaysDate = new Date();

					$scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');
					 angular.forEach($scope.dataReport.LoginLogOutList, function(value, key){
					 	$scope.endtimeKeep = $filter('jsonDate')(value.EndtTime, 'yyyy-MM-dd');
					 	console.log($scope.today +':'+$scope.endtimeKeep);
      					if($scope.endtimeKeep == $scope.today) 

					 	{
					 		$scope.dataReport.LoginLogOutList[key].IsToday = true;

					 	}
					else{

					 	$scope.dataReport.LoginLogOutList[key].IsToday = false;
					 }
					 	if(key == $scope.dataReport.LoginLogOutList.length -1)
					 	{
					 		$scope.dataReport.ReportByTicketNumberSalesList = setStopPointName($scope.dataReport.ReportByTicketNumberSalesList);
							$scope.dataReport.ReportByTicketNumberReturnList = setStopPointName($scope.dataReport.ReportByTicketNumberReturnList);
					 		$scope.globalVariable.isShowReport = true;

						}
   		 			});
					
					// $scope.dataReport.ReportByTicketNumberSalesList = setStopPointName($scope.dataReport.ReportByTicketNumberSalesList);
					// $scope.dataReport.ReportByTicketNumberReturnList = setStopPointName($scope.dataReport.ReportByTicketNumberReturnList);
					// $scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType	== "ReportForVehicleDetail")
		{
			Reports.GeneralReportForVehicleDetail(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateStart,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType	== "ReportForNumberOfVehicle")
		{
			Reports.GeneralReportForNumberOfVehicle(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForRevenueFromTicketSales")
		{
			console.log($scope.conditionReport.ReportType);
			switch ($scope.conditionReport.ReportType)
			{
				case "RevenueBySales" :
					Reports.GeneralReportForRevenueBySales(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByVehicleTrip" :
					Reports.GeneralReportForRevenueByVehicleTrip(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByProgress" :
					Reports.GeneralReportForRevenueByProgress(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.RevenueByProgressList = setStopPointName($scope.dataReport.RevenueByProgressList);
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByCounterSales" :
					Reports.GeneralReportForRevenueByCounterSales(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.TripDays = reStructureCounterSalesReport($scope.dataReport.CounterName, $scope.dataReport.TripDays);
							$scope.dataReport.AdvanceDays = reStructureCounterSalesReport($scope.dataReport.CounterName, $scope.dataReport.AdvanceDays);
							$scope.dataReport.ReturnTicket = reStructureCounterSalesReport($scope.dataReport.CounterName, $scope.dataReport.ReturnTicket);
							console.log($scope.dataReport);
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByAdvanceSold" :
					Reports.GeneralReportForRevenueByAdvanceSold(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.AdvanceSoldList = setStopPointName($scope.dataReport.AdvanceSoldList);
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByAdvanceSold_Short" :
					Reports.GeneralReportForRevenueByAdvanceSoldShort(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.StopPoint,
						$scope.conditionReport.UserId,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByAdvanceSoldDisplayDetail_Short" :
					Reports.GeneralReportForRevenueByAdvanceSoldDisplayDetailShort(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.StopPoint,
						$scope.conditionReport.UserId,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByTicketSeller_Short" :
					Reports.GeneralReportForRevenueByTicketSellerShort(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.TypeSearch,
						$scope.conditionReport.StopPoint,
						$scope.conditionReport.UserId,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByPayeeAndTrip" :
					Reports.GeneralReportForRevenueByPayeeAndTrip(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByVehicleNumber" :
					Reports.GeneralReportForRevenueByVehicleNumber(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "RevenueByCounter" :
					Reports.GeneralReportForRevenueByCounter(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TypeSearch,
						$scope.conditionReport.StopPoint,
						$scope.conditionReport.UserId,
						$scope.conditionReport.VehicleSeatPlanId,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.globalVariable.isShowReport = true;
						});
					break;
			}
		}
		else if(reportType == "ReportForTicketSalesDetail")
		{
			switch ($scope.conditionReport.ReportType)
			{
				case "ReportTicketSales":
					Reports.GeneralReportForDisPlayReportTicketSales(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.TicketSalesList = setStopPointName($scope.dataReport.TicketSalesList);
							$scope.globalVariable.isShowReport = true;
						});
					break;
				case "ReportTicketSales_Search":
					Reports.GeneralReportForDisPlayReportTicketSalesSearch(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TimeStart,
						$scope.conditionReport.TimeEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.TicketSalesSearchList = setStopPointName($scope.dataReport.TicketSalesSearchList);
							$scope.globalVariable.isShowReport = true;
						});
					break;
			}
		}
		else if(reportType == "ReportForSalesSummaryTicket")
		{
			if($scope.conditionReport.SummaryTypeDays && $scope.conditionReport.SummaryTypeTrips)
			{
				$scope.conditionReport.SummaryType = "Both";
			}
			else if($scope.conditionReport.SummaryTypeDays && !$scope.conditionReport.SummaryTypeTrips)
			{
				$scope.conditionReport.SummaryType = "Days";
			}
			else if(!$scope.conditionReport.SummaryTypeDays && $scope.conditionReport.SummaryTypeTrips)
			{
				$scope.conditionReport.SummaryType = "Trips";
			}
			else
			{
				$scope.conditionReport.SummaryType = null;	
			}

			if($scope.conditionReport.RouteType == "All")
			{
				$scope.conditionReport.RouteTypes = null;
			}
			else if($scope.conditionReport.RouteType == "Up")
			{
				$scope.conditionReport.RouteTypes = false;
			}
			else
			{
				$scope.conditionReport.RouteTypes = true;	
			}

			var RoutesStrList = "";
			angular.forEach($scope.conditionReport.Routes, function(each){
				RoutesStrList += "'" + each + "',";
			});

			RoutesStrList = RoutesStrList.substring(0, RoutesStrList.length - 1);

			Reports.GeneralReportForRevenueByVehicleTripDate(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.conditionReport.SummaryType,
				$scope.conditionReport.PersonType,
				$scope.conditionReport.PrePay,
				RoutesStrList,
				$scope.conditionReport.RouteTypes,
				$scope.conditionReport.StopPoint,
				$scope.conditionReport.UserId,
				$scope.conditionReport.VehicleSeatPlanId,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForTicketDetail")
		{
			if($scope.conditionReport.RouteType == "All")
			{
				$scope.conditionReport.RouteTypes = null;
			}
			else if($scope.conditionReport.RouteType == "Up")
			{
				$scope.conditionReport.RouteTypes = false;
			}
			else
			{
				$scope.conditionReport.RouteTypes = true;	
			}

			Reports.GeneralReportForDisplayTicketDetail(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.conditionReport.TypeSearch,
				$scope.conditionReport.Conditions,
				$scope.conditionReport.RouteTypes,
				$scope.conditionReport.StopPoint,
				$scope.conditionReport.UserId,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForCancelTicket")
		{
			Reports.GeneralReportForDisplayCancelTicket(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TypeSearch,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.dataReport.CancelTicketList = setStopPointName($scope.dataReport.CancelTicketList);
					angular.forEach($scope.dataReport.CancelTicketList, function(each)
					{
						each.ReturnedDateDays = $filter('jsonDate')(each.ReturnedDate, 'dd MMMM yyyy');
						each.VehicleOperationDateDays = $filter('jsonDate')(each.VehicleOperationDate, 'dd MMMM yyyy');
					});
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForTicketDiscount")
		{
			Reports.GeneralReportForDisplayDiscountTicket(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TypeSearch,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForReturnTicket")
		{
			switch ($scope.conditionReport.ReportType)
			{
				case "ReportForDisplayReturnTicket":
					Reports.GeneralReportForDisplayReturnTicket(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.conditionReport.TypeSearch,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.ReturnTicketList = setStopPointName($scope.dataReport.ReturnTicketList);
							$scope.globalVariable.isShowReport = true;
					});
					break;
				case "ReportForDisplayReturnTicket_Search":
					Reports.GeneralReportForDisplayReturnTicketSearch(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							angular.forEach($scope.dataReport.ReturnTicketList, function(each){
								each.VehicleOperationDateSort = $filter('date')(parseInt(each.VehicleOperationDate.substr(6)), 'MM/dd/yyyy h:mma');
							});
							$scope.globalVariable.isShowReport = true;
					});
					break;
				case "ReportForDisplayReturnTicket_TripDays":
					Reports.GeneralReportForDisplayReturnTicketTripDays(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.ReturnTicketList = setStopPointName($scope.dataReport.ReturnTicketList);
							$scope.globalVariable.isShowReport = true;
					});
					break;
				case "ReportForDisplayReturnTicket_OtherDays":
					Reports.GeneralReportForDisplayReturnTicketOtherDays(
						$scope.conditionReport.DateStart,
						$scope.conditionReport.DateEnd,
						$scope.timezoneOffset,
						function(data){
							$scope.dataReport = data;
							$scope.dataReport.ReturnTicketList = setStopPointName($scope.dataReport.ReturnTicketList);
							$scope.globalVariable.isShowReport = true;
					});
					break;
			}
		}
		else if(reportType == "ReportForPrintDuplicateTicket")
		{
			Reports.GeneralReportForDisplayTicketPrintDuplicate(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.dataReport.TicketPrintDuplicateList = setStopPointName($scope.dataReport.TicketPrintDuplicateList);
					$scope.globalVariable.isShowReport = true;
			});
		}
		else if(reportType == "ReportForDisclaimTicket")
		{
			Reports.GeneralReportForDisplayDisclaimTicket(
				$scope.conditionReport.DateStart,
				$scope.conditionReport.DateEnd,
				$scope.conditionReport.TimeStart,
				$scope.conditionReport.TimeEnd,
				$scope.timezoneOffset,
				function(data){
					$scope.dataReport = data;
					$scope.globalVariable.isShowReport = true;
			});
		}
	}

	/*Print Section*/
	$scope.printDiv = function() {
		$scope.dateTimeNow = new Date();
		console.log($scope.globalVariable.currentReports);
		console.log($scope.globalVariable.currentReports);
		var printContents = document.getElementById($scope.globalVariable.currentReports).outerHTML;
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/vendor-all.css"/><link rel="stylesheet" type="text/css" href="../css/custom.css"/><link rel="stylesheet" type="text/css" href="/avia-website/css/app.css"/></head><body onload="setTimeout(function(){window.print();window.close();}, 2000)">' + printContents + '</body></html>');
		popupWin.document.close();
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

	$scope.resetReport = function()
	{
		$scope.globalVariable.isShowReport = false;
		$scope.globalVariable.currentReports = "";
		$scope.dataReport = [];
		console.log($scope.conditionReport.ReportType);
	}

	$scope.setNewOptionforRevenueTicket = function()
	{
		//Select Type of report
		switch($scope.reportType.RevenueTicket)
		{
			case "ReportForRevenueFromTicketSales":
				$scope.conditionReport.ReportType = "RevenueBySales";
				break;
			case "ReportForTicketSalesDetail":
				$scope.conditionReport.ReportType = "ReportTicketSales";
				break;
			case "ReportForReturnTicket":
				$scope.conditionReport.ReportType = "ReportForDisplayReturnTicket";
				break;
		}
	}

	$scope.resetFilter = function()
	{
		$scope.filterReport = 
		{
			searchValue : '',
			sortParam1 : '',
			sortParam2 : '',
			sortParam3 : ''
		}
	}

	/*
		Helper
	*/
	var setStopPointName = function(data)
	{
		angular.forEach(data, function(each){
			var indexStartPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: each.StopPointStartId }, 'StopPointId');
			var indexEndPoint = $filter('lswIndexOf')($scope.stopPointData.StopPointList, { StopPointId: each.StopPointEndId }, 'StopPointId');
			if(indexStartPoint >= 0)
			{
				each.StopPointStart = $scope.stopPointData.StopPointList[indexStartPoint].StopPointName_TH;	
			}
			
			if(indexEndPoint >= 0)
			{
				each.StopPointEnd = $scope.stopPointData.StopPointList[indexEndPoint].StopPointName_TH;	
			}
		});

		return data;
	}

	var reStructureCounterSalesReport = function(counterNameList, mainData)
	{
		var isFirst = true;
		var newDataList = [];
		var newData = {
			detailReport : [],
			totalSales : 0,
			totalPrice : 0
		};
		var count = 0;
		var currentRouteMainNumber = "";
		var currentRouteNumber = "";

		

		//TripDays
		angular.forEach(mainData, function(eachData){
			if(currentRouteMainNumber != eachData.RouteMainNumber || currentRouteNumber != eachData.RouteNumber)
			{
				currentRouteMainNumber = eachData.RouteMainNumber;
				currentRouteNumber = eachData.RouteNumber;

				//Add New Data
				if(newData.detailReport.length > 0)
				{
					newDataList.push(newData);	
				}
			
				//Clear Data
				newData = {
					detailReport : [],
					totalSales : 0,
					totalPrice : 0
				};
				for(var i = 0; i < counterNameList.length; i++)
				{
					newData.detailReport[i] = { TotalSales : 0, TotalPrice : 0 };
				}

				count = 0;
				angular.forEach(counterNameList, function(eachCounterName){
					if(eachData.StopPointName_TH == eachCounterName.StopPointName_TH)
					{
						newData.RouteMainNumber = eachData.RouteMainNumber;
						newData.RouteNumber = eachData.RouteNumber;
						newData.detailReport[count].TotalSales = newData.detailReport[count].TotalSales + eachData.TotalSales;
						newData.detailReport[count].TotalPrice = newData.detailReport[count].TotalPrice + eachData.TotalPrice;
						newData.totalSales += eachData.TotalSales;
						newData.totalPrice += eachData.TotalPrice;
					}
					count++;
				});
			}
			else
			{
				//Exist Data
				count = 0;
				angular.forEach(counterNameList, function(eachCounterName){
					if(eachData.StopPointName_TH == eachCounterName.StopPointName_TH)
					{
						newData.detailReport[count].TotalSales = newData.detailReport[count].TotalSales + eachData.TotalSales;
						newData.detailReport[count].TotalPrice = newData.detailReport[count].TotalPrice + eachData.TotalPrice;
						newData.totalSales += eachData.TotalSales;
						newData.totalPrice += eachData.TotalPrice;
					}
					count++;
				});
			}
		});

		newDataList.push(newData);

		return newDataList;
	}
}]);