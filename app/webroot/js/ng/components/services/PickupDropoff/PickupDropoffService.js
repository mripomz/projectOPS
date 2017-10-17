module.service('PickupDropoff', function (requestService) {

    var apiController = 'PickupDropoff';

    return {
        GetPickupDropOffRates : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPickupDropOffRates',
                usertoken: true,
                callback: callback
            });
        },
        GetPickupDropOffRateById : function (PickupDropOffRateId , callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetPickupDropOffRateById',
                query: {
                    'PickupDropOffRateId' : PickupDropOffRateId
                },
                usertoken: true,
                callback: callback
            });
        },
        SavePickupDropOffRate : function (pickup , callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SavePickupDropOffRate',
                body: {
                    'pickup' : pickup
                },
                usertoken: true,
                callback: callback
            });
        },
        PickupDropoffServices : function(DateStart, DateEnd, timeStart, timeEnd, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'PickupDropoffServices',
                usertoken: true,
                query: {
                    'DateStart' : DateStart,
                    'DateEnd' : DateEnd,
                    'TimeStart' : timeStart,
                    'TimeEnd' : timeEnd,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetPickupDropoffServiceById : function(PickupDropOffServiceId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPickupDropoffServiceById',
                usertoken: true,
                query: {
                    'PickupDropOffServiceId' : PickupDropOffServiceId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        SavePickupDropoffServices : function(pickup, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SavePickupDropoffServices',
                usertoken: true,
                body: {
                    'pickup' : pickup
                },
                query: {
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetVehiclePickupDropoffServices : function(callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehiclePickupDropoffServices',
                usertoken: true,
                callback: callback
            });
        },
        GetPickupDropOffServicesPickup : function(StopPointId,VehicleOperationId, date, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPickupDropOffServicesPickup',
                query : {
                    'StopPointId' : StopPointId,
                    'VehicleOperationId' : VehicleOperationId,
                    'Date' : date,
                    'timezoneOffset' : timezoneOffset

                },
                usertoken: true,
                callback: callback
            });
        },
        GetPickupDropOffServicesDropoff : function(StopPointId,VehicleOperationId, date, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPickupDropOffServicesDropoff',
                query : {
                    'StopPointId' : StopPointId,
                    'VehicleOperationId' : VehicleOperationId,
                    'Date' : date,
                    'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                callback: callback
            });
        },
        SavePassengerService : function(pickup, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SavePassengerService',
                usertoken: true,
                body: {
                    'pickupDropOff' : pickup
                },
                callback: callback
            });
        },
        ReportForPickupdropOffServices : function(date, TimeStart, TimeEnd, TypeOfService, StopPointId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForPickupdropOffServices',
                query : {
                    'Date' : date,
                    'TimeStart' : TimeStart,
                    'TimeEnd' : TimeEnd,
                    'TypeOfService' : TypeOfService,
                    'StopPointId' : StopPointId,
                    'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                callback: callback
            });
        },
         GetVehicleOperations : function(PickupDropOffDate,type,timezoneOffset,callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleOperations',
                query : {
                    'PickupDropOffDate' : PickupDropOffDate,
                    'type' : type,
                    'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                callback: callback
            });
        },
        ReportForPickupdropOffTicket : function(pPassengerId,dPassengerId,referenceCode,vehicleOperSeatId, callback)
        {
             return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReportForPickupdropOffTicket',
                query : {
                    'pPassengerId' : pPassengerId,
                    'dPassengerId' : dPassengerId,
                    'referenceCode' : referenceCode,
                    'vehicleOperSeatId' : vehicleOperSeatId
                },
                usertoken: true,
                callback: callback
            });
        }
    };
});