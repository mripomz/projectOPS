<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="PickupDropoffServiceCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left"><?php echo __("Service Management"); ?></h2>
                        <div class="pull-right">
                            <button class="btn btn-info" ng-click="addPickupDropoffService()"><i class="fa fa-plus" aria-hidden="true"></i> เพิ่มเที่ยวรถรับส่ง</button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-body">
                        <ul class="nestable-list" ng-repeat="(key, value) in PickupDropoffServicesList | groupBy:'StopPointName_TH'">
                            <li class="nestable-item">
                                <button data-action="collapse" type="button" style="display: block;color: #FFF;">Expand</button>
                                <div class="nestable-handle nestable-handle-primary">
                                    <strong>สถานที่ : {{key}}</strong>
                                </div>
                                <ul class="nestable-list" ng-repeat="item in value">
                                    <li class="nestable-item">
                                        <div class="nestable-handle" ng-class="((item.IsActived)?'nestable-handle-light':'nestable-handle-inactive')" style="padding:7px 15px 8px 15px">
                                            <i ng-class="(item.TypeOfService?'fa fa-bus':'fa fa-building')" aria-hidden="true"></i> <i ng-class="(item.TypeOfService?'fa fa-arrow-right':'fa fa-arrow-left')" aria-hidden="true"></i> <i ng-class="(item.TypeOfService?'fa fa-home':'fa fa-bus')" aria-hidden="true"></i> {{item.TypeOfService?'บริการส่งไปที่พัก&nbsp;':'บริการรับจากที่พัก'}}
                                            <strong>เวลารับผู้โดยสาร :</strong> <span class="danger">{{item.TimeService | jsonDate:'dd MMMM yyyy HH:mm น.'}}</span> 
                                            <strong>เบอร์รถ :</strong> <span class="danger">{{item.VehicleNumber}}</span>
                                            <strong>จำนวนที่นั่ง :</strong> <span class="danger">{{item.PickupDropOffServiceMaxLimit}} ที่นั่ง</span>
                                            <strong>เหลือที่นั่ง :</strong> <span class="danger">{{item.PickupDropOffServiceMaxLimit- item.PickupDropOffServiceUsages}} ที่นั่ง</span>
                                            <strong>สถานะ :</strong> <span ng-class="item.IsActived? 'success' : 'danger'">
                                            {{item.IsActived?'เปิดบริการ':'ยังไม่เปิดบริการ'}}
                                            </span>
                                            <span style="padding-left: 0px;left: -10px;margin-left: 0px" ng-class="item.SumDiffLocation>=5? 'danger' : 'success'">

                                            <strong>{{item.SumDiffLocation>=5?'เต็ม':'ยังไม่เต็ม'}}</strong>
                                            </span>
                                            <div class="text-right pull-right">
                                                <button class="btn btn-primary btn-xs" ng-click="viewLocationList(item)">
                                                    ดูแผนที่
                                                </button> 
                                                <button 
                                                    class="btn btn-warning btn-xs" 
                                                    ng-disabled="checkDateBeforeEdit(item.TimeService)"
                                                    ng-click="editPickupDropoffService(item.PickupDropOffServiceId)"><i class="fa fa-pencil" aria-hidden="true"></i> แก้ไข</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <!-- <ul class="nestable-list" ng-repeat="(eachKey, eachValue) in value | groupBy:'DateTrip'">
                                    <li class="nestable-item">
                                        <button data-action="collapse" type="button" style="display: block;" ng-if="eachValue[0].PickupDropOffService.length > 0" ng-click="">Expand</button>
                                        <div class="nestable-handle nestable-handle-info" style="padding:7px 15px 0px 15px">
                                            <strong>{{eachKey}}</strong>
                                            <div class="text-right pull-right">
                                                <button class="btn btn-info btn-xs pull-right" ng-click="addPickupDropoffService(eachValue[0].VehicleOperationId)"><i class="fa fa-plus" aria-hidden="true"></i> เพิ่มเที่ยวรถรับส่ง</button>
                                                
                                            </div>
                                        </div>
                                        <ul class="nestable-list" ng-repeat="item in eachValue[0].PickupDropOffService">
                                            <li class="nestable-item">
                                                <div class="nestable-handle" ng-class="((item.IsActived)?'nestable-handle-light':'nestable-handle-inactive')" style="padding:7px 15px 0px 15px">
                                                    <strong>{{!item.IsActived?'>>ไม่เปิดบริการ<<':''}}</strong> {{item.TimeService | jsonDate:'เวลารับ  HH:mm น.'}} <strong>|</strong> เบอร์รถ {{item.VehicleNumber}} <strong>|</strong> {{item.PickupDropOffServiceMaxLimit}} ที่นั่ง <strong>|</strong> {{item.TypeOfService?'บริการส่ง':'บริการรับ'}}

                                                    <div class="text-right pull-right">
                                                        <button 
                                                            class="btn btn-warning btn-xs pull-right" 
                                                            ng-disabled="checkDateBeforeEdit(item.VehicleOperationDate)"
                                                            ng-click="editPickupDropoffService(item.PickupDropOffServiceId)"><i class="fa fa-pencil" aria-hidden="true"></i> แก้ไข</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul> -->
                            </li>
                        </ul>
                        <div class="text-center" ng-if="PickupDropoffServicesList.length == 0">
                            <hr/>
                                ไม่มีข้อมูลเที่ยวรถในช่วงเวลานี้
                            <hr/>
                        </div>

                        <!--Search and Filter-->
                        <div class="search-vehicle-trip">
                            <div class="search-vehicle-trip-btn" ng-click="globalVariable.isShowFilter = !globalVariable.isShowFilter">
                                    <span style="font-size:16px;color:#3397DA"><i ng-class="{'fa fa-minus-circle':globalVariable.isShowFilter,'fa fa-plus-circle':!globalVariable.isShowFilter}"></i></span> ซ่อน / แสดง
                            </div>
                            <div class="col-xs-12 filter-layout" ng-class="{'fadeIn animated' : globalVariable.isShowFilter, 'fadeOut animated hide' : !globalVariable.isShowFilter}">
                                <h4 class="mouse-pointer" style="color:#FFF">
                                    <strong>ค้นหาเที่ยวรถ</strong>
                                </h4>
                                <hr/>
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">วันที่เริ่ม</label>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <input type="text" class="form-control" ng-model="searchFilter.dateStart" id="dateStart" placeholder="วันที่เริ่มต้น" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="left">
                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">วันที่สิ้นสุด</label>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <input type="text" class="form-control" ng-model="searchFilter.dateEnd" id="dateEnd" placeholder="วันที่สิ้นสุด" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="left">
                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateEnd" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="timeStart" class="col-sm-4 control-label">เวลา</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-5 no-padding">
                                                    <input type="text" class="form-control" ng-model="searchFilter.timeStart" id="timeStart" placeholder="เวลาเริ่มต้น" data-time-type="string" data-placement="left" data-minute-step="1" bs-timepicker data-autoclose="true">
                                            </div>
                                            <label for="timeEnd" class="col-sm-2 text-center no-padding"> - </label>
                                            <div class="col-sm-5 no-padding">
                                                <input type="text" class="form-control" ng-model="searchFilter.timeEnd" id="timeEnd" placeholder="เวลาสิ้นสุด" data-time-type="string" data-placement="left" data-minute-step="1" bs-timepicker data-autoclose="true">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="vehicleRoute" class="col-sm-12 text-center">เส้นทางเดินรถ</label>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                                <select class="form-control" ng-model="searchFilter.RouteId" id="vehicleRoute" ng-options="o.RouteId as o.RouteName_TH for o in VehicleRoute">
                                                    <option value="">ทั้งหมด</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <button class="btn btn-primary btn-block" ng-click="searchRouteTrip();globalVariable.isShowFilter = !globalVariable.isShowFilter">ค้นหาเที่ยวรถ</button>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>