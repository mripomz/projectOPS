module.directive('awLimitLength', function () {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      attrs.$set("ngTrim", "false");
      var limitLength = parseInt(attrs.awLimitLength, 10);// console.log(attrs);
      scope.$watch(attrs.ngModel, function(newValue) {
        if(ngModel.$viewValue.length>limitLength){
          ngModel.$setViewValue( ngModel.$viewValue.substring(0, limitLength ) );
          ngModel.$render();
        }
      });
    }
  };
});