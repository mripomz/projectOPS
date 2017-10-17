module.service('Users', function (requestService) {

    var apiController = 'Users';

    return {
        GetUserInfoById : function (userId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetUserInfoById',
                usertoken: true,
                query: {
                    'userId': userId
                },
                callback: callback
            });
        },
        SearchUserInfo: function (searchBy, searchValue, sortBy, sortType, isActive, isDelete, RoleId, recordPerPage, pageNo, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SearchUserInfo',
                usertoken: true,
                query: {
                    'searchBy': searchBy,
                    'searchValue': searchValue,
                    'sortBy': sortBy,
                    'sortType': sortType,
                    'isActive': isActive,
                    'isDelete' : isDelete,
                    'RoleId' : RoleId,
                    'recordPerPage': recordPerPage,
                    'pageNo': pageNo
                },
                callback: callback
            });
        },
        GetAllRoles: function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllRoles',
                usertoken: false,
                callback: callback
            });
        },
        UpdateUserInfo: function(userInfo, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'UpdateUserInfo',
                usertoken: true,
                body: userInfo,
                callback: callback
            });
        },
        DeleteUserInfo: function(userId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'DeleteUserInfo',
                usertoken: true,
                query: {
                    "userId" : userId
                },
                callback: callback
            });
        }
    };
});