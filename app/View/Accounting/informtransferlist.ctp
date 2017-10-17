<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AccountingInformTransferCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Accounting Inform Transfer"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isInformationTransferActive == 0}">
                                    <a ng-click="globalVariable.isInformationTransferActive = 0;filterOptionSet('','','')">
                                        <i class="fa fa-bars" aria-hidden="true"></i> ทั้งหมด
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isInformationTransferActive == 1}">
                                    <a ng-click="globalVariable.isInformationTransferActive = 1;filterOptionSet('',false,false)">
                                        <i class="fa fa-clock-o" aria-hidden="true"></i> รอยืนยัน
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isInformationTransferActive == 2}">
                                    <a ng-click="globalVariable.isInformationTransferActive = 2;filterOptionSet('',true,false)">
                                        <i class="fa fa-check" aria-hidden="true"></i> ยืนยันชำระเงินแล้ว
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isInformationTransferActive == 3}">
                                    <a ng-click="globalVariable.isInformationTransferActive = 3;filterOptionSet('',false,true)">
                                        <i class="fa fa-times" aria-hidden="true"></i> ปฏิเสธการชำระเงิน
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane active">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-right" style="border-top-left-radius:0px;padding:10px">
                                            <h3 class="pull-left" style="color:#FFF;font-size:30px;">
                                                รายการแจ้งชำระเงิน
                                            </h3>
                                            <button class="btn btn-info" ng-style="{'visibility':(step.currentStep!=2?'hidden':'visible')}" ng-click="backToInformList(InformTransferDetail.InformMoneyTransferId)">กลับไปหน้ารายการ</button>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12" ng-show="step.currentStep == 1">
                                                <div class="col-md-12 no-padding">
                                                    <div class="col-md-5 no-padding">
                                                        <div class="col-md-10">
                                                            <label class="col-md-3 no-padding">วันที่ : </label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" ng-model="searchFilter.dateStart" id="dateStart" placeholder="วันที่เริ่มต้น" bs-datepicker="" data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true">
                                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                            <label class="col-md-3 no-padding">ถึง : </label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" ng-model="searchFilter.dateEnd" id="dateEnd" placeholder="วันที่สิ้นสุด" bs-datepicker="" data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true">
                                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateEnd" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 no-padding"><button style="height:70px" class="btn btn-primary btn-lg btn-block" ng-click="setDateFilter(searchFilter.dateStart, searchFilter.dateEnd)">ค้นหา</button></div>
                                                    </div>
                                                    <div class="col-md-7 text-right">
                                                        <div class="col-md-10 no-padding pull-right">
                                                            <div class="input-group" style="top: 2px;">
                                                                <div class="input-group-addon">
                                                                    <i class="fa fa-search"></i>
                                                                </div>
                                                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='today')}" ng-click="searchDateFilter('today')">วันนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='yesterday')}" ng-click="searchDateFilter('yesterday')">เมื่อวานนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='thismonth')}" ng-click="searchDateFilter('thismonth')">เดือนนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='lastmonth')}" ng-click="searchDateFilter('lastmonth')">เดือนที่ผ่านมา</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='all')}" ng-click="searchDateFilter('all')">ทั้งหมด</button>
                                                    </div>
                                                </div>
                                                <div class="navbar-form navbar-left">
                                                    <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="InformTransferList">
                                                    </div>    
                                                </div>
                                                <div lsw-table="lswTableOptions" ng-model="InformTransferList">
                                                    <script type="text/ng-template" id="theadTemplate.html">
                                                        <th class="col-md-1 cursor-point" ng-click="sort('InformMoneyTransactionId');">เลขที่แจ้ง</th>
                                                        <th class="col-md-1 cursor-point text-center" ng-click="sort('AviaAccountBankId');">ธนาคาร</th>
                                                        <th class="col-md-2 cursor-point" ng-click="sort('CreatedDate');">วัน เวลา ที่แจ้ง</th>
                                                        <th class="col-md-2 cursor-point" ng-click="sort('InformMoneyTransferDate');">วัน เวลา ที่โอนเงิน</th>
                                                        <th class="col-md-1 cursor-point" ng-click="sort('CreatedBy');">ชื่อผู้แจ้ง</th>
                                                        <th class="col-md-1 cursor-point text-right" ng-click="sort('InformMoneyTransferAmount');">จำนวนเงิน</th>
                                                        <th class="col-md-2 cursor-point" ng-click="sort('AccountingUserId');">สถานะการตรวจสอบ</th>
                                                        <th class="col-md-1 cursor-point text-right" ng-click="sort('InformMoneyTransferProofUploadId');">หลักฐานการชำระเงิน</th>
                                                        <th class="col-md-1"></th>
                                                    </script>
                                                    <script type="text/ng-template" id="tbodyTemplate.html">
                                                        <td>{{row.InformMoneyTransactionIdNumber}}</td>
                                                        <td align="center">
                                                            <div class="text-center" style="margin-right:5px; width:30px; background: {{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 5px;">
                                                                <span style="color:#FFFFFF" data-title="{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}}" bs-tooltip>
                                                                    <i class="bank bank-{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td><strong>{{(row.CreatedDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</strong></td>
                                                        <td><strong style="color:red"><u>{{(row.InformMoneyTransferDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</u></strong></td>
                                                        <td>{{row.CreatedBy || '-'}}</td>
                                                        <td align="right">{{(row.InformMoneyTransferAmount | number:2) || '-'}}</td>
                                                        <td>
                                                            <div lsw-display-status transaction="row" typedisplay="topup"></div>
                                                        </td>
                                                        <td align="center">
                                                            <a href="#" ng-if="row.InformMoneyTransferContentType == 'image/jpeg' || row.InformMoneyTransferContentType == 'image/png' || row.InformMoneyTransferContentType == 'image/gif'"  ng-click="parent.openLightboxModal(row.InformMoneyTransferFileUploadUrl)">
                                                                <i class="fa fa-search" aria-hidden="true"></i>
                                                            </a>
                                                        </td>
                                                        <td align="right">
                                                            <button 
                                                                class="btn btn-primary" 
                                                                ng-click="parent.editInformTransferById(row.InformMoneyTransferId)"
                                                                ng-disabled="(row.AccountingUserId != null && parent.userId != row.AccountingUserId) && (!row.IsConfirm) && (!row.IsReject)">
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> ตรวจสอบ
                                                            </button>
                                                        </td>
                                                    </script>
                                                </div>
                                            </div>
                                            <div class="col-md-12" ng-show="step.currentStep == 2">
                                                <h4><strong>ยืนยันการชำระเงิน</strong></h4><hr/>
                                                <div class="col-md-6 col-md-offset-3">
                                                    <table class="table table-bordered">
                                                        <tr>
                                                            <td align="center" colspan="2">
                                                                <div class="col-md-12" style="background: {{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: InformTransferDetail.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 5px;">
                                                                    <span style="font-size:64px; color:#FFFFFF">
                                                                        <i class="bank bank-{{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: InformTransferDetail.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                                                    </span>
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <strong style="font-size:36px;">{{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: InformTransferDetail.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}}</strong>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>วัน เวลา ที่โอน : </strong>
                                                            </td>
                                                            <td>
                                                                <strong style="color:red">{{(InformTransferDetail.InformMoneyTransferDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>รูปแบบการชำระเงิน : </strong>
                                                            </td>
                                                            <td>
                                                                <strong style="color:red;">{{InformTransferDetail.InformMoneyTransferType || '-'}}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>จำนวนเงิน : </strong>
                                                            </td>
                                                            <td>
                                                                <strong style="color:red;font-size:24px;">{{(InformTransferDetail.InformMoneyTransferAmount | number:2) || '-'}}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>หลักฐานการชำระเงิน : </strong>
                                                            </td>
                                                            <td>
                                                                <a href="#" ng-if="InformTransferDetail.InformMoneyTransferContentType == 'image/jpeg' || InformTransferDetail.InformMoneyTransferContentType == 'image/png' || InformTransferDetail.InformMoneyTransferContentType == 'image/gif'" class="thumbnail thumbnail-show" ng-click="openLightboxModal(InformTransferDetail.InformMoneyTransferFileUploadUrl)">
                                                                    <img ng-src="{{InformTransferDetail.InformMoneyTransferFileUploadUrl}}">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>หมายเหตุ : </strong>
                                                            </td>
                                                            <td>
                                                                {{InformTransferDetail.InformMoneyTransferNotes}}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-md-5" align="right">
                                                                <strong>เหตุผล (กรณียกเลิก) : </strong>
                                                            </td>
                                                            <td>
                                                                <textarea class="form-control" ng-model="InformTransferDetail.AccountingInformMoneyTransferNotes" rows="3" ng-disabled="InformTransferDetail.IsConfirm || InformTransferDetail.IsReject"></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2" align="center">
                                                                <div class="col-md-6 no-padding-left" ng-if="!InformTransferDetail.IsConfirm && !InformTransferDetail.IsReject">
                                                                    <button class="btn btn-danger btn-block btn-lg" ng-disabled="InformTransferDetail.AccountingInformMoneyTransferNotes == '' || InformTransferDetail.AccountingInformMoneyTransferNotes == null" ng-click="rejectInformTransfer()"><i class="fa fa-times" aria-hidden="true"></i> ปฏิเสธการชำระเงิน</button>
                                                                </div>
                                                                <div class="col-md-6 no-padding-right" ng-if="!InformTransferDetail.IsConfirm && !InformTransferDetail.IsReject">
                                                                    <button class="btn btn-success btn-block btn-lg" message-en="Are you sure to confirm this inform payment?" message-th="ยืนยันการชำระเงิน ใช่หรือไม่?" lsw-confirm-modal="confirmInformTransfer()"><i class="fa fa-check" aria-hidden="true"></i> ยืนยันการชำระเงิน</button>
                                                                </div>
                                                                <div class="col-md-12 no-padding" ng-if="InformTransferDetail.IsConfirm && !InformTransferDetail.IsReject">
                                                                    <button class="btn btn-success btn-block btn-lg"><i class="fa fa-check" aria-hidden="true"></i> ยืนยันการชำระเงินแล้ว</button>
                                                                </div>
                                                                <div class="col-md-12 no-padding" ng-if="!InformTransferDetail.IsConfirm && InformTransferDetail.IsReject">
                                                                    <button class="btn btn-danger btn-block btn-lg"><i class="fa fa-times" aria-hidden="true"></i> ปฏิเสธการชำระเงิน</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <button class="btn btn-primary btn-block btn-lg" ng-click="backToInformList(InformTransferDetail.InformMoneyTransferId)">กลับไปหน้ารายการ</button>
                                                            </td>
                                                        </tr>
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
            </div>
        </div>
    </div>
</div>