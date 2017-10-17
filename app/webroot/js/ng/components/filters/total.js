module.filter('total', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || data == null || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i][key] != null)
                sum += parseFloat(data[i][key]);
        }

        return sum;
    };
});

module.filter('totalWithIndex', function () {
    return function (data, key, keyIndex, index) {
        if (typeof (data) === 'undefined' || data == null || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        
        for (var i = data.length - 1; i >= 0; i--) {
            //console.log(data[i][keyIndex][index][key]);
            if (data[i][keyIndex].length > 0 && data[i][keyIndex][index][key] != null)
                sum += parseFloat(data[i][keyIndex][index][key]);
        }

        return sum;
    };
});

module.filter('totalFilterExcept', function () {
    return function (data, key, filterKey, valueKey) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i][key] != null && data[i][filterKey] != valueKey)
                sum += parseFloat(data[i][key]);
        }

        return sum;
    };
});

module.filter('totalCount', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i][key] != null)
                sum ++;
        }

        return sum;
    };
});

module.filter('totalFilterCount', function () {
    return function (data, key, valueKey) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i][key] != null && data[i][key] == valueKey)
                sum ++;
        }

        return sum;
    };
});