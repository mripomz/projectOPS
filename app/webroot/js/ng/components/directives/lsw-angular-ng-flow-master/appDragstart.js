module.directive("appDragstart", [function () {
  return function(scope, element, attrs) {
    element.bind('dragstart', function (event) {
      scope.$eval(attrs.appDragstart);
    });
  }
}]);