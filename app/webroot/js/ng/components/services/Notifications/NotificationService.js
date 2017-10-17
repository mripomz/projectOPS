module.service('Notification', function (requestService) {

    var apiController = 'Notification';

    return {
    	GetNotificationByUserToken : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetNotificationByUserToken',
                usertoken: true,
                callback: callback
            });
        },
        MarkReadNotification : function (NotificationId, UserId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'MarkReadNotification',
                usertoken: true,
                query: {
                    'NotificationId': NotificationId,
                    'UserId': UserId
                },
                callback: callback
            });
        },
    }

});