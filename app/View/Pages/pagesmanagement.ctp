<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="PagesCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Pages Controller Management"); ?></h2>
        				<div class="pull-right">
        					<button ng-if="breadcrumb.length <= 3" ng-click="addNewPage(0); modal.TitleModal = '<?php echo __("Add Page Controller"); ?>';" class="btn btn-info"><?php echo __("Add Page Controller"); ?></button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 no-padding">
  							<ol class="breadcrumb">
	  							<li ng-repeat="item in breadcrumb" ng-class="{active:$index==(breadcrumb.length-1)}">
	  								<a ng-if="$index!=(breadcrumb.length-1)" ng-click="selectDrillDown(item.ParentName, item.ParentPageControllerId)" class="btn btn-link">
	  									{{item.ParentName}}
	  								</a>
	  								<a class="btn btn-text" ng-if="$index==(breadcrumb.length-1)" style="display: inline-block;padding-top:6px;font-size:14px;">{{item.ParentName}}</a>
	  							</li>
							</ol>
  						</div>
  						<div class="col-md-12 margin-top-10">
  							<div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="mainData.SearchResults">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="mainData.SearchResults">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th class="col-md-2 cursor-point" ng-click="sort('PageName');">ชื่อเพจ</th>
			        				<th class="col-md-3 cursor-point" ng-click="sort('PageTitleName');">ชื่อเรื่อง</th>
			        				<th class="col-md-3 cursor-point" ng-click="sort('Description');">รายละเอียด</th>
			        				<th class="col-md-2"></th>
			        				<th class="col-md-2"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
			        				<td>{{row.PageName}}</td>
			        				<td>{{row.PageTitleName}}</td>
			        				<td>{{row.Description}}</td>
			        				<td>
			        					<button ng-if="parent.breadcrumb.length < 3 && (row.ControllerActionPath == '/')" class="btn btn-info btn-xs" ng-click="parent.drillDownMenu(row.PageTitleName, row.PageControllerId)">
			        						<i class="glyphicon glyphicon-pencil"></i> เมนูย่อย
			        					</button>
			        				</td>
			        				<td align="right">
			        					<button class="btn btn-warning btn-xs" ng-click="parent.modal.TitleModal = 'แก้ไขหน้าเพจ'; parent.addNewPage(row.PageControllerId);">
			        						<i class="glyphicon glyphicon-pencil"></i> <?php echo __("Edit"); ?>
			        					</button>
			        					<button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.RemovePageControllerById(row.PageControllerId)">
			        						<i class="glyphicon glyphicon-trash"></i> <?php echo __("Delete"); ?>
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