<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ng-controller="AccountingDebtorCtrl" ng-init="initData()">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left"><?php echo __("Unpaid Debtor"); ?></h2>
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
                                    <th class="col-md-3 cursor-point" ng-click="sort('FirstName');">ชื่อ - นามสกุล</th>
                                    <th class="col-md-2 cursor-point text-center" ng-click="sort('GradeIdBuy');">เกรดเอเจนซี</th>
                                    <th class="col-md-3 cursor-point text-right" ng-click="sort('AgencyCreditBorrow');">ค้างชำระเงิน</th>
                                    <th class="col-md-3 cursor-point text-right">รายละเอียด</th>
                                </script>
                                <script type="text/ng-template" id="tbodyTemplate.html">
                                    <td>{{row.NO}}</td>
                                    <td >{{row.FirstName + ' ' + row.LastName}}</td>
                                    <td class="text-center">
                                        {{(parent.gradeList[(parent.gradeList | lswIndexOf: { GradeId: row.GradeIdBuy } : 'GradeId')].GradeName) || '-'}}
                                    </td>
                                    <td class="text-right">
                                        <span ng-class="{'danger':(row.AgencyCreditBorrow > 0)}">
                                            <strong>{{row.AgencyCreditBorrow | number:2}}</strong>
                                        </span>
                                         บาท
                                    </td>
                                    <td class="text-right">
                                        <button class="btn btn-primary" ng-click="parent.viewUser(row.UserId)">
                                            <i class="fa fa-eye" aria-hidden="true"></i> รายละเอียด
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