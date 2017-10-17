<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="VehicleMultipleOperationCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2>เปิดหลายเที่ยวรถ</h2>
        			</div>
  					<div class="panel-body">
                        <div class="col-md-12">
                            <div class="col-xs-3"></div>
                            <div class="col-xs-2 text-right">
                                <div class="text-center">
                                    <button class="btn circle-button" ng-class="{'btn-primary':(globalVariable.currentStep == 1 || globalVariable.currentStep == 2)}">1</button><br/>ขั้นตอนที่ 1
                                </div>
                            </div>
                            <div class="col-xs-2 text-center">
                                    <span style="font-size:35px"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                            </div>
                            <div class="col-xs-2 text-left">
                                <div class="text-center">
                                    <button class="btn circle-button" ng-class="{'btn-primary':(globalVariable.currentStep == 2)}">2</button><br/>ขั้นตอนที่ 2
                                 </div>
                            </div>
                            <div class="col-xs-3"></div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-12 no-padding" ng-if="globalVariable.currentStep == 1">
                                <h3>1. เลือกวันที่เพื่อใช้อ้างอิงในการเปิดหลายเที่ยวรถ</h3><hr/>
                                <div class="col-xs-8 col-xs-offset-2 form-horizontal margin-bottom-10">
                                    <h4>โปรดระบุวันที่</h4>
                                    <div class="input-group">
                                        <input type="text" class="form-control" ng-model="globalVariable.chooseVehicleTripDate" placeholder="วันที่" bs-datepicker="" data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="bottom" ng-change="loadVehicleTripList()">
                                        <label style="background-color: #eb9316;border-color: #eb9316;" for="chooseVehicleTripDate" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                    </div>
                                </div>
                                <div class="col-md-8 col-md-offset-2">
                                    <table class="table table-bordered">
                                        <tr class="active">
                                            <th class="text-center"><strong>เที่ยวรถโดยสารทั้งหมดประจำวันที่ {{(globalVariable.chooseVehicleTripDate | lswDate:'MM/dd/yyyy':'dd/MM/yyyy')}}</strong></th>
                                        </tr>
                                        <tr ng-if="VehicleOperationList.length > 0">
                                            <td>
                                                <div class="col-md-12" ng-style="{'margin-top':($index == 0?'20px':'0px')}" ng-repeat="(key, eachTrip) in VehicleOperationList | groupBy:'RouteId'">
                                                    <table class="table table-bordered">
                                                        <tr class="active">
                                                            <th colspan="2">{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: key } : 'RouteId')].RouteMainNumber}}-{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: key } : 'RouteId')].RouteNumber}} {{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: key } : 'RouteId')].RouteName_TH}}</th>
                                                        </tr>
                                                        <tr ng-repeat="tripDetail in eachTrip">
                                                            <td width="20">
                                                                <input type="checkbox" name="isSelect" ng-model="tripDetail.isSelect">
                                                            </td>
                                                            <td>
                                                                <div class="pull-left circleBaseOnline" style="margin:5px 5px 5px 0px" ng-style="{'background-color':(tripDetail.IsOnline?'green':'red')}"></div>
                                                                <div class="pull-left">
                                                                    {{tripDetail.VehicleOperationDate | jsonDate:'HH:mm'}} - {{tripDetail.VehicleSeatPlanName}}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr ng-if="VehicleOperationList.length == 0">
                                            <td align="center">ยังไม่มีข้อมูล</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-12 no-padding" ng-if="globalVariable.currentStep == 2">
                                <h3>2. กำหนดวันที่ในการเปิดเที่ยวรถ</h3><hr/>
                                <div class="col-xs-8 col-xs-offset-2 form-horizontal margin-bottom-10">
                                    <div class="col-md-12 form-horizontal">
                                        <div class="col-md-6 no-padding">
                                            <div class="form-group">
                                                <label class="col-sm-4 text-right">วันที่เริ่มต้น : </label>
                                                <div class="col-sm-8">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" ng-model="multipleDate.dateStart" id="dateStart" placeholder="วันที่เริ่มต้น" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="bottom" ng-change="generateDateforMultipleDate()">
                                                        <label style="background-color: #eb9316;border-color: #eb9316;" for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 no-padding">
                                            <div class="form-group">
                                                <label class="col-sm-4 text-right">ถึงวันที่ : </label>
                                                <div class="col-sm-8">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" ng-model="multipleDate.dateEnd" id="dateEnd" placeholder="วันที่สิ้นสุด" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="bottom" ng-change="generateDateforMultipleDate()">
                                                        <label style="background-color: #eb9316;border-color: #eb9316;" for="dateEnd" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 no-padding">
                                            <label class="col-sm-2 text-right">ทุกวัน : </label>
                                            <div class="col-sm-10">
                                                <div class="col-md-4 no-padding">
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[1]" name="Monday" ng-change="generateDateforMultipleDate()"> วันจันทร์<br/>
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[4]" name="Thursday" ng-change="generateDateforMultipleDate()"> วันพฤหัส<br/>
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[0]" name="Sunday" ng-change="generateDateforMultipleDate()"> วันอาทิตย์
                                                </div>
                                                <div class="col-md-4 no-padding">
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[2]" name="Tuesday" ng-change="generateDateforMultipleDate()"> วันอังคาร<br/>
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[5]" name="Friday" ng-change="generateDateforMultipleDate()"> วันศุกร์
                                                </div>
                                                <div class="col-md-4 no-padding">
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[3]" name="Wednesday" ng-change="generateDateforMultipleDate()"> วันพุธ<br/>
                                                    <input type="checkbox" ng-model="multipleDate.DayofWeek[6]" name="Saturday" ng-change="generateDateforMultipleDate()"> วันเสาร์
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <h3>รายการวันที่เปิดเที่ยวรถ</h3>
                                            <hr/>
                                            <div class="col-md-12 no-padding" style="min-height:200px;max-height:400px;border:1px #ccc solid;border-radius:5px;overflow:auto">
                                                <div ng-repeat="(key,value) in multipleDate.dateList | groupBy:'monthName'" ng-init="value.isShow = false">
                                                    <div class="col-md-12" ng-click="globalVariable.IsMonthActive = $index;" style="border-bottom: 2px #3498DB solid; background-color: #C6E8FF;">
                                                        <strong class="pull-left">{{key}}</strong>
                                                        <strong class="pull-right"><i ng-class="{'fa fa-angle-down':(globalVariable.IsMonthActive == $index),'fa fa-angle-left':(globalVariable.IsMonthActive != $index)}" aria-hidden="true"></i></strong>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <ul class="list-group" ng-show="multipleDate.dateList.length > 0 && globalVariable.IsMonthActive == $index">
                                                        <li class="list-group-item" ng-repeat="itemDate in multipleDate.dateList track by $index | orderBy:itemDate">
                                                            &nbsp;&nbsp;{{dateParse(itemDate.Date) | date:'EEEE ที่ dd MMMM yyyy'}}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button class="btn btn-warning pull-right" 
                                ng-if="globalVariable.currentStep == 1" 
                                ng-click="globalVariable.currentStep = 2;generateDateforMultipleDate()"
                                ng-disabled="globalVariable.chooseVehicleTripDate == null || VehicleOperationList.length == 0">
                                ขั้นตอนที่ 2 <i class="fa fa-angle-double-right"></i>
                            </button>
                            <button class="btn btn-primary pull-right" ng-if="globalVariable.currentStep == 2" message-en="Are you sure to save?" message-th="คุณต้องการเปิดเที่ยวรถตามการตั้งค่านี้ ใช่หรือไม่?" lsw-confirm-modal="saveVehicleMultipleOperation()">
                                <i class="glyphicon glyphicon-floppy-disk"></i> บันทึก
                            </button>
                            <button class="btn btn-warning pull-left" ng-if="globalVariable.currentStep == 2" ng-click="globalVariable.currentStep = 1">
                                <i class="fa fa-angle-double-left" aria-hidden="true"></i> ขั้นตอนที่ 1
                            </button>
                        </div>
  					</div>
  				</div>
  			</div>
  		</div>
	</div>
</div>