module.controller('UsersCtrl',["$rootScope", "$scope", "$timeout", "$cookies", "Users", "$modal", "Accounts", "Helpers", "Modals", "Locations", "Discount","$location","$window", function ($rootScope, $scope, $timeout, $cookies, Users, $modal, Accounts, Helpers, Modals, Locations, Discount,$location,$window) {
	
	$scope.mainData = {
		SearchResults : []
	};
	$scope.rolesList = [];
	$scope.formDisplay = [];
	$scope.ProvicesList = [];
	$scope.formLang = {
		TH : {
			"Email" : "อีเมล",
			"Password" : "รหัสผ่าน",
			"ConfirmPassword" : "ยืนยันรหัสผ่าน",
			"newPassword" : "รหัสผ่านใหม่",
			"newConfirmPassword" : "ยืนยันรหัสผ่านใหม่",
			"FirstName" : "ชื่อ",
			"LastName" : "นามสกุล",
			"Role" : "สิทธิ์การใช้งาน",
			"Save" : "บันทึก",
			"Error" : "ผิดพลาด",
			"CompanyName" : "บริษัท",
			"Address" : "ที่อยู่",
			"City" : "ตำบล / แขวง",
			"State" : "อำเภอ / เขต",
			"Province" : "จังหวัด",
			"Zip" : "รหัสไปรษ์ณีย์",
			"Phone" : "เบอร์โทรศัพท์",
			"IsActive" : "สถานะการใช้งาน",
			"Password_Match" : "พาสเวิร์ดไม่ตรงกัน",
			"Close" : "ปิด"
		},
		ENG : {
			"Email" : "Email",
			"Password" : "Password",
			"ConfirmPassword" : "Confirm Password",
			"newPassword" : "New Password",
			"newConfirmPassword" : "Confirm New Password",
			"FirstName" : "FirstName",
			"LastName" : "LastName",
			"Role" : "Role",
			"Save" : "Save",
			"Error" : "Error",
			"CompanyName" : "CompanyName",
			"Address" : "Address",
			"City" : "City",
			"State" : "State",
			"Province" : "Province",
			"Zip" : "Zip",
			"Phone" : "Phone",
			"IsActive" : "Is Active",
			"Password_Match" : "Password don't match",
			"Close" : "Close"
		}
	}

	$scope.createUser = {};
	$scope.updateUser = {};
	$scope.user = {};
	$scope.userRole = [];

	$scope.errorMsg = {
		isError : false,
		message : ""
	}

	$scope.initData = function()
	{
		$scope.createUser = {
			name : '',
			email : '',
			password : '',
			confirmPassword : '',
			rolename : '',
			phone : '',
			role : '',
			department : '',
			room : ''
			

			
		}

			Accounts.GetAllRoles( function(data){

				if(data.ServiceStatus == "GETALLROLES_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.userRole = data.RoleNameList;
					
				}

			});


	}

	$scope.getUser  = function()
	{
		Accounts.getUser( function(data){
				console.log(data);

				if(data.ServiceStatus == "CREATEACCOUNT_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.user = data;
					console.log($scope.user);
					
				}

			});

	}




	////var createUserModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Users/create-user-modal.html', show: false });
	$scope.register = function()
	{
		
		
		console.log($scope.createUser);
		
			Accounts.Register($scope.createUser.name,$scope.createUser.email,$scope.createUser.password
				,$scope.createUser.confirmPassword,$scope.createUser.rolename,$scope.createUser.phone,$scope.createUser.department,$scope.createUser.room, function(data){
					console.log(data);

				if(data.ServiceStatus == "CREATEACCOUNT_FAIL")
				{
					Modals.setAlert(Helpers.showErrorMessage(data.FailMessages));
					Modals.showAlertFail();
				}
				else
				{
					
					$scope.initData();
					// $scope.baseUrl = $location.host();
					// window.location.assign($scope.baseUrl);
					var url = "http://" + $window.location.host + "/OPS-website/users/login";

        $window.location.href = url;
				}

			});

	}

		$scope.upadteUser = function()
	{
	
			Accounts.upadteUser($scope.user.oldPssword,$scope.user.newPasword,$scope.user.Name,$scope.user.Phone
				, function(data){
					console.log(data);

				if(data.ServiceStatus == "CREATEACCOUNT_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					
					$scope.initData();
				}

			});

	}


}]);