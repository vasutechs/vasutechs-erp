erpApp.controller('empPaymentCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackAdd: function(context) {
            context.data['toDate'] = new Date();
        },
        getProductionEntry: function(context) {
            var frmDate = context.data.frmDate;
            var toDate = context.data.toDate;
            var filterOperator = context.data.employeeCode;
            var empPaidList = context.actions.getEmpPaymentPaid(context);
            return context.actions.getData('report.productionEntryReport').then(function(res) {
                var productionEntry = res.data;
                var productionEntryList = {};
                for (var i in productionEntry) {
                    for (var j in productionEntry[i].mapping) {
                        var date = new Date(productionEntry[i].mapping[j].date);
                        var operator = productionEntry[i].mapping[j].operator;
                        var objKey = productionEntry[i].mapping[j].operator + '-' + productionEntry[i].partNo + '-' + productionEntry[i].mapping[j].operationTo;
                        if ((!filterOperator || (operator === filterOperator)) &&
                            (!frmDate || (frmDate && new Date(frmDate) <= date)) &&
                            (!toDate || toDate && new Date(toDate) >= date) &&
                            (!empPaidList[objKey] || (empPaidList[objKey] && new Date(empPaidList[objKey].productionEntryDate) < date))) {

                            var qty = parseInt(productionEntry[i].mapping[j].acceptedQty) || 0;
                            if (productionEntryList[objKey]) {
                                qty += productionEntryList[objKey].qty;
                            }

                            var details = {
                                partNo: productionEntry[i].partNo,
                                operationTo: productionEntry[i].mapping[j].operationTo,
                                operator: productionEntry[i].mapping[j].operator,
                                qty: qty,
                                productionEntryKey: objKey,
                                productionEntryDate: productionEntry[i].mapping[j].date,
                                date: null
                            };
                            productionEntryList[objKey] = details;

                        }
                    }
                }
                return productionEntryList;
            });

        },
        getEmpPaymentPaid: function(context) {
            var listViewData = angular.copy(context.listViewDataMaster);
            var filterOperator = context.data.employeeCode;
            var empPaidList = {};

            for (var i in listViewData) {
                var operator = listViewData[i].employeeCode;
                if (!filterOperator || (operator === filterOperator)) {
                    for (var j in listViewData[i].mapping) {
                        empPaidList[listViewData[i].mapping[j].productionEntryKey] = listViewData[i].mapping[j];
                    }
                }
            }
            return empPaidList;
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        addPartMap: function(context, data) {
            context.actions.changeMapping(context, data, data.employeeCode, context.form.fields['employeeCode']);
        },
        callBackChangeMapping: function(context, data, key, field, fieldMapKey) {
            context.actions.updatePartMap(context, data, key, field, fieldMapKey);
        },
        updatePartMap: function(context, data, key, field, fieldMapKey) {

            context.actions.getProductionEntry(context).then(function(productionEntryList) {
                var total = 0;
                var employeeCode = context.data.employeeCode;
                var newMapData = [];
                newMapData = context.data.mapping.filter(function(data) {
                    var mapFindKey = employeeCode + '-' + data.id + '-' + data.operationTo;
                    if (productionEntryList[mapFindKey] && productionEntryList[mapFindKey].qty > 0) {
                        data = angular.extend(data, angular.copy(productionEntryList[mapFindKey]));
                        data.totalLaborCost = parseInt(productionEntryList[mapFindKey].qty * data.laborCost);
                        total += data.totalLaborCost;
                        return true;
                    }
                });
                context.data.mapping = newMapData;
                context.data.total = total;
                context.data.balanceAmount = context.data.total;
            });

        },
        updateBalanceAmount: function(context, data, key, field) {
            var amount = context.data.balanceAmount;
            if (data.paidStatus) {
                amount -= parseInt(data.totalLaborCost);
            } else {
                amount += parseInt(data.totalLaborCost);
            }
            data.date = new Date();
            context.data.balanceAmount = amount;
        }
    };

    commonFact.initCtrl($scope, 'accounts.empPayment', actions);

}]);