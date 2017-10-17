module.directive("appDragend", [function () {
  return function(scope, element, attrs) {
    element.bind('dragend', function (event) {
      scope.$eval(attrs.appDragend);
    });
  }
}])
.run(function ($rootScope) {
  $rootScope.dropEnabled = true;
});