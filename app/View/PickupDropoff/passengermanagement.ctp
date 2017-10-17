<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="PassengerServiceCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Passenger Management"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="tab-pane">
                            <div class="panel panel-primary" style="border-radius:0px; margin-bottom: 0px;">
                                <div class="panel-heading" style="border-radius:0px;padding:5px">
                                    <h5 style="color:#FFF;"><strong>1. เลือกผู้โดยสาร</strong></h5>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-12 no-padding">
                                        <div class="col-md-10 col-md-offset-1">
                                            <label for="searchPassenger" class="col-md-3 text-right">ค้นหาผู้โดยสาร : </label>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" ng-model="searchFilter.wordSearch" data-animation="am-flip-x" bs-options="o as o.ReferenceCode + ' ' + o.VehicleSeatName + ' ' + o.PassengerFirstName + ' ' + o.PassengerLastName for o in searchPassenger($viewValue)" placeholder="รหัสการจอง/ชื่อ, เบอร์โทรศัพท์, ชื่อ" data-placement="bottom" bs-typeahead data-min-length="2"/>
                                            </div>
                                            <div class="col-md-12">
                                                <span class="col-md-3"></span>
                                                <span class="danger">**เฉพาะผู้โดยสารที่เดินทางวันนี้เป็นต้นไป</span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <hr/>
                                        <div class="col-md-8 col-md-offset-2">
                                            <table class="col-md-12">
                                                <tr>
                                                    <th class="text-center" colspan="4">
                                                        <span>ข้อมูลเบื้องต้นของผู้โดยสาร</span>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td align="right" class="col-md-3"><strong>รหัสการจอง : </strong></td>
                                                    <td>{{PassengerDetail.ReferenceCode || '-'}}</td>
                                                    <td align="right" class="col-md-3"><strong>เที่ยวรถ :  </strong></td>
                                                    <td>{{PassengerDetail.RouteName_TH || '-'}}</td>
                                                </tr>
                                                <tr>
                                                    <td align="right" class="col-md-3"><strong>ชื่อ-นามสกุล :  </strong></td>
                                                    <td>{{PassengerDetail.PassengerFirstName + ' ' + PassengerDetail.PassengerLastName}}</td>
                                                    <td align="right" class="col-md-3"><strong>วันเวลาเดินทาง :  </strong></td>
                                                    <td>{{PassengerDetail.VehicleOperationDate | jsonDate:'dd MMMM yyyy HH:mm น.'}}</td>
                                                </tr>
                                                <tr>
                                                    <td align="right" class="col-md-3"><strong>เบอร์โทรศัพท์ :  </strong></td>
                                                    <td>{{PassengerDetail.PassengerPhone || '-'}}</td>
                                                    <td align="right" class="col-md-3"><strong>เบอร์รถ :  </strong></td>
                                                    <td>{{PassengerDetail.VehicleNumber || '-'}}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane">
                            <div class="panel panel-primary" style="border-radius:0px; margin-bottom: 0px;">
                                <div class="panel-heading" style="border-radius:0px;padding:5px">
                                    <h5 style="color:#FFF;"><strong>2. เลือกจุดรับ-ส่ง / เวลา</strong></h5>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-12 no-padding fadeIn animated" ng-if="globalVariable.stepOneFinish">
                                        <!-- PICKUP -->
                                        <div class="col-md-6" style="border-right: 1px solid #ccc">
                                            <div class="col-md-12 text-center">
                                                <input type="checkbox" ng-model="globalVariable.isChoosePickup" id="pickupService" ng-disabled="PickupDropOffServicesPickup.length == 0" ng-change="checkStepTwo()">
                                                <label class="cursor-point" for="pickupService" style="font-size: 26px">บริการรถรับ (Pickup)</label>
                                            </div>
                                            <div class="clearfix"></div>
                                            <hr/>
                                            <div ng-if="globalVariable.isChoosePickup">
                                                <div class="col-md-8 no-padding">
                                                    <div class="col-md-12 no-padding margin-bottom-10">
                                                        <label class="col-md-5 text-right" for="dropoffService">ค้นหาสถานที่ :</label>
                                                        <div class="col-md-7 no-padding">
                                                            <input type="text" placeholder="ชื่อสถานที่" class="form-control" data-animation="am-flip-x" ng-model="searchFilter.pickupSearch" ng-disabled="!globalVariable.isChoosePickup || PickupDropOffServicesPickup.length == 0" bs-options="o as o.LocationName for o in locationList" bs-typeahead data-min-length="2">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <ui-gmap-google-map center='maps.pickup.center' zoom='maps.pickup.zoom' options="{draggable : globalVariable.isChoosePickup, scrollwheel : globalVariable.isChoosePickup, clickableIcons:false}">
                                                        <ui-gmap-markers models="pickupMarkers" coords="'self'" icon="'icon'" click="onClick">
                                                            <ui-gmap-windows ng-show="show"><div ng-non-bindable>{{title}}</div></ui-gmap-windows>
                                                        </ui-gmap-markers>
                                                    </ui-gmap-google-map>
                                                    <div class="clearfix"></div><hr/>
                                                    <div class="margin-top-10">
                                                        <div class="col-md-5 no-padding text-center">
                                                            <i class="fa fa-home" aria-hidden="true"></i><br/>
                                                            {{locationList[(locationList | lswIndexOf: {LocationId: PickupPassengers.LocationId} : 'LocationId')].LocationName}}
                                                        </div>
                                                        <div class="col-md-2 no-padding text-center">
                                                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                        </div>
                                                        <div class="col-md-5 no-padding text-center">
                                                            <i class="fa fa-bus" aria-hidden="true"></i><br/>
                                                            {{StopPointList[(StopPointList | lswIndexOf: {StopPointId: (PickupDropOffServicesPickup[(PickupDropOffServicesPickup | lswIndexOf: { PickupDropOffServiceId: PickupPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].StopPointId)} : 'StopPointId')].StopPointName_TH}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="margin-bottom-10">
                                                        <input type="text" ng-model="PickupPassengers.RoomNumber" placeholder="เลขห้องผู้โดยสาร" class="form-control" ng-disabled="!globalVariable.isChoosePickup || PickupDropOffServicesPickup.length == 0">
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <table class="table table-bordered">
                                                        <tr class="primary">
                                                            <th class="text-center"><strong style="color:#FFF">เวลารับ</strong></th>
                                                        </tr>
                                                        <tr class="cursor-point" ng-repeat="item in PickupDropOffServicesPickup" ng-click="globalVariable.isChoosePickup?selectPickupDropOffService(item.PickupDropOffServiceId, 'pickUp'):''" ng-class="(PickupPassengers.PickupDropOffServiceId == item.PickupDropOffServiceId?'info':'')">
                                                            <td align="center">{{(item.TimeService | jsonDate:'HH:mm น.') + ' เหลือ ' + (item.PickupDropOffServiceMaxLimit - item.PickupDropOffServiceUsages) + ' ที่นั่ง'}}</td>
                                                        </tr>
                                                        <tr ng-if="PickupDropOffServicesPickup.length == 0">
                                                            <td align="center">ไม่มีเที่ยวรถบริการ</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- DROPOFF -->
                                        <div class="col-md-6">
                                            <div class="col-md-12 text-center">
                                                <input type="checkbox" ng-model="globalVariable.isChooseDropoff" id="dropoffService" ng-disabled="PickupDropOffServicesDropoff.length == 0" ng-change="checkStepTwo()">
                                                <label class="cursor-point" for="dropoffService" style="font-size: 26px">บริการรถส่ง (Drop Off)</label>
                                            </div>
                                            <div class="clearfix"></div>
                                            <hr/>
                                            <div ng-if="globalVariable.isChooseDropoff">
                                                <div class="col-md-8 no-padding">
                                                    <div class="col-md-12 no-padding margin-bottom-10">
                                                        <label class="col-md-5 text-right" for="dropoffService">ค้นหาสถานที่ :</label>
                                                        <div class="col-md-7 no-padding">
                                                            <input type="text" placeholder="ชื่อสถานที่" class="form-control" data-animation="am-flip-x" ng-model="searchFilter.dropoffSearch" ng-disabled="!globalVariable.isChooseDropoff || PickupDropOffServicesDropoff.length == 0" bs-options="o as o.LocationName for o in locationList" bs-typeahead data-min-length="2">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <ui-gmap-google-map center='maps.dropoff.center' zoom='maps.dropoff.zoom' options="{draggable : globalVariable.isChooseDropoff, scrollwheel : globalVariable.isChooseDropoff, clickableIcons:false}">
                                                        <ui-gmap-markers models="dropoffMarkers" coords="'self'" icon="'icon'" click="onClick">
                                                            <ui-gmap-windows ng-show="show"><div ng-non-bindable>{{title}}</div></ui-gmap-windows>
                                                        </ui-gmap-markers>
                                                    </ui-gmap-google-map>
                                                    <div class="clearfix"></div><hr/>
                                                    <div class="margin-top-10">
                                                        <div class="col-md-5 no-padding text-center">
                                                            <i class="fa fa-bus" aria-hidden="true"></i><br/>
                                                            {{StopPointList[(StopPointList | lswIndexOf: {StopPointId: (PickupDropOffServicesDropoff[(PickupDropOffServicesDropoff | lswIndexOf: { PickupDropOffServiceId: DropOffPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].StopPointId)} : 'StopPointId')].StopPointName_TH}}
                                                        </div>
                                                        <div class="col-md-2 no-padding text-center">
                                                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                        </div>
                                                        <div class="col-md-5 no-padding text-center">
                                                            <i class="fa fa-home" aria-hidden="true"></i><br/>
                                                            {{locationList[(locationList | lswIndexOf: {LocationId: DropOffPassengers.LocationId} : 'LocationId')].LocationName}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="margin-bottom-10">
                                                        <input type="text" ng-model="DropOffPassengers.RoomNumber" placeholder="เลขห้องผู้โดยสาร" class="form-control" ng-disabled="!globalVariable.isChooseDropoff || PickupDropOffServicesDropoff.length == 0">
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <table class="table table-bordered">
                                                        <tr class="primary">
                                                            <th class="text-center"><strong style="color:#FFF">เวลารับ</strong></th>
                                                        </tr>
                                                        <tr class="cursor-point" ng-repeat="item in PickupDropOffServicesDropoff" ng-click="globalVariable.isChooseDropoff?selectPickupDropOffService(item.PickupDropOffServiceId, 'dropOff'):''" ng-class="(DropOffPassengers.PickupDropOffServiceId == item.PickupDropOffServiceId?'info':'')">
                                                            <td align="center">{{(item.TimeService | jsonDate:'HH:mm น.') + ' เหลือ ' + (item.PickupDropOffServiceMaxLimit - item.PickupDropOffServiceUsages) + ' ที่นั่ง'}}</td>
                                                        </tr>
                                                        <tr ng-if="PickupDropOffServicesDropoff.length == 0">
                                                            <td align="center">ไม่มีเที่ยวรถบริการ</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 no-padding text-center" ng-if="!globalVariable.stepOneFinish">
                                        โปรดทำขั้นตอนที่ 1 เลือกผู้โดยสารก่อน
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane">
                            <div class="panel panel-primary" style="border-radius:0px; margin-bottom: 0px;">
                                <div class="panel-heading" style="border-radius:0px;padding:5px">
                                    <h5 style="color:#FFF;"><strong>3. ชำระเงิน</strong></h5>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-12 no-padding fadeIn animated" ng-if="globalVariable.stepTwoFinish">
                                        <div class="col-md-6 col-md-offset-3">
                                            <table class="table table-bordered">
                                                <tbody ng-if="globalVariable.isChoosePickup">
                                                    <tr class="active"><!--FOR PICKUP-->
                                                        <th colspan="4">บริการรถรับ (Pickup)</th>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">รายละเอียด : </td>
                                                        <td colspan="3">
                                                            รับจาก <strong>{{locationList[(locationList | lswIndexOf: {LocationId: PickupPassengers.LocationId} : 'LocationId')].LocationName}}</strong> ไปส่งที่ 
                                                            <strong>{{StopPointList[(StopPointList | lswIndexOf: {StopPointId: (PickupDropOffServicesPickup[(PickupDropOffServicesPickup | lswIndexOf: { PickupDropOffServiceId: PickupPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].StopPointId)} : 'StopPointId')].StopPointName_TH}}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">เวลา : </td>
                                                        <td align="right">
                                                            <strong>{{(PickupDropOffServicesPickup[(PickupDropOffServicesPickup | lswIndexOf: { PickupDropOffServiceId: PickupPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].TimeService) | jsonDate:'HH:mm น.'}}</strong>
                                                        </td>
                                                        <td class="col-md-3" align="right">ระยะทาง : </td>
                                                        <td align="right">
                                                            <strong>{{PickupPassengers.DistanceKM | number:2}}</strong> กม.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">ราคา : </td>
                                                        <td colspan="3" align="right">
                                                            <strong>{{PickupPassengers.PickupDropOffPassengerPrice | number:2}}</strong> บาท
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody ng-if="globalVariable.isChooseDropoff">
                                                    <tr class="active"><!--FOR DROP OFF-->
                                                        <th colspan="4">บริการรถส่ง (Drop Off)</th>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">รายละเอียด : </td>
                                                        <td colspan="3">
                                                            รับจาก <strong>{{StopPointList[(StopPointList | lswIndexOf: {StopPointId: (PickupDropOffServicesDropoff[(PickupDropOffServicesDropoff | lswIndexOf: { PickupDropOffServiceId: DropOffPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].StopPointId)} : 'StopPointId')].StopPointName_TH}}</strong> ไปส่งที่ 
                                                            <strong>{{locationList[(locationList | lswIndexOf: {LocationId: DropOffPassengers.LocationId} : 'LocationId')].LocationName}}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">เวลา : </td>
                                                        <td align="right">
                                                            <strong>{{(PickupDropOffServicesDropoff[(PickupDropOffServicesDropoff | lswIndexOf: { PickupDropOffServiceId: DropOffPassengers.PickupDropOffServiceId } : 'PickupDropOffServiceId')].TimeService) | jsonDate:'HH:mm น.'}}</strong>
                                                        </td>
                                                        <td class="col-md-3" align="right">ระยะทาง : </td>
                                                        <td align="right">
                                                            <strong>{{DropOffPassengers.DistanceKM | number:2}}</strong> กม.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="col-md-3" align="right">ราคา : </td>
                                                        <td colspan="3" align="right">
                                                            <strong>{{DropOffPassengers.PickupDropOffPassengerPrice | number:2}}</strong> บาท
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tr class="active"><!--FOR Payment-->
                                                    <th colspan="4">การชำระเงิน (Pickup)</th>
                                                </tr>
                                                <tr>
                                                    <td class="col-md-3" align="right">ชำระด้วย : </td>
                                                    <td colspan="3">
                                                        <div class="payment-method payment-select text-center">
                                                            <span style="font-size: 26px">
                                                                <i class="fa fa-money" aria-hidden="true"></i>
                                                            </span>
                                                            <strong>เงินสด</strong>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="col-md-3" align="right">รวมทั้งหมด : </td>
                                                    <td colspan="3" align="right">
                                                        <strong style="font-size: 24px; color: #3498DB"><u>{{(PickupPassengers.PickupDropOffPassengerPrice + DropOffPassengers.PickupDropOffPassengerPrice) | number:2}}</u></strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="col-md-3" align="right">รับเงิน : </td>
                                                    <td colspan="3" align="right">
                                                       <input type="text" style="color:green; font-size:24px" ng-model="globalVariable.MoneyRecived" class="form-control text-right" placeholder="จำนวนเงิน(บาท)" lsw-only-digits>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="col-md-3" align="right">ทอนเงิน : </td>
                                                    <td colspan="3" align="right">
                                                        <strong style="font-size: 24px; color: red">
                                                            {{((globalVariable.MoneyRecived - (PickupPassengers.PickupDropOffPassengerPrice + DropOffPassengers.PickupDropOffPassengerPrice)>0?(globalVariable.MoneyRecived - (PickupPassengers.PickupDropOffPassengerPrice + DropOffPassengers.PickupDropOffPassengerPrice)):0)) | number:2}}
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </table>
                                                <button message-en="Are you sure to save?" message-th="คุณต้องการบันทึก ใช่หรือไม่?" lsw-confirm-modal="savePickupDropOffPassenger()" class="btn btn-primary btn-block">ยืนยันทำรายการ</button>
                                        </div>
                                    </div>
                                    <div class="col-md-12 no-padding fadeIn animated text-center" ng-if="!globalVariable.stepTwoFinish">
                                        โปรดทำขั้นตอนที่ 2 เลือกจุดรับ-ส่ง / เวลา
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

  <div id="ticketPrint" ng-controller="PassengerServiceCtrl" 
  ng-init="disableTagButton={'visibility': 'hidden'}" ng-init="initData()" class="hide">

                                    <table border="0"  cellspacing="0" cellpadding="0" style="width:8cm;height:16cm; " >
                                        <tbody>
                                            <tr>
                                                <td colspan="3" style="height:1.5cm;border-bottom: 1px #000 solid;" align="center">
                                                    <img src="../img/AviaLogoTicket.png" style="height: 2.5cm;"/>
                                                </td>
                                            </tr>
                                            <tr valign="top" style="height:5mm">
                                                <td align="center">
                                                    <strong style="font-size:18px">ใบรับฝากชำระบริการรภรับขส่ง</strong>
                                                </td>
                                            </tr>
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">วันที่</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">วันที่ DATE</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" style="width:4cm;">
                                                                <strong id = "dropoffDrivingTime_TH" >
                                                                   
                                                                </strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong id = "dropoffDrivingTime_ENG" >
                                                                   
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr  style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">ชื่อผู้โดยสาร</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">NAME</td>
                                                        </tr>
                                                        
                                                        <tr  style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" style="width:4cm;">
                                                                <strong id ="fullname_th">
                                                                
                                                                </strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong id ="fullname_EN">
                                                                    
                                                                </strong>
                                                            </td>
                                                        </tr>

                                                        <tr style="height:2mm; line-height: 0px;">
                                                        </tr>
                                                            
                                                          

                                                         <tr  id ="pickupview" style="height:5mm; line-height: 0px;visibility:hidden;">
                                                            <td class="ticket-detail" style="width:3cm;">
                                                              
                                                            </td>

                                                            <td  style="width:3cm;"><strong style="font-size:18px">บริการส่ง</strong></td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                
                                                            </td>
                                                        </tr>
                                                      
                                                        <tr id ="pickupview1" style="height:5mm; line-height: 20px;visibility:hidden;">
                                                            <td class="ticket-head" style="width:4cm;">จาก FROM</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ถึง TO</td>
                                                        </tr>
                                                    
                                                        <tr id ="pickupview2" style="height:5mm; line-height: 21px;font-size: 28px;font-weight: bolder;visibility:hidden;">
                                                            <td style="width:6cm;">
                                                                <span id ="pickupLocation_TH" ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                  
                                                                </span>
                                                                <br/>
                                                                <span id ="pickupLocation_ENG" ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    
                                                                </span>
                                                            </td>
                                                            <td style="width:1cm;" align="center"><i class="fa fa-chevron-right" aria-hidden="true"></i></td>
                                                            <td style="width:6cm;">
                                                                <span id ="pickStopPoint_TH" ng-style="{
                                                                    'font-size':20,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                               
                                                                    
                                                                </span>
                                                                <br/>
                                                                <span  id ="pickStopPoint_ENG" ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                               
                                                                  
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr id ="pickupview3" style="height:5mm; line-height: 0px;visibility:hidden;">
                                                            <td class="ticket-head"  align="right"style="width:4cm;line-height: 12px;">
                                                            เลขทะเบียนรถ
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td align="left" style="width:3cm;">
                                                               เวลาออก
                                                            </td>
                                                        </tr>
                                                        <tr id ="pickupview4" style="height:5mm;visibility:hidden;">
                                                            <td align="right" style="width:1cm;">
                                                                <div style="width:50%;background:url('../img/background-black.png') repeat-x;">
                                                                    <div style="height:37px;">
                                                                        <strong id ="pickupPlateNumber" style="margin-left: 5px;color:#FFF;font-size: 26px;">
                                                                            
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr align="left" style="height:5mm;">
                                                                        <td style="width:1.2cm;">
                                                                            <div style="width:50%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div style="height:37px;word-break: break-all;">
                                                                                    <strong id = "pickupDrivingTime" style="margin-left: 5px;color:#FFF;font-size: 26px;" id="seat_no">8:00 น.</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        
                                                                       
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>

                                                        <tr id = "dropoffview" style="height:2mm; line-height: 0px;visibility:hidden;">
                                                        </tr>

                                                       
                                                        <tr id = "dropoffview1" style="height:5mm; line-height: 0px;visibility:hidden;">
                                                            <td class="ticket-detail" style="width:3cm;">
                                                              
                                                            </td>
                                                            <td style="width:3cm;"><strong style="font-size:18px">บริการรับ</strong></td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                
                                                            </td>
                                                        </tr>
                                                      
                                                        <tr id = "dropoffview2" style="height:5mm; line-height: 20px;visibility:hidden;">
                                                            <td class="ticket-head" style="width:4cm;">จาก FROM</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ถึง TO</td>
                                                        </tr>
                                                    
                                                        <tr id = "dropoffview3" style="height:5mm; line-height: 21px;font-size: 28px;font-weight: bolder;visibility:hidden;">
                                                            <td style="width:6cm;">
                                                                <span id ="dropoffStopPoint_TH" ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                   ขนส่งอาเขต
                                                                </span>
                                                                <br/>
                                                                <span id ="dropoffStopPoint_ENG" ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    Arcade Bus Station
                                                                </span>
                                                            </td>
                                                            <td style="width:1cm;" align="center"><i class="fa fa-chevron-right" aria-hidden="true"></i></td>
                                                            <td style="width:6cm;">
                                                                <span id = "dropoffLocation_TH" ng-style="{
                                                                    'font-size':20,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                    ขนส่งอาเขต
                                                                </span>
                                                                <br/>
                                                                <span id = "dropoffLocation_ENG"  ng-style="{
                                                                    'font-size':18,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                  Arcade Bus Station
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr id = "dropoffview4" style="height:5mm; line-height: 0px;visibility:hidden;">
                                                            <td class="ticket-head"  align="right"style="width:4cm;line-height: 12px;">
                                                            เลขทะเบียนรถ
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td align="left" style="width:3cm;">
                                                               เวลาออก
                                                            </td>
                                                        </tr>
                                                        <tr id = "dropoffview5" style="height:5mm;visibility:hidden;">
                                                            <td align="right" style="width:1cm;">
                                                                <div style="width:50%;background:url('../img/background-black.png') repeat-x;">
                                                                    <div style="height:37px;">
                                                                        <strong id = "dropoffPlateNumber" style="margin-left: 5px;color:#FFF;font-size: 26px;">
                                                                            กข-1234
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr align="left" style="height:5mm;">
                                                                        <td style="width:1.2cm;">
                                                                            <div style="width:50%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div style="height:37px;word-break: break-all;">
                                                                                    <strong id ="dropoffDrivingTime" style="margin-left: 5px;color:#FFF;font-size: 26px;" id="seat_no">8:00 น.</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        
                                                                       
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>





                                                        <tr  style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">รวมสุทธิ Total.</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ผู้ดำเนินการ</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td style="width:4cm;">
                                                                <strong style="line-height: 16px;font-size: 24px;" id="totalPrice"></strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong id ="OperatorBy" ></strong>
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr style="height:5mm;">
                                                            <td align="center" colspan="3">
                                                                <strong class="ticket-information">For more infomation please contact</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" colspan="3" >
                                                                <div style="background:url('../img/background-black.png') repeat-x; color:#FFF;    padding-bottom: 5px;padding-top: 5px;">
                                                                    <strong style="font-size: 36px;line-height: 18px;">aviabooking.net</strong>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td align="center" colspan="3">
                                                                <strong style="font-size: 22px;line-height: 0px;">info.aviabooking@gmail.com</strong>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                           