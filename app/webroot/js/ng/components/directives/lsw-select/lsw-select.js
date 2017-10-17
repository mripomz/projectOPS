module.directive("lswSelect", function () {
        return {
            restrict: "AE",
            templateUrl: rootUrl + "modals/Directives/lsw-select.html",
            transclude: true,
            scope: {
                selected: '=ngModel',
                options: '=?ngOptions',
                ngChange: '&',
                config: '=?lswSelect',
                uniqueTo: '=?uniqueTo'
            },
            link: function ($scope, elements, attrs) {
                //default values
                if (!angular.isDefined($scope.config)) {
                    $scope.config = {};
                }

                if (angular.isDefined($scope.config.options)) {
                    $scope.options = $scope.config.options;
                }

                if (angular.isDefined($scope.config.uniqueTo)) {
                    $scope.uniqueTo = $scope.config.uniqueTo;
                }

                angular.forEach([
                    'label',
                    'inputGroupClass',
                    'displayField',
                    'valueField',
                    'primaryKey',
                    'uniqueOn',
                    'filter',
                    'showPleaseSelect',
                    'small'
                ], function (key) {
                    if (angular.isDefined(attrs[key]))
                        $scope.config[key] = attrs[key];
                });

                //variables
                $scope.lswSelectFilter = "";
                $scope.toggled = true;

                $scope.setSelected = function (option, index) {
                    if (!!$scope.config.valueField) {
                        if ($scope.config.valueField == "$index") {
                            $scope.selected = index;
                        } else {
                            $scope.selected = option; //option[$scope.config.valueField]
                            //$scope.$apply();
                        }
                    } else {
                        $scope.selected = option;
                    }
                    $scope.toggled = false;
                }

                $scope.$watch("selected", function () {
                    if (typeof $scope.ngChange == "function") {
                        $scope.ngChange();
                    }
                })
            }
        }
    });

