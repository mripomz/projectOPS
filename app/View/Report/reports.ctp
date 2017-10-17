<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="ReportsCtrl" ng-init="initData()">
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
                                        <i class="fa fa-exchange" aria-hidden="true"></i> การเปลี่ยนแปลงข้อมูล
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 1}">
                                    <a ng-click="globalVariable.isReportTypeActive = 1;resetReport();conditionReport.ReportType = 'TicketBooking'">
                                        <i class="fa fa-money" aria-hidden="true"></i> การจองตั๋ว
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 2}">
                                    <a ng-click="globalVariable.isReportTypeActive = 2;resetReport();conditionReport.ReportType = 'OperationIndividual'">
                                        <i class="fa fa-newspaper-o" aria-hidden="true"></i> การดำเนินงาน
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isReportTypeActive == 3}">
                                    <a ng-click="globalVariable.isReportTypeActive = 3;resetReport();conditionReport.ReportType = 'RevenueBySales'">
                                        <i class="fa fa-ticket" aria-hidden="true"></i> การขายตั๋ว
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 0)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                การเปลี่ยนแปลงข้อมูล
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/GeneralReports/ChangeInformation.html'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 1)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                การจองตั๋ว
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/GeneralReports/TicketBooking.html'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 2)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                การดำเนินงาน
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/GeneralReports/ProgressOperation.html'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" ng-class="{'active':(globalVariable.isReportTypeActive == 3)}">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                การขายตั๋ว
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                                <div ng-include="rootUrl + '../templates/Reports/GeneralReports/RevenueTicket.html'"></div>
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