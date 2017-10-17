module.controller('LocationCtrl',[
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	"Modals", 
	"Pages", 
	"Locations", function (
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Locations) {

	$scope.globalVariable = 
	{
		currentProcess : 1
	}

	$scope.filter = {
		isActived : true,
		isShowStatus : "true"
	};

	//timezone diff
	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();

	$scope.locationList = [];
	$scope.provinceList = [];
	$scope.amphurList = [];
	$scope.districtList = [];

	$scope.locationDetail = {};
	$scope.pickupMarkers = [];
	$scope.dropOffMarkers = [];

	/* Init Maps */
	$scope.map = {
		center : 
		{
			latitude : 18.7992741,
			longitude : 98.9742345
		},
		zoom : 16,
		title : "เชียงใหม่",
		marker : {},
		showInfo : true
	}

	//View Section
	$scope.initData = function()
	{
		Locations.GetAllProvinces(function(data){
			$scope.provinceList = data.Provinces;
		});

		Locations.GetLocationList($scope.filter.isActived, $scope.timezoneOffset, function(data){
			$scope.locationList = data.LocationList;
		});

		$scope.globalVariable.currentProcess = 1;
	}

	var showMapDirectionModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Location/show-maps-direction-modal.html', show: false });
	$scope.showMapDirection = function(dataMap)
	{
		//Set map focus
		$scope.map.center.latitude = dataMap.Latitude;
		$scope.map.center.longitude = dataMap.Longitude;
		$scope.map.title = dataMap.LocationName;
		$scope.map.showInfo = true;
		$scope.map.dataMap = dataMap;

		//Set marker
		$scope.map.marker = 
		{
			id : dataMap.LocationId,
			coords: {
				latitude : dataMap.Latitude,
				longitude : dataMap.Longitude
			},
      		options: { draggable: false }
		}

		showMapDirectionModal.$promise.then(showMapDirectionModal.show);
	}

	//Add Location Section
	$scope.addLocation = function()
	{
		$scope.locationDetail = {
		    LocationName : "",
            LocationRoadName : "",
            Latitude : 18.7899989,
            Longitude : 98.9676717,
            AmphurId : null,
            DistrictId : null,
            ProvinceId : null,
            Telephone : "",
            IsActived : true,
            maps : {
            	center : {
					latitude : 18.7992741,
					longitude : 98.9742345
				},
				zoom : 16,
				marker : {
					id : 1,
					coords: {
						latitude : 18.7992741,
						longitude : 98.9742345
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
	          				$scope.locationDetail.Latitude = lat;
	          				$scope.locationDetail.Longitude = lon;
	          				$scope.locationDetail.maps.marker.coords.latitude = lat;
	          				$scope.locationDetail.maps.marker.coords.longitude = lon;
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
          				$scope.locationDetail.Latitude = lat;
          				$scope.locationDetail.Longitude = lon;
          				$scope.locationDetail.maps.marker.coords = {};
          				$scope.locationDetail.maps.marker.coords.latitude = lat;
          				$scope.locationDetail.maps.marker.coords.longitude = lon;
          				$scope.$evalAsync();
					}
				}
            }
		};
		$scope.globalVariable.currentProcess = 2;
	}

	//Edit Location Section
	$scope.editLocation = function(LocationId)
	{
		Locations.GetLocationById(LocationId, function(data){
			if(data.ServiceStatus == "GetLocationById_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
			}
			else
			{
				$scope.locationDetail = data;
				$scope.loadAmphur();
				$scope.loadDistrict();
				$scope.locationDetail.maps = {
	            	center : {
						latitude : $scope.locationDetail.Latitude,
						longitude : $scope.locationDetail.Longitude
					},
					zoom : 16,
					marker : {
						id : 1,
						coords: {
							latitude : $scope.locationDetail.Latitude,
							longitude : $scope.locationDetail.Longitude
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
		          				$scope.locationDetail.Latitude = lat;
		          				$scope.locationDetail.Longitude = lon;
		          				$scope.locationDetail.maps.marker.coords.latitude = lat;
		          				$scope.locationDetail.maps.marker.coords.longitude = lon;
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
	          				$scope.locationDetail.Latitude = lat;
	          				$scope.locationDetail.Longitude = lon;
	          				$scope.locationDetail.maps.marker.coords = {};
	          				$scope.locationDetail.maps.marker.coords.latitude = lat;
	          				$scope.locationDetail.maps.marker.coords.longitude = lon;
	          				$scope.$evalAsync();
						}
					}
	            };
				$scope.globalVariable.currentProcess = 2;	
			}
		});
	}

	//Save Location Section
	$scope.saveLocation = function()
	{
		Locations.SaveLocation($scope.locationDetail, function(data){
			if(data.ServiceStatus == "SaveLocation_FAIL")
            {
            	Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
                Modals.showAlertFail();
            }
            else
            {
            	Modals.showAlertSuccess();
            	$scope.initData();
            }
		});
	}

	//Load dropdown list
	$scope.loadAmphur = function()
	{
		Locations.GetAmphurByProvince($scope.locationDetail.ProvinceId, function(data){
			$scope.amphurList = data.AmphurList;
		});
	}

	$scope.loadDistrict = function()
	{
		Locations.GetDistrictByProvinceAndAmphur($scope.locationDetail.ProvinceId, $scope.locationDetail.AmphurId, function(data){
			$scope.districtList = data.DistrictList;
		});
	}

	$scope.filterSetUp = function()
	{
		if($scope.filter.isShowStatus == "true")
		{
			$scope.lswFilterOptions.selectFilter.IsActived = true;
		}
		else if($scope.filter.isShowStatus == "false")
		{
			$scope.lswFilterOptions.selectFilter.IsActived = false;
		}
		else
		{
			$scope.lswFilterOptions.selectFilter.IsActived = "";	
		}
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
        list: $scope.locationList,
        columns: [
            {
                column: "$",
                label: "All",
                type: "input"
            }
        ],
        selectFilter : {
        	IsActived : "true"
        }
    }
    $scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions
    };
}]);
	