<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="WithDrawalCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency Withdrawal"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12">
                            <h5><strong>รายการแจ้งถอนเงิน</strong></h5><hr/>
                            <div class="navbar-form navbar-left">
                                <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="WithdrawalList">
                                </div>    
                            </div>
                            <div lsw-table="lswTableOptions" ng-model="WithdrawalList">
                                <script type="text/ng-template" id="theadTemplate.html">
                                    <th class="col-md-1 cursor-point" ng-click="sort('WithdrawalCreditTransactionId');">เลขที่แจ้ง</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('AccountBankTypeId');">ธนาคาร</th>
                                    <th class="col-md-1 cursor-point text-right" ng-click="sort('InformMoneyTransferAmount');">จำนวนเงิน</th>                                    
                                    <th class="col-md-1 cursor-point" ng-click="sort('IsComfirm');">สถานะ</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('UpdatedDate');">อัพเดทเมื่อ</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('InformMoneyTransferDate');">วัน เวลา ที่โอนเงิน</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('InformMoneyTransferProofUploadId');">หลักฐาน<br/>การโอนเงิน</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('WithdrawalCreditNotes');">หมายเหตุ</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('AccountingInformMoneyTransferNotes');">เหตุผล</th>
                                    <th></th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.WithdrawalCreditTransactionIdNumber}}</td>
                                    <td align="center">
                                        <div class="text-center" style="margin-right:5px; width:30px; background: {{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 5px;" data-title="{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}}" bs-tooltip>
                                            <span style="color:#FFFFFF">
                                                <i class="bank bank-{{parent.AccountBankList[(parent.AccountBankList | lswIndexOf: { AccountBankTypeId: row.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                            </span>
                                        </div>
                                    </td>
                                    <td align="right">{{(row.WithdrawalCreditAmount | number:2) || '-'}}</td>
                                    <td>
                                        <div lsw-display-status transaction="row" typedisplay="withdrawal"></div>
                                    </td>
                                    <td>{{(row.UpdatedDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</td>
                                    <td>{{(row.WithdrawalTransferDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</td>
                                    <td align="center">
                                        <a href="#" ng-if="row.WithdrawalCreditContentType == 'image/jpeg' || row.WithdrawalCreditContentType == 'image/png' || row.WithdrawalCreditContentType == 'image/gif'"  ng-click="parent.openLightboxModal(row.WithdrawalCreditFileUploadUrl)">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        </a>
                                        {{row.WithdrawalCreditFileUploadId==null?'-':''}}
                                    </td>
                                    <td align="center">
                                        <button class="btn btn-link btn-block" data-title="{{row.WithdrawalCreditNotes || '-'}}" bs-tooltip>
                                            <i class="fa fa-file-text" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td align="center">
                                        <button class="btn btn-link btn-block" data-title="{{row.AccountingWithdrawalCreditNotes || '-'}}" bs-tooltip>
                                            <i class="fa fa-file-text" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td align="right">
                                        <button class="btn btn-xs btn-danger" ng-disabled="row.WithdrawalCreditStatus != 1"  message-en="Are you sure to cancel withdrawal?" message-th="ต้องการที่จะยกเลิกการถอนเงินนี้ ใช่หรือไม่?" lsw-confirm-modal="parent.cancelWithdrawalCreditRequest(row.WithdrawalCreditId)"><i class="fa fa-times" aria-hidden="true"></i> ยกเลิก</button>
                                    </td>
                                </script>
                            </div>
                        </div>
                        <div class="col-md-12 margin-top-20">
                            <h5><strong>แจ้งถอนเงิน</strong></h5><hr/>
                            <div class="form-horizontal" ng-form="withdrawalCredit">
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">จำนวนเครดิตที่มีในระบบ : </label>
                                    <div class="col-sm-10">
                                        <span style="font-size:26px;color:green"><strong><u>{{(AgencyCredit.AgencyCreditPoint) | number:2}}</u></strong></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">จำนวนเครดิตที่ยืม : </label>
                                    <div class="col-sm-10">
                                        <span style="font-size:26px;color:red"><strong><u>{{(AgencyCredit.AgencyCreditBorrow) | number:2}}</u></strong></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">จำนวนเครดิตที่ถอนได้ : </label>
                                    <div class="col-sm-10">
                                        <span style="font-size:26px;color:blue">
                                            <strong>
                                                <u>{{(((AgencyCredit.AgencyCreditPoint - AgencyCredit.AgencyCreditBorrow)<0)?(0):(AgencyCredit.AgencyCreditPoint - AgencyCredit.AgencyCreditBorrow)) | number:2}}</u>
                                            </strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">เลือกธนาคาร : <span class="error" ng-show="withdrawalCredit.AccountBankId.$error.required">*</span>
                                    <br/>
                                        <a class="btn btn-xs btn-primary" ng-href="{{rootSiteUrl + 'agency/setting'}}">เพิ่มบัญชีธนาคาร</a>
                                    </label>
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
                                            <tr ng-repeat="account in AgencyAccountBankList | filter: {IsActived : true}" ng-click="withdrawalCreditDetail.AccountBankId = account.AccountBankId">
                                                <td align="center">
                                                    <input type="radio" name="AccountBankId" ng-model="withdrawalCreditDetail.AccountBankId" value="{{account.AccountBankId}}" required>
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
                                    <label for="dateStart" class="col-sm-2 control-label">จำนวนเงินที่ต้องการถอน : <span class="error" ng-show="withdrawalCredit.WithdrawalCreditAmount.$error.required || withdrawalCreditDetail.WithdrawalCreditAmount == 0">*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" name="WithdrawalCreditAmount" class="form-control" ng-model="withdrawalCreditDetail.WithdrawalCreditAmount" lsw-only-digits required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dateStart" class="col-sm-2 control-label">หมายเหตุ : </label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" ng-model="withdrawalCreditDetail.WithdrawalCreditNotes" rows="5"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-2"></div>
                                    <div class="col-sm-10" style="color:red">*หลังจากเจ้าหน้าที่ตรวจสอบแล้วจะทำการตัดเงินในบัญชี และดำเนินการภายใน 7 - 10 วัน</div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-2"></div>
                                    <div class="col-sm-4">
                                        <button class="btn btn-primary" 
                                            ng-click="sendWithdrawal()" 
                                            ng-disabled="(AgencyCredit.AgencyCreditPoint - AgencyCredit.AgencyCreditBorrow) < withdrawalCreditDetail.WithdrawalCreditAmount || withdrawalCreditDetail.AccountBankId == '' || withdrawalCreditDetail.AccountBankId == null || withdrawalCreditDetail.WithdrawalCreditAmount == 0"><i class="fa fa-floppy-o" aria-hidden="true"></i> แจ้งการถอนเงิน</button>
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