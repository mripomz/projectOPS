<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="StopPointCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Stop Point Management"); ?></h2>
        				<div class="pull-right">
        					<button ng-click="addStopPoint()" class="btn btn-info"><?php echo __("Add Stop Point"); ?></button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10">
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
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="stopPointData.StopPointList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="stopPointData.StopPointList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-3 cursor-point" ng-click="sort('ProvinceName_TH');">จัดหวัด</th>
			        				<th class="col-md-3 cursor-point" ng-click="sort('StopPointName_TH');">ชื่อจุดจอด ภาษาไทย</th>
			        				<th class="col-md-3 cursor-point" ng-click="sort('StopPointName_EN');">ชื่อจุดจอด ภาษาอังกฤษ</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('IsTransit');">สามารถเปลี่ยนเที่ยวรถได้</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td>{{row.ProvinceName_TH}}</td>
			        				<td>{{row.StopPointName_TH}}</td>
			        				<td>{{row.StopPointName_EN}}</td>
			        				<td>{{row.IsTransit?'ได้':'ไม่ได้'}}</td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.editStopPoint(row.StopPointId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this stop point?" message-th="ต้องการที่จะลบจุดจอดนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.removeStopPoint(row.StopPointId)">
			        						<i class="glyphicon glyphicon-trash"></i> <?php echo __("Delete"); ?>
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