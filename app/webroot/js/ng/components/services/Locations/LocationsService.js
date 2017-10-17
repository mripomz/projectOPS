module.service('Locations', function (requestService, $http) {

    var apiController = 'Locations';

    return {
        GetAllProvinces : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllProvinces',
                usertoken: false,
                callback: callback
            });
        },
        GetAmphurByProvince : function (ProvinceId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAmphurByProvince',
                query: {
                    'ProvinceId' : ProvinceId
                },
                usertoken: false,
                callback: callback
            });
        },
        GetDistrictByProvinceAndAmphur : function (ProvinceId, AmphurId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetDistrictByProvinceAndAmphur',
                query: {
                    'ProvinceId' : ProvinceId,
                    'AmphurId' : AmphurId
                },
                usertoken: false,
                callback: callback
            });
        },
        GetLocationList  : function (isActived, timezoneOffset , callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetLocationList',
                query: {
                    'isActived' : isActived,
                    'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                callback: callback
            });
        },
        GetLocationById  : function (LocationId , callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetLocationById',
                query: {
                    'LocationId' : LocationId
                },
                usertoken: true,
                callback: callback
            });
        },
        SaveLocation : function (location , callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveLocation',
                body: {
                    'location' : location
                },
                usertoken: true,
                callback: callback
            });
        },
        SearchCoordinatesLocation : function(addressName, callback)
        {
            var request = {};
            request.http = $http({
                method: "GET",
                url: "http://maps.google.com/maps/api/geocode/json",
                params: 
                {
                    'address' : addressName
                },
                async: false
            }).success(function(data) {
                if (!!callback) {
                   callback(data);    
                }
            }).error(function() {
                if (!!callback) {
                    callback("error");
                }
            });

            return request;
        },
        GetLocationListByPickupDropOffServiceId : function (PickupDropOffServiceId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetLocationListByPickupDropOffServiceId',
                query: {
                    'PickupDropOffServiceId' : PickupDropOffServiceId,
                    'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                callback: callback
            });
        },
    };
});