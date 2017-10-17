module.service('Modals', function ($rootScope, $modal, $alert) {

    $rootScope.modal = {
        title : "",
        content : ""
    }

    $rootScope.alert = {
        content : ""
    }

    var alertSuccess = $alert({title: 'สถานะ', content: 'ระบบอัพเดทข้อมูลให้เรียบร้อยแล้ว', placement: 'bottom-right', type: 'success', show: false, duration: 5, container : "body"});
    var alertFail = $alert({title: 'สถานะ', content: 'ไม่สามารถอัพเดทข้อมูลได้ในขณะนี้ โปรดติดต่อเจ้าหน้าที่', placement: 'bottom-right', type: 'danger', show: false, duration: 5, container : "body"});

    var serviceModal = null;
    var serviceAlert = null;

    var setModal = function(title, content)
    {
        $rootScope.modal.title = title;
        $rootScope.modal.content = content;
    }

    var showError = function()
    {
        serviceModal = $modal({ scope: $rootScope, templateUrl: rootUrl + 'modals/Helpers/alert-modal.html', show: false });
        serviceModal.$promise.then(serviceModal.show);
    }

    var setAlert = function(content)
    {
        $rootScope.alert.content = content;
    }

    var showAlertSuccess = function()
    {
        serviceAlert = $alert({title: 'สถานะ', content: 'ระบบอัพเดทข้อมูลให้เรียบร้อยแล้ว', placement: 'bottom-right', type: 'success', show: false, duration: 5, container : "body"});
        serviceAlert.$promise.then(serviceAlert.show);
    }

    var showAlertFail = function()
    {
        serviceAlert = $alert({title: 'สถานะ', content: $rootScope.alert.content, placement: 'bottom-right', type: 'danger', show: false, duration: 5, container : "body"});
        serviceAlert.$promise.then(serviceAlert.show);
    }

    return {
        setModal : setModal,
        showError : showError,
        setAlert : setAlert,
        showAlertSuccess : showAlertSuccess,
        showAlertFail : showAlertFail
    };
});