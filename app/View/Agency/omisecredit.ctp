
<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" >
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency Topup"); ?></h2>
                    </div>
                   
                    <div class="panel-body" >
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
                                <div class="col-md-6 col-md-offset-3">
                                    <form action="http://localhost:2879/Agencies/createCharge" style="text-align: center" method="post" id="checkout">
                                        <div id="token_errors"></div>

                                                          <input type="hidden"  class="form-control" name="omise_token">

                                                          <div>
                                                            Name<br>
                                                            <input type="text"   class="form-control" data-omise="holder_name">
                                                          </div>
                                                          <div>
                                                            Number<br>
                                                            <input type="text" class="form-control" data-omise="number">
                                                          </div>
                                                          <div>
                                                            Date<br>
                                                            <input type="text" class="form-control" data-omise="expiration_month" size="4"> /
                                                            <input type="text" class="form-control" data-omise="expiration_year" size="8">
                                                          </div>
                                                          <div>
                                                            Security Code<br>
                                                            <input type="text" class="form-control" data-omise="security_code" size="8">
                                                          </div>

                                                          <input type="submit" id="create_token">
                                                        </form>
                                    
                                                       </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
</div>
























