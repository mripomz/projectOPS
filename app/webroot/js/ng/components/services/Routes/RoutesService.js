module.service('Routes', function (requestService) {

    var apiController = 'Routes';

    return {
        GetStopPointList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetStopPointList',
                usertoken: true,
                callback: callback
            });
        },
        GetStopPointListByProvinceId : function (ProvinceId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetStopPointListByProvinceId',
                usertoken: true,
                query : {
                    'ProvinceId' : ProvinceId
                },
                callback: callback
            });
        },
        UpdateStopPoint : function(StopPoint, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateStopPoint',
                usertoken: true,
                body : {
                    'stopPoint' : StopPoint
                },
                callback: callback
            });
        },
        GetStopPointById : function (StopPointId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetStopPointById',
                usertoken: true,
                query : {
                    'StopPointId' : StopPointId
                },
                callback: callback
            });
        },
        SaveRouteStep1 : function(StopPoint, RouteDuration,selectVehiclelst, isSetCompleted, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep1',
                usertoken: true,
                body : {
                    'route' : StopPoint,
                    'lstRouteDuration' : RouteDuration
                },
                query : {
                    'selectVehiclelst' :selectVehiclelst,
                    'isSetCompleted' : isSetCompleted,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetRouteInVehicleType : function (RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteInVehicleType',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        RemoveStopPoint : function (StopPointId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveStopPoint',
                usertoken: true,
                query : {
                    'StopPointId' : StopPointId
                },
                callback: callback
            });
        },
        GetRouteList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteList',
                usertoken: true,
                callback: callback
            });
        },
        GetRouteCompletedList : function (IsAvailabled, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteCompletedList',
                usertoken: true,
                query : {
                    'IsAvailabled' : IsAvailabled
                },
                callback: callback
            });
        },
        GetRouteById : function (RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteById',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        GetRouteProviceList :  function (RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteProviceList',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        GetRouteDurationInVehicleTypeList :  function (RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteDurationInVehicleTypeList',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SaveRouteStep2 : function(route, RouteId, isSetCompleted, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep2',
                usertoken: true,
                body : {
                    'route' : route
                },
                query : {
                    'RouteId' : RouteId,
                    'isSetCompleted' : isSetCompleted
                },
                callback: callback
            });
        },
        GetRoutePriceByRouteId : function(RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetRoutePriceByRouteId',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SaveRouteStep3 : function( RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep3',
                usertoken: true,
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SaveRouteStep3RoutePrice : function(vehicleStandardList,vehicleTypeList,GradeList,RoutePrice, RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep3RoutePrice',
                usertoken: true,
                body : {
                    'vehicleStandardList' : vehicleStandardList,
                    'vehicleTypeList': vehicleTypeList,
                    'GradeList' : GradeList,
                    'RoutePrice' : RoutePrice
                },
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SaveRouteStep3RouteAccountPrice : function(vehicleStandardList,vehicleTypeList,GradeList,RouteAccountPrice, RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep3RouteAccountPrice',
                usertoken: true,
                body : {
                    'vehicleStandardList' : vehicleStandardList,
                    'vehicleTypeList': vehicleTypeList,
                    'GradeList' : GradeList,
                    'RouteAccountPrice' : RouteAccountPrice
                },
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        SaveRouteStep3RouteAgencyPrice : function(vehicleStandardList,vehicleTypeList,GradeList,RouteAgencyPrice, RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep3RouteAgencyPrice',
                usertoken: true,
                body : {
                    'vehicleStandardList' : vehicleStandardList,
                    'vehicleTypeList': vehicleTypeList,
                    'GradeList' : GradeList,
                    'RouteAgencyPrice' : RouteAgencyPrice
                },
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
         SaveRouteStep3RouteWebsitePrice : function(vehicleStandardList,vehicleTypeList,GradeList,RouteWebsitePrice, RouteId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteStep3RouteWebsitePrice',
                usertoken: true,
                body : {
                    'vehicleStandardList' : vehicleStandardList,
                    'vehicleTypeList': vehicleTypeList,
                    'GradeList' : GradeList,
                    'RouteWebsitePrice' : RouteWebsitePrice
                },
                query : {
                    'RouteId' : RouteId
                },
                callback: callback
            });
        },
        RemoveRoute : function(RouteId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveRoute',
                usertoken: true,
                query : {
                    'RouteId' : RouteId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        SetEditRoute : function(RouteId, currentStep, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SetEditRoute',
                usertoken: true,
                query : {
                    'RouteId' : RouteId,
                    'currentStep' : currentStep
                },
                callback: callback
            });
        },
        GetStopPointByRouteId : function(RouteId, VehicleOperationId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetStopPointByRouteId',
                usertoken: true,
                query : {
                    'RouteId' : RouteId,
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        GetStopPointByStopPointId : function(RouteId, StopPointId, VehicleOperationId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetStopPointByStopPointId',
                usertoken: true,
                query : {
                    'RouteId' : RouteId,
                    'StopPointId' : StopPointId,
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        GetVehicleRouteTripById : function(VehicleOperationId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleRouteTripById',
                usertoken: true,
                query : {
                    'VehicleOperationId' : VehicleOperationId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        SaveRouteTrip : function(vehicleOperation, vehicleOprationStopPoint, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveRouteTrip',
                usertoken: true,
                body : {
                    'vehicleOperation' : vehicleOperation,
                    'vehicleOprationStopPoint' : vehicleOprationStopPoint,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        UpdateRouteTrip : function(vehicleOperation, vehicleOprationStopPoint, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateRouteTrip',
                usertoken: true,
                body : {
                    'vehicleOperation' : vehicleOperation,
                    'vehicleOprationStopPoint' : vehicleOprationStopPoint,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetVehicleRouteTrip : function(dateStart, dateEnd, timeStart, timeEnd, RouteId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetVehicleRouteTrip',
                usertoken: true,
                body : {
                    'dateStart' : dateStart,
                    'dateEnd' : dateEnd,
                    'timeStart' : timeStart,
                    'timeEnd' : timeEnd,
                    'RouteId' : RouteId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetVehicleRouteTripSellTicket : function(dateStart, dateEnd, VehicleSeatPlanId, timeStart, timeEnd, RouteId, timezoneOffset, isIgnoreLoadingBar, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetVehicleRouteTripSellTicket',
                usertoken: true,
                body : {
                    'dateStart' : dateStart,
                    'dateEnd' : dateEnd,
                    'VehicleSeatPlanId' : VehicleSeatPlanId,
                    'timeStart' : timeStart,
                    'timeEnd' : timeEnd,
                    'RouteId' : RouteId,
                    'timezoneOffset' : timezoneOffset
                },
                isIgnoreLoadingBar : isIgnoreLoadingBar,
                callback: callback
            });
        },
        GetVehicleRouteTripRelate : function(dateList, RouteId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetVehicleRouteTripRelate',
                usertoken: true,
                body : {
                    'dateList' : dateList,
                    'RouteId' : RouteId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        BeforeRemoveVehicleOperation : function(VehicleOperationId, timezoneOffset, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'BeforeRemoveVehicleOperation',
                usertoken: true,
                query : {
                    'VehicleOperationId' : VehicleOperationId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        BeforeRemoveVehicleOperationList : function(VehicleOperationList, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'BeforeRemoveVehicleOperationList',
                usertoken: true,
                body : {
                    'VehicleOperationList' : VehicleOperationList
                },
                callback: callback
            });
        },
        RemoveVehicleOperation : function(VehicleOperationId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleOperation',
                usertoken: true,
                query : {
                    'VehicleOperationId' : VehicleOperationId
                },
                callback: callback
            });
        },
        RemoveVehicleOperationList : function(lstVehicleOperation, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'RemoveMultipleVehicleOperation',
                usertoken: true,
                body : {
                    'lstVehicleOperation' : lstVehicleOperation
                },
                callback: callback
            });
        },
        SaveMultipleRouteTrip : function(VehicleOperationList, dateList, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveMultipleRouteTrip',
                usertoken: true,
                body : {
                    'vehicleOperationList' : 
                    {
                        'VehicleOperationList' : VehicleOperationList,
                        'dateList' : dateList
                    },
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        UpdateRouteCostOfQueue : function(routeDetail, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateRouteCostOfQueue',
                usertoken: true,
                body : {
                    'routeDetail' : routeDetail
                },
                callback: callback
            });
        },
    };
});