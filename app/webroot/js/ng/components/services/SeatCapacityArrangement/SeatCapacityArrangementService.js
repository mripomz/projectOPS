module.service('SeatCapacityArrangement', function (requestService) {

    var apiController = 'SeatCapacityArrangement';

    return {
    	GetVehicleSeatPlanList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatPlanList',
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleSeatPlanListCompleted : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatPlanListCompleted',
                usertoken: true,
                callback: callback
            });
        },
         GetVehicleSeatPlanListCompletedForBooking : function (RouteId,callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatPlanListCompletedForBooking',
                query : {
                    'RouteId' : RouteId
                },
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleSeatPlanListCompletedForBookingOperation : function (VehicleOperationId,callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatPlanListCompletedForBookingOperation',
                query : {
                    'VehicleOperationId' : VehicleOperationId
                },
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleStandardList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleStandardList',
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleSeatPlanById : function (VehicleSeatPlanId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatPlanById',
                query : {
                	'VehicleSeatPlanId' : VehicleSeatPlanId
                },
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleSeatStandardList : function(VehicleSeatPlanId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatStandardList',
                usertoken: true,
                query: {
                    "VehicleSeatPlanId" : VehicleSeatPlanId
                },
                callback: callback
            });
        },
        SaveVehicleSeatPlanStep1 : function(VehicleSeatPlan, VehicleSeatStandard, isSetCompleted, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleSeatPlanStep1',
                usertoken: true,
                body: {
                    'seatPlan' : VehicleSeatPlan,
                    'seatInSeatPlan':VehicleSeatStandard
                },
                query: {
                    'isSetCompleted' : isSetCompleted
                },
                callback: callback
            });
        },
        SaveVehicleSeatPlanStep2  : function(VehicleSeatFloorDetail, VehicleSeatPlan, isSetCompleted, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleSeatPlanStep2',
                usertoken: true,
                body: {
                    'seatFloor' : VehicleSeatFloorDetail,
                    'VehicleSeatPlan' : VehicleSeatPlan
                },
                query: {
                    'isSetCompleted' : isSetCompleted
                },
                callback: callback
            });
        },
        SaveVehicleSeatPlanStep3  : function(VehicleSeatFloorDetail, VehicleSeatPlanId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleSeatPlanStep3',
                usertoken: true,
                body: {'vehicleSeatFloor' : VehicleSeatFloorDetail},
                query: {
                    "VehicleSeatPlanId" : VehicleSeatPlanId
                },
                callback: callback
            });
        },
        GetVehicleSeatFloorList : function(VehicleSeatPlanId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleSeatFloorList',
                usertoken: true,
                query: {
                    "VehicleSeatPlanId" : VehicleSeatPlanId
                },
                callback: callback
            });
        },
        LoadTemplateSeatPlan : function(VehicleSeatPlanId, VehicleSeatPlanIdTarget, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'LoadTemplateSeatPlan',
                usertoken: true,
                query: {
                    "VehicleSeatPlanId" : VehicleSeatPlanId,
                    "VehicleSeatPlanIdTarget" : VehicleSeatPlanIdTarget
                },
                callback: callback
            });
        },
        RemoveVehicleSeatPlanById : function (VehicleSeatPlanId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleSeatPlanById',
                usertoken: true,
                query: {
                    "VehicleSeatPlanId" : VehicleSeatPlanId
                },
                callback: callback
            });
        },
    }
});

// GetVehicleStandardList : function(callback)
     //    {
     //        return requestService({
     //            verb: 'GET',
     //            controller: apiController,
     //            endpoint: 'GetVehicleStandardList',
     //            usertoken: true,
     //            callback: callback
     //        });
     //    },
     //    SaveVehicleSeatPlanStep1 : function(VehicleSeatPlan, VehicleSeatStandard, isSetCompleted, callback)
     //    {
     //        return requestService({
     //            verb: 'POST',
     //            controller: apiController,
     //            endpoint: 'SaveVehicleSeatPlanStep1',
     //            usertoken: true,
     //            body: {
     //                'seatPlan' : VehicleSeatPlan,
     //                'seatInSeatPlan':VehicleSeatStandard
     //            },
     //            query: {
     //                'isSetCompleted' : isSetCompleted
     //            },
     //            callback: callback
     //        });
     //    },
     //    GetVehicleSeatPlan : function(VehicleId, callback)
     //    {
     //        return requestService({
     //            verb: 'GET',
     //            controller: apiController,
     //            endpoint: 'GetVehicleSeatPlan',
     //            usertoken: true,
     //            query: {
     //                "VehicleId" : VehicleId
     //            },
     //            callback: callback
     //        });
     //    },
     //    GetVehicleSeatStandardList : function(VehicleSeatPlanId, callback)
     //    {
     //        return requestService({
     //            verb: 'GET',
     //            controller: apiController,
     //            endpoint: 'GetVehicleSeatStandardList',
     //            usertoken: true,
     //            query: {
     //                "VehicleSeatPlanId" : VehicleSeatPlanId
     //            },
     //            callback: callback
     //        });
     //    },
     //    
     //    SaveVehicleSeatPlanStep2  : function(VehicleSeatFloorDetail, VehicleSeatPlan, isSetCompleted, callback)
     //    {
     //        return requestService({
     //            verb: 'POST',
     //            controller: apiController,
     //            endpoint: 'SaveVehicleSeatPlanStep2',
     //            usertoken: true,
     //            body: {
     //                'seatFloor' : VehicleSeatFloorDetail,
     //                'VehicleSeatPlan' : VehicleSeatPlan
     //            },
     //            query: {
     //                'isSetCompleted' : isSetCompleted
     //            },
     //            callback: callback
     //        });
     //    },
     //    
     //    SaveVehicleSeatPlanStep3  : function(VehicleSeatFloorDetail, VehicleSeatPlanId, callback)
     //    {
     //        return requestService({
     //            verb: 'POST',
     //            controller: apiController,
     //            endpoint: 'SaveVehicleSeatPlanStep3',
     //            usertoken: true,
     //            body: {'vehicleSeatFloor' : VehicleSeatFloorDetail},
     //            query: {
     //                "VehicleSeatPlanId" : VehicleSeatPlanId
     //            },
     //            callback: callback
     //        });
     //    },
     //    SetEditVehicleSeatPlan : function(VehicleSeatPlanId, StepEdit, callback)
     //    {
     //        return requestService({
     //            verb: 'GET',
     //            controller: apiController,
     //            endpoint: 'SetEditVehicleSeatPlan',
     //            usertoken: true,
     //            query: {
     //                "VehicleSeatPlanId" : VehicleSeatPlanId,
     //                "StepEdit" : StepEdit
     //            },
     //            callback: callback
     //        });
     //    },
     //    LoadTemplateSeatPlan : function(VehicleId, VehicleSeatPlanId, callback)
     //    {
     //        return requestService({
     //            verb: 'GET',
     //            controller: apiController,
     //            endpoint: 'LoadTemplateSeatPlan',
     //            usertoken: true,
     //            query: {
     //                "VehicleId" : VehicleId,
     //                "VehicleSeatPlanId" : VehicleSeatPlanId
     //            },
     //            callback: callback
     //        });
     //    },