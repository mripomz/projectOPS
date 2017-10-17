module.service('Agency', function (requestService) {

    var apiController = 'Agencies';

    return {
        GetAgencyManagePriceList: function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyManagePriceList',
                usertoken: true,
                callback: callback
            });
        },
        GetAgencyDebtorList: function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyDebtorList',
                usertoken: true,
                callback: callback
            });
        },
        GetAgencyPricePerRoutes: function (AgencyGradePriceId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyPricePerRoutes',
                query: {
                    'AgencyGradePriceId' : AgencyGradePriceId
                },
                usertoken: true,
                callback: callback
            });
        },
        UpdateAgencyManagePriceByAdmin : function(agencyPrice, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateAgencyManagePriceByAdmin',
                usertoken: true,
                body : {
                    'agencyPrice' : agencyPrice
                },
                callback: callback
            });
        },
        UpdateAgencyManagePricePerRouteByAdmin : function(agencyPricePerRoute, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateAgencyManagePricePerRouteByAdmin',
                usertoken: true,
                body : {
                    'agencyPricePerRoute' : agencyPricePerRoute
                },
                callback: callback
            });
        },
        UpdateAgencyManagePricePerRouteByAgency : function(agencyPricePerRoute, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateAgencyManagePricePerRouteByAgency',
                usertoken: true,
                body : {
                    'agencyPricePerRoute' : agencyPricePerRoute
                },
                callback: callback
            });
        },
        GetAgencyTicketSettingById: function(userId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyTicketSettingById',
                usertoken: true,
                query : {
                    'userId' : userId
                },
                callback: callback
            });
        },
        UpdateAgencySetting : function(agency, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateAgencySetting',
                usertoken: true,
                body : {
                    'agency' : agency
                },
                callback: callback
            });
        },
        GetAgencyCreditByUserId : function(UserId, isIgnoreLoadingBar, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyCreditByUserId',
                usertoken: true,
                query : {
                    'UserId' : UserId
                },
                isIgnoreLoadingBar : isIgnoreLoadingBar,
                callback: callback
            });
        },
        GetAgencyCreditHistoryByUserId : function(UserId, dateStart, dateEnd, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyCreditHistoryByUserId',
                usertoken: true,
                query : {
                    'UserId' : UserId,
                    'dateStart' : dateStart,
                    'dateEnd' : dateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetTransactionByTypeTopUp : function(TransactionId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTransactionByTypeTopUp',
                usertoken: true,
                query : {
                    'InformMoneyTransactionId' : TransactionId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetTransactionByTypeWithdrawal : function(TransactionId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTransactionByTypeWithdrawal',
                usertoken: true,
                query : {
                    'WithdrawalCreditTransactionId' : TransactionId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetTransactionByBuyTicket : function(TransactionId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetTransactionByBuyTicket',
                usertoken: true,
                query : {
                    'TransactionId' : TransactionId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetAgencyRoutePriceSample : function(GradeIdBuy, RouteId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyRoutePriceSample',
                query: {
                    'GradeIdBuy' : GradeIdBuy,
                    'RouteId' : RouteId
                },
                usertoken: true,
                callback: callback
            });
        },
        GetAgencyManagePriceByUserId : function(UserId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyManagePriceByUserId',
                usertoken: true,
                query : {
                    'UserId' : UserId
                },
                callback: callback
            });
        },
        GetAgencyPricePerRoutesByRouteId : function(AgencyGradePriceId, RouteId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAgencyPricePerRoutesByRouteId',
                usertoken: true,
                query : {
                    'AgencyGradePriceId' : AgencyGradePriceId,
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SellerBoxBookingTicket : function (
            seatSelect, 
            vehicleOperationSeat, 
            passengerDetail, 
            RouteId, 
            VehicleTypeId, 
            IsPickupChoose,
            IsDropoffChoose,
            pickupPassenger,
            dropoffPassenger,
            timezoneOffset, 
            callback) {
            return requestService({
                
                verb: 'POST',
                controller: apiController,
                endpoint: 'SellerBoxBookingTicket',
                usertoken: true,
                body : {
                    "lstSellingSeat" : seatSelect,
                    "vehicleOperationSeat" : vehicleOperationSeat,
                    "passengerDetail" : passengerDetail,
                    "RouteId" : RouteId,
                    "VehicleTypeId" : VehicleTypeId,
                    "IsPickupChoose" : IsPickupChoose,
                    "IsDropoffChoose" : IsDropoffChoose,
                    "pickupPassenger" : pickupPassenger,
                    "dropoffPassenger" : dropoffPassenger,
                    "timezoneOffset" : timezoneOffset
                },
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
        ReturnTicketByAgency : function (VehicleOperationSeatId, VehicleSeatId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReturnTicketByAgency',
                usertoken: true,
                query : {
                    "VehicleOperationSeatId" : VehicleOperationSeatId,
                    "VehicleSeatId" : VehicleSeatId
                },
                callback: callback
            });
        },
        GetSellingTicketListByAgency : function (VehicleOperationId, UserId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetSellingTicketListByAgency',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId,
                    "UserId" : UserId
                },
                callback: callback
            });
        },
        CheckReturnTicket : function (VehicleOperationId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'CheckReturnTicket',
                usertoken: true,
                query : {
                    "VehicleOperationId" : VehicleOperationId,
                    "timezoneOffset" : timezoneOffset
                },
                callback: callback
            });
        },
        GetConnectPaysbuy : function (connectPaysbuyDTO, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetConnectPaysbuy',
                usertoken: true,
                body : {
                    "connectPaysbuyDTO" : connectPaysbuyDTO
                },
                callback: callback
            });
        },
        getTransactionByInvoice : function (psbID,biz,secureCode,invoice,referenceId, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'getTransactionByInvoice',
                usertoken: true,
                query : {
                    "psbID" : psbID,
                    "biz" : biz,
                    "secureCode" : secureCode,
                    "invoice" : invoice,
                    "referenceId" : referenceId,

                },
                callback: callback
            });
        },
    };
});