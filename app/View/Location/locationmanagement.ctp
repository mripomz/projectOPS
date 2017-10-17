<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="LocationCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left"><?php echo __("Location Management"); ?></h2>
                        <div class="pull-right">
                            <button ng-click="addLocation()" class="btn btn-info" ng-if="globalVariable.currentProcess == 1">เพิ่มสถานที่รับส่ง</button>
                            <button ng-click="globalVariable.currentProcess = 1" class="btn btn-info" ng-if="globalVariable.currentProcess == 2">กลับ</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12 margin-top-10">
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
                                    <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="locationList">
                                    </div>    
                                </div>
                                <div lsw-table="lswTableOptions" ng-model="locationList">
                                    <script type="text/ng-template" id="theadTemplate.html">
                                        <th class="col-md-2 cursor-point" ng-click="sort('LocationName');">สถานที่</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('AmphurName_TH');">อำเภอ</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('DistrictName_TH');">ตำบล</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('ProvinceName_TH');">จังหวัด</th>
                                        <th class="col-md-1 cursor-point" ng-click="sort('Telephone');">โทรศัพท์</th>
                                        <th class="col-md-1 cursor-point" ng-click="sort('IsActived');">สถานะ</th>
                                        <th class="col-md-2"></th>
                                    </script>
                                    <script type="text/ng-template" id="tbodyTemplate.html">
                                        <td>{{row.LocationName}}</td>
                                        <td>{{row.AmphurName_TH}}</td>
                                        <td>{{row.DistrictName_TH}}</td>
                                        <td>{{row.ProvinceName_TH}}</td>
                                        <td>{{row.Telephone}}</td>
                                        <td><div id = "useable">{{row.IsActived?'ใช้งาน':'ไม่ใช้งาน'}}</div></td>
                                        <td align="right">
                                            <button class="btn btn-primary btn-xs" ng-disabled="row.Latitude == 0 || row.Longitude == 0" ng-click="parent.showMapDirection(row);">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i> ดูแผนที่
                                            </button>
                                            <button class="btn btn-warning btn-xs" ng-click="parent.editLocation(row.LocationId);">
                                                <i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
                                            </button>
                                        </td>
                                    </script>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 no-padding" ng-if="globalVariable.currentProcess == 2">
                            <h4><strong>รายละเอียดของสถานที่</strong></h4><hr/>
                            <div class="form-horizontal">
                                <div class="form-group">
                                    <label for="LocationName" id = "nameplace" class="col-sm-2 control-label">ชื่อสถานที่</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="locationDetail.LocationName" placeholder="ชื่อสถานที่">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="LocationRoadName" class="col-sm-2 control-label">ถนน</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="locationDetail.LocationRoadName" placeholder="ถนน">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="ProvinceId" class="col-sm-2 control-label">จังหวัด</label>
                                    <div class="col-sm-10">
                                        <select ng-model="locationDetail.ProvinceId" class="form-control" ng-options="o.ProvinceId as o.ProvinceName_TH for o in provinceList" ng-change="loadAmphur()">
                                            <option value="">--โปรดเลือกจังหวัด--</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="AmphurId" class="col-sm-2 control-label">อำเภอ</label>
                                    <div class="col-sm-10">
                                        <select ng-model="locationDetail.AmphurId" ng-options="o.AmphurId as o.AmphurName_TH for o in amphurList" ng-disabled="locationDetail.ProvinceId == null || locationDetail.ProvinceId == '' || amphurList.length == 0" class="form-control" ng-change="loadDistrict()">
                                            <option value="">--โปรดเลือกอำเภอ--</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="DistrictId" class="col-sm-2 control-label">ตำบล</label>
                                    <div class="col-sm-10">
                                        <select ng-model="locationDetail.DistrictId" ng-options="o.DistrictId as o.DistrictName_TH for o in districtList" ng-disabled="locationDetail.ProvinceId == null || locationDetail.ProvinceId == '' || locationDetail.AmphurId == null || locationDetail.AmphurId == '' || districtList.length == 0" class="form-control">
                                            <option value="">--โปรดเลือกตำบล--</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="Telephone" class="col-sm-2 control-label">โทรศัพท์</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="locationDetail.Telephone" placeholder="โทรศัพท์">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="Telephone" class="col-sm-2 control-label">สถานะใช้งาน</label>
                                    <div class="col-sm-10 margin-top-5">
                                        <input type="checkbox" ng-model="locationDetail.IsActived">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="DistrictId" class="col-sm-2 control-label">พิกัดสถานที่</label>
                                    <div class="col-sm-10">
                                        <ui-gmap-google-map 
                                            center='locationDetail.maps.center' 
                                            zoom='locationDetail.maps.zoom'
                                            events='locationDetail.maps.events'>
                                            <ui-gmap-marker 
                                                coords="locationDetail.maps.marker.coords" 
                                                options="locationDetail.maps.marker.options"
                                                idkey="locationDetail.maps.marker.id"
                                                events='locationDetail.maps.marker.events'>
                                            </ui-gmap-marker>
                                        </ui-gmap-google-map>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 text-center clearfix margin-top-20">
                                <button class="btn btn-primary" message-en="Are you sure to save this location?" message-th="คุณต้องการบันทึก ใช่หรือไม่?" lsw-confirm-modal="saveLocation()">
                                    <i class="glyphicon glyphicon-floppy-disk"></i> บันทึก
                                </button>
                            </div>
                        </div>
                        <!-- <ui-gmap-google-map center='map.center' zoom='map.zoom' class="col-md-12"></ui-gmap-google-map> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>