module.controller('PagesCtrl',["$scope", "$timeout", "$cookies", "$modal", "Helpers", "Modals", "Pages", function ($scope, $timeout, $cookies, $modal, Helpers, Modals, Pages) {
	
	$scope.pagesController = {};
	$scope.mainData = [];
	$scope.breadcrumb = [];
	$scope.errorMsg = {
		isError : false,
		message : ""
	}


	$scope.currentParentName = "หน้าหลัก";
	$scope.currentParentPageControllerId = 0;

	$scope.initData = function()
	{
		$scope.currentParentPageControllerId = 0;
		$scope.breadcrumb = [];
		$scope.breadcrumb.push(
			{
				ParentName : "เมนูหลัก",
				ParentPageControllerId : 0
			}
		);

		$scope.loadListData();
	}

	$scope.loadListData = function()
	{
		var isFirst = 0;
		if($scope.currentParentPageControllerId == 0)
		{
			isFirst = 1;
		}
		Pages.SearchPageControllers("ParentPageControllerId", $scope.currentParentPageControllerId, "ParentPageControllerId", "ASC", isFirst, 1000, 1, function(data){
			$scope.mainData = data;
		});
	}

	$scope.drillDownMenu = function(name, parentId)
	{
		console.log(name,parentId);
		$scope.breadcrumb.push(
			{
				ParentName : name,
				ParentPageControllerId : parentId
			}
		);

		$scope.currentParentPageControllerId = parentId;

		$scope.loadListData();
	}

	$scope.selectDrillDown = function(name, parentId)
	{
		console.log(name,parentId);
		
		//search Index
		var index = 0;
		var loop = 1;
		angular.forEach($scope.breadcrumb, function(each){
			if(each.ParentPageControllerId == parentId)
			{
				index = loop;
			}
			loop++;
		});

		if(index != 1){
			console.log("FIRST");
			$scope.breadcrumb = $scope.breadcrumb.slice(0,index-1);
			$scope.drillDownMenu(name, parentId);
		}
		else
		{
			console.log("LAST");
			$scope.initData();
		}
	}

	var addNewPageModal = $modal({ scope: $scope, templateUrl: rootUrl + 'modals/Pages/add-page-modal.html', show: false });
	$scope.addNewPage = function(pageId)
	{
		$scope.errorMsg = {
			isError : false,
			message : ""
		}

		$scope.pagesController = {
			PageControllerId : 0,
			PageName : "",
			PageTitleName : "",
			Description : "",
			MenuName : "",
			ControllerName : "",
			ActionName : "",
			ControllerActionPath : "",
			ParentPageControllerId : $scope.currentParentPageControllerId
		};

		if(pageId != 0){
			Pages.GetPageControllerById(pageId, function(data){
				$scope.pagesController = data;
				addNewPageModal.$promise.then(addNewPageModal.show);
			});	
		}else{
			addNewPageModal.$promise.then(addNewPageModal.show);
		}
	}

	$scope.savePage = function()
	{
		$scope.errorMsg.isError = false;
		$scope.errorMsg.message = "";

		if($scope.pagesController.ControllerName == null)
		{
			$scope.pagesController.ControllerName = "";
		}

		if($scope.pagesController.ActionName == null)
		{
			$scope.pagesController.ActionName = "";	
		}

		$scope.pagesController.ControllerActionPath = $scope.pagesController.ControllerName + "/" + $scope.pagesController.ActionName;
		Pages.PagesControllerUpdate($scope.pagesController, function(data){
			if(data.ServiceStatus == "PAGECONTROLLERUPDATE_FAIL")
			{
				$scope.errorMsg.message = Helpers.showErrorMessage(data.FailMessages);
				$scope.errorMsg.isError = true;
			}
			else
			{
				addNewPageModal.$promise.then(addNewPageModal.hide);
				$scope.loadListData();
			}
		});
	}

	$scope.RemovePageControllerById = function(pageId)
	{
		Pages.RemovePageControllerById(pageId, function(data){
			if(data.ServiceStatus == "DELETEPAGECONTROLLERS_FAIL")
			{
				Modals.setModal($scope.formDisplay.Error , Helpers.showErrorMessage(data.FailMessages));
				Modals.showError();
			}
			else
			{
				$scope.loadListData();
			}
		});
	}


	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.lswFilterOptions = {
            list: $scope.mainData.SearchResults,
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
        		label: "ชื่อเพจ",
                column: "PageName"
        	},
        	{
        		label: "ชื่อเรื่อง",
                column: "PageTitleName"
        	},
        	{
        		label: "รายละเอียด",
                column: "Description"
        	},
        	{
        		label: "",
                column: ""
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };
}]);