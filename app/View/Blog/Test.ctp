<!-- <div ng-app="app" ng-controller="DemoController" flow-init ="$scope.options.url"
      flow-file-added="!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]"
      >

<div>

<div class="container" >
  <h1>flow image example</h1>
  <hr class="soften"/>

  <div>
    <div class="thumbnail" ng-hide="$flow.files.length">
      <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image" />
    </div>
    <div class="thumbnail" ng-show="$flow.files.length">
      <img flow-img="$flow.files[0]" />
    </div>
    <div>
      <div class="alert" flow-drop>
    Drag And Drop your file here
      </div>
      <a href="#" class="btn" flow-files-submitted="myHandler()" ng-hide="$flow.files.length" flow-btn flow-attrs="{accept:'image/*'}">Select image</a>
      <a href="#" class="btn" ng-show="$flow.files.length" ng-click="myUploadMedhot($flow, $flow.files, $message)" >Change</a>
      <a href="#" class="btn btn-danger" ng-show="$flow.files.length"
         ng-click="$flow.cancel()">
        Remove
      </a>
    </div>
    <p>
      Only PNG,GIF,JPG files allowed.
    </p>
  </div>
</div>
</div>
</div> 
 -->

 <!--  <div ng-controller="MyController">
    <input type="file" fileread="uploadme" />
    <img src="{{uploadme}}" width="100" height="50" alt="Image preview...">
    <br/>
    <p>
      Image dataURI:
      <pre>{{uploadme}}</pre>
    </p>
    <br/>
    <button ng-click="uploadImage()">upload image</button>
  </div> -->



<!-- Upload on form submit or button click
<form  ng-controller="MyCtrl" name="form">
  Single Image with validations
  <div class="button" ngf-select ng-model="file" name="file" ngf-pattern="'image/*'"
    ngf-accept="'image/*'" ngf-max-size="20MB" ngf-min-height="100"
    ngf-resize="{width: 100, height: 100}">Select</div>
  Multiple files
  <div class="button" ngf-select ng-model="files" ngf-multiple="true">Select</div>
  Drop files: <div ngf-drop ng-model="files" class="drop-box">Drop</div>
  <button type="submit" ng-click="submit()">submit</button>
</form>

Upload right away after file selection:
<div class="button" ngf-select="upload($file)">Upload on file select</div>
<div class="button" ngf-select="uploadFiles($files)" multiple="multiple">Upload on file select</div>
  Drop File:
<div ngf-drop="uploadFiles($files)" class="drop-box"
  ngf-drag-over-class="'dragover'" ngf-multiple="true"
  ngf-pattern="'image/*,application/pdf'">Drop Images or PDFs files here</div>
<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>

Image thumbnail: <img ngf-thumbnail="file || '/thumb.jpg'">
Audio preview: <audio controls ngf-src="file"></audio>
Video preview: <video controls ngf-src="file"></video> -->


<div ng-app="fileUpload" ng-controller="MyCtrl">
  <form name="myForm">
    <fieldset>
      <legend>Upload on form submit</legend>
      Username:
      <input type="text" name="userName" ng-model="username" size="31" required>
      <i ng-show="myForm.userName.$error.required">*required</i>
      <br>Photo:
      <input type="file" ngf-select ng-model="picFile" name="file"    
             accept="image/*" ngf-max-size="2MB" required
             ngf-model-invalid="errorFile">
      <i ng-show="myForm.file.$error.required">*required</i><br>
      <i ng-show="myForm.file.$error.maxSize">File too large 
          {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
      <img  ng-show="myForm.file.$valid" ngf-thumbnail="picFile" class="thumb"> <button ng-click="picFile = null" ng-show="picFile">Remove</button>
      <br>
      <button ng-disabled="!picFile" 
              ng-click="uploadPic(picFile)">Submit</button>
      <span class="progress" ng-show="picFile.progress >= 0">
        <div style="width:{{picFile.progress}}%" 
            ng-bind="picFile.progress + '%'"></div>
      </span>
      <span ng-show="picFile.result">Upload Successful</span>
      <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
    </fieldset>
    <br>
  </form>
</div>