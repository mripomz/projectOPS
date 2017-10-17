<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="TopUpCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency Topup"); ?></h2>
                    </div>
                   
                    <div class="panel-body" ng-if="IsPayment">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="panel panel-primary">
                                <div class="panel-heading text-center">
                                    <h2 class="title">ช่องทางการชำระเงิน</h2>
                                </div>
                                <!-- <div class="col-md-12"  ng-if="step.currentStep == 2&&topUpChoose == 'eBanking'">
                                        <iframe  src="{{url}}" ></iframe> 
                                        <div ng-include="https://www.google.co.th"></div>  
                                       <!--  <div ng-include src="www.w3schools.com"></div> 
                                </div> -->
                                <div class="panel-body" >
                                    <div class="col-md-12" name="step1Section" ng-if="step.currentStep == 1">
                                        <div class="col-md-12">
                                            <input type="radio" name="topUpChoose" ng-change="changeTopUp('transfer')" ng-model="topUpChoose" value="transfer"> โอนเงินเข้าบัญชีธนาคาร<br/>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="radio" name="topUpChoose" ng-change="changeTopUp('eBanking')" ng-model="topUpChoose" value="eBanking" > ธนาคารออนไลน์
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <input type="radio" name="topUpChoose" ng-change="changeTopUp('omiseCredit')" ng-model="topUpChoose" value="eBanking" > omise
                                        </div> -->
                                        <div class="col-md-12 margin-top-20">
                                            <button class="btn btn-block btn-primary" ng-disabled="topUpChoose == null || topUpChoose == ''" ng-click="step.currentStep = 2">ถัดไป</button>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-12" name="step2Section" ng-if="step.currentStep == 2&&topUpChoose== 'transfer'">
                                        <div class="col-md-12" ng-if="topUpChoose == 'transfer'">
                                            <h4><strong>ช่องทางการชำระเงิน :</strong> โอนเงินเข้าบัญชีธนาคาร</h4><hr/>
                                            <p class="text-center">
                                                คุณสามารถเลือกนำฝากหรือโอนเงินเข้าสู่บัญชีธนาคารด้านล่าง<br/>
                                                หลังจากโอนเงินเรียบร้อยแล้ว คุณสามารถยืนยันผ่านระบบออนไลน์ได้ทันที
                                            </p>
                                            <div class="col-md-12">
                                                <table class="table table-bordered table-hover">
                                                    <tr ng-repeat="account in AviaAccountBankList | filter: {IsActived : true}">
                                                        <td>
                                                            <div class="col-md-4 no-pading" style="text-align: center;background: {{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeColor}};border-radius: 20px;">
                                                                <span style="font-size:90px;color:#FFFFFF">
                                                                    <i class="bank bank-{{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeLogo}}"></i>
                                                                </span>
                                                            </div>
                                                            <div class="col-md-8 no-pading">
                                                                <strong>ธนาคาร :</strong> {{AccountBankList[(AccountBankList | lswIndexOf: { AccountBankTypeId: account.AccountBankTypeId } : 'AccountBankTypeId')].AccountBankTypeName}} <br/>
                                                                <strong>เลขที่บัญชี :</strong> {{account.AccountBankNumber}} <br/>
                                                                <strong>ชื่อบัญชี :</strong> {{account.AccountBankName}} <br/>
                                                                <strong>ประเภท :</strong> {{account.AccountType}} <br/>
                                                                <strong>สาขา :</strong> {{account.AccountBankBranch}}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div class="col-md-12 no-padding">
                                                    <div class="col-md-4 no-padding">
                                                    <buttom ng-click="step.currentStep = 1" class="btn btn-primary btn-block">กลับ</buttom>
                                                    </div>
                                                    <div class="col-md-8 no-padding-right">
                                                        <a href="<?php echo Router::url('/agency/informtransfer');?>" class="btn btn-primary btn-block">แจ้งชำระเงิน</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == '711'">
                                            
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == 'eBanking'">
                                            axasdasd
                                        </div>
                                    </div>

                                    <div class="col-md-12" name="step2Section" ng-if="step.currentStep == 2&&topUpChoose== 'eBanking'">
                                        <div class="col-md-12" >
                                            <h4><strong>ช่องทางการชำระเงิน :</strong> ธนาคารออนไลน์</h4><hr/>
                                            <p class="text-center">
                                                คุณสามารถเลือกนำฝากหรือโอนเงินเข้าสู่บัญชีธนาคารออนไลน์<br/>
                                                ผ่านระบบpaysbuy 
                                                
                                            </p>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="amt">จำนวนเงินที่ต้องการโอน</label>
                                                    <input type="number" ng-model="PaymentBaking.amt" class="form-control" id="amt">
                                                </div>
                                                    
                                                <div class="col-md-12 no-padding">
                                                    <div class="col-md-6 no-padding">
                                                        <buttom ng-click="step.currentStep = 1" class="btn btn-primary btn-block">กลับ</buttom>
                                                    </div>
                                                    <div class="col-md-6 no-padding-right">
                                                        <buttom ng-click="PaymentGetway()" ng-disabled = "PaymentBaking.amt< 1" class="btn btn-primary btn-block">ชำระเงิน</buttom>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == '711'">
                                            
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == 'eBanking'">
                                            
                                        </div>
                                    </div>
                                     <div class="col-md-12" name="step2Section" ng-if="step.currentStep == 2&&topUpChoose== 'omise'">
                                    guhhiu
                                     </div>
                                    <div class="col-md-12" name="step2Section" ng-if="step.currentStep == 2&&topUpChoose== 'omise'">
                                        <div class="col-md-12" >
                                            <h4><strong>ช่องทางการชำระเงิน :</strong> ธนาคารออนไลน์</h4><hr/>
                                            <p class="text-center">
                                                คุณสามารถเลือกนำฝากหรือโอนเงินเข้าสู่บัญชีธนาคารออนไลน์<br/>
                                                ผ่านระบบpaysbuy 
                                                
                                            </p>
                                            <div class="col-md-12">

                                                      <div class="panel-body" ng-include="rootUrl + '../templates/Agency/Elements/omise-payment.html'"></div>

                                                    
                                                
                                            </div>
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == '711'">
                                            
                                        </div>
                                        <div class="col-md-12" ng-if="topUpChoose == 'eBanking'">
                                            
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