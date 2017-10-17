module.controller('VehicleTypeCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "Assets", 'Upload', function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, Assets,Upload) {

	$scope.vehicleTypeList = [];
	$scope.globalVariable = 
	{
		IsEdit : false
	}
	$scope.pictureFile;
	$scope.IspictureFile = false;


	$scope.initData = function()
	{
		////$scope.globalVariable.IsEdit = false;
		Assets.GetVehicleTypeList(function(data){
			console.log(data);
			$scope.vehicleTypeList = data.VehicleTypeList;
			$scope.pictureFile =null;
			
		});
		$scope.globalVariable.IsEdit = false;


	}

	$scope.addPicFile = function(file) {
	 	$scope.pictureFile = file;
		
    }

    $scope.removePicFile = function(file) {
	 	$scope.pictureFile = file;
		
    }
	//// upload file for background vehicle type

	 $scope.uploadPic = function(row,file) {
	 	$scope.file = file;
	 	$scope.IspictureFile = true;
		
    }



	$scope.addVehicleType = function()
	{
		var vehicleType = {
			VehicleTypeId : null,
			VehicleTypeName : "",
			VehicleTypeSeatStartRow : 1,
			IsEdit : true
		}

		$scope.vehicleTypeList.push(vehicleType);
		$scope.globalVariable.IsEdit = true;
	}

	$scope.updateVehicleType = function(detail)
	{	

		if(null!=$scope.pictureFile)
		{

			$scope.pictureFile.upload = Upload.upload({
	      	url: api + "/Assets/UpdateVehicleType?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]'))
	      	+ (detail.IsEdit !== undefined?"&IsEdit= " +detail.IsEdit:"&IsEdit= false") + "&VehicleTypeActive= true"+ (detail.VehicleTypeId !== null?"&VehicleTypeId= " +detail.VehicleTypeId:"&VehicleTypeId= 0")+ "&VehicleTypeName=" +detail.VehicleTypeName +"&VehicleTypeSeatStartRow="+detail.VehicleTypeSeatStartRow,
	      	data: {file:$scope.pictureFile},
	    	});

	    	$scope.pictureFile.upload.then(function (response) {
	      	$timeout(function () {
	       //// $scope.pictureFile.result = response.data;
	       $scope.initData();
	      	});
	    	}, function (response) {
	      	if (response.status > 0)
	        	$scope.errorMsg = response.status + ': ' + response.data;
	    	
	     }, function (evt) {
	     //  // Math.min is to fix IE which reports 200% sometimes
	      	///////$scope.pictureFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    	}
	    	);
	    	Modals.showAlertSuccess();
	    }else{
	    	Assets.UpdateVehicleType(detail.IsEdit,detail.VehicleTypeActive,detail.VehicleTypeId,detail.VehicleTypeName,detail.VehicleTypeSeatStartRow, function(data){

		 	if(data.ServiceStatus == "UPDATEVEHICLETYPE_FAIL")
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
    	////$scope.initData();
    	
		// Assets.UpdateVehicleType(detail, function(data){

		// 	if(data.ServiceStatus == "UPDATEVEHICLETYPE_FAIL")
		// 	{
		// 		Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
		// 		Modals.showAlertFail();
		// 	}
		// 	else
		// 	{
		// 		Modals.showAlertSuccess();
		// 		$scope.initData();
		// 	}
		// });
	}

	$scope.removeVehicleType = function(VehicleTypeId)
	{
		Assets.RemoveVehicleType(VehicleTypeId, function(data){
			if(data.ServiceStatus == "REMOVEVEHICLETYPE_FAIL")
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

	/*
		Helper Function
	*/
	$scope.SeatName = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB"];
	$scope.getArrayNumber = function(number)
	{
		if(number > 0)
		{
			return new Array(number);
		}

	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.vehicleTypeList,
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
        filterOptions: $scope.lswFilterOptions
    };
}]);
	