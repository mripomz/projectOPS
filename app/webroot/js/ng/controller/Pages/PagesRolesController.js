module.controller('PagesRolesCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", "Users", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Pages, Users) {
	
	$scope.breadcrumb = [];
	$scope.rolesList = [];

	$scope.menuList = [];
	$scope.pageList = [];
	$scope.userList = [];

	$scope.currentRoleName = "";
	$scope.currentRoleId = "";
	$scope.currentLevel = 0;
	$scope.currentUserId = 0;
	$scope.currentUserName = "";
	$scope.userId = $cookies.get("CakeCookie[userId]");

	$scope.initData = function()
	{
		$scope.menuList = [];
		$scope.pageList = [];
		$scope.userList = [];
		$scope.breadcrumb = [];
		$scope.breadcrumb.push(
			{
				Display : "เมนูหลัก",
				RoleName : "",
				Level : 0
			}
		);

		Users.GetAllRoles(function(data){
			$scope.rolesList = data;
		});
	}

	$scope.loadListData = function()
	{
		if($scope.currentLevel == 3){
			Pages.GetPageRoleMenuListByUser($scope.currentUserId, function(data){
				$scope.menuList = data;
			});	
		}
		else
		{
			Pages.GetPageRoleMenuListByRole($scope.currentRoleId, function(data){
				$scope.menuList = data;
			});
		}
		
	}

	$scope.loadUserListData = function()
	{
		Users.SearchUserInfo("UserId", "", "UserId", "ASC", null, false, $scope.currentRoleId, 1000, 1, function(data){
			$scope.userList = data;
		});
	}

	$scope.drillDownMenuLevel1 = function(rolename, roleId, level)
	{
		$scope.breadcrumb.push(
			{
				Display : rolename,
				RoleId : roleId,
				Level : level
			}
		);

		$scope.currentRoleName = rolename;
		$scope.currentRoleId = roleId;
		$scope.currentLevel = level;
		$scope.menuList = [];
		$scope.loadListData();
	}

	$scope.drillDownMenuLevel2 = function(rolename, roleId, level)
	{
		$scope.breadcrumb.push(
			{
				Display : rolename,
				RoleId : roleId,
				Level : level
			}
		);

		$scope.currentRoleName = rolename;
		$scope.currentRoleId = roleId;
		$scope.currentLevel = level;
		$scope.userList = [];
		$scope.loadUserListData();
	}

	$scope.drillDownMenuLevel3 = function(username, userId, level)
	{
		$scope.breadcrumb.push(
			{
				Display : username,
				RoleId : $scope.currentRoleId,
				UserId : userId,
				Level : level
			}
		);

		$scope.currentUserId = userId;
		$scope.currentUserName = username;
		$scope.currentLevel = level;
		$scope.menuList = [];
		$scope.loadListData();
	}

	$scope.selectDrillDown = function(rolename, roleId, userId, level)
	{
		//search Index
		var index = 0;
		var loop = 1;

		if(level == 2){
			angular.forEach($scope.breadcrumb, function(each){
				if(each.UserId == userId)
				{
					index = loop;
				}
				loop++;
			});	
		}else{
			angular.forEach($scope.breadcrumb, function(each){
				if(each.RoleId == roleId)
				{
					index = loop;
				}
				loop++;
			});	
		}

		if(index != 1){

			$scope.breadcrumb = $scope.breadcrumb.slice(0,index-1);

			if(level == 1)
			{
				$scope.drillDownMenuLevel1(rolename, roleId, level);
			}
			else if(level == 2)
			{
				$scope.drillDownMenuLevel2(rolename, roleId, level);
			}
			else if(level == 3)
			{
				$scope.drillDownMenuLevel3(rolename, userId, level);
			}
		}
		else
		{
			$scope.initData();
		}

		$scope.currentLevel = level;
	}

	var addPagePermissionModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Pages/add-page-permission-modal.html', show: false });
	$scope.addPagePermission = function()
	{
		if($scope.currentLevel == 3){
			Pages.GetListPagesMissingByUser($scope.currentUserId, function(data){
				if(data.ServiceStatus == "SEARCHPAGECONTROLLERS_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.pageList = data;
					addPagePermissionModal.$promise.then(addPagePermissionModal.show);
				}
			});
		}
		else
		{
			Pages.GetListPagesMissingByRole($scope.currentRoleId, function(data){
				if(data.ServiceStatus == "SEARCHPAGECONTROLLERS_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.pageList = data;
					addPagePermissionModal.$promise.then(addPagePermissionModal.show);
				}
			});
		}
		
	}

	$scope.savePagePermission = function(PageControllerId)
	{
		if($scope.currentLevel == 3)
		{
			Pages.AddPagePermissionByUser($scope.currentUserId, PageControllerId, function(data){
				if(data.ServiceStatus == "ADDPAGEPERMISSION_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.loadListData();
					Pages.GetListPagesMissingByUser($scope.currentUserId, function(data){
						$scope.pageList = data;
					});	
				}
			});
		}
		else
		{
			Pages.AddPagePermissionByRole($scope.currentRoleId, PageControllerId, function(data){
				if(data.ServiceStatus == "ADDPAGEPERMISSION_FAIL")
				{
					$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
					$scope.errorMsg.isError = true;
				}
				else
				{
					$scope.loadListData();
					Pages.GetListPagesMissingByRole($scope.currentRoleId, function(data){
						$scope.pageList = data;
					});	
				}
			});
		}
		
	}

	$scope.removePage = function(PageControllerId)
	{
		if($scope.currentLevel == 3){
			Pages.RemovePageFromUser($scope.currentUserId, PageControllerId, function(data){
				$scope.loadListData();
			});
		}
		else{
			Pages.RemovePageFromRole($scope.currentRoleId, PageControllerId, function(data){
				$scope.loadListData();
			});	
		}
		
	}
}]);