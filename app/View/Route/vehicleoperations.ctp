<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>bvnvbn
	<div class="st-content" id="content" ng-controller="VehicleOperationCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left">
                            <span ng-if="currentStep == 1 || currentStep == 3 || currentStep == 4"><?php echo __("Route Vehicle Operations"); ?></span>
                            <span ng-if="currentStep == 2">เปิดเที่ยวรถ</span>
                        </h2>
        				<div class="pull-right">
        					<button ng-click="addVehicleTrip()" ng-show="currentStep == 1" class="btn btn-info"><?php echo __("Add Vehicle Trip"); ?></button>
                            <button ng-click="backToMain()" ng-show="currentStep == 2 || currentStep == 3 || currentStep == 4" class="btn btn-info">กลับ</button>

        				</div>
        			</div>
                    <div class="clearfix"></div>
  					<div class="panel-body">
                        <div class="col-xs-12 no-padding" ng-if="currentStep == 1"><!--HOMEPAGE-->
                            <div ng-include="rootUrl + '../templates/Routes/vehicle-operations-homepage.html'"></div>
                        </div>
                        <div class="col-xs-12 no-padding" ng-if="currentStep == 2"><!--EDIT-->
                            <div ng-include="rootUrl + '../templates/Routes/vehicle-operations-addnew.html'"></div>
                        </div>
                        <div class="col-xs-12 no-padding" ng-if="currentStep == 3"><!--UPDATE-->
                            <div ng-include="rootUrl + '../templates/Routes/vehicle-operations-edit.html'"></div>
                        </div>
                        <div class="col-xs-12 no-padding" ng-if="currentStep == 4"><!--UPDATE-->
                            <div ng-include="rootUrl + '../templates/Routes/vehicle-operations-view.html'"></div>
                        </div>
  					</div>
  				</div>
  			</div>
  		</div>
	</div>
</div>