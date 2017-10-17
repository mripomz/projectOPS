module.filter('lswIndexOf', function () {
    return function (items, item, attr) {
       
        if (!!attr && !!item[attr]) {
            for (var i = 0; i < items.length; i++) {
                if (angular.equals(items[i][attr], item[attr]))
                    return i;
            }
            return -1;
        }
        else {
            for (var i = 0; i < items.length; i++) {
                if (angular.equals(items[i], item))
                    return i;
            }
            return -1;
        }
    }
});