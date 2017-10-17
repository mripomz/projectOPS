module.service('Sales', function (requestService) {

    var apiController = 'Sales';

    return {
        GetRouteByUserId : function (UserId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteByUserId',
                usertoken: true,
                query: {
                    'UserId': UserId
                },
                callback: callback
            });
        },
        GetRouteMissingByUserId : function (UserId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetRouteMissingByUserId',
                usertoken: true,
                query: {
                    'UserId': UserId
                },
                callback: callback
            });
        },
        AddRouteToUser : function (UserId, RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'AddRouteToUser',
                usertoken: true,
                query: {
                	'UserId' : UserId,
                    'RouteId': RouteId
                },
                callback: callback
            });
        },
        RemoveRouteFromSales : function (UserId, RouteId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveRouteFromSales',
                usertoken: true,
                query: {
                	'UserId' : UserId,
                    'RouteId': RouteId
                },
                callback: callback
            });
        },
        GetSalesRegionByUserId : function (UserId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetSalesRegionByUserId',
                usertoken: true,
                query: {
                    'UserId' : UserId
                },
                callback: callback
            });
        },
        UpdateSalesRegion : function(sales, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateSalesRegion',
                usertoken: true,
                body: {
                    'sales' : sales
                },
                callback: callback
            });
        },
        GetSaleListBySaleRegion : function(StopPointId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'GetSaleListBySaleRegion',
                usertoken: true,
                body: {
                    'StopPointId' : StopPointId
                },
                callback: callback
            });
        },
    };
});