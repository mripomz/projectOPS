<div id="navbar">
	<?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher" ng-controller="VehicleTypeCtrl" ng-init="initData()">
	<?php echo $this->element("admin-sidebar"); ?>
	<div class="st-content" id="content">
        <div class="st-content-inner">
        	<div class="container-fluid">
        		<div class="panel panel-default">
        			<div class="panel-heading">
        				<h2 class="pull-left"><?php echo __("Vehicle Type Management"); ?></h2>
        				<div class="pull-right">
        					<button class="btn btn-info" ng-click="addVehicleType();" ng-disabled="globalVariable.IsEdit">เพิ่มประเภทรถ</button>
        				</div>
        			</div>
  					<div class="panel-body">
  						<div class="col-md-12 margin-top-10">
  							<div class="input-group pull-right" style="width: 200px; top: 2px;">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="pull-right" style="margin-right:2px;">
  								<button ng-click="filterOption()" class="btn input-sm" ng-class="{ 'btn-primary' : showAll }">แสดงทั้งหมด</button>
  							</div>
	  						<div class="navbar-form navbar-left">
					        	<div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="vehicleTypeList">
					        	</div>    
					        </div>
	  						<div lsw-table="lswTableOptions" ng-model="vehicleTypeList">
	                            <script type="text/ng-template" id="theadTemplate.html">
			        				<th style="text-align: center" class="col-md-6 cursor-point" ng-click="sort('Email');">ประเภทรถ</th>
			        				<th class="col-md-3 text-center cursor-point" ng-click="sort('VehicleTypeSeatStartRow');">แถวที่เริ่ม</th>
			        				<th class="col-md-3 text-right"></th>
	                            </script>
	                            <script type="text/ng-template" id="tbodyTemplate.html">
			        				<td style="text-align: center">
			        					<div ng-if="!row.IsEdit">
			        						{{row.VehicleTypeName}}
			        					</div>
			        					<div ng-if="row.IsEdit" >
			        						<input type="text" ng-model="row.VehicleTypeName" placeholder="ชื่อประเภทรถ" class="form-control"/>
			        						<span class="danger" ng-if="row.VehicleTypeName == ''">*ระบุประเภทรถ</span>
			        					</div>
			        					<div ng-if="row.IsEdit" >
			        					
													<form name="myForm">
													 
													     <div ng-if="!parent.pictureFile&&!row.ThumbnailUrl">
														     <?php 
																echo $this->Html->image('thumbnail-default.jpg',array('width' => '200px','height'=> '200px','alt'=>'Brand' ));
															?>
														</div>
														<img  ng-if="!(!row.ThumbnailUrl)&&(!parent.pictureFile)" class="img-rounded" style="width:200px;height:200px" ng-src="{{row.ThumbnailUrl}}">

													      <img  ng-show="myForm.file.$valid" style="height: 200px;width: 200px"  class="img-rounded" ngf-thumbnail="parent.pictureFile" class="thumb"> 
													      </br>
										
													      <button type="file" class="btn btn-primary" ngf-select  ng-model="parent.pictureFile"  name="file" accept="image/*" ngf-max-size="4MB" required
													        ngf-model-invalid="errorFile">เลือกรูป</button>
													      <button ng-click="(parent.pictureFile = null)" class="btn btn-danger" ng-show="parent.pictureFile">Remove</button>
												
													     <!--  <input  type="file"  ngf-select ngf-change ="parent.addPicFile(picFile)" ng-model="picFile"  name="file" accept="image/*" ngf-max-size="4MB" required
													        ngf-model-invalid="errorFile" > -->
													      <i ng-show="myForm.file.$error.maxSize">File too large 
													          {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
													      
													      <br>
													      <span class="progress" ng-show="picFile.progress >= 0">
													        <div style="width:{{picFile.progress}}%" 
													            ng-bind="picFile.progress + '%'"></div>
													      </span>
													      <span ng-show="picFile.result">Upload Successful</span>
													      <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
													
													    <br>
													    </form>
			        					</div>
			        				</td>
			        				<td class="text-center ">
			        					<div ng-if="!row.IsEdit">
			        						{{row.VehicleTypeSeatStartRow}}
			        					</div>
			        					<div ng-if="row.IsEdit">
		        							<div counter value="row.VehicleTypeSeatStartRow" min="1" max="100" step="1"></div>
		        							<span class="danger">**แถวที่เริ่มจะมีผลกับผังรถที่สร้างใหม่เท่านั้น**</span>
		        							<div class="clearfix"></div>
		        							<div class="col-md-12 no-padding">
		        								<table style="margin: 10px auto; border: 1px #ccc solid;">
									    			<tr>
									    				<td></td>
									    				<td align="center" ng-repeat="eachRow in parent.getArrayNumber(5) track by $index">
									    					<span style="color:#3498db;"><strong>{{parent.SeatName[$index]}}</strong></span>
									    				</td>
									    			</tr>
									    			<tr  ng-repeat="(eachIndex,eachRow) in parent.getArrayNumber(5) track by $index">
									    				<td>
									    					<div style="padding:2px 5px 2px 5px">
									    						<strong style="color:#3498db;" ng-if="($index + 1) >= row.VehicleTypeSeatStartRow">{{($index - row.VehicleTypeSeatStartRow)+2}}</strong>
									    					</div>
									    				</td>
									    				<td ng-repeat="eachRowSeat in parent.getArrayNumber(5) track by $index">
									    					<div style="padding:2px 5px 2px 5px" ng-if="($index+1) != 3 && (eachIndex+1) > (row.VehicleTypeSeatStartRow-1)">
									    						<span style="color:#3498DB"><i class="avia avia-seat"></i></span>
									    					</div>
									    					<div style="padding:2px 5px 2px 5px" ng-if="($index+1) != 3 && (eachIndex+1) <= (row.VehicleTypeSeatStartRow-1)">
									    						<i class="avia avia-Sign"></i>
									    					</div>
									    					<div style="padding:2px 5px 2px 5px" ng-if="($index+1) == 3">
									    						<i class="avia avia-footprint"></i>
									    					</div>
									    				</td>
									    			</tr>
									    		</table>
		        							</div>
			        					</div>
			        				</td>				              
			        				<td class="text-right">
			        					<div ng-if="row.IsEdit">
			        						<button 
				        						class="btn btn-primary btn-xs" 
				        						ng-click="parent.updateVehicleType(row)"
				        						ng-disabled="(parent.globalVariable.IsEdit && !row.IsEdit)||(!parent.pictureFile&&!row.ThumbnailUrl)||row.VehicleTypeName==''"
				        						<i class="glyphicon glyphicon-floppy-disk"></i> บันทึก
				        					</button>
				        					<button 
				        						class="btn btn-danger btn-xs" 
				        						ng-click="parent.initData();"
				        						ng-disabled="parent.globalVariable.IsEdit && !row.IsEdit">
				        						<i class="glyphicon glyphicon-remove"></i> ยกเลิก
				        					</button>
			        					</div>
			        					<div ng-if="!row.IsEdit">
			        						<button 
				        						class="btn btn-warning btn-xs" 
				        						ng-click="row.IsEdit = true;parent.globalVariable.IsEdit = true;"
				        						ng-disabled="parent.globalVariable.IsEdit && !row.IsEdit">
				        						<i class="glyphicon glyphicon-pencil"></i> แก้ไข
				        					</button>
				        					<button 
				        						ng-disabled="parent.globalVariable.IsEdit && !row.IsEdit"
				        						class="btn btn-danger btn-xs" 
				        						message-en="Are you sure to delete this vehicle type?" 
				        						message-th="ต้องการที่จะลบประเภทรถออกจากระบบ ใช่หรือไม่?" 
				        						lsw-confirm-modal="parent.removeVehicleType(row.VehicleTypeId)">
				        						<i class="glyphicon glyphicon-trash"></i> ลบ
				        					</button>
			        					</div>
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