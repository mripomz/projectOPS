module.service('Reports', function (requestService) {

    var apiController = 'Reports';

    return {
        ReportForSeatPlan : function (VehicleSeatPlanId, VehicleOperationId, StopPointId, UserId, timezoneOffset, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSeatPlan',
                usertoken: true,
                query: 
                {
                    'VehicleSeatPlanId' : VehicleSeatPlanId,
                    'VehicleOperationId' : VehicleOperationId,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        ReportForDeparturedEachStopPoint : function (VehicleOperationId, StopPointId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForDeparturedEachStopPoint',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId,
                    'StopPointId' : StopPointId
                },
                callback: callback
            });
        },
        ReportForBookingSimple : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForBookingSimple',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForBookedSimple : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForBookedSimple',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForBookingSimpleShowPhone : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForBookingSimpleShowPhone',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForSummaryCost : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryCost',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForSummaryFreight : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryFreight',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForSummaryCustomer : function (VehicleOperationId, RouteId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryCustomer',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId,
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        ReportForSummaryStaticVehicleTransport : function (VehicleOperationId, RouteId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryStaticVehicleTransport',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId,
                    'RouteId' : RouteId
                },
                callback: callback
            });
        }, 
        ReportForSummaryOtherDay : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryOtherDay',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForSummarySameDay : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummarySameDay',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        ReportForSummaryCommission : function (VehicleOperationId, callback) {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForSummaryCommission',
                usertoken: true,
                query: 
                {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        GeneralReportForChangeNotes : function(DateStart, DateEnd, TimeStart, TimeEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForChangeNotes',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForCurrentBookingTicket : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForCurrentBookingTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForCancelBookingTicket : function(DateStart, DateEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForCancelBookingTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForOperationIndividual : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, VehicleOperationId, StopPoint, UserId, VehicleSeatPlanId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForOperationIndividual',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'VehicleOperationId' : VehicleOperationId,
                    'StopPoint' : StopPoint,
                    'timezoneOffset' : timezoneOffset,
                    'UserId' : UserId,
                    'VehicleSeatPlanId' : VehicleSeatPlanId
                },
                callback: callback
            });
        },
        GeneralReportForOperationIndividual_Thermal : function(DateStart, DateEnd, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForOperationIndividual_Thermal',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForOperationIndividualByTicketNumber : function(DateStart, DateEnd, StopPointId, VehicleSeatPlanId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForOperationIndividualByTicketNumber',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'StopPointId' : StopPointId,
                    'VehicleSeatPlanId' : VehicleSeatPlanId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForLoginLogOut : function(DateStart, DateEnd, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForLoginLogOut',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForVehicleDetail : function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForVehicleDetail',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForNumberOfVehicle : function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForNumberOfVehicle',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },

        GeneralReportForRevenueBySales : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueBySales',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByVehicleTrip : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByVehicleTrip',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByProgress : function(DateStart, DateEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByProgress',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByCounterSales : function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByCounterSales',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByAdvanceSold : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByAdvanceSold',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByAdvanceSoldShort : function(DateStart, DateEnd, TimeStart, TimeEnd, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByAdvanceSoldShort',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByAdvanceSoldDisplayDetailShort : function(DateStart, DateEnd, TimeStart, TimeEnd, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByAdvanceSoldDisplayDetailShort',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByTicketSellerShort : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByTicketSellerShort',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByPayeeAndTrip : function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByPayeeAndTrip',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByVehicleNumber : function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByVehicleNumber',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForRevenueByCounter : function(DateStart, DateEnd, TypeSearch, StopPointId, UserId, VehicleSeatPlanId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByCounter',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'VehicleSeatPlanId' : VehicleSeatPlanId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisPlayReportTicketSales : function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisPlayReportTicketSales',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        }, 
        GeneralReportForDisPlayReportTicketSalesSearch : function(DateStart, DateEnd, TimeStart, TimeEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisPlayReportTicketSalesSearch',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        }, 
        GeneralReportForRevenueByVehicleTripDate : function(DateStart, DateEnd, TimeStart, TimeEnd, SummaryType, PersonType, PrePay, Routes, RouteType, StopPointId, UserId, VehicleSeatPlanId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForRevenueByVehicleTripDate',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'SummaryType' : SummaryType,
                    'PersonType' : PersonType,
                    'PrePay' : PrePay,
                    'Routes' : Routes,
                    'RouteType' : RouteType,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'VehicleSeatPlanId' : VehicleSeatPlanId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayTicketDetail :  function(DateStart, DateEnd, TimeStart, TimeEnd, TypeSearch, Conditions, RouteType, StopPointId, UserId, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayTicketDetail',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeSearch' : TypeSearch,
                    'Conditions' : Conditions,
                    'RouteType' : RouteType,
                    'StopPointId' : StopPointId,
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayCancelTicket :  function(DateStart, DateEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayCancelTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayDiscountTicket :  function(DateStart, DateEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayDiscountTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayReturnTicket :  function(DateStart, DateEnd, TypeSearch, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayReturnTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TypeSearch' : TypeSearch,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayReturnTicketSearch :  function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayReturnTicketSearch',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayReturnTicketTripDays :  function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayReturnTicketTripDays',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayReturnTicketOtherDays :  function(DateStart, DateEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayReturnTicketOtherDays',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayTicketPrintDuplicate :  function(DateStart, DateEnd, TimeStart, TimeEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayTicketPrintDuplicate',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GeneralReportForDisplayDisclaimTicket :  function(DateStart, DateEnd, TimeStart, TimeEnd, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'GeneralReportForDisplayDisclaimTicket',
                usertoken: true,
                query: 
                {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        reportTaxAndInspection :  function(Year, timezoneOffset, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'reportTaxAndInspection',
                usertoken: true,
                query: 
                {
                    'Year' : Year,
                },
                callback: callback
            });
        },
         reportInsurance :  function(Year, callback)
        {
            return requestService(
            {
                verb: 'GET',
                controller: apiController,
                endpoint: 'reportInsurance',
                usertoken: true,
                query: 
                {
                    'Year' : Year
                },
                callback: callback
            });
        },
         reportVehicleAct : function (Year,callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'reportVehicleAct',
                usertoken: true,
                query: 
                {
                    'Year' : Year
                },
                callback: callback
            });
        },
        getMinAndMaxYear : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'getMinAndMaxYear',
                usertoken: true,
                callback: callback
            });
        },
        getMinAndMaxYearTaxAndInspection : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'getMinAndMaxYearTaxAndInspection',
                usertoken: true,
                callback: callback
            });
        },
        getMinAndMaxYearInsurance : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'getMinAndMaxYearInsurance',
                usertoken: true,
                callback: callback
            });
        },
    };
});