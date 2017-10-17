module.service('Discount', function (requestService) {

    var apiController = 'Discounts';

    return {
        GetDiscountList : function (active,callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetDiscountList',
                usertoken: true,
                query : {
                    'active' : active
                },
                callback: callback
            });
        },
        GetDiscountById : function (DiscountTypeId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetDiscountById',
                usertoken: true,
                query : {
                    "DiscountTypeId" : DiscountTypeId
                },
                callback: callback
            });
        },
        UpdateDiscountType : function (discount, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateDiscountType',
                usertoken: true,
                body : {
                    "discount" : discount
                },
                callback: callback
            });
        },
        RemoveDiscountType : function (DiscountTypeId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveDiscountType',
                usertoken: true,
                query : {
                    "DiscountTypeId" : DiscountTypeId
                },
                callback: callback
            });
        },
        GetGradeList : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetGradeList',
                usertoken: true,
                callback: callback
            });
        },
    };
});