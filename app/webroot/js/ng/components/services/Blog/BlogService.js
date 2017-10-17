module.service('Blog', function (requestService, $http) {

    var apiController = 'Blog';

    return {
        GetAllBlog : function (callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllBlog',
                usertoken: true,
                callback: callback
            });
        },
         CheckExpressOrder : function (callback) {
             return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'CheckExpressOrder',
                usertoken: true,
                callback: callback
            });
        },
        SaveBlog : function (blog , callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SaveBlog',
                body: {
                    'blog' : blog
                },
                usertoken: true,
                callback: callback
            });
            
        },
        RemovedBlog: function(BlogId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemovedBlog',
                usertoken: true,
                query: {
                    "BlogId" : BlogId
                },
                callback: callback
            });
        },
        GetBlogById : function (BlogId, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetBlogById',
                usertoken: true,
                query: {
                    'BlogId': BlogId
                },
                callback: callback
            });
        },
        CheckStatusPic: function(BlogId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'CheckStatusPic',
                usertoken: true,
                query: {
                    "BlogId" : BlogId
                },
                callback: callback
            });
        },
        GetBlogGalleryList : function(BlogId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetBlogGalleryList',
                usertoken: true,
                query: {
                    "BlogId" : BlogId
                },
                callback: callback
            });
        },
         SaveBlogGallery : function(passenger, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'SavePassenger',
                usertoken: false,
                body: {'':passenger},
                callback: callback
            });
        }, 
        RemoveBlogGallery : function(BlogId, FileUploadId, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'RemoveBlogGallery',
                usertoken: true,
                query: {
                    "BlogId" : BlogId,
                    "FileUploadId" : FileUploadId
                },
                callback: callback
            });
        }, 
          upload : function(files,url, callback)
        {
           $http({
                    method: 'POST',

                    url: url,
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: {
                        
                        Files: files
                    },
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }
                })
                .success(function (data) {


                })
                .error(function (data, status) {

                });
        }, 

    };
});