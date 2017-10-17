module.service('Pages', function (requestService) {

    var apiController = 'Pages';

    return {
        GetPageControllerById : function (pageId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPageControllerById',
                usertoken: true,
                query: {
                    'pageId': pageId
                },
                callback: callback
            });
        },
        SearchPageControllers: function (searchBy, searchValue, sortBy, sortType, isFirst, recordPerPage, pageNo, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'SearchPageControllers',
                usertoken: true,
                query: {
                    'searchBy': searchBy,
                    'searchValue': searchValue,
                    'sortBy': sortBy,
                    'sortType': sortType,
                    'isFirst': isFirst,
                    'recordPerPage': recordPerPage,
                    'pageNo': pageNo
                },
                callback: callback
            });
        },
        PagesControllerUpdate: function(pageDetail, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'PagesControllerUpdate',
                usertoken: true,
                body: pageDetail,
                callback: callback
            });
        },
        RemovePageControllerById: function(pageId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemovePageControllerById',
                usertoken: true,
                query: {
                    "pageId" : pageId
                },
                callback: callback
            });
        },
        GetPageRoleMenuList: function(userId, roleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPageRoleMenuList',
                usertoken: true,
                query: {
                    "userId" : userId,
                    "roleId" : roleId
                },
                callback: callback
            });
        },
        GetPageRoleMenuListByRole: function(roleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPageRoleMenuListByRole',
                usertoken: true,
                query: {
                    "roleId" : roleId
                },
                callback: callback
            });
        },
        GetPageRoleMenuListByUser: function(userId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetPageRoleMenuListByUser',
                usertoken: true,
                query: {
                    "userId" : userId
                },
                callback: callback
            });
        },
        RemovePageFromRole : function(roleId, pageId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemovePageFromRole',
                usertoken: true,
                query: {
                    "roleId" : roleId,
                    "PageControllerId" : pageId
                },
                callback: callback
            });
        },
        RemovePageFromUser : function(userId, pageId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemovePageFromUser',
                usertoken: true,
                query: {
                    "userId" : userId,
                    "PageControllerId" : pageId
                },
                callback: callback
            });
        },
        GetListPagesMissingByRole: function(roleId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetListPagesMissingByRole',
                usertoken: true,
                query: {
                    "roleId" : roleId
                },
                callback: callback
            });
        },
        GetListPagesMissingByUser: function(userId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetListPagesMissingByUser',
                usertoken: true,
                query: {
                    "userId" : userId
                },
                callback: callback
            });
        },
        AddPagePermissionByRole: function(roleId, pageId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'AddPagePermissionByRole',
                usertoken: true,
                query: {
                    "roleId" : roleId,
                    "PageControllerId" : pageId
                },
                callback: callback
            });
        },
        AddPagePermissionByUser: function(userId, pageId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'AddPagePermissionByUser',
                usertoken: true,
                query: {
                    "userId" : userId,
                    "PageControllerId" : pageId
                },
                callback: callback
            });
        }
    };
});