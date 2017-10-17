var module = angular.module('app', [
  'ngFacebook',
  'angular-loading-bar',
  'ngCookies', 
  'mgcrea.ngStrap', 
  'blueimp.fileupload', 
  'ngStrapLightbox', 
  'fcsa-number', 
  'angular.filter', 
  'colorpicker.module', 
  'ngStorage', 
  'uiGmapgoogle-maps',
  'msl.uploads',
  'angular-media-preview',
  'flow',
  'barcode',
  'ngFileUpload',
  'textAngular'])

.config(function( $facebookProvider , $datepickerProvider, $httpProvider, fileUploadProvider) {
	

  //////upload pictrue

  //Facebook
  //$facebookProvider.setAppId('1632944720295082');

  //File Upload
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  angular.extend(fileUploadProvider.defaults, {
      disableImageResize: /Android(?!.*Chrome)|Opera/
          .test(window.navigator.userAgent),
      maxFileSize: 2097152,
      sequentialUploads: true,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pdf)$/i
  });

  //Date Picker
  var dt = new Date();
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    lang: 'th-TH'
    //startDate: (dt.getMonth()+1) + "/" + dt.getDate() + "/" + (dt.getFullYear() + 543)
  });

  moment.locale("th");

})
.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: '/zxczxc',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
   
  });
  // Can be used with different implementations of Flow.js
   ///flowFactoryProvider.factory = fustyFlowFactory;
}])






.controller('AppCtrl', ['$scope', '$rootScope', '$cookies', '$window', 'Pages', 'Users', 'Notification', '$localStorage', 'Agency','Accounts', '$modal' , '$timeout',
function ($scope, $rootScope, $cookies, $window, Pages, Users, Notification, $localStorage, Agency,Accounts, $modal, $timeout) {

    $rootScope.globalMenu = [];
    $rootScope.globalNotification = {
        NotificationList : []
    };
    $rootScope.rootSiteUrl = $("#rooturl").val();
    $rootScope.currentLang = "TH";
    $rootScope.currentURL = $window.location.href;
    $rootScope.IsAgencyRole = false;
    $scope.sid = new Date().getTime();

    // $rootScope.changedLanguages = function(lang)
    // {
        $cookies.put('CakeCookie[lang]', 'TH', { path : "/" , expires : new Date(new Date().getTime() + 30*24*60*60*1000)});
        //window.location.href = window.location.href;
    // }

    var checkLanguages = function()
    {
        $rootScope.currentLang = $cookies.get('CakeCookie[lang]');
    }

    var checkHeightSideBar = function()
    {
        try{
          var currentHeight = $window.innerHeight - 50; // 50 = navbar
          document.getElementById("sidebar").style.height = currentHeight+'px';
          document.getElementById("content").style.height = currentHeight+'px';
          document.getElementById("content").style.overflowY = 'scroll';
        }catch(err){}
    }

    $rootScope.checkHeightSellingTicket = function(isShow)
    {
      try{

          var searchFilterHeight = 337;
          if(!isShow)
          {
            searchFilterHeight = 77;
          }
          var currentHeight = $window.innerHeight - searchFilterHeight; // 50 = navbar

          document.getElementById("ticketSeller").style.height = (currentHeight)+'px';
          document.getElementById("ticketSeller").style.overflowY = 'scroll';
        }catch(err){}
    }

    $rootScope.getMenu = function()
    {
        var userId = $cookies.get("CakeCookie[userId]");
        var roleName = $cookies.get("CakeCookie[roleName]");
         console.log(roleName);
        var menuList = $cookies.get("CakeCookieMenuList");
        Accounts.GetAllRoles(function(roles){
          console.log(roles);
            var roleId = 0;
          var roleNameSplit = roleName.split("+");
          if(roleNameSplit.length >1){
            roleName = roleNameSplit[0]+" "+roleNameSplit[1];
          }
           
            angular.forEach(roles.RoleNameList, function(role){

                if(role.RoleName == roleName)
                {
                    roleId = role.RoleId;
                    
                    
                    if(!angular.isUndefined(menuList) && menuList != null && menuList != '')
                    {
                      $rootScope.globalMenu = JSON.parse($localStorage.MenuList);
                      
                    }
                    else
                    {
                      Accounts.GetPageRoleMenuList(userId, roleId, function(data){
                        console.log(data);
                        $rootScope.globalMenu = data;
                        delete $localStorage.MenuList;
                        $localStorage.MenuList = JSON.stringify(data);
                        $cookies.put('CakeCookieMenuList', "AlreadyRequest", { path : "/" , expires : new Date(new Date().getTime() + 5*60*1000)});
                      });
                    }
                }
            });
        });

        if(roleName == "Agency")
        {
          $rootScope.IsAgencyRole = true;
          Agency.GetAgencyCreditByUserId(userId, false, function(credit)
          {
            $rootScope.AgencyCreditBalance = credit;
          });
        }
    }

    $rootScope.getNotification = function()
    {
        // Notification.GetNotificationByUserToken(function(data){
        //     $rootScope.globalNotification = data;
        // });
    }

    $rootScope.markReadNotification = function(NotificationId)
    {
        var userId = $cookies.get("CakeCookie[userId]");
        Notification.MarkReadNotification(NotificationId, userId, function(data){
            angular.forEach($rootScope.globalNotification.NotificationList, function(each){
                if(each.NotificationId == NotificationId)
                {
                    each.IsRead = true;
                }
            });
        });
    }

    $rootScope.openURL = function(url)
    {
        window.location.href = url;
    }

    $rootScope.clearSession = function()
    {
        $cookies.put('CakeCookieMenuList', "", { path : "/" , expires : new Date(new Date().getTime() - 1)});
        delete $localStorage.MenuList;
        $timeout(function(){
          window.location.href = rootUrl + 'users/logout';
        }, 3000);
    }

    checkLanguages();
    checkHeightSideBar();
    $rootScope.checkHeightSellingTicket(true);

    if(!!$cookies.get("CakeCookie[accessToken]")){
        $rootScope.getMenu();
        $rootScope.getNotification();
    }

    var w = angular.element($window);
    w.bind('resize', function (value) {
        checkHeightSideBar();
    });


    $rootScope.$on('Unauthorized', function(){
      var myModal = $modal({title: 'ไม่อนุญาติให้เข้าถึง', content: 'โปรดทำการล็อกอินใหม่', show: true});
      $rootScope.clearSession();
    });
}])

.run( function( $rootScope, $window ) {
  // // Load the facebook SDK asynchronously
  // (function(){
  //    // If we've already installed the SDK, we're done
  //    if (document.getElementById('facebook-jssdk')) {return;}

  //    // Get the first script element, which we'll use to find the parent node
  //    var firstScriptElement = document.getElementsByTagName('script')[0];

  //    // Create a new script element and set its id
  //    var facebookJS = document.createElement('script'); 
  //    facebookJS.id = 'facebook-jssdk';

  //    // Set the new script's source to the source of the Facebook JS SDK
  //    facebookJS.src = '//connect.facebook.net/en_US/all.js';

  //    // Insert the Facebook JS SDK into the DOM
  //    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
  //  }());


  //Status Online Offline
  $rootScope.online = navigator.onLine;
  $window.addEventListener("offline", function () {
    $rootScope.$apply(function() {
      $rootScope.online = false;
    });
  }, false);
    
  $window.addEventListener("online", function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
    });
  }, false);
})

.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);