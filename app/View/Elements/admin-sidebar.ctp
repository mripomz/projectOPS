<!-- <div class="sidebar left sidebar-size-3 sidebar-offset-0 sidebar-skin-blue sidebar-visible-desktop sidebar-visible-mobile" id="sidebar-menu" data-type="collapse">
    <div class="split-vertical">
        <div class="split-vertical-body">
            <div class="split-vertical-cell">
                <div class="tab-content">
                    <div class="tab-pane active" id="sidebar-tabs-menu">
                        <div data-scrollable="" tabindex="2" style="overflow-y: hidden; outline: none;">
                            <button class="btn btn-danger btn-lg btn-block text-left" ng-if="IsAgencyRole">
                                <i class="fa fa-money" aria-hidden="true"></i> เครดิต : {{(AgencyCreditBalance.AgencyCreditPoint || 0) | number:2}} บาท<br/>
                                <i class="fa fa-credit-card" aria-hidden="true"></i> ยืมเครดิต : {{(AgencyCreditBalance.AgencyCreditBorrow || 0) | number:2}} บาท
                            </button>
                            <ul class="sidebar-menu sm-active-item-bg">
                                <li  ng-class="{'hasSubmenu':level1.ChildPageController.length > 0, 'open' : level1.openTab,active : (currentURL == (rootSiteUrl + level1.ControllerActionPath))}" ng-repeat="level1 in globalMenu.SearchResults">

                                    <!--//LINK LEVEL 1-->
                           <!--          <a class="mouse-pointer header-menu" ng-click="openURL(rootSiteUrl + level1.ControllerActionPath)" ng-if="level1.ParentPageControllerId == 0 && level1.ControllerActionPath != '/'">
                                        <span><i class="fa fa-th"></i> {{level1.MenuName}}</span>
                                    </a>

                                    <!--//HEADER LEVEL 1-->
                                <!--     <a 
                                    class="mouse-pointer header-menu" 
                                    ng-if="level1.ChildPageController.length != 0" 
                                    ng-class="{ 'active' : level1.headActive }"
                                    ng-click="level1.openTab = !level1.openTab">
                                        <span><i class="fa fa-dot-circle-o"></i> {{level1.MenuName}}</span>
                                    </a>
                                   <ul class="collapse" ng-if="level1.ChildPageController.length > 0" ng-class="{in : level1.openTab}">
                                        <li 
                                        ng-repeat="level2 in level1.ChildPageController"
                                        ng-class="{active : (currentURL == (rootSiteUrl + level2.ControllerActionPath))}"
                                        ng-init="(currentURL == (rootSiteUrl + level2.ControllerActionPath))?(level1.openTab = level1.headActive = true):''"
                                        ng-if="level2.ControllerActionPath != 'pages/pagesmanagement'"
                                        style="background-color: #354c5f;" >
                                            <a class="mouse-pointer" ng-click="openURL(rootSiteUrl + level2.ControllerActionPath)">
                                                <i class="fa fa-chevron-circle-right"></i> {{level2.MenuName}}
                                            </a>
                                        </li>
                                    </ul> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> --> 
 <nav class="navbar navbar-default navbar-fixed-top">
      <div class="brand">
        <a href="index.html"><img src="<?php echo Router::url("/img/logo.png");?>"" alt="Logo" class="img-responsive logo"></a>
      </div>
      <div class="container-fluid">
        <div class="navbar-btn">
          <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
        </div>
        
      
        <div id="navbar-menu">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                <i class="lnr lnr-alarm"></i>
                <span class="badge bg-danger">1</span>
              </a>
              <ul class="dropdown-menu notifications">
                <li><a href="#" class="notification-item"><span class="dot bg-warning"></span>One reply from your post</a></li>
                <li><a href="#" class="more">See all notifications</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-question-circle"></i> <span>Help</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
              <ul class="dropdown-menu">
                <li><a href="#">About</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/user.png" class="img-circle" alt="Avatar"> <span><?php echo $userDetail->Name; ?></span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
              <ul class="dropdown-menu">
                <li><a href="<?php echo $this->base.'/users/editprofile';?>"><i class="lnr lnr-user"></i> <span>My Profile</span></a></li>
                <li><a href="<?php echo $this->base.'/users/logout';?>"><i class="lnr lnr-exit"></i> <span>Logout</span></a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
         <nav>
          <ul class="nav">
            <li><a href="index.html" class="active"><i class="lnr lnr-home"></i> <span>Dashboard</span></a></li>
          </ul>
        </nav> 
      </div>
    </div>