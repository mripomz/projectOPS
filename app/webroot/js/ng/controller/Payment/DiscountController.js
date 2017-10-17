module.controller('DiscountCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Discount", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Discount) {

	$scope.DiscountTypeList = [];
	$scope.DiscountTypeDetail = {
		IsActivated : true
	};

	$scope.errorMsg = {
		isError : false,
		message : ""
	}

	$scope.initData = function()
	{
		$scope.errorMsg = {
			isError : false,
			message : ""
		}

		//Load discount list
		Discount.GetDiscountList(false, function(data){
			$scope.DiscountTypeList = data.DiscountList;
		});
	}

	//Modal Popup
	var editDiscountTypeModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Payment/edit-discount-type-modal.html', show: false });
	$scope.editDiscountType = function(DiscountTypeId)
	{
		$scope.DiscountTypeDetail = {
			IsActivated : true
		};
		$scope.errorMsg = {
			isError : false,
			message : ""
		}

		if(DiscountTypeId == 0)
		{
			//Add new
			editDiscountTypeModal.$promise.then(editDiscountTypeModal.show);
		}
		else
		{
			Discount.GetDiscountById(DiscountTypeId, function(data){
				if(data.ServiceStatus == "GETDISCOUNTBYID_FAIL")
				{
					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
					Modals.showAlertFail();
				}
				else
				{
					$scope.DiscountTypeDetail = data;
					editDiscountTypeModal.$promise.then(editDiscountTypeModal.show);
				}
			});
		}
	}

	$scope.saveDiscountType = function()
	{
		Discount.UpdateDiscountType($scope.DiscountTypeDetail, function(data){
			if(data.ServiceStatus == "UPDATEDISCOUNTTYPE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				editDiscountTypeModal.$promise.then(editDiscountTypeModal.hide);
				$scope.initData();
			}
		});
	}

	$scope.removeDiscountType = function(DiscountTypeId)
	{
		Discount.RemoveDiscountType(DiscountTypeId, function(data){
			if(data.ServiceStatus == "REMOVEDISCOUNTTYPE_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				Modals.showAlertSuccess();
				$scope.initData();
			}
		})
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.DiscountTypeList,
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