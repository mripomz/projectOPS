<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content" ng-controller="TaxInsuranceCtrl" ng-init="initData(1);SellingName = '<?php echo $userDetail->Name;?>'">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading" style="padding-bottom: 20px">
        				<h2><?php echo __("ReportAct"); ?></h2>
        			</div>
                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                            <h3 style="color:#FFF;font-size:30px;">
                                รายงานการ พ.ร.บ
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="col-md-12">
                                <div ng-include="rootUrl + '../templates/Reports/TaxAndInsurance/ReportAct.html'">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>