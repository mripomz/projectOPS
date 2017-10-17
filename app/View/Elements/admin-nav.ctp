<!-- Fixed navbar -->
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <a href="#sidebar-menu" data-toggle="sidebar-menu" data-effect="st-effect-3" class="toggle pull-left visible-xs"><i class="fa fa-bars"></i></a>

      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="<?php echo Router::url("/home/dashboard");?>" class="navbar-brand hidden-xs navbar-brand-primary">
      <img style="margin-top:10px" src="<?php echo Router::url("/img/Logo.png");?>" />
      </a>
    </div>
    <div class="navbar-collapse collapse" id="collapse">
      <ul class="nav navbar-nav navbar-right">
        <!-- notification -->
        <li class="dropdown notifications updates hidden-xs hidden-sm" ng-click="isOpenNotification = !isOpenNotification" ng-init="isOpenNotification = false">
           <a href="#" class="dropdown-toggle">
              <i class="fa fa-bell-o"></i>
              <span class="badge badge-primary" ng-if="globalNotification.NotificationList.length > 0">
                {{globalNotification.NotificationList.length}}
              </span>
          </a>
          <ul class="dropdown-menu" ng-style="isOpenNotification && {'display':'block'}" >
            <li class="dropdown-header">แจ้งเตือน</li>
            <li class="media" ng-repeat="item in globalNotification.NotificationList">
              <div class="pull-right">
                <a class="btn btn-success" ng-show="!item.IsRead" ng-click="markReadNotification(item.NotificationId)">ใหม่</a>
              </div>
              <div class="media-body">
                <span ng-if="item.NotificationType == 'TaxAnnual'">
                  ใกล้ครบกำหนดวันที่ชำระภาษีรถยนต์ของ <strong>ทะเบียนรถ : {{item.PlateNumber}}</strong>
                </span>
                <span ng-if="item.NotificationType == 'TaxHalf'">
                  ใกล้ครบกำหนดวันตรวจสภาพกลางปีรถยนต์ของ <strong>ทะเบียนรถ : {{item.PlateNumber}}</strong>
                </span>
                <span ng-if="item.NotificationType == 'Insurance'">
                  ใกล้ครบกำหนดวันหมดอายุประกันภัยของ <strong>ทะเบียนรถ : {{item.PlateNumber}}</strong>
                </span>
                <span ng-if="item.NotificationType == 'Act'">
                  ใกล้ครบกำหนดวันหมดอายุ พ.ร.บ. ของ <strong>ทะเบียนรถ : {{item.PlateNumber}}</strong>
                </span>
                <br>
              </div>
            </li>
          </ul>
        </li>
        <!-- user -->
        <li class="dropdown user">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="<?php echo Router::url('/img/default_avatar.png'); ?>" class="img-circle" /> 
            <?php echo $userDetail->Name; ?><span class="caret"></span>
          </a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#"><i class="fa fa-user"></i>Profile</a></li>
            <li><a href="#"><i class="fa fa-wrench"></i>Settings</a></li>
            <li><a ng-click="clearSession()" href="#"><i class="fa fa-sign-out"></i>Logout</a></li>
          </ul>
        </li>
        <!-- // END user -->
        <!-- country flags -->
        <!-- <li class="dropdown flags">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img ng-src="{{currentLang == 'ENG'?'<?php echo Router::url('/img/flag/us.svg'); ?>':'<?php echo Router::url('/img/flag/th.svg'); ?>'}}" />
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu min-width-none" role="menu">
            <li class="active text-center">
              <button class="btn-link" ng-click="changedLanguages('ENG')">
                <img src="<?php echo Router::url('/img/flag/us.svg'); ?>" alt="United States" />
              </button>
            </li>
            <li class="text-center">
              <button class="btn-link" ng-click="changedLanguages('TH')">
                <img src="<?php echo Router::url('/img/flag/th.svg'); ?>" alt="Thai" />
              </button>
            </li>
          </ul>
        </li> -->
        <!-- country flags -->
      </ul>
    </div>
  </div>
</div>