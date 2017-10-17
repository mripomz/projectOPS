module.service('Tickets', function (requestService) {

    var apiController = 'Tickets';

    return {
        GetTicketPaymentTypeList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTicketPaymentTypeList',
                usertoken: true,
                callback: callback
            });
        },
        GetTicketPaymentTypeListByAgency : function (IsAgency,callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTicketPaymentTypeListByAgency',
                usertoken: true,
                query : {
                    "IsAgency" : IsAgency
                },
                callback: callback
            });
        },
         GetTicketPaymentTypeListByNormal : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTicketPaymentTypeListByNormal',
                usertoken: true,
                callback: callback
            });
        },
        GetTicketPaymentTypeById : function (TicketPaymentTypeId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTicketPaymentTypeById',
                usertoken: true,
                query : {
                    "TicketPaymentTypeId" : TicketPaymentTypeId
                },
                callback: callback
            });
        },
        UpdateTicketPaymentType : function (ticket, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateTicketPaymentType',
                usertoken: true,
                body : {
                    "ticket" : ticket
                },
                callback: callback
            });
        },
        SellerBoxBookingTicket : function (seatSelect, vehicleOperationSeat, passengerDetail, timezoneOffset, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SellerBoxBookingTicket',
                usertoken: true,
                body : {
                    "lstSellingSeat" : seatSelect,
                    "vehicleOperationSeat" : vehicleOperationSeat,
                    "passengerDetail" : passengerDetail,
                    "timezoneOffset" : timezoneOffset
                },
                callback: callback
            });
        },
        GetSeatAvailableList : function (RouteId, VehicleOperationId, VehicleSeatPlanId, StopPointStartId, StopPointEndId, isIgnoreLoadingBar, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetSeatAvailableList',
                usertoken: true,
                query : {
                    "RouteId" : RouteId,
                    "VehicleOperationId" : VehicleOperationId,
                    "VehicleSeatPlanId" : VehicleSeatPlanId,
                    "StopPointStartId" : StopPointStartId,
                    "StopPointEndId" : StopPointEndId
                },
                isIgnoreLoadingBar : isIgnoreLoadingBar,
                callback: callback
            });
        },
        SeatExchange : function (VehicleOperationSeatId, VehicleSeatId, VehicleSeatTargetId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SeatExchange',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId,
                    "VehicleSeatTargetId" : VehicleSeatTargetId
                },
                callback: callback
            });
        },
        SeatDisclaim : function (VehicleOperationSeatId, VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SeatDisclaim',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
        SeatPay : function (VehicleOperationSeatId, VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SeatPay',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
        ReturnTicketByNormal : function (VehicleOperationSeatId, VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReturnTicketByNormal',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
         ReturnTicketByAgency : function (VehicleOperationSeatId, VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReturnTicketByNormal',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
        GetSellingTicketList : function (VehicleOperationId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetSellingTicketList',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId
                },
                callback: callback
            });
        },
        GetVehicleOperationCostsById : function (VehicleOperationId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperationCostsById',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId
                },
                callback: callback
            });
        },
        GetVehicleOperationFreightsById : function (VehicleOperationId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperationFreightsById',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId
                },
                callback: callback
            });
        },
        GetVehicleOperationNotesById : function (VehicleOperationId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperationNotesById',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId,
                    "timezoneOffset" : timezoneOffset
                },
                callback: callback
            });
        },
        SaveVehicleOperationCosts : function (operationCost, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleOperationCosts',
                usertoken: true,
                body : {
                    "operationCost" : operationCost
                },
                callback: callback
            });
        },
        SaveVehicleOperationFreights : function (operationFreight, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleOperationFreights',
                usertoken: true,
                body : {
                    "operationFreight" : operationFreight
                },
                callback: callback
            });
        },
        SaveVehicleOperationNotes : function (operationNote, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleOperationNotes',
                usertoken: true,
                body : {
                    "operationNote" : operationNote
                },
                callback: callback
            });
        },
        RemoveVehicleOperationCosts : function (VehicleOperationCostId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleOperationCosts',
                usertoken: true,
                query : {
                    "VehicleOperationCostId" : VehicleOperationCostId
                },
                callback: callback
            });
        },
        RemoveVehicleOperationFreights : function (VehicleOperationFreightId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleOperationFreights',
                usertoken: true,
                query : {
                    "VehicleOperationFreightId" : VehicleOperationFreightId
                },
                callback: callback
            });
        },
        RemoveVehicleOperationNote : function (VehicleOperationNoteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleOperationNote',
                usertoken: true,
                query : {
                    "VehicleOperationNoteId" : VehicleOperationNoteId
                },
                callback: callback
            });
        },
        GetVehicleOperationLogsById : function (VehicleOperationId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperationLogsById',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId,
                    "timezoneOffset" : timezoneOffset
                },
                callback: callback
            });
        },
        IsBooked : function (VehicleOperationId, VehicleSeatFloorId,VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'IsBooked',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId,
                    "VehicleSeatFloorId" : VehicleSeatFloorId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
        GetVehicleOperationSeat : function (VehicleOperationSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperationSeat',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId
                },
                callback: callback
            });
        },
        SaveVehicleOperationPrintTicketLog : function(printLog, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleOperationPrintTicketLog',
                usertoken: true,
                body : {
                    "printLog" : printLog
                },
                callback: callback
            });
        },
        ChangedNotesForBookingSeat : function (vehicleOperationSeat, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'ChangedNotesForBookingSeat',
                usertoken: true,
                body : {
                    "vehicleOperationSeat" : vehicleOperationSeat
                },
                callback: callback
            });
        },
          
    };
});