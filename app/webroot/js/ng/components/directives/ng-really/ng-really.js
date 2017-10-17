module.directive('lswConfirmModal', function ($modal, $cookies) {
    return {
        restrict: "A",
        link: function ($scope, $element, $attrs) {
            var template = (!!$attrs.template ? $attrs.template : rootUrl + 'modals/Directives/lsw-confirm-modal.html');
            var method = $attrs.lswConfirmModal;
            var language = "ENG";
            var modal = $modal({
                scope: $scope,
                templateUrl: template,
                show: false,
                placement : "center"
            });
            
            $element.bind('click', function(event) {
                modal.$promise.then(modal.show);
            });

            if($cookies.get('CakeCookie[lang]') != '')
            {
                language = $cookies.get('CakeCookie[lang]');
            }

            $scope.message = $attrs.messageEn;

            if(language == "TH"){
                $scope.message = $attrs.messageTh;
            }

            $scope.confirm = function(bool) {
                if (bool) {
                    $scope.$eval(method);
                    modal.hide();
                } else {
                    modal.hide();
                }
            }
        }
    };
});