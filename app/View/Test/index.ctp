

   <script type="text/javascript">

                    var wcppPingDelay_ms = 5000;

                    function wcppDetectOnSuccess() {
                        // WCPP utility is installed at the client side
                        // redirect to WebClientPrint sample page

                        // get WCPP version
                        var wcppVer = arguments[0];
                        if (wcppVer.substring(0, 1) == "3"){
                            $('#wcppDetection').hide();
                            $('#printSection').show();
                        }   
                        else //force to install WCPP v3.0
                            wcppDetectOnFailure();
                    }

                    function wcppDetectOnFailure() {
                        // It seems WCPP is not installed at the client side
                        // ask the user to install it
                        $('#msgInProgress').hide();
                        $('#msgInstallWCPP').show();
                    }

                </script>
<script>
                $(function () {
                    //Gen script for WCPP detection
                    // $.ajax({
                    // url: 'http://localhost:2879/WebClientPrintAPI/ProcessRequest?d=' + $('#sid').val(),
                    // }).done(function(foo) {
                    // console.log(foo);
                    // }).fail(function() {
                    //     console.log("Error!");
                    //     });
                    $.ajax({
            url: 'http://localhost:2879/WebClientPrintAPI/ProcessRequest?d=' + $('#sid').val(),
            dataType: 'JSONP',
            jsonpCallback: 'callbackFnc',
            type: 'GET',
            async: false,
            crossDomain: true,
            success: function () { },
            failure: function () { },
            
        });
                   ///$.get('/WebClientPrintAPI/ProcessRequest?d=' + $('#sid').val());
                });
            </script>

  <script>
                $(function () {
                    // Create Base64 Object
                    var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t } }

                    // Creat script for client side printing

                     var settings = {
                 HelpText: $('#help-text').val(),
                 BranchId: $("#branch-select").val(),
                  Department: $('input[name=departmentRadios]:checked').val()

                    };
                    var rootUrl = $(location).attr('protocol') + "//" + $(location).attr('host');
                    var ABSOLUTE_URL_TO_PRINT_JOB_CONTROLLER ='http://localhost:2879/PrintFiles/PrintMyFiles/?useDefaultPrinter=ASASDDASD';
                    for (i = 0; i < 2; i++) {
                    $.ajax({
            url: 'http://localhost:2879/WebClientPrintAPI/ProcessRequest?v3.0.0.0&' + new Date().getTime() + '&sid=' + $('#sid').val() + '&u=' + Base64.encode(ABSOLUTE_URL_TO_PRINT_JOB_CONTROLLER),
            dataType: 'JSONP',
            data: JSON.stringify(settings),
            jsonpCallback: 'callbackFnc',
            contentType: "application/json;charset=utf-8",
            type: 'POST',
            async: true,
            crossDomain: true,
            success: function () { },
            failure: function () { },
            
        });
}

                   // $.ajax({
                   //  url: 'http://localhost:2879/WebClientPrintAPI/ProcessRequest?v3.0.0.0&' + new Date().getTime() + '&sid=' + $('#sid').val() + '&u=' + Base64.encode(ABSOLUTE_URL_TO_PRINT_JOB_CONTROLLER),
                   //  }).done(function(foo) {
                   //  console.log(foo);
                   //  }).fail(function() {
                   //      console.log("Error!");
                   //      });
                
                   
                  /// $.get('/WebClientPrintAPI/ProcessRequest?v3.0.0.0&' + new Date().getTime() + '&sid=' + $('#sid').val() + '&u=' + Base64.encode(ABSOLUTE_URL_TO_PRINT_JOB_CONTROLLER));
                    
                });
            </script> 

    <div  ng-controller="BookingCtrl" >

        <div id="wcppDetection">
            <div id="msgInProgress">
                <div id="mySpinner" style="width:32px;height:32px"></div>
                <br />
                <h3>Detecting WCPP utility at client side...</h3>
                <h3>Please wait a few seconds...</h3>
                <br />
            </div>
            <div id="msgInstallWCPP" style="display:none;">
                <h3>#1 Install WebClientPrint Processor (WCPP)!</h3>
                <p>
                    <strong>WCPP is a native app (without any dependencies!)</strong> that handles all print jobs
                    generated by the <strong>WebClientPrint for ASP.NET component</strong> at the server side. The WCPP
                    is in charge of the whole printing process and can be
                    installed on <strong>Windows, Linux, Mac & Raspberry Pi!</strong>
                </p>
                <p>
                    <a href="//www.neodynamic.com/downloads/wcpp/" target="_blank">Download and Install WCPP from Neodynamic website</a><br />
                </p>
                <h3>#2 After installing WCPP...</h3>
                <p>
                    <a href="#" onclick="javascript:$('#wcppDetection').hide();$('#printSection').show();">You can go and test the printing page...</a>
                </p>


            </div>
            
            
            <input type="hidden" id="sid" name="sid" ng-value="sid" />
            

        </div>

        <div id="printSection" style="display:none;">
            <h1>How to print multiple files to client printers from ASP.NET</h1>
            Please change the source code to match your printer names and files to test it locally
            <br /><br />
            <input type="button" style="font-size:18px" 


            onclick="javascript:jsWebClientPrint.print();" value="Print Files..." />


           


        </div>
    </div>

    


