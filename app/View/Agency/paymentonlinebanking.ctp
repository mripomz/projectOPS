<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="PaymentController" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2>ผลการโอนเงินผ่านธนาคารออนไลน์</h2>
                    </div>
                   
                    <div class="panel-body" >
                        <div class="col-md-6 col-md-offset-3">
                            <div class="panel panel-primary">
                                <div class="panel-heading text-center">
                                    <h2 class="title">ผลการซำระเงิน</h2>
                                </div>
                                <div class="panel-body" >

                                    <div class="col-md-12" name="step2Section" >
                                        <div class="col-md-12">
                                            <div class="col-md-12 center">
                                               <h3 class="no-padding" style="text-align: center">
                                                    <strong style="color: black">
                                                        ผลการซำระเงิน :
                                                    </strong > 
                                                    <strong ng-if = "resultTransferBanking.result == '00'" style="color: green">
                                                     การโอนเงินสำเร็จ   
                                                    </strong > 
                                                    <strong ng-if = "resultTransferBanking.result == '99'" style="color: red">
                                                     การโอนเงินไม่สำเร็จ   
                                                    </strong >
                                                    <strong ng-if = "resultTransferBanking.result == '02'" style="color: yellow">
                                                     การโอนเงินอยู่ระหว่างดำเนินการ  
                                                    </strong >
                                                </h3> 
                                               <h4 class="no-padding" ng-if = "resultTransferBanking.result == '00'">
                                                    <strong style="color: black">
                                                        จำนวนเงิน :
                                                    </strong>
                                                    <strong style="color: green">
                                                     
                                                        {{resultTransferBanking.amt}} บาท  
                                                    </strong>
                                                </h4> 
                                                <h4 class="no-padding" ng-if = "resultTransferBanking.result == '00'">
                                                    <strong style="color: black">
                                                        ค่าธรรมเนียมโอนเงิน :
                                                    </strong>
                                                    <strong style="color: red">
                                                    
                                                     {{resultTransferBanking.fee}} บาท
                                                     </strong>
                                                </h4> 
                                                <h4 class="no-padding" ng-if = "resultTransferBanking.result == '00'">
                                                    <strong style="color: black">
                                                        ผลรวมจำนวนเงินที่โอน :
                                                    </strong>
                                                    <strong style="color: green">
                                                        {{resultTransferBanking.sum}} บาท
                                                    </strong>
                                                </h4> 
                                                
                                                
                                        
                                            
                                            </div>
                                          
                                            <div class="col-md-12">
                                                
                                                <div class="col-md-12 no-padding">
                                                    <a href="http://localhost:8080/avia-website/agency/history">
                                                        <buttom ng-click="step.currentStep = 1" class="btn btn-primary btn-block">
                                                            ดูประวัติการเงิน
                                                        </buttom>
                                                    </a>
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