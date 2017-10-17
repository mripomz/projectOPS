module.service('requestServiceRegister', function ($http, $rootScope, $cookies) {

    return function (params) {
        
        var token = "a3in%2fx5Hwt8Q2PKea2G8%2bbE6527GqUYHf3TKBswGjqqsnS4McnCAD3DFQf5TMbbt";
        var language = "ENG";
        if(params.usertoken == true){
            token = encodeURIComponent($cookies.get('CakeCookie[accessToken]'));
        }

        if($cookies.get('CakeCookie[lang]') != '')
        {
            language = $cookies.get('CakeCookie[lang]');
        }

        if(angular.isUndefined(params.isIgnoreLoadingBar))
        {
            params.isIgnoreLoadingBar = false;
        }

        var request = {};
        request.http = $http({
            method: params.verb,
            url: 'http://localhost:2879/' + '/' + params.controller + (params.endpoint ? '/' + params.endpoint : '') + "?accessToken=" + token + "&language=" + language,
            params: params.query,
            data: params.body,
            async: false,
            ignoreLoadingBar: params.isIgnoreLoadingBar
        }).success(function(data) {
            if (!!params.callback) {
                if(!angular.isUndefined(data.StatusCode) && data.StatusCode == 401)
                {
                    //Redirect to login
                    $rootScope.$broadcast('Unauthorized');
                    window.event.stopPropagation();
                }
                else
                {
                    params.callback(data);    
                }
                
            }
        }).error(function() {
            if (!!params.callback) {
                params.callback("error");
            }
        });

        request.hashIndex = params.verb + ':' + 'http://localhost:2879/' + '/api/' + params.controller + (params.endpoint ? '/' + params.endpoint : '');

        return request;
    }
})