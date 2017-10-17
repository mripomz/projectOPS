<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AccountingWithdrawalCtrl" ng-init="initData();searchDateFilter('today');">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Accounting Withdrawal"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 0}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 0;filterOptionSet('','')">
                                        <i class="fa fa-bars" aria-hidden="true"></i> ทั้งหมด
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 1}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 1;filterOptionSet('',1)">
                                        <i class="fa fa-clock-o" aria-hidden="true"></i> รอตรวจสอบ
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 2}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 2;filterOptionSet('',2)">
                                        <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> กำลังดำเนินการ
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 3}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 3;filterOptionSet('',3)">
                                        <i class="fa fa-times" aria-hidden="true"></i> ปฏิเสธการถอนเงิน
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 4}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 4;filterOptionSet('',0)">
                                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ยกเลิกรายการ
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isWithdrawalCreditActive == 5}">
                                    <a ng-click="globalVariable.isWithdrawalCreditActive = 5;filterOptionSet('',4)">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i> เสร็จสิ้น
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane active">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-right" style="border-top-left-radius:0px;padding:10px">
                                            <h3 class="pull-left" style="color:#FFF;font-size:30px;">
                                                รายการแจ้งถอนเงิน
                                            </h3>
                                            <button class="btn btn-info" ng-style="{'visibility':(step.currentStep==1?'hidden':'visible')}" ng-click="backToWithdrawalList(WithdrawalCreditDetail.InformMoneyTransferId)">กลับไปหน้ารายการ</button>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12" ng-show="step.currentStep == 1" ng-include="rootUrl + '../templates/Accounting/withdrawal-list.html'"></div>
                                            <div class="col-md-12" ng-show="step.currentStep == 2" ng-include="rootUrl + '../templates/Accounting/withdrawal-accounting-action.html'"></div>
                                            <div class="col-md-12" ng-show="step.currentStep == 3" ng-include="rootUrl + '../templates/Accounting/withdrawal-accounting-action-step2.html'"></div>
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