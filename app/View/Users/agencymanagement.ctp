<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="AgencySettingCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Agency Management"); ?></h2>
                        <div class="pull-right">
                            <button class="btn btn-primary" ng-style="{'visibility':(currentStep==1?'hidden':'visible')}" ng-click="initData()">กลับ</button>
                        </div>
        			</div>
  					<div class="panel-body">
                        <!-- LIST ZONE -->
                        <div class="col-md-12 margin-top-10" ng-if="currentStep == 1">
                            <div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="navbar-form navbar-left">
                                <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="userList">
                                </div>    
                            </div>
                            <div lsw-table="lswTableOptions" ng-model="userList">
                                <script type="text/ng-template" id="theadTemplate.html">
                                    <th class="col-md-1 cursor-point" ng-click="sort('RoleId');">ลำดับ</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('FirstName');">ชื่อ - นามสกุล</th>
                                    <th class="col-md-3 cursor-point text-center" ng-click="sort('GradeIdBuy');">เกรดเอเจนซี</th>
                                    <th class="col-md-6 text-right"></th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.NO}}</td>
                                    <td >{{row.FirstName + ' ' + row.LastName}}</td>
                                    <td class="text-center">
                                        <div ng-if="!row.isEdit">
                                            {{(parent.gradeList[(parent.gradeList | lswIndexOf: { GradeId: row.GradeIdBuy } : 'GradeId')].GradeName) || '-'}}
                                        </div>
                                        <div ng-if="row.isEdit">
                                            <select class="form-control" ng-model="row.GradeIdBuy" ng-options="o.GradeId as o.GradeName for o in parent.gradeList">
                                                <option value="">กรุณาเลือก</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <button class="btn btn-primary" ng-if="!row.isEdit" ng-click="parent.AgencyManagementPrice(row.AgencyGradePriceId,(row.FirstName + ' ' + row.LastName), row.GradeIdBuy)">
                                            <i class="fa fa-paint-brush" aria-hidden="true"></i> จัดการราคาบัตรในแต่ละเส้นทาง
                                        </button>
                                        <button class="btn btn-warning" ng-if="!row.isEdit" ng-click="row.isEdit = true">
                                            <i class="glyphicon glyphicon-pencil"></i> แก้ไข
                                        </button>
                                        <button class="btn btn-primary" ng-if="row.isEdit" ng-click="parent.updateAgencyPrice(row)">
                                            <i class="glyphicon glyphicon-pencil"></i> บันทึก
                                        </button>
                                        <button class="btn btn-danger" ng-if="row.isEdit" ng-click="row.isEdit = false;parent.initData();">
                                            <i class="glyphicon glyphicon-pencil"></i> ยกเลิก
                                        </button>
                                    </td>
                                </script>
                            </div>
                        </div>
                        <!-- MANAGEMENT ZONE -->
                        <div class="col-md-12 margin-top-10" ng-if="currentStep == 2">
                            <h4><strong>จัดการราคาบัตรในแต่ละเส้นทางของ "{{globalVariable.AgencyName}}"</strong></h4><hr/>
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th class="col-md-2 cursor-point">เส้นทาง</th>
                                        <th class="col-md-1 cursor-point text-right">กำหนดราคา</th>
                                        <th class="col-md-2 cursor-point">หน่วย<br/>(บาท/เปอร์เซ็นต์)</th>
                                        <th class="col-md-2 cursor-point text-right">ราคาบาทสูงสุด</th>
                                        <th class="col-md-2 cursor-point text-right">ราคาเปอร์เซ็นต์สูงสุด </th>
                                        <th class="col-md-3 cursor-point text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in agencyPricePerRoutesList">
                                        <td>{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: item.RouteId } : 'RouteId')].RouteName_TH}}</td>
                                        <td align="right">
                                            <div ng-if="!item.isEdit">
                                                <span ng-style="{'color':(item.PriceAdminSet >= 0?'green':'red')}">
                                                    <strong>{{(item.PriceAdminSet || 0) | number:2}}</strong>
                                                </span>
                                            </div>
                                            <div ng-if="item.isEdit">
                                                <input type="text" class="form-control text-right" ng-model="item.PriceAdminSet" name="PriceAdminSet">
                                            </div>
                                        </td>
                                        <td>
                                            <div ng-if="!item.isEdit">
                                                {{item.IsPriceAdminPercent?'%':'บาท'}}
                                            </div>
                                            <div ng-if="item.isEdit">
                                                <input type="checkbox" ng-model="item.IsPriceAdminPercent" name="IsPriceAdminPercent"> เปอร์เซ็นต์
                                            </div>
                                        </td>
                                        <td align="right">
                                            <div ng-if="!item.isEdit">
                                                <span class="danger">
                                                    <strong>{{(item.LimitAgencyPrice || 0) | number:2}} บาท</strong>
                                                </span>
                                            </div>
                                            <div ng-if="item.isEdit">
                                                <input type="text" class="form-control text-right" ng-model="item.LimitAgencyPrice" name="LimitAgencyPrice">
                                            </div>
                                        </td>
                                        <td align="right">
                                            <div ng-if="!item.isEdit">
                                                <span class="danger">
                                                    <strong>{{(item.LimitAgencyPricePercent || 0) | number:2}} %</strong>
                                                </span>
                                            </div>
                                            <div ng-if="item.isEdit">
                                                <input type="text" class="form-control text-right" ng-model="item.LimitAgencyPricePercent" name="LimitAgencyPricePercent">
                                            </div>
                                        </td>
                                        <td align="right">
                                            <button class="btn btn-primary" ng-if="!item.isEdit" ng-click="viewAgencyPriceSample(item)">
                                                <i class="fa fa-share-alt" aria-hidden="true"></i> ตัวอย่างราคา
                                            </button>
                                            <button class="btn btn-warning" ng-if="!item.isEdit" ng-click="item.isEdit = true">
                                                <i class="glyphicon glyphicon-pencil"></i> แก้ไข
                                            </button>
                                            <button class="btn btn-primary" ng-if="item.isEdit" ng-click="updateAgencyPricePerRoute(item)">
                                                <i class="glyphicon glyphicon-pencil"></i> บันทึก
                                            </button>
                                            <button class="btn btn-danger" ng-if="item.isEdit" ng-click="item.isEdit = false; AgencyManagementPrice(globalVariable.AgencyGradePriceId,globalVariable.AgencyName,globalVariable.GradeIdBuy);">
                                                <i class="glyphicon glyphicon-pencil"></i> ยกเลิก
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>