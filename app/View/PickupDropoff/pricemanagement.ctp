<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="LocationPriceCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left"><?php echo __("Price Location Management"); ?></h2>
                        <div class="pull-right">
                            <button ng-click="addLocationPrice()" class="btn btn-info" ng-if="globalVariable.currentProcess == 1">เพิ่มเรทราคา</button>
                            <button ng-click="globalVariable.currentProcess = 1" class="btn btn-info" ng-if="globalVariable.currentProcess == 2">กลับ</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12 no-padding" ng-if="globalVariable.currentProcess == 1">
                            <div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="input-group pull-right" style="width: 180px; top: 2px;">
                                <div class="input-group-addon">
                                    สถานะ
                                </div>
                                <select class="form-control" ng-model="filter.isShowStatus" ng-change="filterSetUp()">
                                    <option value="">ทั้งหมด</option>
                                    <option value="true">ใช้งาน</option>
                                    <option value="false">ไม่ใช้งาน</option>
                                </select>
                            </div>
                            <div class="navbar-form navbar-left">
                                <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="locationPriceList">
                                </div>    
                            </div>
                            <div lsw-table="lswTableOptions" ng-model="locationPriceList">
                                <script type="text/ng-template" id="theadTemplate.html">
                                    <th class="col-md-2 cursor-point" ng-click="sort('PickupDropOffRateDistance');">ระยะทางน้อยกว่า (KM.)</th>
                                    <th class="col-md-2 cursor-point text-right" ng-click="sort('PickupDropOffRatePrices');">เรทราคา</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('IsActived');">สถานะ</th>
                                    <th class="col-md-6"></th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.PickupDropOffRateDistance}}</td>
                                    <td align="right">{{row.PickupDropOffRatePrices | number:2}}</td>
                                    <td>{{row.IsActived?'ใช้งาน':'ไม่ใช้งาน'}}</td>
                                    <td align="right">
                                        <button class="btn btn-warning btn-xs" ng-click="parent.editLocationPrice(row.PickupDropOffRateId);">
                                            <i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
                                        </button>
                                    </td>
                                </script>
                            </div>
                        </div>
                        <div class="col-md-12 no-padding" ng-if="globalVariable.currentProcess == 2">
                            <div class="form-horizontal">
                                <div class="form-group">
                                    <label for="LocationName" class="col-sm-2 control-label">ระยะทางน้อยกว่า (กิโลเมตร)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="locationPriceDetail.PickupDropOffRateDistance" placeholder="ระยะทาง" lsw-only-digits>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="LocationName" class="col-sm-2 control-label">ราคา (บาท)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="locationPriceDetail.PickupDropOffRatePrices" placeholder="ราคา" lsw-only-digits>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="Telephone" class="col-sm-2 control-label">สถานะใช้งาน</label>
                                    <div class="col-sm-10 margin-top-5">
                                        <input type="checkbox" ng-model="locationPriceDetail.IsActived">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 text-center clearfix margin-top-20">
                                <button class="btn btn-primary" message-en="Are you sure to save?" message-th="คุณต้องการบันทึก ใช่หรือไม่?" lsw-confirm-modal="saveLocationPrice()">
                                    <i class="glyphicon glyphicon-floppy-disk"></i> บันทึก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>