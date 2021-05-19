erpConfig.moduleFiles.empPayment = function(context) {
    return {
		callBackList: function () {
            context.commonFact.accountsPayment();
        },
        callBackAdd: function() {
            context.controller.data['toDate'] = new Date();
        },
        getProductionEntry: function() {
            var frmDate = context.controller.data.frmDate;
            var toDate = context.controller.data.toDate;
            var filterOperator = context.controller.data.employeeCode;
            var empPaidList = context.controller.methods.getEmpPaymentPaid();
            return context.commonFact.getData('report.productionEntryReport').then(function(res) {
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
        getEmpPaymentPaid: function() {
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var filterOperator = context.controller.data.employeeCode;
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
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        addPartMap: function(data) {
            context.commonFact.changeMapping(data, data.employeeCode, context.controller.form.fields['employeeCode']);
        },
        callBackChangeMapping: function(data, key, field, fieldMapKey) {
            context.controller.methods.updatePartMap(data, key, field, fieldMapKey);
        },
        updatePartMap: function() {

            context.controller.methods.getProductionEntry().then(function(productionEntryList) {
                var total = 0;
                var employeeCode = context.controller.data.employeeCode;
                var newMapData = [];
                newMapData = context.controller.data.mapping.filter(function(data) {
                    var mapFindKey = employeeCode + '-' + data.id + '-' + data.operationTo;
                    if (productionEntryList[mapFindKey] && productionEntryList[mapFindKey].qty > 0) {
                        data = angular.extend(data, angular.copy(productionEntryList[mapFindKey]));
                        data.totalLaborCost = parseInt(productionEntryList[mapFindKey].qty * data.laborCost);
                        total += data.totalLaborCost;
                        return true;
                    }
                });
                context.controller.data.mapping = newMapData;
                context.controller.data.total = total;
                context.controller.data.balanceAmount = context.controller.data.total;
            });

        },
        updateBalanceAmount: function(data) {
            var amount = context.controller.data.balanceAmount;
            if (data.paidStatus) {
				data.amount = data.totalLaborCost;
				data.date = new Date();
                amount -= parseInt(data.totalLaborCost);
            } else {
				data.amount = null;
				data.date = null;
                amount += parseInt(data.totalLaborCost);
            }
            
            context.controller.data.balanceAmount = amount;
        }
    };
};