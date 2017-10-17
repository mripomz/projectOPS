<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="SalesCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Sales Management"); ?></h2>
        				<div class="pull-right">
        					<button ng-click="backToState(0)" ng-if="currentLevel == 1" class="btn btn-info">กลับ</button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10" ng-show="currentLevel == 0">
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
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="userList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="userList">
	                            <script type="text/ng-template" id="theadTemplate.html">
	                            	<th class="col-md-1 cursor-point" ng-click="sort('RoleId');">ลำดับ</th>
			        				<th class="col-md-4 cursor-point" ng-click="sort('Email');">ชื่อผู้ใช้</th>
			        				<th class="col-md-4 cursor-point" ng-click="sort('FirstName');">ชื่อ - นามสกุล</th>
			        				<th class="col-md-3 text-right">จัดการเส้นทางเดินรถ</th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td class="col-md-1">{{$index+1}}</td>
			        				<td class="col-md-4">{{row.Email}}</td>
			        				<td class="col-md-4">{{row.FirstName + ' ' + row.LastName}}</td>
			        				<td class="col-md-3 text-right">
			        					<button class="btn btn-info btn-xs" ng-click="parent.editUser(row)">
			        						<i class="glyphicon glyphicon-pencil"></i> จัดการเส้นทางเดินรถ
			        					</button>
			        				</td>
	                            </script>
	                        </div>
                        </div>
                        <div class="col-md-12" ng-if="currentLevel == 1">
                        	<table style="width:100%">
			        			<tr>
			        				<td valign="middle"><h3><strong>{{currentUserName}}</strong></h3></td>
			        				<td align="right" valign="middle">
			        					<button ng-click="addRoute()" class="btn btn-primary">เพิ่มเส้นทางเดินรถ</button>
			        				</td>
			        			</tr>
			        			<tr>
			        				<td colspan="2">&nbsp;</td>
			        			</tr>
			        			<tr>
			        				<td valign="middle" colspan="2">
			        					<div class="col-xs-2 no-padding">
			        						<strong>ประจำจุดขายสาขา : </strong>
			        					</div>
			        					<div class="col-xs-3">
			        						<select ng-model="salesRegion.StopPointId" class="form-control" ng-options="o.StopPointId as (o.StopPointName_TH + ' - ' + o.ProvinceName_TH) for o in stopPointData.StopPointList">
			        							<option value="">โปรดเลือกสาขา</option>
			        						</select>
			        					</div>
			        					<div class="col-xs-2 no-padding">
			        						<button class="btn btn-primary btn-block" ng-click="updateSalesRegion()" ng-disabled="salesRegion.StopPointId == '' || salesRegion.StopPointId == null">บันทึก</button>
			        					</div>
			        				</td>
			        			</tr>
			        			<tr>
			        				<td colspan="2">&nbsp;</td>
			        			</tr>
			        			<tr>
			        				<td colspan="2">
			        					<div class="nestable">
			        						<ul class="nestable-list" ng-repeat="route in RouteList">
			        							<li class="nestable-item">
												    <div class="nestable-handle nestable-handle-primary">
												    	{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: route.RouteId } : 'RouteId')].RouteName_TH}}
												    	<div class="text-right pull-right">
												    		<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเส้นทางเดินรถนี้ ใช่หรือไม่?" lsw-confirm-modal="removeRoute(route.UserId,route.RouteId)">
												    			<i class="fa fa-trash-o"></i> ลบ
												    		</button>
												    	</div>
												    </div>
												</li>
			        						</ul>
			        					</div>
			        				</td>
			        			</tr>
			        			<tr ng-show="RouteList.length == 0">
			        				<td colspan="2" align="center">ยังไม่มีข้อมูลในส่วนนี้</td>
			        			</tr>
			        		</table>
                        </div>
  					</div>
  				</div>
        	</div>
        </div>
	</div>
</div>