<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AccountingBorrowCreditCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left"><?php echo __("Borrow Credit"); ?></h2>
                        <div class="pull-right">
                            <button class="btn btn-primary" ng-style="{'visibility':(currentStep==1?'hidden':'visible')}" ng-click="initData()">กลับ</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <!-- LIST ZONE -->
                        <div class="col-md-12 margin-top-10" ng-if="currentStep == 1">
                            <div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="navbar-form navbar-left">
                                <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="userList">
                                </div>    
                            </div>
                            <div lsw-table="lswTableOptions" ng-model="userList">
                                <script type="text/ng-template" id="theadTemplate.html">
                                    <th class="col-md-1 cursor-point" ng-click="sort('RoleId');">ลำดับ</th>
                                    <th class="col-md-2 cursor-point" ng-click="sort('FirstName');">ชื่อ - นามสกุล</th>
                                    <th class="col-md-1 cursor-point text-center" ng-click="sort('GradeIdBuy');">เกรดเอเจนซี</th>
                                    <th class="col-md-8 text-right"></th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.NO}}</td>
                                    <td >{{row.FirstName + ' ' + row.LastName}}</td>
                                    <td class="text-center">
                                        {{(parent.gradeList[(parent.gradeList | lswIndexOf: { GradeId: row.GradeIdBuy } : 'GradeId')].GradeName) || '-'}}
                                    </td>
                                    <td class="text-right">
                                        <button class="btn btn-primary" ng-click="parent.AgencyCreditManagement(row)">
                                            <i class="fa fa-exchange" aria-hidden="true"></i> จัดการเครดิต
                                        </button>
                                    </td>
                                </script>
                            </div>
                        </div>
                        <!-- Management Zone -->
                        <div class="col-md-12 margin-top-10" ng-if="currentStep == 2">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:10px">
                                    <h3 style="color:#FFF;font-size:22px;">
                                        จัดการเครดิตของ {{currentAgencyManagementDetail.FirstName + ' ' + currentAgencyManagementDetail.LastName}}
                                    </h3>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-12 no-padding margin-bottom-10">
                                        <h5><strong>ข้อมูลเครดิต</strong></h5><hr/>
                                        <div class="col-md-4">
                                            <button class="btn btn-block btn-lg btn-success">
                                                <i class="fa fa-money" aria-hidden="true"></i> เครดิต : {{(AgencyCredit.AgencyCreditPoint || 0) | number:2}} บาท
                                            </button>
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-block btn-lg btn-info">
                                                <strong>
                                                    <i class="fa fa-money" aria-hidden="true"></i> เครดิตสุทธิ : {{((AgencyCredit.AgencyCreditPoint-AgencyCredit.AgencyCreditBorrow)<0?0:(AgencyCredit.AgencyCreditPoint-AgencyCredit.AgencyCreditBorrow) || 0) | number:2}} บาท
                                                </strong>
                                            </button>
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-block btn-lg btn-danger">
                                                <i class="fa fa-credit-card" aria-hidden="true"></i> ยืมเครดิต : {{(AgencyCredit.AgencyCreditBorrow || 0) | number:2}} บาท
                                            </button>
                                        </div>
                                        <div class="col-md-12 margin-top-20">
                                            <span class="success">
                                                <i class="fa fa-square" aria-hidden="true"></i> เครดิตรวมทั้งหมด
                                            </span> &nbsp;&nbsp;&nbsp;
                                            <span style="color:#5bc0de">
                                                <i class="fa fa-square" aria-hidden="true"></i> เครดิตจากการเติมเงิน
                                            </span> &nbsp;&nbsp;&nbsp;
                                            <span class="danger">
                                                <i class="fa fa-square" aria-hidden="true"></i> เครดิตจากการยืม
                                            </span>
                                        </div>
                                    </div>
                                    <!-- Add Credit -->
                                    <div class="col-md-6 no-padding-left margin-bottom-10" ng-include="rootUrl + '../templates/Accounting/Elements/add-credit.html'"></div>
                                    <!-- Reduce Credit -->
                                    <div class="col-md-6 no-padding-right margin-bottom-10" ng-include="rootUrl + '../templates/Accounting/Elements/reduce-credit.html'"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>