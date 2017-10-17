module.controller('StopPointCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Routes", "Locations", "$filter", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Routes, Locations, $filter) {

    $scope.stopPointData = {
        StopPointList : []
    };
    $scope.ProvicesList = [];

    $scope.errorMsg = {
        isError : false,
        message : ""
    }

    $scope.StopPointDetail = {};

    $scope.initData = function()
    {
        $scope.loadGetStopPointList();

        Locations.GetAllProvinces(function(data){
            $scope.ProvicesList = data;
        });
    }

    $scope.loadGetStopPointList = function()
    {
        Routes.GetStopPointList(function(data){
            $scope.stopPointData = data;
        });
    }

    var updateStopPointModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Routes/update-stop-point-modal.html', show: false });
    $scope.addStopPoint = function()
    {
        
        $scope.errorMsg.isError = false;
        $scope.errorMsg.message = "";
        $scope.StopPointDetail = {};
        $scope.StopPointDetail = setMapsAttrToObject($scope.StopPointDetail);
        console.log($scope.StopPointDetail);
        
        updateStopPointModal.$promise.then(updateStopPointModal.show);
        
    }

    $scope.editStopPoint = function(StopPointId)
    {
        $scope.errorMsg.isError = false;
        $scope.errorMsg.message = "";

        Routes.GetStopPointById(StopPointId, function(data){

            $scope.StopPointDetail = setMapsAttrToObject(data);
            updateStopPointModal.$promise.then(updateStopPointModal.show);
            if(data.ServiceStatus == "GETSTOPPOINTBYID_FAIL")
            {
                Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
                $scope.StopPointDetail = data;
                updateStopPointModal.$promise.then(updateStopPointModal.show);
            }
        });
    }

    $scope.updateStopPoint = function()
    {
        Routes.UpdateStopPoint($scope.StopPointDetail, function(data){
            if(data.ServiceStatus == "UPDATESTOPPOINT_FAIL")
            {
                $scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
                $scope.errorMsg.isError = true;
            }
            else
            {
                updateStopPointModal.$promise.then(updateStopPointModal.hide);
                $scope.loadGetStopPointList();
            }
        });
    }

    $scope.removeStopPoint = function(StopPointId)
    {
        Routes.RemoveStopPoint(StopPointId, function(data){
            if(data.ServiceStatus == "REMOVEDSTOPPOINT_FAIL")
            {
                Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
                Modals.showAlertSuccess();
                $scope.loadGetStopPointList();
            }
        });
    }

    $scope.searchCoordinatesLocation = function()
    {
        var getIndex = $filter('lswIndexOf')($scope.ProvicesList.Provinces, { ProvinceId: $scope.StopPointDetail.ProvinceId },'ProvinceId');
        if(getIndex != -1)
        {
            Locations.SearchCoordinatesLocation($scope.ProvicesList.Provinces[getIndex].ProvinceName_TH, function(data){
                $scope.StopPointDetail.maps.center.latitude = data.results[0].geometry.location.lat;
                $scope.StopPointDetail.maps.center.longitude = data.results[0].geometry.location.lng;
                $scope.StopPointDetail.maps.marker.coords.latitude = data.results[0].geometry.location.lat;
                $scope.StopPointDetail.maps.marker.coords.longitude = data.results[0].geometry.location.lng;
                $scope.StopPointDetail.Latitude = data.results[0].geometry.location.lat;
                $scope.StopPointDetail.Longitude = data.results[0].geometry.location.lng;
                $scope.$evalAsync();
            });
        }
    }

    $scope.updateGoogleMaps = function()
    {
        $scope.StopPointDetail.maps.center.latitude = $scope.StopPointDetail.Latitude;
        $scope.StopPointDetail.maps.center.longitude = $scope.StopPointDetail.Longitude;
        $scope.StopPointDetail.maps.marker.coords.latitude = $scope.StopPointDetail.Latitude;
        $scope.StopPointDetail.maps.marker.coords.longitude = $scope.StopPointDetail.Longitude;
        $scope.$evalAsync();
    }

    var setMapsAttrToObject = function(data)
    {
        var Latitude = 0;
        var Longitude = 0;
        if(data.Latitude != null && data.Latitude != 0)
        {
            Latitude = data.Latitude;
        }
        else
        {
            Latitude = 18.7992741;
        }

        if(data.Longitude != null && data.Longitude != 0)
        {
            Longitude = data.Longitude;
        }
        else
        {
            Longitude = 98.9742345;
        }
        
        data.maps = {
            center : 
            {
                latitude : Latitude,
                longitude : Longitude
            },
            zoom : 12,
            title : "เชียงใหม่",
            marker : {
                id : 1,
                coords: {
                    latitude : Latitude,
                    longitude : Longitude
                },
                options :
                {
                    draggable : true
                },
                events :
                {
                    dragend : function(object, eventName, arge)
                    {
                        var lat = object.getPosition().lat();
                        var lon = object.getPosition().lng();
                        $scope.StopPointDetail.maps.marker.coords.latitude = lat;
                        $scope.StopPointDetail.maps.marker.coords.longitude = lon;
                        $scope.StopPointDetail.Latitude = lat;
                        $scope.StopPointDetail.Longitude = lon;
                        $scope.$evalAsync();
                    }
                }
            },
            events :
            {
                click : function(object, eventName, arge)
                {
                    var lat = arge[0].latLng.lat();
                    var lon = arge[0].latLng.lng();
                    $scope.StopPointDetail.maps.marker.coords.latitude = lat;
                    $scope.StopPointDetail.maps.marker.coords.longitude = lon;
                    $scope.StopPointDetail.Latitude = lat;
                    $scope.StopPointDetail.Longitude = lon;
                    $scope.$evalAsync();
                }
            }
        }

        return data;
    }

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.stopPointData.StopPointList,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ]
        }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions,
        columns: [
        	{
        		label: "จัดหวัด",
                column: "ProvinceName_TH"
        	},
        	{
        		label: "ชื่อจุดจอด",
                column: "StopPointName"
        	},
        	{
        		label: "สามารถเปลี่ยนรถได้",
                column: "IsTransit"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };
}]);