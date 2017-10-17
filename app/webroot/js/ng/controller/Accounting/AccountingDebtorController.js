module.controller('AccountingDebtorCtrl',[
	"$rootScope",
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal",
	"$filter",
	"$sce",
	"Helpers",
 	"Modals", 
 	"Pages", 
 	"Agency",
 	"Discount", 
	"Banks",
	"Accounting",
	"Lightbox",
	"Users",
	"Locations", function (
	  	$rootScope,
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal,
	  	$filter,
	  	$sce,
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Agency, 
	  	Discount, 
	  	Banks,
	  	Accounting,
	  	Lightbox,
	  	Users,
	  	Locations) {


	$scope.userList = [];
	$scope.gradeList = [];
    $scope.errorMsg = {
        isError : false,
        message : ""
    }
    $scope.currentStep = 1;
    $scope.AgencyCredit = {};
    $scope.currentAgencyManagementDetail = {};
    $scope.userDetail = {};

	$scope.initData = function()
	{

		Discount.GetGradeList(function(dataGrade){

			$scope.gradeList = dataGrade.GradeList;

			Agency.GetAgencyDebtorList(function(data){

				$scope.userList = data.AgencyGradePriceList;

				angular.forEach($scope.userList, function(eachUser,keys){
					eachUser.NO = (keys+1);
				})
			});
		});

		Locations.GetAllProvinces(function(data){
			$scope.ProvicesList = data;
		});
	}

	var viewUserModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Users/view-user-modal.html', show: false });
	$scope.viewUser = function(UserId)
	{
		Users.GetUserInfoById(UserId, function(data){
			if(data.ServiceStatus == "GETUSERINFOBYID_FAIL")
			{
				Modals.setModal($scope.formDisplay.Error , Helpers.showErrorMessage(data.FailMessages));
				Modals.showError();
			}
			else
			{
				$scope.userDetail = data;
				viewUserModal.$promise.then(viewUserModal.show);
			}
		});
	}

	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
        list: $scope.userList,
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