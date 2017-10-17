module.directive("lswPaginate", function () {
        return {
            restrict: "AE",
            templateUrl: rootUrl + "modals/Directives/lsw-paginate.html",
            scope: {
                config: '=lswPaginate',
                listToPaginate: '=ngModel',
                listLength: '=?listLength',
                maxPage: '=?maxPage'
            },
            link: function ($scope, elements, attrs) {

                if (!angular.isDefined($scope.config)) {
                    $scope.config = {};
                }

                if (!angular.isDefined($scope.config.pageOffset)) {
                    $scope.config.pageOffset = 0;
                }

                if (!angular.isDefined($scope.config.pageSize)) {
                    if (angular.isDefined($scope.maxPage) && $scope.maxPage == true) {
                        $scope.config.pageSize = 'All';
                    } else {
                        $scope.config.pageSize = 15;
                    }
                    
                }

                if (!angular.isDefined($scope.config.small)) {
                    $scope.config.small = false;
                }

                angular.forEach([
                    'pageSize',
                    'pageOffset',
                    'small',
                    'inputGroupClass'
                ], function (key) {
                    if (angular.isDefined(attrs[key]))
                        $scope.config[key] = attrs[key];
                });

                $scope.config.list = $scope.listToPaginate;

                $scope.lswSelectOptions = {
                    label: 'Page Size',
                    options: [5, 10, 15, 25, 50, 100, 'All'],
                    inputGroupClass: $scope.config.inputGroupClass,
                    small: $scope.config.small
                };


                $scope.setNumberOfPages = function () {
                    if (angular.isDefined($scope.config.list)) {

                        var pageSize = 0;

                        if ($scope.config.pageSize == 'All') {
                            pageSize = $scope.config.list.length;
                        } else {
                            pageSize = $scope.config.pageSize;
                        }

                        var numberOfPages = Math.ceil($scope.config.list.length / pageSize);

                        if (($scope.config.pageOffset + 1) > numberOfPages) {
                            $scope.config.pageOffset = numberOfPages - 1;
                        }

                        if (numberOfPages == 0) {
                            $scope.config.pageOffset = 0;
                            numberOfPages = 1;
                        }

                        $scope.numberOfPages = numberOfPages;
                    }
                }

                $scope.setNumberOfPages();

                $scope.next = function () {
                    $scope.config.pageOffset = $scope.config.pageOffset + 1;
                }

                $scope.prev = function () {
                    $scope.config.pageOffset = $scope.config.pageOffset - 1;
                }

                $scope.$watch('config.pageSize', function () {
                    $scope.setNumberOfPages();
                });

                $scope.$watch('config.pageOffset', function () {
                    $scope.config.startFrom = $scope.config.pageOffset * $scope.config.pageSize;
                });

                $scope.$watch('config.list.length', function () {
                    $scope.setNumberOfPages();
                });

            }
        }
    });

