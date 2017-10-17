module.filter('unique', function () {
    return function (setA, key) {

        if (angular.isDefined(key)) {
            var hashTable = [];
            var complement = [];
            var index;

            for (var i = 0; i < setA.length; i++) {
                index = angular.isDefined(key) ? setA[i][key] : setA[i];
                index = index.toString().trim().toLowerCase();
                if (!hashTable[index]) {
                    complement.push(setA[i]);
                }
                hashTable[index] = true;
            }

            return complement;
        } else {
            return setA;
        }
    }
});