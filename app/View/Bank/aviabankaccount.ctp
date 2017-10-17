<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AviaBankCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Bank Account Management"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12 margin-top-10">
                            <h4>เพิ่ม / ลบ บัญชีธนาคาร</h4><hr/>
                            <table class="table table-striped">
                                <tr>
                                    <th class="col-md-3">ธนาคาร</th>
                                    <th class="col-md-2">เลขบัญชี</th>
                                    <th class="col-md-2">ประเภทบัญชี</th>
                                    <th class="col-md-2">ชื่อบัญชี</th>
                                    <th class="col-md-2">สาขา</th>
                                    <th class="col-md-1"></th>
                                </tr>
                                <tr ng-repeat="accountBank in AviaAccountBankList">
                                    <td>
                                        <div ng-if="!globalVariable.IsEdit">
                                            {{(AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: accountBank.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName)}}
                                        </div>
                                        <div ng-if="globalVariable.IsEdit">
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
                                    <td align="right">
                                        <div ng-if="!accountBank.IsEdit">
                                            <button class="btn btn-xs btn-warning" ng-click="globalVariable.IsEdit = true; accountBank.IsEdit = true">แก้ไข</button>
                                            <button class="btn btn-xs btn-danger" message-en="Are you sure to delete this account?" message-th="ต้องการที่จะลบบัญชีธนาคารออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removeAviaAccount(accountBank.AviaAccountBankId)">ลบ</button>
                                        </div>
                                        <div ng-if="accountBank.IsEdit">
                                            <button 
                                                class="btn btn-xs btn-primary" 
                                                ng-click="updateAviaAccount(accountBank);globalVariable.IsEdit = false;"
                                                ng-disabled="accountBank.AccountBankTypeId == '' || accountBank.AccountBankNumber == '' || accountBank.AccountBankName == '' || accountBank.AccountBankBranch == '' || accountBank.AccountType == ''">บันทึก</button>
                                            <button 
                                                class="btn btn-xs btn-danger" ng-click="globalVariable.IsEdit = false;accountBank.IsEdit = false;initData();">ยกเลิก</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr ng-if="AviaAccountBankList.length == 0">
                                    <td colspan="7" align="center">
                                        ไม่มีข้อมูล
                                    </td> 
                                </tr>
                                <tr>
                                    <td colspan="7" align="center">
                                        <button class="btn btn-primary" ng-click="addAviaBankAccount()" ng-disabled="globalVariable.IsEdit;"><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มบัญชีธนาคาร</button>
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