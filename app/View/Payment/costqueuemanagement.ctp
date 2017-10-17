<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="CostQueueManagementCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2>จัดการค่าคิวรถ</h2>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10">
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="RouteList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="RouteList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-5 cursor-point" ng-click="sort('RouteName_TH');">เส้นทาง</th>
			        				<th class="col-md-2 cursor-point" ng-click="sort('RouteType');">เที่ยวขา</th>
			        				<th class="col-md-3 cursor-point" ng-click="sort('IsAvailabled');">สถานะ</th>
			        				<th class="col-md-2 cursor-point text-right" ng-click="sort('QueueCost');">ค่าคิว (บาท)</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td>{{row.RouteName_TH}}</td>
	                                <td>{{row.RouteType?'ขาล่อง':'ขาขึ้น'}}</td>
	                                <td>
	                                	<span ng-style="{'color':(row.IsAvailabled?'green':'')}">
	                                		<strong>{{row.IsAvailabled?'เปิดบริการ':'ยังไม่เปิดบริการ'}}</strong>
	                                	</span>
	                                </td>
	                                <td align="right">
	                                	<div ng-if="!row.isEdit">
	                                		<strong>{{row.QueueCost || 0 | number:2}}</strong>
	                                	</div>
	                                	<div ng-if="row.isEdit">
	                                		<input type="text" name="QueueCost" ng-model="row.QueueCost" class="form-control text-right" lsw-only-digits>
	                                	</div>
	                                </td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-if="!row.isEdit" ng-click="row.isEdit = true;parent.globalVariable.isEdit = true;" ng-disabled="parent.globalVariable.isEdit">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-primary btn-xs" ng-if="row.isEdit" ng-click="parent.updateCostQueue(row)" ng-disabled="row.QueueCost == '' || row.QueueCost <= 0">
			        						<i class="glyphicon glyphicon-pencil"></i> บันทึก
			        					</button>
			        					<button class="btn btn-danger btn-xs" ng-if="row.isEdit" ng-click="parent.initData();">
			        						<i class="glyphicon glyphicon-pencil"></i> ยกเลิก
			        					</button>
			        				</td>
	                            </script>
	                        </div>
                        </div>
  					</div>
  				</div>
  			</div>
  		</div>
	</div>
</div>