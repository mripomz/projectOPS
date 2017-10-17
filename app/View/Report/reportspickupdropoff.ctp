<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="ReportsPickupDropoffCtrl" ng-init="initData()">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2><?php echo __("Reports Pickup Dropoff Passenger"); ?></h2>
        			</div>
  					<div class="panel-body">
  						<div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane active">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                รายงานบริการรับส่งผู้โดยสาร
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="form-horizontal col-md-6 col-md-offset-3">
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">วันที่ : </label>
                                                    <div class="col-sm-10">
                                                        <div class="input-group">
                                                            <input type="text" name="dateStart" class="form-control" ng-model="conditionReport.DateStart" placeholder="จากวันที่" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="bottom" ng-change="globalVariable.isShowResult = false">
                                                            <label for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">เวลา : </label>
                                                    <div class="col-sm-4">
                                                        <input type="text" class="form-control" ng-model="conditionReport.TimeStart" id="timeStart" placeholder="เวลาเริ่มต้น" data-time-type="string" data-minute-step="1" bs-timepicker data-autoclose="true" ng-change="globalVariable.isShowResult = false">
                                                    </div>
                                                    <label class="col-sm-2 control-label">เวลา : </label>
                                                    <div class="col-sm-4">
                                                        <input type="text" class="form-control" ng-model="conditionReport.TimeEnd" id="timeEnd" placeholder="เวลาเริ่มต้น" data-time-type="string" data-minute-step="1" bs-timepicker data-autoclose="true" ng-change="globalVariable.isShowResult = false">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">บริการ : </label>
                                                    <div class="col-sm-10">
                                                        <select class="form-control" ng-model="conditionReport.TypeOfService" ng-change="globalVariable.isShowResult = false">
                                                            <option value="">-- ทั้งหมด --</option>
                                                            <option value="0">บริการรับ</option>
                                                            <option value="1">บริการรส่ง</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">สถานที่ : </label>
                                                    <div class="col-sm-10">
                                                        <select class="form-control" ng-model="conditionReport.StopPointId" ng-options="o.StopPointId as o.StopPointName_TH for o in StopPointList" ng-change="globalVariable.isShowResult = false">
                                                            <option value="">-- ทั้งหมด --</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label"></label>
                                                    <div class="col-sm-10">
                                                        <button class="btn btn-primary btn-block" ng-click="searchPassengerPickupDropOff()">ค้นหา</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <hr/>
                                            <div class="col-md-12" ng-if="globalVariable.isShowResult">
                                                <table width="100%" id="passengerService">
                                                    <td align="right">
                                                        <button class="dontPrint btn btn-primary btn-xs" ng-click="printDivById('passengerService')"><i class="fa fa-print" aria-hidden="true"></i> พิมพ์</button>
                                                        <button class="dontPrint btn btn-primary btn-xs" ng-click="generateExcelbyId('passengerService')"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</button>
                                                    </td>
                                                    <tr>
                                                        <th class="text-center">รายงานแสดงบริการรับส่งผู้โดยสาร<br/>ระหว่างวันที่ {{conditionReport.DateStart | lswDate:'MM/DD/YYYY':'dd MMMM yyyy'}} {{conditionReport.TimeStart + ' น.'}} - ถึงวันที่ {{conditionReport.DateStart | lswDate:'MM/DD/YYYY':'dd MMMM yyyy'}} {{conditionReport.TimeEnd + ' น.'}}</th>
                                                    </tr>
                                                    <tbody ng-repeat="(StopPointName_TH, value) in passengerPickupDropOffService | groupBy:'StopPointName_TH'">
                                                        <tr class="primary">
                                                            <th><strong>สถานที่ : {{StopPointName_TH}}</strong></th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table class="table table-bordered">
                                                                    <tbody ng-repeat="(TypeOfService, value2) in value | groupBy:'TypeOfService'">
                                                                        <tr class="info">
                                                                            <td colspan="2"><strong>{{TypeOfService=="true"?'บริการส่ง':'บริการรับ'}}</strong></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table class="table table-bordered">
                                                                                    <tbody ng-repeat="(TimeService, value3) in value2 | groupBy:'TimeService'">
                                                                                        <tr class="active">
                                                                                            <th colspan="6">{{TimeService | jsonDate:'dd MMMM yyyy HH:mm น.'}}</th>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th class="col-md-3">สถานที่</th>
                                                                                            <th class="col-md-2">ห้อง</th>
                                                                                            <th class="col-md-2">เบอร์โทรสถานที่</th>
                                                                                            <th class="col-md-1">จำนวนคน</th>
                                                                                            <th class="col-md-2">เบอร์โทรผู้โดยสาร</th>
                                                                                            <th class="col-md-2">รถบริการ</th>
                                                                                        </tr>
                                                                                        <tr ng-repeat="item in value3">
                                                                                            <td>{{item.LocationName}}</td>
                                                                                            <td>{{item.RoomNumber}}</td>
                                                                                            <td>{{item.Telephone}}</td>
                                                                                            <td>{{item.TotalPassenger}}</td>
                                                                                            <td>{{item.PassengerPhone}}</td>
                                                                                            <td>{{item.VehicleNumber}}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </tbody>
                                                </table>
                                                <div class="col-md-12 text-center" ng-if="passengerPickupDropOffService.length == 0">
                                                    <h4>ไม่มีข้อมูล</h4>
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
    </div>
</div>