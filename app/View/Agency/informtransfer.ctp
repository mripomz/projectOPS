<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="InformTransferCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Inform Transfer Topup"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12">
                            <h5><strong>รายการแจ้งชำระเงิน</strong></h5><hr/>
                            <div class="navbar-form navbar-left">
                                <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="InformTransferList">
                                </div>    
                            </div>
                            <div lsw-table="lswTableOptions" ng-model="InformTransferList">
                                <script type="text/ng-template" id="theadTemplate.html">
                                    <th class="col-md-1 cursor-point" ng-click="sort('TransactionId');">เลขที่แจ้ง</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('AviaAccountBankId');">ธนาคาร</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('InformMoneyTransferDate');">วัน เวลา ที่โอนเงิน</th>
                                    <th class="col-md-1 cursor-point" ng-click="sort('InformMoneyTransferAmount');">จำนวนเงิน</th>                                    
                                    <th class="col-md-2 cursor-point" ng-click="sort('IsComfirm');">สถานะ</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('UpdatedDate');">อัพเดทเมื่อ</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('InformMoneyTransferProofUploadId');">หลักฐานการชำระเงิน</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('InformMoneyTransferNotes');">หมายเหตุ</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('AccountingInformMoneyTransferNotes');">เหตุผล</th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.InformMoneyTransactionIdNumber}}</td>
                                    <td align="center">
                                    <div class="text-center" style="margin-right:5px; width:30px; background: {{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 5px;" data-title="{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}}" bs-tooltip>
                                            <span style="color:#FFFFFF">
                                                <i class="bank bank-{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td>{{(row.InformMoneyTransferDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</td>
                                    <td>{{(row.InformMoneyTransferAmount | number:2) || '-'}}</td>
                                    <td>
                                        <div lsw-display-status transaction="row" typedisplay="topup"></div>
                                    </td>
                                    <td>{{(row.UpdatedDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</td>
                                    <td align="center">
                                        <a href="#" ng-if="row.InformMoneyTransferContentType == 'image/jpeg' || row.InformMoneyTransferContentType == 'image/png' || row.InformMoneyTransferContentType == 'image/gif'"  ng-click="parent.openLightboxModal(row.InformMoneyTransferFileUploadUrl)">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td align="center">
                                        <button class="btn btn-link btn-block" data-title="{{row.InformMoneyTransferNotes || '-'}}" bs-tooltip>
                                            <i class="fa fa-file-text" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td align="center">
                                        <button class="btn btn-link btn-block" data-title="{{row.AccountingInformMoneyTransferNotes || '-'}}" bs-tooltip>
                                            <i class="fa fa-file-text" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </script>
                            </div>
                        </div>
                        <div class="col-md-12 margin-top-20">
                            <h5><strong>ส่งหลักฐานการชำระเงิน</strong></h5><hr/>
                            <div class="form-horizontal" ng-form="informTransfer">
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">เลือกธนาคาร : <span class="error" ng-show="informTransfer.AviaAccountBankId.$error.required">*</span></label>
                                    <div class="col-sm-10">
                                        <table class="table table-hover">
                                            <tr>
                                                <td></td>
                                                <td>ธนาคาร</td>
                                                <td>เลขที่บัญชี</td>
                                                <td>ชื่อบัญชี</td>
                                                <td>ประเภทบัญชี</td>
                                                <td>สาขา</td>
                                            </tr>
                                            <tr ng-repeat="account in AviaAccountBankList | filter: {IsActived : true}" ng-click="informDetail.AviaAccountBankId = account.AviaAccountBankId">
                                                <td align="center">
                                                    <input type="radio" name="AviaAccountBankId" ng-model="informDetail.AviaAccountBankId" value="{{account.AviaAccountBankId}}" required>
                                                </td>
                                                <td>
                                                    <div class="pull-left text-center" style="margin-right:5px; width:30px; background: {{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 5px;">
                                                        <span style="color:#FFFFFF">
                                                            <i class="bank bank-{{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                                        </span>
                                                    </div>
                                                    <div class="pull-left">
                                                        {{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}}
                                                    </div>
                                                </td>
                                                    <td>{{account.AccountBankNumber}}</td>
                                                    <td>{{account.AccountBankName}}</td>
                                                    <td>{{account.AccountType}}</td>
                                                    <td>{{account.AccountBankBranch}}</td>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">วัน เวลา ที่โอนเงิน : <span class="error" ng-show="informTransfer.InformMoneyTransferDate.$error.required">*</span></label>
                                    <div class="col-sm-6">
                                        <div class="col-sm-8 no-padding">
                                            <div class="input-group">
                                                <input type="text no-padding" class="form-control" name="InformMoneyTransferDate" id="InformMoneyTransferDate" placeholder="เลือกวันที่" ng-model="informDetail.InformMoneyTransferDate" bs-datepicker data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" autoclose="true" required>
                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="InformMoneyTransferDate" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="input-group">
                                                <input type="text" ng-model="informDetail.InformMoneyTransferDate" id="timeStart" class="form-control" placeholder="เวลา" data-time-format="HH:mm" data-minute-step="1" bs-timepicker required data-autoclose="true">
                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="InformMoneyTransferDate" class="input-group-addon"><i class="fa fa-clock-o" aria-hidden="true"></i></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">รูปแบบการชำระเงิน : <span class="error" ng-show="informTransfer.dateTimeTransfer.$error.required">*</span></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" ng-model="informDetail.InformMoneyTransferType">
                                            <option value="โอนเงินออนไลน์">โอนเงินออนไลน์</option>
                                            <option value="โอนเงินสด">โอนเงินสด</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">จำนวนเงิน : <span class="error" ng-show="informTransfer.InformMoneyTransferAmount.$error.required || informDetail.InformMoneyTransferAmount == 0">*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" name="InformMoneyTransferAmount" class="form-control" ng-model="informDetail.InformMoneyTransferAmount" lsw-only-digits required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">หลักฐานการชำระเงิน : <span class="error" ng-show="informDetail.InformMoneyTransferProofUploadId == null">*</span></label>
                                    <div class="col-sm-10" ng-include="rootUrl + '../templates/Agency/Elements/inform-transfer-upload-element.html'"></div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">หมายเหตุ : <span class="error" ng-show="informTransfer.dateTimeTransfer.$error.required">*</span></label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" ng-model="informDetail.InformMoneyTransferNotes" rows="5"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-2"></div>
                                    <div class="col-sm-4">
                                        <button class="btn btn-primary" 
                                            ng-click="sendInformTransfer()" 
                                            ng-disabled="informDetail.AviaAccountBankId == '' || informDetail.AviaAccountBankId == null || informDetail.InformMoneyTransferDate == '' || informDetail.InformMoneyTransferDate == null || informDetail.InformMoneyTransferType == '' || informDetail.InformMoneyTransferProofUploadId == null || informDetail.InformMoneyTransferAmount == 0"><i class="fa fa-floppy-o" aria-hidden="true"></i> แจ้งการชำระเงิน</button>
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