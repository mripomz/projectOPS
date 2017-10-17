<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AgencyHistoryCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2><?php echo __("Agency History"); ?></h2>
                    </div>
                    <div class="panel-body">
                        <div class="col-xs-12 tabbable tabs-blocks tabs-primary no-padding">
                            <ul class="nav nav-tabs" tabindex="3" style="overflow: hidden; outline: none;">
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencyHistoryActive == 0}">
                                    <a ng-click="globalVariable.isAgencyHistoryActive = 0;filterOptionSet('','','')">
                                        <i class="fa fa-bars" aria-hidden="true"></i> ทั้งหมด
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencyHistoryActive == 1}">
                                    <a ng-click="globalVariable.isAgencyHistoryActive = 1;filterOptionSet(1)">
                                        <i class="fa fa-long-arrow-down" aria-hidden="true"></i> เติมเงิน
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencyHistoryActive == 2}">
                                    <a ng-click="globalVariable.isAgencyHistoryActive = 2;filterOptionSet(2)">
                                        <i class="fa fa-long-arrow-up" aria-hidden="true"></i> ถอนเงิน
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencyHistoryActive == 3}">
                                    <a ng-click="globalVariable.isAgencyHistoryActive = 3;filterOptionSet(3)">
                                        <i class="fa fa-ticket" aria-hidden="true"></i> ซื้อบัตรโดยสาร
                                    </a>
                                </li>
                                <li class="cursor-point" ng-class="{'active' : globalVariable.isAgencyHistoryActive == 4}">
                                    <a ng-click="globalVariable.isAgencyHistoryActive = 4;filterOptionSet(4)">
                                        <i class="fa fa-ticket" aria-hidden="true"></i> คืนบัตรโดยสาร
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding:0px;">
                                <div class="tab-pane active">
                                    <div class="panel panel-primary" style="border-radius:0px;border-top-right-radius:4px;">
                                        <div class="panel-heading text-left" style="border-top-left-radius:0px;padding:10px">
                                            <h3 style="color:#FFF;font-size:30px;">
                                                ประวัติการเงิน
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12">
                                                <div class="col-md-12 no-padding">
                                                    <div class="col-md-5 no-padding">
                                                        <div class="col-md-10">
                                                            <label class="col-md-3 no-padding">วันที่ : </label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" ng-model="searchFilter.dateStart" id="dateStart" placeholder="วันที่เริ่มต้น" bs-datepicker="" data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true">
                                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateStart" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                            <label class="col-md-3 no-padding">ถึง : </label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" ng-model="searchFilter.dateEnd" id="dateEnd" placeholder="วันที่สิ้นสุด" bs-datepicker="" data-date-type="string" data-model-date-format="MM/dd/yyyy" data-date-format="dd/MM/yyyy" data-autoclose="true">
                                                                <label style="background-color: #eb9316;border-color: #eb9316;" for="dateEnd" class="input-group-addon"><i class="fa fa-calendar"></i></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 no-padding"><button style="height:70px" class="btn btn-primary btn-lg btn-block" ng-click="setDateFilter(searchFilter.dateStart, searchFilter.dateEnd)">ค้นหา</button></div>
                                                    </div>
                                                    <div class="col-md-7 text-right">
                                                        <div class="col-md-10 no-padding pull-right">
                                                            <div class="input-group" style="top: 2px;">
                                                                <div class="input-group-addon">
                                                                    <i class="fa fa-search"></i>
                                                                </div>
                                                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='today')}" ng-click="searchDateFilter('today')">วันนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='yesterday')}" ng-click="searchDateFilter('yesterday')">เมื่อวานนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='thismonth')}" ng-click="searchDateFilter('thismonth')">เดือนนี้</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='lastmonth')}" ng-click="searchDateFilter('lastmonth')">เดือนที่ผ่านมา</button>
                                                        <button class="btn" ng-class="{'btn-primary active':(globalVariable.currentSearchDateFilter=='all')}" ng-click="searchDateFilter('all')">ทั้งหมด</button>
                                                    </div>
                                                </div>
                                                <div class="navbar-form navbar-left">
                                                    <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="agencyCreditHistoryList">
                                                    </div>    
                                                </div>
                                                <div lsw-table="lswTableOptions" ng-model="agencyCreditHistoryList">
                                                    <script type="text/ng-template" id="theadTemplate.html">
                                                        <th class="col-md-2 cursor-point">เลขที่แจ้ง</th>
                                                        <th class="col-md-2 cursor-point">วันที่</th>
                                                        <th class="col-md-1 cursor-point text-right">ขาเข้า</th>
                                                        <th class="col-md-1 cursor-point text-right">ขาออก</th>
                                                        <th class="col-md-2 cursor-point text-right">คงเหลือ</th>
                                                        <th class="col-md-2 cursor-point">ประเภทรายการ</th>
                                                        <th class="col-md-2"></th>
                                                    </script>
                                                    <script type="text/ng-template" id="tbodyTemplate.html">
                                                        <td>{{row.TransactionNumber || '-'}}</td>
                                                        <td>{{(row.CreatedDate | jsonDate:'dd/MM/yyyy HH:mm น.') || '-'}}</td>
                                                        <td align="right"><span class="success"><strong>{{row.AgencyCreditHistoriesInCome | number:2}}</strong></span></td>
                                                        <td align="right"><span class="danger"><strong>{{row.AgencyCreditHistoriesOutCome | number:2}}</strong></span></td>
                                                        <td align="right"><span class="info"><strong>{{row.AgencyCreditHistoriesBalance | number:2}}</strong></span></td>
                                                        <td>{{row.AgencyCreditHistoriesNotes || '-'}}</td>
                                                        <td align="right">
                                                            <button 
                                                                class="btn btn-primary" 
                                                                ng-click="parent.viewTransaction(row.TransactionType, row.TransactionId)"
                                                                ng-disabled="row.TransactionType == 4 || row.TransactionType == 5 || row.TransactionType == 6">
                                                                    <i class="fa fa-search" aria-hidden="true"></i> รายละเอียด
                                                            </button>
                                                        </td>
                                                    </script>
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