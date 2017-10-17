<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div ng-controller="BlogCtrl"  ng-init="initData()" id="sidebar"  class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading"">
                        <h2 class="pull-left">{{globalVariable.currentProcess==2?"เพิ่มบล๊อคเว็บไซต์":""||globalVariable.currentProcess==3?"แก้ไขบล๊อคเว็บไซต์":""}}</h2>
                        <div class="pull-right">
                            <button  class="btn btn-info" ng-click="addBlog()" ng-if="globalVariable.currentProcess == 1">สร้างหัวข้อใหม่</button>
                            <button ng-click="backtoMain()" ng-if="globalVariable.currentProcess == 2||globalVariable.currentProcess == 3" class="btn btn-info">กลับ</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-12 margin-top-10">
                            <div class="col-md-12 no-padding" ng-if="globalVariable.currentProcess == 1">
                                <div class="input-group pull-right" style="width: 200px; top:0 px;">
                                    <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="search" placeholder="ค้นหา..." class="form-control input-sm" ng-model="lswFilterOptions.lswFilter">
                            </div>
                            <div class="input-group  pull-right" style="margin-right:2px;">
                                <button ng-click="filterOption()" class="btn input-sm" ng-class="{'btn-primary' : showAll}">แสดงทั้งหมด</button>
                            </div>
                                <div class="navbar-form navbar-left">
                                    <div lsw-paginate="lswPaginateOptions" class="lsw-paginate-position" small="true" ng-model="mainData">
                                    </div>    
                                </div>
                                <div lsw-table="lswTableOptions" ng-model="mainData">
                                    <script type="text/ng-template" id="theadTemplate.html">
                                        <th class="col-md-2 cursor-point" ng-click="sort('LocationName');">ลำดับ</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('AmphurName_TH');">ชื่อหัวข้อ</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('DistrictName_TH');">วันที่สร้าง</th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('ProvinceName_TH');">สร้างโดย
                                        </th>
                                        <th class="col-md-2 cursor-point" ng-click="sort('Telephone');">สถานะการแสดง</th>
                                        <th class="col-md-3 cursor-point" ng-click="sort('Telephone');"></th>
                                    </script>
                                    <script type="text/ng-template" id="tbodyTemplate.html">
                                        <td>{{$index+1}}</td>
                                        <td>{{row.Topic}}</td>
                                        <td>{{row.CreatedDate | jsonDateTHAI :'DD MMMM YYYY'}}</td>
                                        <td>{{row.CreatedBy}}</td>
                                        <td>{{row.ExpressOrder==1?'แสดงเป็นหัวข้อแรก':''||row.ExpressOrder==2?'แสดงเป็นหัวข้อที่สอง':''||row.ExpressOrder==3?'แสดงเป็นหัวข้อที่สาม':''||row.ExpressOrder==4?'แสดงเป็นหัวข้อที่สี่':''||row.ExpressOrder==5?'แสดงเป็นหัวข้อที่ห้า':''||row.ExpressOrder==6?'แสดงเป็นหัวข้อที่หก':''||row.ExpressOrder==0?'แสดงเป็นหัวข้ออื่นๆ':''}}</td>
                                        <td class="left">
                                            <button type="button" class="btn btn-warning btn-xs" ng-click="parent.editBlog(row.BlogId);">
                                                <i class="glyphicon glyphicon-pencil" aria-hidden="true"></i>
                                                <label >
                                                    แก้ไข
                                                </label>
                                            </button>
                                            <button type="button" class="btn btn-danger btn-xs"
                                             message-en="Are you sure to delete this stop point?" message-th="ต้องการที่จะลบหัวข้อนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="parent.RemovedBlog(row.BlogId);" >
                                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                <label style="">
                                                    ลบ
                                                </label>
                                            </button>
                                            
                                        </td>
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    <div class="panel-body" ng-if="globalVariable.currentProcess == 2" >
                        <div class="col-md-12 no-padding"  >
                            <h4 style="padding-left: 40px"><strong>รายละเอียดบล๊อคเว็บไซต์</strong></h4><hr/>
                            <div class="form-horizontal">
                            <form id="vehicleDetalForm" class="form-horizontal" role="form" name="vehicledetailform" novalidate enctype="multipart/form-data" data-file-upload="options" ng-class="{'fileupload-processing': processing() || loadingFiles}">
                                <div class="form-group">
                                    <label for="BlogTopic" id = "nameplace" class="col-sm-2 control-label">ชื่อหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" ng-model="blogDetail.Topic" placeholder="ชื่อหัวข้อ">
                                    </div>
                                </div>
                                
                                
                                <div class="form-group">
                                    <div class="col-md-2">
                                        <div class="pull-right" style="font-weight: bold;">
                                            ลำดับหัวข้อ
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <label >
                                            <input type="radio"  ng-disabled="disableRadio1" ng-model="blogDetail.ExpressOrder"  value="1" name="optradio">
                                            แสดงเป็นหัวข้อแรก
                                        </label>
                                        <label  class="padding-left-10">
                                            <input type="radio"  ng-disabled="disableRadio2" ng-model="blogDetail.ExpressOrder"  value="2" name="optradio">
                                            แสดงเป็นหัวข้อที่สอง
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-disabled="disableRadio3" ng-model="blogDetail.ExpressOrder"  value="3"  name="optradio">
                                            แสดงเป็นหัวข้อที่สาม
                                        </label>
                                        </br>
                                        <label>
                                            <input type="radio" ng-disabled="disableRadio4"  ng-model="blogDetail.ExpressOrder"  value="4" name="optradio">
                                            แสดงเป็นหัวข้อที่สี่
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-disabled="disableRadio5" ng-model="blogDetail.ExpressOrder"  value="5" name="optradio">
                                            แสดงเป็นหัวข้อที่ห้า
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-disabled="disableRadio6" ng-model="blogDetail.ExpressOrder"  value="6" name="optradio">
                                            แสดงเป็นหัวข้อที่หก
                                        </label>
                                        </br>
                                        <label >
                                            <input type="radio" ng-model="blogDetail.ExpressOrder"  value="0" name="optradio">
                                            แสดงเป็นหัวข้ออื่นๆ
                                        </label>

                                    </div>
                                </div>   
                                    
                            </div>
                            <div class="form-group" ng-if="disableTitle == 1" >
                                     <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label" style="text-align: right;">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"   aw-limit-length="265"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div>
                            <div class="form-group" ng-if="disableTitle == 2" >
                                     <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label" style="text-align: right;">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"   aw-limit-length="280"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div>

                             <!-- <div class="form-group" ng-if="disableTitle == 3">
                                    <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label" style="text-align: right;">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"   aw-limit-length="595"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div> -->
                            
                                
                               <!--  <div class="form-group">
                                    <label for="BlogDetail" class="col-sm-2 control-label margin-top-20" style="text-align: right;">รายละเอียด</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control margin-top-20" ng-model="blogDetail.Detail" rows="8" ></textarea>
                                    </div>
                                </div> -->

                                <div class="form-group">
                               
                                    <div class="col-sm-12 text-center clearfix margin-top-20">
                                        <button class="btn btn-primary" message-en="Are you sure to save this blog?" message-th="คุณต้องการบันทึกและไปต่อ ใช่หรือไม่?" lsw-confirm-modal="nextStepForAddBlog()">
                                            <i class="glyphicon glyphicon-floppy-disk"></i> ต่อไป
                                        </button>
                                    </div>
                                </div>    
                            </form>
                        </div>
                    </div>

                    
                    <div class="panel-body" ng-if="globalVariable.currentProcess == 3">
                         <div class="col-md-12 no-padding"  >
                            <h4 style="padding-left: 40px"><strong>รายละเอียดบล๊อคเว็บไซต์</strong></h4><hr/>
                            <div class="form-horizontal">
                            <form id="vehicleDetalForm" class="form-horizontal" role="form" name="vehicledetailform" novalidate enctype="multipart/form-data" data-file-upload="options" ng-class="{'fileupload-processing': processing() || loadingFiles}">
                                <div class="form-group">
                                    <label for="BlogTopic"  id = "nameplace" class="col-sm-2 control-label">ชื่อหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <input type="text" ng-value="blogDetail.Topic"  class="form-control" ng-model="blogDetail.Topic" >
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div class="col-md-2">
                                        <div class="pull-right" style="font-weight: bold;">
                                            ลำดับหัวข้อ
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <label >
                                            <input type="radio"   ng-checked="blogDetail.ExpressOrder==1?true:false" ng-disabled="blogDetail.CheckStatus!=1&&disableRadio1?true:false" ng-model="blogDetail.ExpressOrder"  value="1" name="optradio">
                                            แสดงเป็นหัวข้อแรก
                                        </label>
                                        <label  class="padding-left-10">
                                            <input type="radio"  ng-checked="blogDetail.ExpressOrder==2?true:false" ng-disabled="blogDetail.CheckStatus!=2&&disableRadio2?true:false" ng-model="blogDetail.ExpressOrder"  value="2" name="optradio">
                                            แสดงเป็นหัวข้อที่สอง
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-checked="blogDetail.ExpressOrder==3?true:false" ng-disabled="blogDetail.CheckStatus!=3&&disableRadio3?true:false" ng-model="blogDetail.ExpressOrder"  value="3"  name="optradio">
                                            แสดงเป็นหัวข้อที่สาม
                                        </label>
                                        </br>
                                        <label>
                                            <input type="radio" ng-checked="blogDetail.ExpressOrder==4?true:false" ng-disabled="blogDetail.CheckStatus!=4&&disableRadio4?true:false"  ng-model="blogDetail.ExpressOrder"  value="4" name="optradio">
                                            แสดงเป็นหัวข้อที่สี่
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-checked="blogDetail.ExpressOrder==5?true:false" ng-disabled="blogDetail.CheckStatus !=5&&disableRadio5?true:false" ng-model="blogDetail.ExpressOrder"  value="5" name="optradio">
                                            แสดงเป็นหัวข้อที่ห้า
                                        </label>
                                        <label class="padding-left-10" >
                                            <input type="radio" ng-checked="blogDetail.ExpressOrder==6?true:false" ng-disabled="blogDetail.CheckStatus!=6&&disableRadio6?true:false" ng-model="blogDetail.ExpressOrder"  value="6" name="optradio">
                                            แสดงเป็นหัวข้อที่หก
                                        </label>
                                        </br>
                                        <label >
                                            <input type="radio"  ng-checked="blogDetail.ExpressOrder==0?true:false" ng-model="blogDetail.ExpressOrder"  value="0" name="optradio">
                                            แสดงเป็นหัวข้ออื่นๆ
                                        </label>

                                    </div> 
                                    
                                </div>
                                <div class="form-group" ng-if="disableTitle == 1" >
                                     <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"  ng-value="blogDetail.Title"  aw-limit-length="265"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div>
                            <div class="form-group" ng-if="disableTitle == 2" >
                                     <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"   ng-value="blogDetail.Title" aw-limit-length="280"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div>

                             <div class="form-group" ng-if="disableTitle == 3" >
                                    <div class="col-sm-2 control-label"></div>
                                    <div class="col-sm-10">
                                    <h1 >{{(titleLength - blogDetail.Title.length) ==0?"ตัวอักษรเต็มแล้ว":"ตัวอักษรที่คุณสามารถกรอกได้ "+(titleLength - blogDetail.Title.length)}}</h1>
                                    </div>
                                    <label for="BlogTitle" class="col-sm-2 control-label">คำบรรยายหัวข้อ</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"   ng-value="blogDetail.Title" aw-limit-length="595"  ng-model="blogDetail.Title" rows="6" ></textarea>
                                    </div>
                            </div>
                            
                                
                                <div class="form-group ng-scope" id="ng-app">

                                    <!-- <div class="container">
                                        <a href="http://github.com/fraywing/textAngular"> <img src="http://textangular.com/images/textAngularLogo.png" style="max-width:500%;" class="lighter"></a>
                                         <span text-angular-version style="font-size:20px; position:relative; top:26px;">
                                    </div> -->
                                    <!-- <br>
                                    <div class="container border-around text-center lighter">
                                        <span class="text-xlg roboto">A Lightweight, Two-Way-Bound &amp; Totally <b class="text-red">Awesome</b> Angular.js Text-Editor</span>
                                    </div> -->
                                    <div class="container lighter" style="min-height: 300px;border-style: groove;" >
                                        <div text-angular  ng-model="htmlContent" name="demo-editor" ta-text-editor-class="clearfix border-around container" ta-html-editor-class="border-around" >
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">จัดการรูปภาพ</label>
                                        <div class="col-sm-10">
                                            <table class="table table-striped files ng-cloak">
                                                <tr>
                                                    <th width="100">รูปภาพ</th>
                                                    <th class="text-left">รายละเอียด</th>
                                                    <th class="text-left">สถานะ</th>
                                                    <th class="text-right">ขนาด</th>
                                                    <th class="text-right"></th>
                                                </tr>
                                                <tr ng-repeat="item in blogGalleryList.BlogGalleryList">
                                                    <td>
                                                        <a ng-click="openLightboxModal(item.ThumbnailUrl)" target="_blank" class="thumbnail thumbnail-show">
                                                            <img ng-src="{{item.ThumbnailUrl}}">
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <span ng-if="!item.isEdit">{{item.Description}}</span>
                                                        <input type="text" ng-model="item.Description" ng-if="item.isEdit" class="form-control" />
                                                    </td>
                                                    <td>
                                                        <span ng-if="!item.isEdit">{{item.Status?'แสดงเป็นรูปหน้าปก':'แสดงเป็นรูปอื่นๆ'}}</span>
                                                         <input type="checkbox" ng-disabled="(item.checkStatus==true&&disablePicStatus)||!disablePicStatus?false:true" 
                                                         ng-if="item.isEdit" ng-model="item.Status" ng-if="item.isEdit"/>
                                                    </td>
                                                    <td class="text-right">
                                                        {{item.Size | formatFileSize}}
                                                    </td>
                                                    <td class="text-right">
                                                        <a class="btn btn-primary btn-xs" ng-click="saveBlogGallery(item); item.isEdit = false;" ng-if="item.isEdit">บันทึก</a>
                                                        <a class="btn btn-danger btn-xs" ng-click="item.isEdit = false;" ng-if="item.isEdit">ยกเลิก</a>
                                                        <a class="btn btn-warning btn-xs" ng-click="item.isEdit = true;" ng-if="!item.isEdit">แก้ไข</a>
                                                        <a class="btn btn-danger btn-xs" message-en="Are you sure to delete this image?" message-th="ต้องการที่จะลบรูปภาพนี้ออกจากระบบ ใช่หรือไม่?" lsw-confirm-modal="removeBlogGallery(item)" ng-if="!item.isEdit">ลบ</a>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td ng-if="blogGalleryList.BlogGalleryList.length == 0" colspan="5">ยังไม่ได้อัพโหลดรูปภาพเข้าสู่ในระบบ</td>
                                                </tr>
                                            </table>
                                        </div>

                                </div>

                                
                            <div class="form-group" ">
                                <label class="col-sm-2 control-label">อัพโหลดรูปภาพ</label>
                                <div class="col-sm-10">
                    <!-- The table listing the files available for upload/download -->
                                    <table class="table table-striped files ng-cloak">
                                        <tr ng-repeat="file in queue" ng-class="{'processing': file.$processing()}">
                                            <td data-ng-switch data-on="!!file.thumbnailUrl">
                                                <div class="preview" data-ng-switch-when="true">
                                                    <a ng-href="{{file.url}}" title="{{file.name}}" download="{{file.name}}" data-gallery><img ng-src="{{file.thumbnailUrl}}" alt=""></a>
                                                </div>
                                                <div class="preview" data-ng-switch-default data-file-upload-preview="file"></div>
                                            </td>
                                            <td>
                                                <p class="name" data-ng-switch data-on="!!file.url">
                                                <span data-ng-switch-when="true" data-ng-switch data-on="!!file.thumbnailUrl">
                                                    <a data-ng-switch-when="true" ng-href="{{file.url}}" title="{{file.name}}" download="{{file.name}}" data-gallery>{{file.name}}</a>
                                                    <a data-ng-switch-default ng-href="{{file.url}}" title="{{file.name}}" download="{{file.name}}">{{file.name}}</a>
                                                </span>
                                                <span data-ng-switch-default>{{file.name}}</span>
                                                </p>
                                                <strong ng-show="file.error" class="error text-danger">{{file.error}}</strong>
                                            </td>
                                            <td>
                                                <p class="size">{{file.size | formatFileSize}}</p>
                                                <div class="progress progress-striped active fade" ng-class="{pending: 'in'}[file.$state()]" data-file-upload-progress="file.$progress()"><div class="progress-bar progress-bar-success" ng-style="{width: num + '%'}"></div></div>
                                            </td>
                                             <td>
                                                <button type="button" class="btn btn-warning cancel" ng-click="file.$cancel()" ng-hide="!file.$cancel || file.$response().textStatus == 'success'">
                                                    <i class="glyphicon glyphicon-ban-circle"></i>
                                                    <span>ยกเลิก</span>
                                                </button>
                                                <button type="button" class="btn btn-danger destroy" ng-click="file.$destroy()" ng-hide="!file.$destroy()">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                    <span>ลบ</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="row fileupload-buttonbar">
                                        <div class="col-lg-7">
                                        <!-- The fileinput-button span is used to style the file input field as button -->
                                            <div class="pull-left" style="margin-right:10px;">
                                                <span class="btn btn-success fileinput-button" ng-class="{disabled: disabled}">
                                                    <i class="glyphicon glyphicon-plus"></i>
                                                    <span>เพิ่มไฟล์</span>
                                                    <input id="fileupload" type="file" name="files[]" multiple ng-disabled="disabled">
                                                </span>
                                            </div>
                                            <div class="pull-left" style="margin-right:10px;" title="{{(!currentProcess.fileInQueue)?'โปรดเพิ่มไฟล์ก่อน':''}}">
                                                <button type="button" class="btn btn-primary start" ng-click="submit()" ng-disabled="!currentProcess.fileInQueue">
                                                    <i class="glyphicon glyphicon-upload"></i>
                                                    <span>อัพโหลดไฟล์</span>
                                                </button>
                                            </div>
                                            <div class="pull-left">
                                                <button type="button" class="btn btn-danger cancel" ng-click="cancel()">
                                                <i class="glyphicon glyphicon-ban-circle"></i>
                                                <span>ยกเลิก</span>
                                                </button>
                                            </div>
                            <!-- The global file processing state -->
                                            <span class="fileupload-process"></span>
                                        </div>
                        <!-- The global progress state -->
                                        <div class="col-lg-5 fade" ng-class="{in: active()}">
                            <!-- The global progress bar -->
                                            <div class="progress progress-striped active" data-file-upload-progress="progress()"><div class="progress-bar progress-bar-success" ng-style="{width: num + '%'}"></div></div>
                            <!-- The extended global progress state -->
                                            <div class="progress-extended">&nbsp;</div>
                                        </div>
                                 <div class="col-sm-12 text-center clearfix margin-top-20">
                                <button class="btn btn-primary" message-en="Are you sure to save this blog?" message-th="คุณต้องการบันทึก ใช่หรือไม่?" lsw-confirm-modal="saveBlog()">
                                    <i class="glyphicon glyphicon-floppy-disk"></i> บันทึก
                                </button>
                            </div>

                            </form>
                        </div>
                    </div>
                    </div>
                        
                       
                </div>
            </div>
        </div>
    </div>
</div>





