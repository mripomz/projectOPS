<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="TaxInsuranceCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
		<div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2><?php echo __("Reports"); ?></h2>
        			</div>
  					<div class="panel-body" ng-init="SellingName = '<?php echo $userDetail->Name;?>'">
  						<div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 0}">
                                    <a ng-click="globalVariable.isReportTypeActive = 0;filterOptionSet('','','');resetReport()">
                                        <i class="fa fa-calendar" aria-hidden="true"></i> ตรวจสอบวันครบกำหนดภาษี
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 1}">
                                    <a ng-click="globalVariable.isReportTypeActive = 1;filterOptionSet('','','');resetReport()">
                                        <i class="fa fa-exchange" aria-hidden="true"></i> ตรวจสอบเดือนที่ครบกำหนดตรวจสภาพกลางปี
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 2}">
                                    <a ng-click="globalVariable.isReportTypeActive = 2;filterOptionSet('','','');resetReport();generateReportVehicleAct()">
                                        <i class="fa fa-exchange" aria-hidden="true"></i>
                                        รายงาน พ.ร.บ.รถยนต์
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 0)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตรวจสอบวันครบกำหนดภาษี
                                            </h3>
                                        </div>
                                        <div class="panel-body" >
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/TaxAndInsurance/ReportAnualTaxDueDate.html'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 1)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตรวจสอบวันครบกำหนดภาษี
                                            </h3>
                                        </div>
                                        <div class="panel-body" >
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/TaxAndInsurance/ReportHalfYearDueDate.html'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 2)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ตรวจสอบวันครบกำหนดภาษี
                                            </h3>
                                        </div>
                                        <div class="panel-body" >
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/TaxAndInsurance/ReportAct.html'"></div>
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