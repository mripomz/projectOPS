angular.module('barcodeExample', ['barcode'])
                .controller('Controller', ['$scope', function ($scope) {barcode
                    var vm = this;

                    vm.options = {
                        width: 2,
                        height: 100,
                        quite: 10,
                        displayValue: true,
                        font: "monospace",
                        textAlign: "center",
                        fontSize: 12,
                        backgroundColor: "",
                        lineColor: "#000"
                    };
                    var barcodes = [
                        {
                            type: "ean",
                            code: "0029000018068"
                        },
                        {
                            type: "upc",
                            code: "029000018068"
                        },
                        {
                            type: "code39",
                            code: "Code39 Barcode"
                        },
                        {
                            type: "code128b",
                            code: "Code128B Barcode"
                        },
                        {
                            type: "code128c",
                            code: "22"
                        },
                        {
                            type: "itf",
                            code: "1234567895"
                        },
                        {
                            type: "itf14",
                            code: "98765432109213"
                        }
                    ];

                    vm.mycode = {};
                    vm.mycode.type = "ean";
                    vm.mycode.code = "0029000018068";

                    var i = 0;

                    setInterval(
                            function () {
                                if (i < barcodes.length) {
                                    vm.mycode.type = barcodes[i].type;
                                    vm.mycode.code = barcodes[i].code;
                                    i++;
                                } else {
                                    i = 0;
                                }
                                $scope.$apply();
                            },
                            1000);
                }]);