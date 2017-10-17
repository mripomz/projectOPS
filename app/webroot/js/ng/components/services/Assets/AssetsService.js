module.service('Assets', function (requestService) {

    var apiController = 'Assets';

    return {
        GetAllVehicle : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllVehicle',
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleByVehicleSeatPlan : function (VehicleSeatPlanId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleByVehicleSeatPlan',
                usertoken: true,
                query: {
                    'VehicleSeatPlanId': VehicleSeatPlanId
                },
                callback: callback
            });
        },
        GetVehicleById : function (VehicleId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleById',
                usertoken: true,
                query: {
                    'VehicleId': VehicleId
                },
                callback: callback
            });
        },
        CreateVehicle: function (ChassisNumber, PlateNumber,VehicleNumber, PlateProvince, VehicleTypeId,IsServicePickupDropOff, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'CreateVehicle',
                usertoken: true,
                query: {
                    'ChassisNumber' : ChassisNumber,
                    'PlateNumber': PlateNumber,
                    'VehicleNumber' : VehicleNumber,
                    'PlateProvince' : PlateProvince,
                    'VehicleTypeId' : VehicleTypeId,
                    'IsServicePickupDropOff' : IsServicePickupDropOff,
                },
                callback: callback
            });
        },
        UpdateVehicle: function(vehicleDetail, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicle',
                usertoken: true,
                body: {'':vehicleDetail},
                callback: callback
            });
        },
        RemovedVehicle: function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemovedVehicle',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        GetVehicleGalleryList : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleGalleryList',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        SaveVehicleGallery : function(VehicleGallery, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveVehicleGallery',
                usertoken: true,
                body: {'':VehicleGallery},
                callback: callback
            });
        },
        RemoveVehicleGallery : function(VehicleId, FileUploadId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleGallery',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId,
                    "FileUploadId" : FileUploadId
                },
                callback: callback
            });
        },
        GetVehicleTaxListById : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTaxListById',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        GetVehicleTaxDateById : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTaxDateById',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        GetVehicleTaxById : function(VehicleTaxId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTaxById',
                usertoken: true,
                query: {
                    "VehicleTaxId" : VehicleTaxId
                },
                callback: callback
            });
        },
        UpdateVehicleTax : function(VehicleTax, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleTax',
                usertoken: true,
                body: {'':VehicleTax},
                callback: callback
            });
        },
        UpdateVehicleTaxDate : function(VehicleTaxDate, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleTaxDate',
                usertoken: true,
                body: {'':VehicleTaxDate},
                callback: callback
            });
        },
        RemoveVehicleTax : function(VehicleTaxId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleTax',
                usertoken: true,
                query: {
                    "VehicleTaxId" : VehicleTaxId
                },
                callback: callback
            });
        },
        GetAllVehicleInsurance : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllVehicleInsurance',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        UpdateVehicleInsurance : function(VehicleInsurance, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleInsurance',
                usertoken: true,
                body: {'':VehicleInsurance},
                callback: callback
            });
        },
        GetVehicleInsuranceById  : function(VehicleInsuranceId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleInsuranceById',
                usertoken: true,
                query: {
                    "VehicleInsuranceId" : VehicleInsuranceId
                },
                callback: callback
            });
        },
        GetVehicleInsuranceActiveByVehicleId  : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleInsuranceActiveByVehicleId',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        RemoveVehicleInsurance : function(VehicleInsuranceId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleInsurance',
                usertoken: true,
                query: {
                    "VehicleInsuranceId" : VehicleInsuranceId
                },
                callback: callback
            });
        },
        GetVehicleInsuranceDocument : function(FileUploadId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleInsuranceDocument',
                usertoken: true,
                query: {
                    "FileUploadId" : FileUploadId
                },
                callback: callback
            });
        },
        GetAllVehicleAct : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllVehicleAct',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        UpdateVehicleAct : function(VehicleAct, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleAct',
                usertoken: true,
                body: {'':VehicleAct},
                callback: callback
            });
        },
        GetVehicleActById  : function(VehicleActId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleActById',
                usertoken: true,
                query: {
                    "VehicleActId" : VehicleActId
                },
                callback: callback
            });
        },
        RemoveVehicleAct : function(VehicleActId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleAct',
                usertoken: true,
                query: {
                    "VehicleActId" : VehicleActId
                },
                callback: callback
            });
        },
        GetVehicleActDocument : function(FileUploadId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleActDocument',
                usertoken: true,
                query: {
                    "FileUploadId" : FileUploadId
                },
                callback: callback
            });
        },
        GetAllVehicleLeases : function(VehicleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllVehicleLeases',
                usertoken: true,
                query: {
                    "VehicleId" : VehicleId
                },
                callback: callback
            });
        },
        GetVehicleLeaseById : function(VehicleLeaseId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleLeaseById',
                usertoken: true,
                query: {
                    "VehicleLeaseId" : VehicleLeaseId
                },
                callback: callback
            });
        },
        RemoveVehicleLease : function(VehicleLeaseId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleLease',
                usertoken: true,
                query: {
                    "VehicleLeaseId" : VehicleLeaseId
                },
                callback: callback
            });
        },
        UpdateVehicleLease : function(VehicleLease, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleLease',
                usertoken: true,
                body: {'':VehicleLease},
                callback: callback
            });
        },
        GetVehicleLeseFileList : function(VehicleLeaseId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleLeseFileList',
                usertoken: true,
                query: {
                    "VehicleLeaseId" : VehicleLeaseId
                },
                callback: callback
            });
        },
        RemoveVehicleLeaseFile : function(VehicleLeaseId, FileUploadId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleLeaseFile',
                usertoken: true,
                query: {
                    "VehicleLeaseId" : VehicleLeaseId,
                    "FileUploadId" : FileUploadId
                },
                callback: callback
            });
        },
        GetVehicleLeasePeriodList : function(VehicleLeaseId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleLeasePeriodList',
                usertoken: true,
                query: {
                    "VehicleLeaseId" : VehicleLeaseId
                },
                callback: callback
            });
        },
        UpdateVehicleLeasePeriod : function(newLeasePeriod, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleLeasePeriod',
                usertoken: true,
                body: {'':newLeasePeriod},
                callback: callback
            });
        },
        RemoveVehicleLeasePeriod : function(VehicleLeasePeriodId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveVehicleLeasePeriod',
                usertoken: true,
                query: {
                    "VehicleLeasePeriodId" : VehicleLeasePeriodId
                },
                callback: callback
            });
        },
        GetVehicleCompletedList : function(callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleCompletedList',
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleTypeById : function(VehicleTypeId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTypeById',
                usertoken: true,
                query: {
                    'VehicleTypeId' : VehicleTypeId
                },
                callback: callback
            });
        },
        GetVehicleTypeList  : function(callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTypeList',
                usertoken: true,
                callback: callback
            });
        },
        GetVehicleTypeInRouteList  : function(Route,callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetVehicleTypeInRouteList',
                usertoken: true,
                 query: {
                    'Route' : Route
                },
                callback: callback
            });
        },
        UpdateVehicleType : function(IsEdit,VehicleTypeActive,VehicleTypeId,VehicleTypeName,VehicleTypeSeatStartRow, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateVehicleType',
                usertoken: true,
                query: {
                    'IsEdit' : IsEdit,
                    'VehicleTypeActive' : VehicleTypeActive,
                    'VehicleTypeId' : VehicleTypeId,
                    'VehicleTypeName' : VehicleTypeName,
                    'VehicleTypeSeatStartRow' : VehicleTypeSeatStartRow
                },
                callback: callback
            });
        },
        RemoveVehicleType : function(VehicleTypeId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'RemoveVehicleType',
                usertoken: true,
                body: { 'VehicleTypeId': VehicleTypeId },
                callback: callback
            });
        },
        UploadFilesVehicle : function(VehicleTypeId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'RemoveVehicleType',
                usertoken: true,
                body: { 'VehicleTypeId': VehicleTypeId },
                callback: callback
            });
        },
    };
});