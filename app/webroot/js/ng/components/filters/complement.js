module.filter('complement', function () {
    return function (setA, setB, key) {

        if (angular.isDefined(setB) && setB != false) {
            hashTable = [];
            complement = [];

            for (var i = 0; i < setB.length; i++) {
                index = angular.isDefined(key) ? setB[i][key] : setB[i];
                index = index.toString().trim().toLowerCase();

                hashTable[index] = true;
            }

            for (var i = 0; i < setA.length; i++) {
                index = angular.isDefined(key) ? setA[i][key] : setA[i];
                index = index.toString().trim().toLowerCase();

                if (!hashTable[index]) {
                    complement.push(setA[i]);
                }
            }

            return complement;
        } else {
            return setA;
        }
    };
});