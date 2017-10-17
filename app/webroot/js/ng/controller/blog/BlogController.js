module.controller('BlogCtrl',["$rootScope",
	"$scope", 
	"$timeout", 
	"$cookies",
	"$modal", 
	"Helpers",
	"Modals", 
	"Pages", 
	"Blog",
	"$filter",
	"$sce",
	"Assets",
	"textAngularManager", function demoController(
		$rootScope,
	  	$scope, 
	  	$timeout, 
	  	$cookies,
	  	$modal, 
	  	Helpers,
	  	Modals, 
	  	Pages, 
	  	Blog,
	   $filter,
	   $sce,
	   Assets,
	   textAngularManager) {
	   	$scope.blogDetail = {};

	  $scope.version = textAngularManager.getVersion();
      $scope.versionNumber = $scope.version.substring(1);
      $scope.htmlConten = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';



	$scope.globalVariable = 
	{
		currentProcess : 1
	}

	$scope.options = {
        url: api + "/Blog/UploadFilesBlog?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&BlogId= 1"
    };

	//timezone diff
	var d = new Date();
	$scope.timezoneOffset = d.getTimezoneOffset();
	$scope.locationList = [];
	
	$scope.color = {
        name: 'blue'
      };

     $scope.mainData = [];
     $scope.currentBlogId = 0;

     $scope.detailLength = 0;
     $scope.disableTitle = 0;
     $scope.titleLength = 0 ;

     $scope.disableRadio1 = false;
     $scope.disableRadio2 = false;
     $scope.disableRadio3 = false;
     $scope.disableRadio4 = false;
     $scope.disableRadio5 = false;
     $scope.disableRadio6 = false;
     $scope.disablePicStatus =
     $scope.BlogGalleryList =[];





	//View Section
	$scope.initData = function()
	{
	
		$scope.LoadBlogFileList()

	
	 Blog.GetAllBlog(function(data){
			
		 	$scope.mainData = data.BlogList;
		 
		 });
	 $scope.chrLength = 0;

		$scope.titleLength = 0 ;

		$scope.globalVariable.currentProcess = 1;
	};

	$scope.saveBlog = function()
	{	
		$scope.IsPic = false;
		$scope.IsCoverPic = false;
		$scope.blogDetail.BlogId  = $scope.currentBlogId;
		$scope.i = 0;
		Blog.GetBlogGalleryList($scope.blogDetail.BlogId, function(data){
			if(data.BlogGalleryList.length==0){
				console.log(data);
				$scope.IsPic = true;
			}
			else{
				console.log(data);
				angular.forEach(data.BlogGalleryList, function(value, key) {
 			 		if(value.Status == true){
 			 			$scope.IsCoverPic = true;
 			 			$scope.i =$scope.i+1;
 			 		}
				});
			}
			
		});
		Blog.SaveBlog($scope.blogDetail, function(data){
			
			
			if(data.ServiceStatus == "SaveBlog_FAIL")
            {
            	if($scope.blogDetail.Topic == ""||typeof $scope.blogDetail.Topic == 'undefined'){
            		Modals.setAlert('กรุณาระบุชื่อหัวข้อ');
            		Modals.showAlertFail();
            	
            	}
            	else if($scope.blogDetail.Detail == ""||typeof $scope.blogDetail.Detail == 'undefined'){
            		Modals.setAlert('กรุณาระบุรายละเอียด');
            		Modals.showAlertFail();
            	}
           
            
            	else if(typeof $scope.blogDetail.ExpressOrder == 'undefined'){
            		Modals.setAlert('กรุณาระบุลำดับหัวข้อ');
            		Modals.showAlertFail();
            	}
            

                
            }
            else if($scope.IsPic){
            		Modals.setAlert('กรุณาเพิ่มรูปภาพ');
            		Modals.showAlertFail();
            }

            else if(!$scope.IsCoverPic){
            		Modals.setAlert('กรุณาเพิ่มรูปหน้าปก');
            		Modals.showAlertFail();
            }
           	 else if($scope.i >1){
            		Modals.setAlert('รูปหน้าปกมีได้เพียงรูปเดียว');
            		Modals.showAlertFail();
            }
            else
            {	
           
            	Modals.showAlertSuccess();
            	$scope.initData();
            }
		});
	}

	$scope.editBlog = function(BlogId)
	{	
		Blog.GetBlogById(BlogId,function(data){
			  $scope.blogDetail.Topic = data.Topic;
			 /// $scope.blogDetail.Detail = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
			  	$scope.blogDetail.Detail = data.Detail;
			  	$scope.blogDetail.CheckStatus = data.ExpressOrder;
			  	$scope.blogDetail.ExpressOrder = data.ExpressOrder;
			  	if($scope.blogDetail.ExpressOrder == 1){
       				$scope.titleLength = 265;
       				$scope.disableTitle = 1;
       	
				}
				if($scope.blogDetail.ExpressOrder == 2||$scope.blogDetail.ExpressOrder == 3){
					$scope.titleLength = 280;
       				$scope.disableTitle = 2;
			
				}
				if($scope.blogDetail.ExpressOrder == 4||$scope.blogDetail.ExpressOrder == 5||$scope.blogDetail.ExpressOrder == 6){
					$scope.titleLength = 595;
       				$scope.disableTitle = 3;
			
				}
				if($scope.blogDetail.ExpressOrder == 0){
					$scope.titleLength = 0;
       				$scope.disableTitle = 0;
			
				}
			  	if(data.Title!='undefined'&&data.Title!='undefined'&&data.Title!=null){
			  		$scope.blogDetail.Title = data.Title;
			  	}
			  ///$scope.disablePicStatus = data.CheckStatusPic;
		});
		Blog.CheckStatusPic( BlogId,function(data){
			  $scope.disablePicStatus = data.CheckStatusPic;
		});
		$scope.CheckExpressOrder();
		$rootScope.$broadcast('clearqueue');
		$scope.currentBlogId = BlogId;
		$scope.blogDetail.BlogId = BlogId;
		$scope.options.url = api + "/Blog/UploadFilesBlog?accessToken=" + encodeURIComponent($cookies.get('CakeCookie[accessToken]')) + "&BlogId= "+BlogId;
		$scope.LoadBlogFileList();
		$scope.globalVariable.currentProcess = 3;
	}
	$scope.RemovedBlog = function(BlogId)
	{
		Blog.RemovedBlog(BlogId, function(){
			$scope.initData();
		});
	}

	


	$scope.CheckExpressOrder = function()
	{
		Blog.CheckExpressOrder( function(data){
	

			angular.forEach(data.CheckExpressOrdergList, function(check){
			
				if(check.ExpressOrder ==1){
					
					$scope.disableRadio1 = check.CheckExpressOrder;
				}
				if(check.ExpressOrder ==2){
					$scope.disableRadio2 = check.CheckExpressOrder;
				}
				if(check.ExpressOrder ==3){
					$scope.disableRadio3 = check.CheckExpressOrder;

				}
				if(check.ExpressOrder ==4){
					$scope.disableRadio4 = check.CheckExpressOrder;

				}
				if(check.ExpressOrder ==5){
					$scope.disableRadio5 = check.CheckExpressOrder;

				}
				if(check.ExpressOrder ==6){
					$scope.disableRadio6 = check.CheckExpressOrder;

				}

			});

		});



	}

	$scope.addBlog = function()
	{
		$scope.CheckExpressOrder();
		$scope.CheckExpressOrder();
		$scope.currentBlogId = 0;
		$scope.blogDetail.BlogId = 0;
		$scope.blogDetail = {};
		$scope.disableTitle = 0;
		$scope.globalVariable.currentProcess = 2;
	}
	$scope.nextStepForAddBlog = function(){
			
			console.log($scope.blogDetail);
			Blog.SaveBlog($scope.blogDetail, function(data){
			
			if(data.ServiceStatus == "SaveBlog_FAIL")
            {	
            	
            	if($scope.blogDetail.Topic == ""||typeof $scope.blogDetail.Topic == 'undefined'){
            		Modals.setAlert('กรุณาระบุชื่อหัวข้อ');
            		Modals.showAlertFail();
            	
            	}
            
            	else if(typeof $scope.blogDetail.ExpressOrder == 'undefined'){
            		Modals.setAlert('กรุณาระบุลำดับหัวข้อ');
            		Modals.showAlertFail();
            	}   
            }
           
            else
            {
            	Modals.showAlertSuccess(data.FailMessages);
            	$scope.editBlog(data.BlogId);
            	$scope.globalVariable.currentProcess = 3;
            }
		});


	}


	$scope.$watch('blogDetail.ExpressOrder', function(value) {
       if(value == 'undefined'){
       		$scope.disableTitle = 0;
       }
       if(value == 1){
       		$scope.titleLength = 265;
       		$scope.disableTitle = 1;
       	
		}
		if(value == 2||value == 3){
			$scope.titleLength = 280;
       		$scope.disableTitle = 2;
			
		}
		if(value == 4||value == 5||value == 6){
			$scope.titleLength = 595;
       		$scope.disableTitle = 3;
			
		}
		if(value == 0){
			$scope.titleLength = 0;
       		$scope.disableTitle = 0;
			
		}

     
 	});











/*
		UPLOAD FILE
	*/
	$scope.LoadBlogFileList = function(id)
	{	

		Blog.GetBlogGalleryList($scope.currentBlogId, function(data){
			$scope.blogGalleryList = data;
			var i;
			for (i =0; i <$scope.blogGalleryList.BlogGalleryList.length ; i++) {
				$scope.blogGalleryList.BlogGalleryList[i].checkStatus =$scope.blogGalleryList.BlogGalleryList[i].Status;
				
			}

		});
	
	}

	$scope.saveBlogGallery = function(item)
	{

		
		Blog.SaveBlogGallery(item, function(){
			Blog.CheckStatusPic( item.BlogId,function(data){
			  $scope.disablePicStatus = data.CheckStatusPic;
			});
			$scope.LoadBlogFileList();
		});
		
		///alert("saveVehicleGallery");
	}

	$scope.removeBlogGallery = function(item)
	{
		Blog.RemoveBlogGallery(item.BlogId, item.FileUploadId, function(){
			$scope.LoadBlogFileList();
		});
		
	}

	$scope.loadingFiles = false;
    $scope.currentProcess = {
    	fileInQueue : false
    }
    $scope.queue = [];
    $scope.queueInsurance = [];

    $scope.$on('fileuploadstop', function(data, response){
    	
    	$scope.LoadBlogFileList();
    	///$scope.GetAllLeasingDocument();
    	$scope.currentProcess.fileInQueue = false;
    	
    });

    $scope.$on('fileuploadadd', function(data){
    	$scope.currentProcess.fileInQueue = true;
    	
    });

    $scope.$on('fileuploaddone', function(data, response){
   
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    		
    	}

    });

    $scope.$on('fileuploadfail', function(data){
    	if(data.targetScope.queue.length == 0){
    		$scope.currentProcess.fileInQueue = false;
    		
    	}
    	
    });
	/*
		END UPLOAD FILE
	*/
	$scope.clearQueue = function()
    {
    	$rootScope.$broadcast('clearqueue');
    }
 $scope.$on('modal.hide',function(){
		$scope.clearQueue();
		$scope.currentProcess.fileInQueue = false;
		$scope.errorMsg = {
			isError : false,
			message : ""
		}
	});

 $scope.backtoMain = function()
	{


		$scope.initData();
	}
	$scope.lswPaginateOptions = { pageSize: 10 }
	$scope.showAll = false;
  $scope.lswFilterOptions = {
            list: $scope.mainData.SearchResults,
            columns: [
                {
                    column: "$",
                    label: "All",
                    type: "input"
                }
            ],
            selectFilter : {
            	IsDeleted : $scope.showAll
            }
        };
	$scope.lswTableOptions = {
        theadTemplate: 'theadTemplate.html',
        tbodyTemplate: 'tbodyTemplate.html',
        tableClass: 'table table-hover table-condensed',
        paginateOptions: $scope.lswPaginateOptions,
        filterOptions: $scope.lswFilterOptions,
        columns: [
        	{
        		label: "ทะเบียนรถ",
                column: "$Index"
        	},
        	{
        		label: "ชื่อหัวข้อ",
                column: "Topic"
        	},
        	{
        		label: "วันที่สร้าง",
                column: "CreatedDate"
        	},
        	{
        		label: "สร้างโดย",
                column: "CreatedBy"
        	},
        	{
        		label: "สถาระการแสดง",
                column: "ExpressOrder"
        	},
        	{
        		label: "",
                column: ""
        	}
        ]
    };

  

        $scope.filterOption = function()
    {
    	if($scope.showAll){
    		$scope.showAll = false;
    		$scope.lswFilterOptions.selectFilter = {
            	IsDeleted : $scope.showAll
            }
    	}else{
    		$scope.showAll = true;
    		$scope.lswFilterOptions.selectFilter = ""
    	}
    }




	
    


	;
}]);
	