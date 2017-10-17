<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="AgencyCtrl" ng-init="DataSetting_init();">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency Setting"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencySettingActive == 0}">
                                    <a ng-click="globalVariable.isAgencySettingActive = 0;filterOptionSet('','','')">
                                        <i class="fa fa-university" aria-hidden="true"></i> ตั้งค่าบัญชีธนาคาร
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencySettingActive == 1}">
                                    <a ng-click="globalVariable.isAgencySettingActive = 1;filterOptionSet(1)">
                                        <i class="fa fa-cogs" aria-hidden="true"></i> ตั้งค่าราคาบัตรโดยสาร
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencySettingActive == 2}">
                                    <a ng-click="globalVariable.isAgencySettingActive = 2;filterOptionSet(2)">
                                        <i class="fa fa-newspaper-o" aria-hidden="true"></i> ตั้งค่ารูปแบบบัตรโดยสาร
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isAgencySettingActive == 0)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตั้งค่าบัญชีธนาคาร
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12 margin-top-10">
                                                <table class="table table-striped">
                                                    <tr>
                                                        <th class="col-md-2">ธนาคาร</th>
                                                        <th class="col-md-2">เลขบัญชี</th>
                                                        <th class="col-md-2">ประเภทบัญชี</th>
                                                        <th class="col-md-2">ชื่อบัญชี</th>
                                                        <th class="col-md-1">สาขา</th>
                                                        <th class="col-md-2">หมายเหตุ</th>
                                                        <th class="col-md-1"></th>
                                                    </tr>
                                                    <tr ng-repeat="accountBank in AgencyAccountBankList | filter: {IsActived : true}">
                                                        <td>
                                                            <div ng-if="!globalVariable.DataSetting_IsEdit">
                                                                {{(AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: accountBank.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName)}}
                                                            </div>
                                                            <div ng-if="globalVariable.DataSetting_IsEdit">
                                                                <select class="form-control" ng-model="accountBank.AccountBankTypeId" ng-options="o.AccountBankTypeId as o.AccountBankTypeName for o in AccountBankList">
                                                                    <option value="">กรุณาเลือกธนาคาร</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div ng-if="!accountBank.IsEdit">
                                                                {{accountBank.AccountBankNumber}}
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <input type="text" ng-model="accountBank.AccountBankNumber" class="form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div ng-if="!accountBank.IsEdit">
                                                                {{accountBank.AccountType}}
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <select ng-model="accountBank.AccountType" class="form-control">
                                                                    <option value="ออมทรัพย์">ออมทรัพย์</option>
                                                                    <option value="กระแสรายวัน">กระแสรายวัน</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div ng-if="!accountBank.IsEdit">
                                                                {{accountBank.AccountBankName}}
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <input type="text" ng-model="accountBank.AccountBankName" class="form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div ng-if="!accountBank.IsEdit">
                                                                {{accountBank.AccountBankBranch}}
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <input type="text" ng-model="accountBank.AccountBankBranch" class="form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div ng-if="!accountBank.IsEdit">
                                                                {{accountBank.AccountBankNotes}}
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <textarea ng-model="accountBank.AccountBankNotes" class="form-control"></textarea>
                                                            </div>
                                                        </td>
                                                        <td align="right">
                                                            <div ng-if="!accountBank.IsEdit">
                                                                <button class="btn btn-xs btn-warning" ng-click="accountBank.IsEdit = true">แก้ไข</button>
                                                                <button class="btn btn-xs btn-danger" message-en="Are you sure to delete this account?" message-th="ต้องการที่จะลบบัญชีธนาคารออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="DataSetting_RemoveBankAccount(accountBank.AccountBankId)">ลบ</button>
                                                            </div>
                                                            <div ng-if="accountBank.IsEdit">
                                                                <button 
                                                                    class="btn btn-xs btn-primary" 
                                                                    ng-click="DataSetting_SaveBankAccount(accountBank);globalVariable.DataSetting_IsEdit = false;"
                                                                    ng-disabled="accountBank.AccountBankTypeId == '' || accountBank.AccountBankNumber == '' || accountBank.AccountBankName == '' || accountBank.AccountBankBranch == '' || accountBank.AccountType == ''">บันทึก</button>
                                                                <button 
                                                                    class="btn btn-xs btn-danger" ng-click="globalVariable.DataSetting_IsEdit = false;accountBank.IsEdit = false;DataSetting_loadData();">ยกเลิก</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr ng-if="AgencyAccountBankList.length == 0">
                                                        <td colspan="7" align="center">
                                                            ไม่มีข้อมูล
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td colspan="7" align="center">
                                                            <button class="btn btn-primary" ng-click="DataSetting_addBankAccount()" ng-disabled="globalVariable.DataSetting_IsEdit;"><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มบัญชีธนาคาร</button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isAgencySettingActive == 1)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตั้งค่าราคาบัตรโดยสาร
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12 margin-top-10">
                                                <div class="col-md-12" ng-if="agencyPriceDetail.AgencyGradePriceId != '00000000-0000-0000-0000-000000000000'">
                                                    <table class="table table-hover table-condensed">
                                                        <thead>
                                                            <tr>
                                                                <th class="col-md-3 cursor-point">เส้นทาง</th>
                                                                <th class="col-md-2 cursor-point text-right">กำหนดราคา</th>
                                                                <th class="col-md-2 cursor-point">หน่วย<br/>(บาท/เปอร์เซ็นต์)</th>
                                                                <th class="col-md-5 cursor-point text-right"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr ng-repeat="item in agencyPricePerRoutesList">
                                                                <td>{{VehicleRoute[(VehicleRoute | lswIndexOf: { RouteId: item.RouteId } : 'RouteId')].RouteName_TH}}</td>
                                                                <td align="right">
                                                                    <div ng-if="!item.isEdit">
                                                                        <span ng-style="{'color':(item.PriceAgencySet >= 0?'green':'red')}">
                                                                            <strong>{{(item.PriceAgencySet || 0) | number:2}}</strong>
                                                                        </span>
                                                                    </div>
                                                                    <div ng-if="item.isEdit">
                                                                        <input type="text" class="form-control text-right" ng-model="item.PriceAgencySet" name="PriceAgencySet">
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div ng-if="!item.isEdit">
                                                                        {{item.IsPriceAgencyPercent?'%':'บาท'}}
                                                                    </div>
                                                                    <div ng-if="item.isEdit">
                                                                        <input type="checkbox" ng-model="item.IsPriceAgencyPercent" name="IsPriceAgencyPercent"> เปอร์เซ็นต์
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
                                                <div class="col-md-12" ng-if="agencyPriceDetail.AgencyGradePriceId == '00000000-0000-0000-0000-000000000000'">
                                                    <span class="danger">บัญชีของคุณไม่ได้เป็นบัญชีของเอเจนซี่ หากจะใช้งานในส่วนนี้ โปรดติดต่อผู้ดูแลระบบ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isAgencySettingActive == 2)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตั้งค่ารูปแบบบัตรโดยสาร
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12 margin-top-10">
                                                <div class="col-md-6 margin-top-10">
                                                    <strong>ตั้งค่า</strong><hr/>
                                                    <div class="form-horizontal">
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">ชื่อเอเจนซี่ : </label>
                                                            <div class="col-sm-9">
                                                                <input type="text" class="form-control" ng-model="DataSetting_Agency_Ticket_Setting.AgencyName" placeholder="ชื่อเอเจนซี่">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">สีตัวอักษร : </label>
                                                            <div class="col-sm-9">
                                                                <input colorpicker type="text" class="form-control" ng-model="DataSetting_Agency_Ticket_Setting.AgencyFontColor">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">โลโก้เอเจนซี่ : </label>
                                                            <div class="col-sm-9" ng-include="rootUrl + '../templates/Agency/Elements/logo-upload-element.html'"></div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">พื้นหลังตั๋วโดยสาร : </label>
                                                            <div class="col-sm-9" ng-include="rootUrl + '../templates/Agency/Elements/background-upload-element.html'"></div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">รูปแบบการแสดง : </label>
                                                            <div class="col-sm-9">
                                                                <input type="radio" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitleDisplay" value="0"> โลโก้
                                                                <input type="radio" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitleDisplay" value="1"> ตัวอักษร
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">ขนาดตัวอักษร : </label>
                                                            <div class="col-sm-9">
                                                               <input type="text" class="form-control" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitleFontSize" placeholder="ขนาดตัวอักษร" lsw-only-digits>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-sm-3 text-right">จัดรูปแบบ : </label>
                                                            <div class="col-sm-9">
                                                                <input type="radio" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitlePosition" value="0"> ซ้าย
                                                                <input type="radio" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitlePosition" value="1"> กลาง
                                                                <input type="radio" ng-model="DataSetting_Agency_Ticket_Setting.AgencyTitlePosition" value="2"> ขวา
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 text-right">
                                                        <button class="btn btn-primary" ng-click="UpdateAgencySetting()">บันทึกการตั้งค่า</button>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 margin-top-10">
                                                    <strong>ตัวอย่างตั๋ว</strong><hr/>
                                                    <div class="col-md-12">
                                                        <section style="margin:0px auto;width: 304px;border: 1px #000 solid;border-radius: 2px;padding-right: 5px" ng-include="rootUrl + '../templates/Agency/Elements/agency-ticket-sample-test.html'"></section>
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
</div>