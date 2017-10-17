<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="AgencyBookingCtrl" ng-init="initData(<?php echo $userDetail->UserId;?>)">
    <div class="sidebar left sidebar-size-3 sidebar-offset-0 sidebar-skin-blue sidebar-visible-desktop sidebar-visible-mobile" id="sidebar-menu" data-type="collapse">
        <div class="split-vertical">
            <div class="split-vertical-body">
                <ul class="nav nav-tabs" style="overflow: hidden; outline: none;" tabindex="0">
                  <li><a href="#sidebar-tabs-menu" data-toggle="tab"><i class="fa fa-bars"></i></a></li>
                  <li class="active"><a href="#sidebar-tabs-ticket" data-toggle="tab"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
                <button class="btn btn-danger btn-lg btn-block text-left" ng-if="IsAgencyRole">
                    <i class="fa fa-money" aria-hidden="true"></i> เครดิต : {{(AgencyCredit.AgencyCreditPoint || 0) | number:2}} บาท<br/>
                    <i class="fa fa-credit-card" aria-hidden="true"></i> ยืมเครดิต : {{(AgencyCredit.AgencyCreditBorrow || 0) | number:2}} บาท
                </button>
                <div class="split-vertical-cell">
                    <div class="tab-content">
                        <div class="tab-pane" id="sidebar-tabs-menu">
                            <div data-scrollable="" tabindex="2" style="outline: none;">
                                <ul class="sidebar-menu sm-active-item-bg">
                                    <li  ng-class="{'hasSubmenu':level1.ChildPageController.length > 0, 'open' : level1.openTab,active : (currentURL == (rootSiteUrl + level1.ControllerActionPath))}" ng-repeat="level1 in globalMenu.SearchResults">

                                        <!--//LINK LEVEL 1-->
                                        <a class="mouse-pointer header-menu" ng-click="openURL(rootSiteUrl + level1.ControllerActionPath)" ng-if="level1.ParentPageControllerId == 0 && level1.ControllerActionPath != '/'">
                                            <span><i class="fa fa-th"></i> {{level1.MenuName}}</span>
                                        </a>

                                        <!--//HEADER LEVEL 1-->
                                        <a 
                                        class="mouse-pointer header-menu" 
                                        ng-if="level1.ChildPageController.length != 0" 
                                        ng-class="{ 'active' : level1.headActive }"
                                        ng-click="level1.openTab = !level1.openTab">
                                            <span><i class="fa fa-dot-circle-o"></i> {{level1.MenuName}}</span>
                                        </a>
                                       <ul class="collapse" ng-if="level1.ChildPageController.length > 0" ng-class="{in : level1.openTab}">
                                            <li 
                                            ng-repeat="level2 in level1.ChildPageController"
                                            ng-class="{active : (currentURL == (rootSiteUrl + level2.ControllerActionPath))}"
                                            ng-init="(currentURL == (rootSiteUrl + level2.ControllerActionPath))?(level1.openTab = level1.headActive = true):''"
                                            ng-if="level2.ControllerActionPath != 'pages/pagesmanagement'"
                                            style="background-color: #354c5f;" >
                                                <a class="mouse-pointer" ng-click="openURL(rootSiteUrl + level2.ControllerActionPath)">
                                                    <i class="fa fa-chevron-circle-right"></i> {{level2.MenuName}}
                                                </a>
                                            </li>
                                        </ul> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tab-pane active" id="sidebar-tabs-ticket">
                            <div class="col-xs-12 form-horizontal">
                                <h4 style="color:#FFF" class="mouse-pointer">
                                    ขายบัตรโดยสาร
                                </h4>
                                <div ng-class="{'fadeIn animated' : isShowFilter, 'fadeOut animated hide' : !isShowFilter}">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" name="dateStart" class="form-control" ng-model="searchFilter.dateStart" placeholder="วันที่เริ่มต้น" bs-datepicker data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true" data-placement="bottom" data-min-date="{{minDate}}">
                                            <label style="background-color: #eb9316;border-color: #eb9316;" for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-5 no-padding">
                                            <input type="text" class="form-control" ng-model="searchFilter.timeStart" id="timeStart" placeholder="เวลาเริ่มต้น" data-time-type="string" data-placement="right" data-minute-step="1" bs-timepicker data-autoclose="true">
                                        </div>
                                        <div class="col-md-2 text-center"><strong style="color:#FFF">-</strong></div>
                                        <div class="col-md-5 no-padding">
                                            <input type="text" class="form-control" ng-model="searchFilter.timeEnd" id="timeEnd" placeholder="เวลาสิ้นสุด" data-time-type="string" data-placement="right" data-minute-step="1" bs-timepicker data-autoclose="true">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control" ng-model="searchFilter.RouteId" id="vehicleRoute" ng-options="o.RouteId as o.RouteName_TH for o in VehicleRoute">
                                                <option value="">เส้นทางทั้งหมด</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-8 no-padding">
                                            <select class="form-control" ng-model="searchFilter.VehicleSeatPlanId" name="VehicleSeatPlanId" ng-options="o.VehicleSeatPlanId as o.VehicleSeatPlanName for o in VehicleSeatPlanList" required>
                                                <option value="">ผังรถทั้งหมด</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 no-padding-right" style="margin-top: 2px;">
                                            <button class="btn btn-primary btn-block" ng-click="searchRouteTrip(searchFilter)"><i class="fa fa-search" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button 
                                        style="color:#FFF;font-size: 24px;"
                                        ng-style="{'border-bottom':(isShowFilter?'1px #7E7E7E solid':''),'border-top':(!isShowFilter?'1px #7E7E7E solid':'')}"
                                        class="btn btn-link btn-block" 
                                        ng-click="changedisShowFilter();">
                                        <i ng-class="{'fa fa-angle-up':isShowFilter,'fa fa-angle-down':!isShowFilter}"></i>
                                    </button>

                                </div>
                                
                            </div>
                            <div class="clearfix"></div>
                            <div style="overflow: hidden;">
                                <div class="col-md-12 no-padding" id="ticketSeller" style="width: 267px;position: inherit;">
                                    <div class="text-center margin-bottom-10">
                                        <span style="color:#FFF">
                                            {{dateSearchValue | date:'EEEE dd MMMM yyyy'}}
                                        </span>
                                    </div>
                                    <table 
                                        class="vehicleTrip table table-condensed" 
                                        style="background-color: inherit;color:#FFF;margin-bottom: 0px;"
                                        ng-repeat="operation in VehicleOperationList track by $index">
                                        <tr class="primary">
                                            <th colspan="5">
                                            {{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: operation.RouteId } : 'RouteId')].RouteMainNumber}}-{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: operation.RouteId } : 'RouteId')].RouteNumber}} {{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: operation.RouteId } : 'RouteId')].RouteName_TH}} 
                                            </th>
                                        </tr>
                                        <tr ng-repeat="row in operation.VehicleOperationList track by $index">
                                            <td width="25" align="center" ng-class="{'tableactive':(VehicleOperationSeats.VehicleOperationId == row.VehicleOperationId)}" style="vertical-align : middle;">
                                                    <!-- <i class="fa fa-circle" aria-hidden="true"></i> -->
                                                    <div class="circleBaseOnline" ng-style="{'background-color':(row.IsOnline?'green':'red')}"></div>
                                            </td>
                                            <td class="cursor-point" ng-click="!IsAgencyRole || selectVehicleTrip(row)" ng-class="{'tableactive':(VehicleOperationSeats.VehicleOperationId == row.VehicleOperationId)}">
                                                {{row.VehicleOperationDate | jsonDate:'HH:mm'}} 
                                                <span style="font-size: 14px">
                                                    {{row.VehicleSeatPlanName}}
                                                </span>
                                            </td>
                                            <td width="20" align="center" style="color:#000" class="active">{{row.SeatAmount - row.Book - row.Sold}}</td>
                                            <td width="20" align="center" class="danger">{{row.Book}}</td>
                                            <td width="20" align="center" class="success">{{row.Sold}}</td>
                                        </tr>
                                    </table>
                                    <div class="text-center" ng-if="VehicleOperationList.length == 0">
                                        <hr/>
                                        <span style="color:#FFF">ไม่มีข้อมูล</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="st-content" id="content">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency Booking"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div ng-if="!globalVariable.isSelectVehicleTrip">
                            <h5><strong>***โปรดเลือกเที่ยวรถเพื่อ ขายบัตรโดยสาร***</strong></h5>
                            <h6><span class="danger" ng-if="!IsAgencyRole"><strong>แจ้งให้ทราบ : ส่วนขายบัตรโดยสารี้เปิดให้ใช้ได้เฉพาะเอเจนซีเท่านั้น</strong></span>
                        </div>
                        <div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding" ng-if="globalVariable.isSelectVehicleTrip" ng-init="SellingName = '<?php echo $userDetail->Name;?>'" >
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.IsSellingTicketActive == 0}">
                                    <a ng-click="globalVariable.IsSellingTicketActive = 0">
                                        <i class="fa fa-money" aria-hidden="true"></i> ขาย ที่นั่ง
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.IsSellingTicketActive == 1}">
                                    <a ng-click="globalVariable.IsSellingTicketActive = 1;loadSellingTicketList()">
                                        <i class="fa fa-file-text-o" aria-hidden="true"></i> ข้อมูลการขาย
                                    </a>
                                </li>
                                <!-- <li class="cursor-point" ng-class="{'active' : globalVariable.IsSellingTicketActive == 2}">
                                    <a ng-click="globalVariable.IsSellingTicketActive = 2;loadSummaryReport();">
                                        <i class="fa fa-print" aria-hidden="true"></i> พิมพ์ตั๋ว
                                    </a>
                                </li> -->
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane" ng-class="{'active' : globalVariable.IsSellingTicketActive == 0}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                {{globalVariable.titlePrimary}}
                                            </h3>
                                        </div>
                                        <div class="panel-body" ng-include="rootUrl + '../templates/Agency/agency-selling-ticket-template.html'"></div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active' : globalVariable.IsSellingTicketActive == 1}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                {{globalVariable.titlePrimary}}
                                            </h3>
                                        </div>
                                        <div class="panel-body" ng-include="rootUrl + '../templates/Agency/agency-selling-ticket-report.html'"></div>
                                    </div>
                                </div>
                                <!-- <div class="tab-pane" ng-class="{'active' : globalVariable.IsSellingTicketActive == 2}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                {{globalVariable.titlePrimary}}
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="panel-body" ng-include="rootUrl + '../templates/Agency/agency-selling-ticket-print.html'"></div>
                                        </div>
                                    </div>
                                </div> -->
                               
 <div id="ticketPrint" class="hide">
        <table  border="0" cellspacing="0" cellpadding="0" 
                                    style="width:8cm;height:13cm;margin-left:1px;background-size:100%;background-image:{{('url(' + DataSetting_Agency_Ticket_Setting.AgencyBackgroundFileUploadUrl + ')' || 'none')}}" ng-style="{'color':(DataSetting_Agency_Ticket_Setting.AgencyFontColor || '#000000')}">
                                        <tbody>
                                             <tr>
                                                <td colspan="3" style="height:1.0cm;">
                                                    <div   style="left: 5cm;margin-top: 3mm;float: right" id="qrcode">
                                                    </div>

                                                </td>
                                                
                                            </tr>
                                            <tr>
                                            
                                                <td colspan="3" style="height:1.0cm;border-bottom: 1px #000 solid;" align="{{DataSetting_Agency_Ticket_Setting.AgencyTitlePosition == 0?'left':(DataSetting_Agency_Ticket_Setting.AgencyTitlePosition == 1?'center':'right')}}">
 
                                                    
                                                    <img  ng-if="DataSetting_Agency_Ticket_Setting.AgencyTitleDisplay == 0" ng-src="{{DataSetting_Agency_Ticket_Setting.AgencyLogoFileUploadUrl || (rootUrl + '../img/default-ticket-logo.png')}}" >
                                                    <span ng-if="DataSetting_Agency_Ticket_Setting.AgencyTitleDisplay == 1" ng-style="{'font-size':DataSetting_Agency_Ticket_Setting.AgencyTitleFontSize}">
                                                    <strong>{{DataSetting_Agency_Ticket_Setting.AgencyName || 'ตั๋วโดยสาร AviaBooking'}}</strong>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr valign="top" style="height:5mm">
                                                <td align="center">
                                                    <strong style="font-size:18px">ใบรับฝากชำระ</strong>
                                                </td>
                                            </tr>
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellspacing="0" cellpadding="0" style="width:100%" ng-style="{'color':(DataSetting_Agency_Ticket_Setting.AgencyFontColor || '#000000')}">
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">วันที่</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">วันที่ DATE</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" style="width:4cm;">
                                                                <strong>
                                                                    {{globalVariable.currentVehicleOpreDetail.VehicleOperationDate | jsonDateTHAI:'DD MMMM YYYY'}} {{RouteProviceList[(RouteProviceList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].Time | date:'HH:mm'}}
                                                                </strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong>
                                                                    {{globalVariable.currentVehicleOpreDetail.VehicleOperationDate | jsonDateEN:'DD MMM YYYY'}} {{RouteProviceList[(RouteProviceList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].Time | date:'HH:mm'}}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">ชื่อผู้โดยสาร</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">NAME</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" colspan="3">
                                                                <strong id="passenger_center">{{PassengerDetail.PassengerFirstName}} {{PassengerDetail.PassengerLastName}}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 15px;">
                                                            <td class="ticket-head" style="width:4cm;">จาก FROM</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ถึง TO</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 21px;font-size: 28px;font-weight: bolder;">
                                                            <td style="width:4cm;">
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontThaiSize,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].StopPointName_TH}}
                                                                </span>
                                                                <br/>
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontEngSize,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].StopPointName_EN}}
                                                                </span>
                                                            </td>
                                                            <td style="width:1cm;" align="center"><i class="fa fa-chevron-right" aria-hidden="true"></i></td>
                                                            <td style="width:3cm;">
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontThaiSize,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointEndId } : 'StopPointId')].StopPointName_TH}}
                                                                </span>
                                                                <br/>
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontEngSize,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointEndId } : 'StopPointId')].StopPointName_EN}}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;line-height: 12px;">รถเบอร์<br/>Bus No.</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr style="height:8mm;">
                                                                        <td class="ticket-head" style="width:0.8cm;line-height: 12px;">ที่นั่ง<br/>SEAT No.</td>
                                                                        <td style="width:0.1cm;">&nbsp;</td>
                                                                        <td class="ticket-head" style="width:1.0cm;line-height: 12px;">ชานชาลา<br/>Platform No.</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm;">
                                                            <td style="width:4cm;">
                                                                <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                    <div style="height:37px;">
                                                                        <strong style="margin-left: 5px;color:#FFF;font-size: 26px;">
                                                                            {{globalVariable.currentVehicleOpreDetail.VehicleNumber || '-'}}
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr style="height:5mm;">
                                                                        <td style="width:0.8cm;">
                                                                            <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div style="height:37px;word-break: break-all;">
                                                                                    <strong style="margin-left: 5px;color:#FFF;font-size: 26px;" id="seat_no">2A</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width:0.1cm;">&nbsp;</td>
                                                                        <td style="width:1.0cm;">
                                                                            <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div 
                                                                                    ng-style="{
                                                                                        'font-size':globalVariable.fontTerminalName,
                                                                                        'line-height':globalVariable.fontTerminalNameLineHeight
                                                                                    }"
                                                                                    style="height:37px;word-break: break-all;">
                                                                                    <strong style="margin-left: 1px;color:#FFF;">{{TerminalName || '-'}}</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">รวมสุทธิ Total.</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ผู้ดำเนินการ</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td style="width:4cm;">
                                                                <strong style="line-height: 16px;font-size: 24px;" id="totalPrice_center">150</strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong>{{SellingName}}</strong>
                                                            </td>
                                                        </tr>
                                                       <!--  <tr>
                                                            <td colspan="3">
                                                                <table>
                                                                <tr>
                                                                 <td style="width:4cm;"></td>
                                                                 <td style="width:6cm;">
                                                                    <div   id="qrcode">
                                                                </td>
                                                                 <td style="width:1cm;"></td>
                                                                </tr>
                                                                </table>

                                                              </div>  
                                                              </div>  
                                                            </td>
                                                        </tr> -->
                                                        <tr style="height:5mm;">
                                                            <td colspan="3">
                                                                <strong class="ticket-term-title">Terms and Conditions</strong>
                                                                <div class="ticket-term-detail">
                                                                1.กรณีที่ซื้อบัตรโดยสารแล้วไม่สามารถเดินทางได้ตามกำหนด กรุณาติดต่อพนักงานขายตั๋วก่อนเวลารถออก 2 ชม. เพื่อเลื่อนการเดินทางหรือคืนตั๋วโดยสาร มิฉะนั้นจะถือว่าสละสิทธิ์ Payment made are not refundable<br/>
                                                                2.กรณีคืนบัตรโดยสารหรือเลื่อนการเดินทาง จะมีค่าธรรมเนียม 30 บาททุกที่นั่ง The fare for changing the time or date of traveling are THB30 per seat.<br/>
                                                                3.นำสัมภาระติดตัวระหว่างเดินทางคนละไม่เกิน 2 ชั้น น้ำหนักรวมไม่เกิน 15 กก. หากสูญหายบริษัทฯ จะชดใช้ตามส่วน โดยไม่เกิน 500 บาท ของมีค่าควรนำติดตัวขึ้นไปบนรถ กรณีของที่ท่านนำติดตัวขึ้นไปบนรถทางบริษัทจะไม่รับผิดชอบไม่ว่ากรณีใดๆ เพราะอยู่ในความรับผิดชอบของผู้โดยสาร Valueable and Fragile Goods should be carried by the passenger. If passengers checked in such items as baggage, passengers agree they send for carriage of such items at their own risk.<br/>
                                                                4.กรณีรถเกิดอุบัติเหตุ ทางบริษัทเดินรถจะรับผิดชอบตามพระราชบัญญัติคุ้มครองผู้ประสบภัยจากรถ พ.ศ.2535 เท่านั้น In case of fault of accident, the operating company will be responsible for Victims Protection Act of 2535 only.
                                                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>









 <div id="pickupDropoffticketPrint"   ng-init="disableTagButton={'visibility': 'hidden'}" ng-init="initData()" class="hide">

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

                                                            <td  style="width:2cm;"><strong style="font-size:18px">บริการส่ง</strong></td>
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
                                                            <td style="width:2cm;"><strong style="font-size:18px">บริการรับ</strong></td>
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
