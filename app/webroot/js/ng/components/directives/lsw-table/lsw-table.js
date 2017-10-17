module.directive("lswTable", function () {
    return {
        restrict: "AE",
        templateUrl: rootUrl + "modals/Directives/lsw-table.html",
        transclude: true,
        scope: {
            config: '=?lswTable',
            rows: '=?ngModel'
        },
        link: function ($scope, element, attrs) {
            //defaults
            $scope.parent = $scope.$parent;
            //console.log($scope.config);

            if (!$scope.config) {
                $scope.config = {};
            }

            if (!$scope.config.tableClass) {
                $scope.config.tableClass = "table";
            }

            if (!$scope.extraOptions) {
                $scope.extraOptions = $scope.config.extraOptions;
            }

            //private functions
            function buildColumns() {
                $scope.config.columns = [];
                angular.forEach($scope.rows[0], function (value, key) {
                    $scope.config.columns.push({ value: key });
                });
            };

            //public functions
            $scope.init = function () {
                if (!$scope.config.columns) {
                    buildColumns();
                } else {
                    for (var i = 0; i < $scope.config.columns.length; i++) {
                        if ($scope.config.columns[i].total) {
                            $scope.config.useFootTemplate = true;
                        }
                    }
                }

                if (!!$scope.config.groupBy) {
                    $scope.predicate = $scope.config.groupBy;
                    $scope.reverse = false;
                }

                if (!!$scope.config.orderBy) {
                    $scope.predicate = $scope.config.orderBy;
                }

                if (!!$scope.config.sortBy) {
                    $scope.reverse = $scope.config.sortBy;
                }
            };

            $scope.isNewGroup = function (row) {
                console.log("running");
                var list = $scope.config.paginateOptions.list;
                var index = list.indexOf(row);
                var groupBy = $scope.config.groupBy;

                return list[index - 1][groupBy].trim() != list[index][groupBy].trim();
            }

            $scope.repeatColumns = function () {
                return new Array($scope.config.columns.length - 1);
            }

            $scope.sort = function (column) {
                if (!$scope.config.groupBy) {
                    $scope.predicate = column;
                    $scope.reverse = !$scope.reverse;
                }
            };

            $scope.total = function (column) {
                var total = 0;
                var begin = 0;
                var end = $scope.config.paginateOptions.list.length;
                
                //page totals
                if (!!$scope.config.paginateOptions.startFrom) {
                    begin = $scope.config.paginateOptions.startFrom;
                    pageSize = $scope.config.paginateOptions.pageSize;
                    if (begin + pageSize <= end) {
                        end = begin + pageSize;
                    }
                }

                var parsedVal = 0;
                for (var x = begin; x < end; x++) {
                    parsedVal = parseFloat($scope.rows[x][column]);
                    if (!isNaN(parsedVal)) total += parsedVal;
                }
                return total;
            }
        },
        controller: function ($scope) {
            $scope.$watch('config', function () {
                $scope.init()
            })
        }
    };
})
.filter('metafilter', function ($filter) {
    return function (value, filterSpec) {
        var args = filterSpec.split(':');
        var filter = $filter(args.shift());
        args.unshift(value);
        return filter.apply(null, args);
    };
})
.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});