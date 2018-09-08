erpApp.controller('invoiceCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', function(erpAppConfig, $scope, commonFact, $location) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackSetAutoGenKey: function(context) {
            var year = new Date().getFullYear();
            context.data[context.form.autoGenKey] = context.data[context.form.autoGenKey] + '/' + year;
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.getPartStockDetail(context, data, key, field);
        },
        getPartStockDetail: function(context, data, key, field) {
            context.partStockDetail = [];
            context.actions.getData('report.partStock').then(function(res) {
                var partStockData = res.data;
                var partNos = [];
                for (var i in partStockData) {
                    if (partStockData[i].operationTo === 7 && partStockData[i].partStockQty > 0 && partStockData[i].partNo === data.id) {
                        partNos.push(partStockData[i].partNo);
                        context.partStockDetail[partStockData[i].partNo] = partStockData[i];
                    }
                }
                if (partNos.length === 0 || partNos.indexOf(data.id) < 0) {
                    angular.extend(data, angular.copy(context.masterData.mapping[0]));
                }
            });
        },
        updateTotal: function(context, data, updateValue) {
            var partDetail = context.form.mapping.fields['id'].options[data.id],
                total = 0,
                totalBeforTax = 0,
                taxRate = 0,
                taxRateTotal = 0,
                cgst = 0,
                sgst = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                total = 0;
            if (context.partStockDetail[data.id]) {
                data.unit = context.partStockDetail[data.id].partStockQty < data.unit ? null : data.unit;
            }
            totalBeforTax = data.unit * data.rate;
            cgst = context.data.mapping.length > 0 ? partDetail.cgst : (context.data.cgst + partDetail.cgst) / context.data.mapping.length;
            sgst = context.data.mapping.length > 0 ? partDetail.sgst : (context.data.sgst + partDetail.sgst) / context.data.mapping.length;
            taxRate = context.data.mapping.length > 0 ? partDetail.gst : (context.data.taxRate + partDetail.gst) / context.data.mapping.length;
            cgstTotal = (totalBeforTax * (cgst / 100));
            sgstTotal = (totalBeforTax * (sgst / 100));
            taxRateTotal = (totalBeforTax * (taxRate / 100));
            data.amount = parseFloat(totalBeforTax).toFixed(2);
            if (context.cashBill === false) {
                total = totalBeforTax + cgstTotal + sgstTotal;
                context.data.taxRate = parseInt(taxRate);
                context.data.cgst = parseInt(cgst);
                context.data.sgst = parseInt(sgst);
                context.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
            } else {
                total = totalBeforTax;
            }

            context.data.totalBeforTax = parseFloat(totalBeforTax).toFixed(2);
            context.data.total = parseFloat(total).toFixed(2);

        },
        updateInvocePartStock: function(context) {
            for (var i in context.data.mapping) {
                context.actions.getData('report.partStock').then(function(res) {
                    var partStockData = res.data,
                        partStock = {};
                    for (var j in partStockData) {
                        partStock[partStockData[j].partNo + '-' + partStockData[j].operationFrom + '-' + partStockData[j].operationTo] = partStockData[j] && partStockData[j] || undefined;
                        partStock[partStockData[j].partNo + '-' + partStockData[j].operationTo] = partStockData[j] && partStockData[j] || undefined;
                    }
                    var existingStock = partStock[context.data.mapping[i].id + '-7'];

                    var partStockQty = parseInt(existingStock.partStockQty) - parseInt(context.data.mapping[i].unit);
                    var data = {
                        id: existingStock.id,
                        partNo: existingStock.partNo,
                        partStockQty: partStockQty,
                        operationFrom: existingStock.operationFrom,
                        operationTo: existingStock.operationTo
                    }

                    context.actions.updateData('report.partStock', data, existingStock.id);
                });
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