module.service('Banks', function (requestService) {

    var apiController = 'Banks';

    return {
        GetAccountBankList: function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAccountBankList',
                usertoken: true,
                callback: callback
            });
        },
        GetAccountBankForAgency: function (userId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAccountBankForAgency',
                usertoken: true,
                query: {
                    'userId' : userId
                },
                callback: callback
            });
        },
        SaveAccountForAgency: function(account, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveAccountForAgency',
                usertoken: true,
                body: {
                    'account' : account
                },
                callback: callback
            });
        },
        RemoveAccountForAgency: function(AccountId, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'RemoveAccountForAgency',
                usertoken: true,
                body: {
                    'AccountId' : AccountId
                },
                callback: callback
            });
        },
        GetAviaAccountBankList: function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAviaAccountBankList',
                usertoken: true,
                callback: callback
            });
        },
        UpdateAviaAccountBank: function(aviaBank, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateAviaAccountBank',
                usertoken: true,
                body: {
                    'aviaBank' : aviaBank
                },
                callback: callback
            });
        },
        RemoveAviaAccountBank: function(AviaAccountBankId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveAviaAccountBank',
                usertoken: true,
                query: {
                    'AviaAccountBankId' : AviaAccountBankId
                },
                callback: callback
            });
        },
    };
});