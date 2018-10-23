erpApp.controller('invoiceCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', function(erpAppConfig, $scope, commonFact, $location) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        callBackSetAutoGenKey: function(context) {
            var year = new Date().getFullYear();
            context.data[context.form.autoGenKey] = context.data[context.form.autoGenKey] + '/' + year;
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.getPartStockDetail(context, data, key, field);
        },
        getPartStockDetail: function(context, data, key, field) {
            var newMapData = [];
            newMapData = context.data.mapping.filter(function(data) {
                if (context.partStock[data.id + '-' + erpAppConfig.finalStageOpp]) {
                    data.operationFrom = context.partStock[data.id + '-' + erpAppConfig.finalStageOpp].operationFrom;
                    data.operationTo = context.partStock[data.id + '-' + erpAppConfig.finalStageOpp].operationTo;
                }

                return (context.partStock && context.partStock[data.id + '-' + erpAppConfig.finalStageOpp] && parseInt(context.partStock[data.id + '-' + erpAppConfig.finalStageOpp].partStockQty) > 0);
            });
            context.data.mapping = newMapData;
        },
        updateTotal: function(context, data, updateValue) {
            var partDetail = context.form.mapping.fields['id'].options[data.id],
                taxRate = 0,
                cgst = 0,
                sgst = 0,
                totalBeforTax = 0;

            if (context.partStock[data.id + '-' + erpAppConfig.finalStageOpp]) {
                data.unit = context.partStock[data.id + '-' + erpAppConfig.finalStageOpp].partStockQty < data.unit ? null : data.unit;
            }

            totalBeforTax = data.unit * data.rate;

            data.amount = parseFloat(totalBeforTax).toFixed(2);
            data.cgst = partDetail.cgst;
            data.sgst = partDetail.sgst;
            data.taxRate = partDetail.gst;

            context.actions.updateTotalAmount(context);

        },
        updateTotalAmount: function(context) {
            var taxRate = 0,
                cgst = 0,
                sgst = 0,
                taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.data.mapping;

            for (var i in mapping) {
                cgst += mapping[i].cgst;
                sgst += mapping[i].sgst;
                taxRate += mapping[i].taxRate;

                cgstTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].cgst / 100));
                sgstTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].sgst / 100));
                taxRateTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].taxRate / 100));
                subTotal += parseFloat(mapping[i].amount);
            }

            if (context.cashBill === false) {
                total = subTotal + cgstTotal + sgstTotal;
                context.data.taxRate = parseInt(taxRate) / mapping.length;
                context.data.cgst = parseInt(cgst) / mapping.length;
                context.data.sgst = parseInt(sgst) / mapping.length;
                context.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
            } else {
                total = subTotal;
            }

            context.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.data.total = parseFloat(total).toFixed(2);
        },
        updateInvocePartStock: function(context) {
            for (var i in context.data.mapping) {
                // context.actions.getData('report.partStock').then(function(res) {
                //     var partStockData = res.data,
                //         partStock = {};
                //     for (var j in partStockData) {
                //         partStock[partStockData[j].partNo + '-' + partStockData[j].operationFrom + '-' + partStockData[j].operationTo] = partStockData[j] && partStockData[j] || undefined;
                //         partStock[partStockData[j].partNo + '-' + partStockData[j].operationTo] = partStockData[j] && partStockData[j] || undefined;
                //     }
                //     var existingStock = partStock[context.data.mapping[i].id + '-' + erpAppConfig.finalStageOpp];

                //     var partStockQty = parseInt(existingStock.partStockQty) - parseInt(context.data.mapping[i].unit);
                //     var data = {
                //         id: existingStock.id,
                //         partNo: existingStock.partNo,
                //         partStockQty: partStockQty,
                //         operationFrom: existingStock.operationFrom,
                //         operationTo: existingStock.operationTo
                //     }

                //     context.actions.updateData('report.partStock', data);
                // });

                var data = angular.copy(context.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.acceptedQty = 0 - parseInt(context.data.mapping[i].unit);
                newContext.data = data;
                newContext.updatePrevStock = false;
                context.actions.updatePartStock(newContext);

            }

        },
        callBackSubmit: function(context) {
            context.actions.updateInvocePartStock(context);
        }
    });
    if ($location.search() && $location.search()['type'] === 'cashBill') {
        $scope.context = angular.merge({}, angular.copy(erpAppConfig.modules.marketing.invoice), erpAppConfig.modules.marketing.cashBill);
        $scope.context.cashBill = true;
    } else {
        $scope.context = erpAppConfig.modules.marketing.invoice;
        $scope.context.cashBill = false;
    }

    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]).
directive('entryInvoice', function() {
    var entryInvoice = function($scope, element, attrs) {
        element.ready(function() {
            for (var i in $scope.context.form.fields) {
                if ($scope.context.form.fields[i].type === 'select') {
                    if ($scope.context.page.printView) {
                        $scope.context.actions.replaceViewDataVal($scope.context.data, $scope.context.form.fields[i]);
                    } else {
                        $scope.context.actions.makeOptionsFields($scope.context.form.fields[i]);
                    }
                }
            }

            for (var i in $scope.context.form.mapping.fields) {

                if ($scope.context.form.mapping.fields[i].type === 'select') {
                    if ($scope.context.page.printView) {
                        $scope.context.actions.replaceViewDataVal($scope.context.data.mapping, $scope.context.form.mapping.fields[i]);
                    } else {
                        $scope.context.actions.makeOptionsFields($scope.context.form.mapping.fields[i]);
                    }
                }

            }
        });
    };

    return {
        restrict: 'E',
        templateUrl: 'template/components/entryInvoice.html',
        link: entryInvoice
    };
});