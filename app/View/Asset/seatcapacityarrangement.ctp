<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="SeatCapacityArrangementCtrl" ng-init="initData()">
<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left">ระบบจัดการผังรถ</h2>
        				<div class="pull-right">
        					<button ng-click="editPlan(0)" ng-if="currentState == 1" class="btn btn-info">เพิ่มผังรถ</button>
        					<button ng-click="backtoMain()" ng-if="currentState == 2 || currentState == 3" class="btn btn-info">กลับ</button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10" ng-if="currentState == 1"><!--HOMEPAGE-->
  							<div ng-include="rootUrl + '../templates/SeatCapacityArrangement/homepage.html'"></div>
	                    </div>
						<div class="col-md-12 margin-top-10" ng-if="currentState == 2"><!--ADDNEW/EDIT-->
							<div ng-include="rootUrl + '../templates/SeatCapacityArrangement/add-edit.html'"></div>
						</div>
						<div class="col-md-12 margin-top-10" ng-if="currentState == 3"><!--VIEW-->
							<div ng-include="rootUrl + '../templates/SeatCapacityArrangement/view.html'"></div>
						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
</div>