module.filter('jsonDate', function ($filter) {
    return function (input, format) {

        if (input == 'N/A') {
            return 'N/A';
        }

        if (input == null || input == '') {
            return '';
        }

        return $filter('date')(parseInt(input.substr(6)), format);
    };
})
.filter("jsDate", function () {
    return function (x) {
        return new Date(parseInt(x.substr(6)));
    };
})
.filter('jsonDateTHAI', function ($filter) {
    return function (input, format) {

        if (input == 'N/A') {
            return 'N/A';
        }

        if (input == null || input == '') {
            return '';
        }


        var millies = 1000 * 60 * 60 * 24 * 365 * 543;
        var d = new Date(parseInt(input.substr(6)));
        var newDate = new Date((d.getMonth() + 1)  + '-' + d.getDate()+ '-' + (d.getFullYear() + 543));
        return moment((d.getMonth() + 1)  + '-' + d.getDate()+ '-' + (d.getFullYear() + 543), "MM-DD-YYYY").format(format);
    };
})
.filter('jsonDateEN', function ($filter) {
    return function (input, format) {

        if (input == 'N/A') {
            return 'N/A';
        }

        if (input == null || input == '') {
            return '';
        }
        
        return moment(parseInt(input.substr(6))).locale("en").format(format);
    };
});