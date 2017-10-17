<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="TicketPaymentTypeCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2><?php echo __("Fee Management"); ?></h2>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10">
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="TicketPaymentTypeList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="TicketPaymentTypeList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-7 cursor-point" ng-click="sort('TicketPaymentTypeName');">ประเภทการชำระเงิน</th>
			        				<th class="col-md-2 cursor-point text-right" ng-click="sort('TicketPaymentTypeFee');">ค่าดำเนินการ</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('IsPercentage');">หน่วย</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
	                                <td>{{row.TicketPaymentTypeName}}</td>
	                                <td align="right">{{row.TicketPaymentTypeFee}}</td>
	                                <td><strong>{{row.IsPercentage?'%':'บาท'}}</strong></td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.editTicketPaymentType(row.TicketPaymentTypeId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
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