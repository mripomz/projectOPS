module.filter('covertDBToMonth', function () {
    return function (x) {
        if(x == 'Jan'){
            return 'มกราคม';
        }
        else if(x == 'Feb') {
            return 'กุมภาพันธ์';
        }
        else if(x == 'Mar'){
            return 'มีนาคม';
        }
        else if(x == 'Apr'){
            return 'เมษายน';
        }
        else if(x == 'May'){
            return 'พฤษภาคม';
        }
        else if(x == 'Jun'){
            return 'มิถุนายน';
            return 'กรกฎาคม';
        }
        else if(x == 'Jul'){
            return 'กรกฎาคม';
        }
        else if(x == 'Aug'){
            return 'สิงหาคม';
        }
        else if(x == 'Sep'){
            return 'กันยายน';
        }
        else if(x == 'Oct'){
            return 'ตุลาคม';
        }
        else if(x == 'Nov'){
            return 'พฤศจิกายน';
        }
        else if(x == 'Dec'){
            return 'ธันวาคม'
        }
        else{

            return 'กรุณาเลือกเดือน';
        }
       
    };
});