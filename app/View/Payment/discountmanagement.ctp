<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="DiscountCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Discount Management"); ?></h2>
        				<div class="pull-right">
        					<button ng-click="editDiscountType(0)" class="btn btn-info">เพิ่มส่วนลด</button>
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
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="DiscountTypeList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="DiscountTypeList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-3 cursor-point" ng-click="sort('DiscountTypeName');">ประเภทส่วนลด</th>
			        				<th class="col-md-3 cursor-point text-right" ng-click="sort('DiscountTypeCode');">โค้ท/รหัสส่วนลด</th>
			        				<th class="col-md-2 cursor-point text-right" ng-click="sort('DiscountTypePrice');">ส่วนลด</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('IsPercentage');">หน่วย</th>
			        				<th class="col-md-1 cursor-point text-right" ng-click="sort('IsActivated');">การใช้งาน</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td>{{row.DiscountTypeName}}</td>
	                                <td align="right">{{row.DiscountTypeCode || '-'}}</td>
	                                <td align="right">{{row.DiscountTypePrice}}</td>
	                                <td><strong>{{row.IsPercentage?'%':'บาท'}}</strong></td>
	                                <td align="right">{{row.IsActivated?'ใช้งาน':'ปิด'}}</td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.editDiscountType(row.DiscountTypeId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this route?" message-th="ต้องการที่จะลบส่วนลดนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.removeDiscountType(row.DiscountTypeId)">
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