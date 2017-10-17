<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="PagesRolesCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Pages Roles Management"); ?></h2>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 no-padding">
  							<ol class="breadcrumb">
	  							<li ng-repeat="item in breadcrumb" ng-class="{active:$index==(breadcrumb.length-1)}">
	  								<a ng-if="$index!=(breadcrumb.length-1)" ng-click="selectDrillDown(item.Display, item.RoleId, item.UserId, item.Level)" class="btn btn-link">
	  									{{item.Display}}
	  								</a>
	  								<a ng-if="$index==(breadcrumb.length-1)" class="btn btn-text" style="display: inline-block;">{{item.Display}}</a>
	  							</li>
							</ol>
  						</div>
  						<table ng-if="currentLevel == 0" class='table table-hover table-condensed'>
		        			<tr>
		        				<th class="col-md-1">ลำดับ</th>
		        				<th class="col-md-5">บทบาท</th>
		        				<th class="col-md-3 text-right">จัดการสิทธิ์แต่ละผู้ใช้</th>
		        				<th class="col-md-3 text-right">จัดการสิทธิ์แต่ละบทบาท</th>
		        			</tr>
		        			<tr ng-repeat="role in rolesList.RoleList">
		        				<td>{{$index+1}}</td>
		        				<td>{{role.RoleName}}</td>
		        				<td align="right">
		        					<button class="btn btn-info btn-xs" ng-click="drillDownMenuLevel2(role.RoleName, role.RoleId, 2)">
		        						<i class="glyphicon glyphicon-pencil"></i> จัดการสิทธิ์ผู้ใช้
		        					</button>
		        				</td>
		        				<td align="right">
		        					<button class="btn btn-info btn-xs" ng-click="drillDownMenuLevel1(role.RoleName, role.RoleId, 1)">
		        						<i class="glyphicon glyphicon-pencil"></i> จัดการสิทธิ์บทบาท
		        					</button>
		        				</td>
		        			</tr>
		        		</table>

		        		<table ng-if="currentLevel == 1" style="width:100%">
		        			<tr>
		        				<td valign="middle"><h1>{{currentRoleName}}</h1></td>
		        				<td align="right" valign="middle">
		        					<button ng-click="addPagePermission()" class="btn btn-primary">เพิ่มหน้า</button>
		        				</td>
		        			</tr>
		        			<tr>
		        				<td colspan="2">
		        					<div class="nestable">
		        						<ul class="nestable-list" ng-repeat="menu in menuList.SearchResults">
		        							<li class="nestable-item">
		        								<button data-action="collapse" type="button" style="display: block;color: #FFF;" ng-if="menu.ChildPageController.length > 0">Expand</button>
											    <div class="nestable-handle nestable-handle-primary">
											    	{{menu.MenuName}} <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(menu.PageControllerId)"  ng-disabled="menu.ChildPageController.length > 0"><i class="fa fa-trash-o"></i> ลบ</button></div>
											    </div>
											    <ul class="nestable-list" ng-if="menu.ChildPageController.length > 0" ng-repeat="submenu in menu.ChildPageController">
												    <li class="nestable-item">
												    	<button data-action="collapse" type="button" style="display: block;" ng-if="submenu.ChildPageController.length > 0">Expand</button>
												    	<div class="nestable-handle nestable-handle-info">
												    		{{submenu.MenuName}}  <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(submenu.PageControllerId)" ng-disabled="submenu.ChildPageController.length > 0"><i class="fa fa-trash-o"></i> ลบ</button></div>
												    	</div>
													    <ul class="nestable-list" ng-if="submenu.ChildPageController.length > 0" ng-repeat="lowsubmenu in submenu.ChildPageController">
														    <li class="nestable-item">
														    	<div class="nestable-handle nestable-handle-light">
														    	{{lowsubmenu.MenuName}} <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(lowsubmenu.PageControllerId)"><i class="fa fa-trash-o"></i> ลบ</button></div>
														    	</div>
														    </li>
													    </ul>
												    </li>
											    </ul>
											</li>
		        						</ul>
		        					</div>
		        				</td>
		        			</tr>
		        			<tr ng-show="menuList.SearchResults.length == 0">
		        				<td colspan="2" align="center">ยังไม่มีข้อมูล</td>
		        			</tr>
		        		</table>
		        		<table  class='table table-hover table-condensed' ng-if="currentLevel == 2" style="width:100%">
		        			<tr>
		        				<th class="col-md-1">ลำดับ</th>
		        				<th class="col-md-4">ชื่อผู้ใช้</th>
		        				<th class="col-md-4">ชื่อ - นามสกุล</th>
		        				<th class="col-md-3 text-right">จัดการสิทธิ์แต่ละบทบาท</th>
		        			</tr>
		        			<tr ng-repeat="user in userList.SearchResults">
		        				<td class="col-md-1">{{$index+1}}</td>
		        				<td class="col-md-4">{{user.Email}}</td>
		        				<td class="col-md-4">{{user.FirstName + ' ' + user.LastName}}</td>
		        				<td class="col-md-3 text-right">
		        					<button class="btn btn-info btn-xs" ng-click="drillDownMenuLevel3(user.Email, user.UserId, 3)">
		        						<i class="glyphicon glyphicon-pencil"></i> จัดการสิทธิ์บทบาท
		        					</button>
		        				</td>
		        			</tr>
		        			<tr ng-if="userList.SearchResults.length == 0">
		        				<td colspan="4" align="center">ยังไม่มีข้อมูล</td>
		        			</tr>
		        		</table>
		        		<table ng-if="currentLevel == 3" style="width:100%">
		        			<tr>
		        				<td valign="middle"><h1>{{currentUserName}}</h1></td>
		        				<td align="right" valign="middle">
		        					<button ng-click="addPagePermission()" class="btn btn-primary">เพิ่มหน้า</button>
		        				</td>
		        			</tr>
		        			<tr>
		        				<td colspan="2">
		        					<div class="nestable">
		        						<ul class="nestable-list" ng-repeat="menu in menuList.SearchResults">
		        							<li class="nestable-item">
		        								<button data-action="collapse" type="button" style="display: block;color: #FFF;" ng-if="menu.ChildPageController.length > 0">Expand</button>
											    <div class="nestable-handle nestable-handle-primary">
											    	{{menu.MenuName}} <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(menu.PageControllerId)"><i class="fa fa-trash-o"></i> ลบ</button></div>
											    </div>
											    <ul class="nestable-list" ng-if="menu.ChildPageController.length > 0" ng-repeat="submenu in menu.ChildPageController">
												    <li class="nestable-item">
												    	<button data-action="collapse" type="button" style="display: block;" ng-if="submenu.ChildPageController.length > 0">Expand</button>
												    	<div class="nestable-handle nestable-handle-info">
												    		{{submenu.MenuName}}  <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(submenu.PageControllerId)"><i class="fa fa-trash-o"></i> ลบ</button></div>
												    	</div>
													    <ul class="nestable-list" ng-if="submenu.ChildPageController.length > 0" ng-repeat="lowsubmenu in submenu.ChildPageController">
														    <li class="nestable-item">
														    	<div class="nestable-handle nestable-handle-light">
														    	{{lowsubmenu.MenuName}} <div class="text-right pull-right"><button class="btn btn-danger btn-xs" message-en="Are you sure to delete this page?" message-th="ต้องการที่จะลบเพจนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removePage(lowsubmenu.PageControllerId)"><i class="fa fa-trash-o"></i> ลบ</button></div>
														    	</div>
														    </li>
													    </ul>
												    </li>
											    </ul>
											</li>
		        						</ul>
		        					</div>
		        				</td>
		        			</tr>
		        			<tr ng-show="menuList.SearchResults.length == 0">
		        				<td colspan="2" align="center">ยังไม่มีข้อมูลในส่วนนี้</td>
		        			</tr>
		        		</table>
  					</div>
  				</div>
        	</div>
        </div>
	</div>
</div>