<div id="navbar">
    <?php echo $this->element("admin-nav"); ?>
</div>
<div id="sidebar" class="st-pusher">
    <?php echo $this->element("admin-sidebar"); ?>
    <div class="st-content" id="content" ">
        <div class="st-content-inner">
            <div class="container-fluid">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="pull-left">สร้างหัวข้อใหม่</h2>
                        <div class="pull-right">
                            <button  class="btn btn-info" >กลับ</button>
                        </div>
                        </br>
                        <h3 style="padding-left: 40px">รายละเอียดบล๊อคเว็บไซต์</h3>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                ชื่อหัวข้อ
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text" class="form-control" id="usr">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                    คำบรรยายหัวข้อ                     
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="form-group">
                                <textarea class="form-control" rows="5" id="comment"></textarea>
                            </div>
                        </div>

                         <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                รายละเอียด
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <textarea class="form-control" rows="5" id="comment"></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                ลำดับหัวข้อ
                            </div>
                        </div>
                        <div class="col-md-8">
                                
                                <label >
                                    <input type="radio"  name="optradio">
                                    แสดงเป็นหัวข้อแรก
                                </label>
                                <label  class="padding-left-10">
                                    <input type="radio"  name="optradio">
                                    แสดงเป็นหัวข้อที่สอง
                                </label>
                                <label class="padding-left-10" >
                                    <input type="radio"  name="optradio">
                                    แสดงเป็นหัวข้อที่สาม
                                </label>
                                </br>
                                <label>
                                    <input type="radio"  name="optradio">
                                    แสดงเป็นหัวข้อที่สี่
                                </label>
                                <label class="padding-left-10" >
                                    <input type="radio" class="padding-left-10" name="optradio">
                                    แสดงเป็นหัวข้อที่ห้า
                                </label>
                                <label class="padding-left-10" >
                                    <input type="radio" class="padding-left-10" name="optradio">
                                    แสดงเป็นหัวข้อที่หก
                                </label>
                                </br>
                                <label >
                                    <input type="radio" class="padding-left-10" name="optradio">
                                    แสดงเป็นหัวข้ออื่นๆ
                                </label>
                        </div>
                        <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                จัดการรูปภาพ
                            </div>
                        </div>
                        <div class="col-md-8">
                            
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="15%">รูปภาพ</th>
                                        <th width="15%">รายละเอียด</th>
                                        <th width="40%">สถานะ</th>
                                        <th width="15%">ขนาด</th>
                                        <th width="15%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                        <?php 
                                        echo $this->Html->image('avia-logo-2.png',array('width' => '100px','height' => '100px','alt'=>'Brand' ));
                                        ?>
                                        </td>
                                        <td></td>
                                        <td>แสดงเป็นรูปหน้าปก</td>
                                        <td>12.6 Mb</td>
                                        <td>
                                            <button type="button" class="btn btn-warning">
                                                แก้ไข
                                            </button>
                                            <button type="button" class="btn btn-danger">
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <?php 
                                        echo $this->Html->image('avia-logo-2.png',array('width' => '100px','height' => '100px','alt'=>'Brand' ));
                                        ?>
                                        </td>
                                        <td></td>
                                        <td>แสดงเป็นรูปหน้าปก</td>
                                        <td>12.6 Mb</td>
                                        <td>
                                            <button type="button" class="btn btn-warning">
                                                แก้ไข
                                            </button>
                                            <button type="button" class="btn btn-danger">
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-md-3">
                            <div class="pull-right" style="font-weight: bold;">
                                อัพโหลดรูปภาพ
                            </div>
                        </div>
                        <div class="col-md-8">
                            <button type="button" class="btn btn-success">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                <label style="padding-left: 2px">
                                    เพิ่มไฟส์
                                </label>
                            </button>
                            <button type="button" class="btn btn-info">
                                 <i class="fa fa-ban" aria-hidden="true"></i>
                                <label style="padding-left: 2px">
                                    อัพโหลดไฟส์
                                </label>
                            </button>
                            <button type="button" class="btn btn-danger">
                                <i class="fa fa-ban" aria-hidden="true"></i>
                                <label style="padding-left: 2px">
                                    ยกเลิก
                                </label>
                            </button>
                            

                        </div>
                        <div class="col-md-12 padding-top-40">
                            <div class="text-center">
                                <button type="button" class="btn btn-info">
                                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                                    <label style="padding-left: 2px">
                                        บันทึก
                                    </label>
                                </button>
                            </div>
                            
                        </div>

                      


                        <div class="col-md-12 no-padding" ng-if="globalVariable.currentProcess == 2">
                            
                            

                            </div>
                        </div>
                        <!-- <ui-gmap-google-map center='map.center' zoom='map.zoom' class="col-md-12"></ui-gmap-google-map> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>