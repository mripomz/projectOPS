module.directive('appDownloadUrl', [function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('dragstart', function (event) {
        var config = scope.$eval(attrs.appDownloadUrl);
        if (!config.disabled) {
          var data = config.mime + ':' + config.name + ':' + window.location.href + config.url;
          event.dataTransfer.setData('DownloadURL', data);
        }
      });
    }
  };
}]);