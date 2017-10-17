<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="AssetCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left">ระบบจัดการรถ</h2>
        				<div class="pull-right">
        					<button ng-click="addNewVehicle()" ng-if="currentState == 1" class="btn btn-info">เพิ่มรถ</button>
        					<button ng-click="backtoMain()" ng-if="currentState == 2" class="btn btn-info">กลับ</button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10" ng-if="currentState == 1">
  							<div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="input-group  pull-right" style="margin-right:2px;">
  								<button ng-click="filterOption()" class="btn input-sm" ng-class="{'btn-primary' : showAll}">แสดงทั้งหมด</button>
  							</div>
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="mainData">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="mainData">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-1 cursor-point" ng-click="sort('VehicleNumber');">เบอร์รถ</th>
			        				<th class="col-md-2 cursor-point" ng-click="sort('PlateNumber');">ทะเบียนรถ</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('PlateProvince');">จังหวัด</th>
			        				<th class="col-md-1 cursor-point" ng-click="sort('Brand');">ยี่ห้อ</th>
			        				<th class="col-md-2 text-right cursor-point" ng-click="sort('ChassisNumber');">หมายเลขตัวถัง</th>
			        				<th class="col-md-2 text-right cursor-point" ng-click="sort('EngineNumber');">หมายเลขเครื่อง</th>
			        				<th class="col-md-1 text-right cursor-point" ng-click="sort('IsDeleted');">สถานะ</th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
			        				<td>{{!!row.VehicleNumber?row.VehicleNumber:'-'}}</td>
			        				<td>{{!!row.PlateNumber?row.PlateNumber:'-'}}</td>
			        				<td>{{parent.ProvicesList.Provinces[(parent.ProvicesList.Provinces | lswIndexOf: { ProvinceId: row.PlateProvince } : 'ProvinceId')].ProvinceName_TH}}</td>
			        				<td>{{!!row.Brand?row.Brand:'-'}}</td>
			        				<td align="right">{{!!row.ChassisNumber?row.ChassisNumber:'-'}}</td>
			        				<td align="right">{{!!row.EngineNumber?row.EngineNumber:'-'}}</td>
			        				<td align="right">{{!!row.IsDeleted?'ถูกลบ':'ใช้งาน'}}</td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.editVehicle(row.VehicleId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this vehicle?" message-th="ต้องการที่จะลบข้อมูลรถออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.removedVehicle(row.VehicleId)">
			        						<i class="glyphicon glyphicon-trash"></i> <?php echo __("Delete"); ?>
			        					</button>
			        				</td>
	                            </script>
	                        </div>
	                    </div>
	                    <div class="col-md-12 margin-top-10" ng-if="currentState == 2">
	                    	<div class="tabbable tabs-blocks tabs-primary">
							    <!-- Tabs -->
							    <ul class="nav nav-tabs" tabindex="7" style="overflow: hidden; outline: none;">
							        <li class="active" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#VehicleDetail" data-toggle="tab" aria-expanded="true"><i class="fa fa-truck"></i> รายละเอียดรถยนต์</a>
							        </li>
							        <!-- <li class="" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#SeatCapacityArrangement" data-toggle="tab" aria-expanded="false"><i class="fa fa-puzzle-piece"></i> การสร้างผังรถ</a>
							        </li> -->
							        <li class="">
							            <a href="#Ownership" data-toggle="tab" aria-expanded="false"><i class="fa fa-car"></i> รถบริษัท/รถร่วม</a>
							        </li>
							        <li class="" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#Tax" data-toggle="tab" aria-expanded="false"><i class="fa fa-credit-card"></i> ภาษีรถยนต์</a>
							        </li>
							        <li class="" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#Insurance" data-toggle="tab" aria-expanded="false"><i class="fa fa-suitcase"></i> ประกันภัยรถยนต์</a>
							        </li>
							        <li class="" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#Act" data-toggle="tab" aria-expanded="false"><i class="fa fa-university"></i> พ.ร.บ.</a>
							        </li>
							        <li class="" ng-class="{'disabledTab' : globalStatus.isOwnershipChanged}">
							            <a href="#LeasingDetail" data-toggle="tab" aria-expanded="false"><i class="fa fa-money"></i> การผ่อนชำระ</a>
							        </li>

							    </ul>
							    <!-- // END Tabs -->

							    <!-- Panes -->
							    <div class="tab-content" style="padding:0px;">
							        <div id="VehicleDetail" class="tab-pane active">
							            <div ng-include="rootUrl + '../templates/Assets/vahicledetail.html'"></div>
							        </div>
							        <!-- <div id="SeatCapacityArrangement" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/seatcapacityarrangement.html'"></div>
							        </div> -->
							        <div id="Ownership" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/ownership.html'"></div>
							        </div>
							        <div id="Tax" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/tax.html'"></div>
							        </div>
							        <div id="Insurance" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/insurance.html'"></div>
							        </div>
							        <div id="Act" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/act.html'"></div>
							        </div>
							        <div id="LeasingDetail" class="tab-pane">
							            <div ng-include="rootUrl + '../templates/Assets/leasing.html'"></div>
							        </div>
							    </div>
							    <!-- // END Panes -->
							</div>
	                    </div>
  					</div>
  				</div>
        	</div>
        </div>
	</div>
</div>