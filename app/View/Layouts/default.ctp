
<html ng-app="app" lang="en" class="fullscreen-bg">
<head>
	
	<title>
		OPS
	</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<?php
		echo $this->Html->meta('icon');

		//CSS
		echo $this->Html->css(
			array(
				"bootstrap.min.css",
                "font-awesome.min.css",
				"style.css",
				"chartist-custom.css",
				"main.css",
                
			)
		);

		  //CORE LIB
    echo $this->Html->script(
      array(
        "core/vendor/core/all.js",
        "core/vendor/forms/all.js",
        "core/vendor/tree/jquery.fancytree-all.js",
        "core/app/layout.js",
        "core/app/sidebar.js",
        "core/app/essentials.js",
        "core/vendor/moment/moment.js",
        "core/vendor/moment/moment-with-locales.js",
        "core/vendor/moment/moment-with-locales.js",
      )
    );


    //ANGULAR
    echo $this->Html->script(
        array(
            "ng/lib/lodash/lodash.js",
            "angular/angular.js",
            "angular/angular-sanitize.min.js",
            "angular/angular-cookies.min.js",
            "angular/i18n/angular-locale_th-th.js",
            "angular/ngStorage.min.js"
        )
    );

    //LIB ANGULAR
    echo $this->Html->script(
        array(
            "ng/lib/angular-facebook/ngFacebook.js",
            "ng/lib/angular-translate/angular-translate.min.js",
            "ng/lib/angular-strap/angular-strap.js",
            "ng/lib/angular-strap/angular-strap.tpl.js",
            "ng/lib/angular-strap/angular-strap-lightbox.min.js",
            "ng/lib/angular-loading-bar/loading-bar.min.js",
            "ng/lib/jquery-upload/load-image.all.min.js",
            "ng/lib/jquery-upload/canvas-to-blob.min.js",
            "ng/lib/jquery-upload/jquery.blueimp-gallery.min.js",
            "ng/lib/jquery-upload/jquery.fileupload.js",
            "ng/lib/jquery-upload/jquery.iframe-transport.js",
            "ng/lib/jquery-upload/jquery.fileupload-process.js",
            "ng/lib/jquery-upload/jquery.fileupload-image.js",
            "ng/lib/jquery-upload/jquery.fileupload-audio.js",
            "ng/lib/jquery-upload/jquery.fileupload-video.js",
            "ng/lib/jquery-upload/jquery.fileupload-validate.js",
            "ng/lib/jquery-upload/jquery.fileupload-angular.js",
            "ng/lib/fcsa-number/fcsaNumber.min.js",
            "ng/lib/angular-filter/angular-filter.js",
            "ng/lib/angular-color-picker/bootstrap-colorpicker-module.js",
            "ng/lib/angular-simple-logger/angular-simple-logger.js",
            "ng/lib/angular-googlemap/angular-google-maps.js",
            "ng/lib/angular-googlemap/angular-google-maps.js",
            "ng/lib/angular-upload-image/angular-uploads.js",
            "ng/lib/angular-upload-image/angular-uploads.min.js",
            "ng/lib/angular-ng-flow-master/ng-flow-standalone.js",
            "ng/lib/angular-ng-flow-master/ng-flow-standalone.min.js",
            "ng/lib/angular-barcode-master/angular-barcode.js",
            "ng/lib/angular-ng-file-upload/ng-file-upload-shim.js",
            "ng/lib/angular-ng-file-upload/ng-file-upload.js",
            "ng/lib/angular-ng-file-upload/ng-file-upload-shim.min.js",
            "ng/lib/angular-ng-file-upload/ng-file-upload.min.js",
            "ng/lib/qrcodejs/qrcode.js",
            "ng/lib/angular-text/textAngular-rangy.min.js",
            "ng/lib/angular-text/textAngular-sanitize.min.js",
            "ng/lib/angular-text/textAngular.min.js",
        )
    );
   
    
  
    
    //App setting
    echo $this->Html->script(
        array(
            "ng/app/app.js"
        )
    );

    //Service Directive
    echo $this->Html->script(
        array(
            "ng/components/directives/lsw-table/lsw-table.js",
            "ng/components/directives/lsw-compare/lsw-compare.js",
            "ng/components/directives/ng-really/ng-really.js",
            "ng/components/directives/lsw-paginate/lsw-paginate.js",
            "ng/components/directives/lsw-scroll-top/lsw-scroll-top.js",
            "ng/components/directives/lsw-only-digit/lsw-only-digit.js",
            "ng/components/directives/counter/counter.js",
            "ng/components/directives/lsw-select/lsw-select.js",
            "ng/components/directives/lsw-display-status/lsw-display-status.js",
            "ng/components/directives/counter/CounterTextLength.js",
            "ng/components/directives/lsw-picture-media-preview/angular-media-preview.module.js",
            "ng/components/directives/lsw-picture-media-preview/angular-media-preview.js",
            "ng/components/directives/lsw-image-drag-Drop/lsw-fileDropzone.js",
            "ng/components/directives/lsw-image-drag-Drop/lsw-fileread.js",


        )
    );
    /////directive for lsw-angular-upload-image
    echo $this->Html->script(
        array(
            "ng/components/directives/lsw-angular-upload-image/msl-uploads.js",
            "ng/components/directives/lsw-angular-upload-image/msl-dnd-file-input.js",
            "ng/components/directives/lsw-angular-upload-image/msl-dnd-folder-input.js",
            "ng/components/directives/lsw-angular-upload-image/msl-dnd-item.js",
            "ng/components/directives/lsw-angular-upload-image/msl-dnd-target.js",
            "ng/components/directives/lsw-angular-upload-image/msl-file-input.js",
            "ng/components/directives/lsw-angular-upload-image/msl-folder-input.js",
        )
    );

     /////directive for ng-flow-master
    echo $this->Html->script(
        array(
        "ng/components/directives/lsw-angular-ng-flow-master/appDragstart.js",
            "ng/components/directives/lsw-angular-ng-flow-master/appDownloadUrl.js",
            
            "ng/components/directives/lsw-angular-ng-flow-master/appDragend.js",
        )
    );



    echo $this->Html->script(
        array(
            "ng/components/services/requestServiceRegister.js",
            "ng/components/services/requestService.js",
            "ng/components/services/Users/UsersService.js",
            "ng/components/services/Accounts/AccountsService.js",
            "ng/components/services/Helpers/HelpersService.js",
            "ng/components/services/Helpers/ModalsService.js",
            "ng/components/services/Locations/LocationsService.js",
            "ng/components/services/Pages/PagesService.js",
            "ng/components/services/Assets/AssetsService.js",
            "ng/components/services/SeatCapacityArrangement/SeatCapacityArrangementService.js",
            "ng/components/services/Notifications/NotificationService.js",
            "ng/components/services/Routes/RoutesService.js",
            "ng/components/services/Sales/SalesService.js",
            "ng/components/services/Payment/DiscountService.js",
            "ng/components/services/Payment/TicketsService.js",
            "ng/components/services/Passengers/PassengerService.js",
            "ng/components/services/Reports/ReportsService.js",
            "ng/components/services/Agency/AgencyService.js",
            "ng/components/services/Banks/BanksService.js",
            "ng/components/services/Accounting/AccountingService.js",
            "ng/components/services/PickupDropoff/PickupDropoffService.js",
            "ng/components/services/Blog/BlogService.js",
        )
    );

    echo $this->Html->script(
        array(
          "ng/components/filters/json-date.js",
          "ng/components/filters/lsw-index-of.js",
          "ng/components/filters/lsw-custom-date.js",
          "ng/components/filters/complement.js",
          "ng/components/filters/unique.js",
          "ng/components/filters/total.js",
          "ng/components/filters/covertDBToMonth.js",
          "ng/components/filters/lsw-roundup.js",
        )
    );

    //Controller
    echo $this->Html->script(
        array(
            "ng/controller/Users/UsersController.js",
            "ng/controller/Users/SalesController.js",
            "ng/controller/Users/AgencySettingController.js",
            "ng/controller/Users/SalesAgencyController.js",

            "ng/controller/Agency/AgencyController.js",
            "ng/controller/Agency/TopupController.js",
            "ng/controller/Agency/InformTransferController.js",
            "ng/controller/Agency/WithdrawalController.js",
            "ng/controller/Agency/AgencyHistoryController.js",
            "ng/controller/Agency/AgencyBookingController.js",
            "ng/controller/Agency/PaymentController.js",

            "ng/controller/Pages/PagesController.js",
            "ng/controller/Pages/PagesRolesController.js",

            "ng/controller/Asset/AssetController.js",
            "ng/controller/Asset/VehicleTypeController.js",

            "ng/controller/SeatCapacityArrangement/SeatCapacityArrangementController.js",

            "ng/controller/Routes/RouteController.js",
            "ng/controller/Routes/StopPointController.js",
            "ng/controller/Routes/VehicleOperationController.js",
            "ng/controller/Routes/VehicleMultipleOperationController.js",

            "ng/controller/Payment/DiscountController.js",
            "ng/controller/Payment/TicketPaymentTypeController.js",
            "ng/controller/Payment/CostQueueManagementController.js",
            "ng/controller/Bank/AviaBankController.js",

            "ng/controller/Accounting/AccountingInformTransferController.js",
            "ng/controller/Accounting/AccountingWithdrawalController.js",
            "ng/controller/Accounting/AccountingBorrowCreditController.js",
            "ng/controller/Accounting/AccountingDebtorController.js",

            "ng/controller/Reports/ReportsController.js",
            "ng/controller/Reports/ReportsPickupDropoffController.js",
            "ng/controller/Reports/ReportTaxAndInsuranceController.js",

            "ng/controller/Location/LocationController.js",
            "ng/controller/PickupDropoff/LocationPriceController.js",
            "ng/controller/PickupDropoff/PickupDropoffServiceController.js",
            "ng/controller/PickupDropoff/PassengerServiceController.js",
            "ng/controller/blog/BlogController.js",
            "ng/controller/Test/DemoController.js",

        )
    );
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
	?>
</head>
<body>
	<?php echo $this->Flash->render(); ?>
	<?php echo $this->fetch('content'); ?>
</body>
</html>
