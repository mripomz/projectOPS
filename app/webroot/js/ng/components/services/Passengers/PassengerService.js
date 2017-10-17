module.service('Passengers', function (requestService) {

    var apiController = 'Passenger';

    return {
    	SearchPassenger : function (wordsearch, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SearchPassenger',
                usertoken: true,
                query : {
                    "wordsearch" : wordsearch
                },
                callback: callback
            });
        },
        SearchPassengerBoughtTicket : function (wordsearch, date, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SearchPassengerBoughtTicket',
                usertoken: true,
                query : {
                    'wordsearch' : wordsearch,
                    'date' : date,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
    };
});