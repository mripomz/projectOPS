<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="RouteCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Route Management"); ?></h2>
        				<div class="pull-right">
        					<button ng-click="addRoute()" ng-if="currentState == 1" class="btn btn-info"><?php echo __("Add Route"); ?></button>
        					<button ng-click="backToState(1)" ng-if="currentState == 2" class="btn btn-info">กลับ</button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10" ng-show="currentState == 1">
  							<div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="pull-right" style="margin-right:2px;">
  								<button ng-click="filterOption()" class="btn input-sm" ng-class="{ 'btn-primary' : showAll }">แสดงทั้งหมด</button>
  							</div>
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="RouteData.RouteList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="RouteData.RouteList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-1 cursor-point" ng-click="sort('RouteMainNumber');">สายหลัก</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('RouteNumber');">สายที่</th>
			        				<th class="col-md-2 cursor-point" ng-click="sort('RouteName_TH');">ชื่อเส้นทาง ภาษาไทย</th>
			        				<th class="col-md-2 cursor-point" ng-click="sort('RouteName_EN');">ชื่อเส้นทาง ภาษาอังกฤษ</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('RouteType');">เที่ยวขา</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('RouteDistance');">ระยะทาง</th>
			        				<th class="col-md-2 cursor-point text-center" ng-click="sort('RouteDistance');">สถานะ</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td>{{row.RouteMainNumber}}</td>
			        				<td>{{row.RouteNumber}}</td>
			        				<td>{{row.RouteName_TH}}</td>
			        				<td>{{row.RouteName_EN}}</td>
			        				<td>{{row.RouteType?'ล่อง':'ขึ้น'}}</td>
			        				<td>{{row.RouteDistance || 0}} กม.</td>
			        				<td align="center">
			        					<span ng-style="{'color':(row.IsAvailabled?'green':'')}"><strong>{{row.IsAvailabled?'เปิดบริการ':'ยังไม่เปิดบริการ'}}</strong></span>
			        				</td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.editRoute(row.RouteId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this route?" message-th="ต้องการที่จะลบเส้นทางนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.removeRoute(row.RouteId)">
			        						<i class="glyphicon glyphicon-trash"></i> <?php echo __("Delete"); ?>
			        					</button>
			        				</td>
	                            </script>
	                        </div>
                        </div>
                        <div class="col-md-12 margin-top-10" ng-show="currentState == 2">
                        	<div ng-if="!RouteDetail.IsEdited">
                        		<div ng-include="rootUrl + '../templates/Routes/route-complete-section.html'"></div>
  							</div>
  							<div ng-if="RouteDetail.IsEdited">
  								<div ng-include="rootUrl + '../templates/Routes/route-incomplete-section.html'"></div>
  							</div>
                        </div>
  					</div>
  				</div>
  			</div>
  		</div>
	</div>
</div>