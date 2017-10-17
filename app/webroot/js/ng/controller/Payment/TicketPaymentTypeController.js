module.controller('TicketPaymentTypeCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Tickets", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Tickets) {

	$scope.TicketPaymentTypeList = [];
	$scope.TicketPaymentDetail = {};

	$scope.initData = function()
	{
		$scope.TicketPaymentDetail = {};

		Tickets.GetTicketPaymentTypeList(function(data){
			$scope.TicketPaymentTypeList = data.TicketPlaymentList;
		});
	}

	var editTicketPaymentTypeModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Payment/edit-ticket-payment-type-modal.html', show: false });
	$scope.editTicketPaymentType = function(TicketPaymentTypeId)
	{
		Tickets.GetTicketPaymentTypeById(TicketPaymentTypeId, function(data){
			if(data.ServiceStatus == "GETTICKETPAYMENTTYPEBYID_FAIL")
			{
				Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
				Modals.showAlertFail();
			}
			else
			{
				$scope.TicketPaymentDetail = data;
				editTicketPaymentTypeModal.$promise.then(editTicketPaymentTypeModal.show);
			}
		});
	}

	$scope.saveTicketPaymentType = function()
	{
		Tickets.UpdateTicketPaymentType($scope.TicketPaymentDetail, function(data){
			if(data.ServiceStatus == "UPDATETICKETPAYMENTTYPE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				Modals.showAlertSuccess();
				editTicketPaymentTypeModal.$promise.then(editTicketPaymentTypeModal.hide);
				$scope.initData();
			}
		});
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