module.filter('lswDate', function ($filter) {
    return function (input, formatCurrent, formatTo) {
        if(angular.isUndefined(input) || input == null)
        {
            return '-';
        }
        //Check format and replace dd MMMM yyyy
        //YEAR
        formatCurrent = formatCurrent.replace("yyyy", "YYYY");
        formatTo = formatTo.replace("yyyy", "YYYY");

        //DAT
        formatCurrent = formatCurrent.replace("dd", "DD");
        formatTo = formatTo.replace("dd", "DD");
        

        if(input instanceof Date)
        {
            return moment(input).format(formatTo);
        }
        else
        {
            return moment(input, formatCurrent).format(formatTo);
        }
    };
});