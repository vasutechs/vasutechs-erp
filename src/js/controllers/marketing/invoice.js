erpConfig.moduleFiles.invoice = function(context) {
    var orgItemVal = null,
        delMapItemVal = [];
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            delMapItemVal = [];
            context.controller.orgItemVal = orgItemVal;
        },
        callBackSetAutoGenKey: function() {
            var year = context.erpAppConfig.calendarYear;
            context.controller.data[context.controller.form.autoGenKey] = context.controller.data[context.controller.form.autoGenKey] + '/' + year + '-' + ('' + parseInt(year + 1)).substring(2);
        },
        callBackChangeMapping: function(data) {
            context.controller.methods.getPartStockDetail(data);
            context.controller.methods.updateTotalAmount();
        },
        callBackRemoveMapping: function(data, key) {
            if (context.controller.page.name === 'edit' && orgItemVal.mapping[key]) {
                delMapItemVal.push(orgItemVal.mapping[key]);
                delete orgItemVal.mapping.splice(key, 1);
            }

            context.controller.methods.updateTotalAmount();
        },
        callBackAdd: function() {
            delMapItemVal = [];
        },
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
            context.controller.orgItemVal = orgItemVal;
            delMapItemVal = [];
        },
        getPartStockDetail: function(data) {
            var newMapData = [];
            var newOptions = {};
            var partOptions = context.controller.form.mapping.fields['id'].options;
            var prevMapping = angular.copy(context.controller.data.mapping);
            if (data.mapping) {
                newMapData = data.mapping.filter(function(item) {
                    var isExistPart = (context.controller.partStock && context.controller.partStock[item.id + '-' + context.erpAppConfig.finalStageOpp] && parseInt(context.controller.partStock[item.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty) > 0);
                    item.isExistPart = isExistPart;
                    if (context.controller.partStock[item.id + '-' + context.erpAppConfig.finalStageOpp]) {
                        item.operationFrom = context.controller.partStock[item.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                        item.operationTo = context.controller.partStock[item.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                    }
                    return isExistPart;
                });
                if (newMapData.length > 0) {
                    data.mapping = newMapData;
                }
                for (var item in partOptions) {
                    if (partOptions.hasOwnProperty(item) && (context.controller.partStock && context.controller.partStock[item + '-' + context.erpAppConfig.finalStageOpp] && parseInt(context.controller.partStock[item + '-' + context.erpAppConfig.finalStageOpp].partStockQty) > 0)) {
                        newOptions[item] = partOptions[item];
                    }
                }
                context.controller.form.mapping.fields['id'].options = newOptions;
            } else {
                delete prevMapping.splice(prevMapping.length - 1, 1);
                if (context.commonFact.findObjectByKey(prevMapping, 'id', data.id)) {
                    context.controller.data.mapping[context.controller.data.mapping.length - 1] = angular.extend({}, context.controller.masterData.mapping[0]);
                } else if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                    data.operationFrom = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                    data.operationTo = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                }
            }

        },
        updateTotal: function(data, updateValue, field, fieldKey) {
            var partDetail = context.controller.form.mapping.fields['id'].options[data.id],
                totalBeforTax = 0,
                partStock = 0;

            if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                partStock = parseInt(context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty);
                if (context.controller.page.name === 'edit' && orgItemVal.mapping[fieldKey]) {
                    partStock += parseInt(orgItemVal.mapping[fieldKey].unit);
                }
                data.unit = partStock < data.unit ? null : data.unit;
            }

            totalBeforTax = data.unit * data.rate;

            data.amount = parseFloat(totalBeforTax).toFixed(2);
            context.controller.methods.updateTotalAmount();

        },
        updateTotalAmount: function() {
            var taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                igstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.controller.data.mapping;

            for (var i in mapping) {
                subTotal += mapping[i].amount && parseFloat(mapping[i].amount) || 0;
            }

            if (context.controller.cashBill === false) {

                cgstTotal = context.controller.data.cgst && (parseFloat(subTotal) * parseFloat(context.controller.data.cgst / 100)) || 0;
                sgstTotal = context.controller.data.sgst && (parseFloat(subTotal) * parseFloat(context.controller.data.sgst / 100)) || 0;
                igstTotal = context.controller.data.igst && (parseFloat(subTotal) * parseFloat(context.controller.data.igst / 100)) || 0;
                taxRateTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));

                total = subTotal + taxRateTotal;
                context.controller.data.gst = context.controller.data.gst;
                context.controller.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.controller.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
                context.controller.data.igstTotal = parseFloat(igstTotal).toFixed(2);
            } else {
                total = subTotal;
            }

            context.controller.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.controller.data.total = Math.round(total);
            if (context.controller.cashBill) {
                context.controller.methods.updatePreBalance();
            }
        },
        updatePreBalance: function() {
            var total = parseFloat(context.controller.data.subTotal);
            if (context.controller.data.preBalance) {
                total = total + parseFloat(context.controller.data.preBalance);
            }
            context.controller.data.total = Math.round(total);
        },
        updateInvoicePartStock: function(del) {
            var mapStockUpdate = function(map, key, delMap) {
                var data = angular.copy(map);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                if (!del && !delMap) {
                    if (orgItemVal && orgItemVal.id && orgItemVal.mapping[key]) {
                        data.acceptedQty = parseInt(orgItemVal.mapping[key].unit) - parseInt(map.unit);
                    } else {
                        data.acceptedQty = 0 - parseInt(map.unit);
                    }
                } else {
                    data.acceptedQty = parseInt(map.unit);
                }
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.controller.data.mapping) {
                mapStockUpdate(context.controller.data.mapping[i], i, false);
            }
            for (var j in delMapItemVal) {
                mapStockUpdate(delMapItemVal[j], j, true);
            }

        },
        updateCustomerDetail: function() {
            var promiseRes = context.commonFact.getPromiseRes();
            var customerMaster;
            var customerMasterMap;
            var update = function(inputData) {
                return context.commonFact.updateData('marketing.customerMaster', inputData).then(function(res) {
                    var data = res.data;
                    return data;
                });
            };
            if (context.controller.data.customerCode) {
                context.commonFact.getData('marketing.customerMaster', context.controller.data.customerCode).then(function(res) {
                    customerMaster = angular.copy(res.data);
                    for (var i in context.controller.data.mapping) {
                        customerMasterMap = angular.copy(context.controller.data.mapping[i]);
                        if (!context.commonFact.findObjectByKey(customerMaster.mapping, 'id', context.controller.data.mapping[i].id)) {
                            delete customerMasterMap.unit;
                            delete customerMasterMap.amount;
                            delete customerMasterMap.operationFrom;
                            delete customerMasterMap.operationTo;
                            customerMaster.mapping.push(customerMasterMap);
                        }
                    }
                    update(customerMaster).then(function() {
                        promiseRes.resolve();
                    });
                });
            } else {
                customerMaster = {
                    customerName: context.controller.form.fields.customerCode.autoCompleteModel,
                    address: context.controller.data.address,
                    contactNo: 0,
                    gstin: context.controller.data.gstin,
                    mapping: angular.copy(context.controller.data.mapping),
                    gst: context.controller.data.gst,
                    cgst: context.controller.data.cgst,
                    sgst: context.controller.data.sgst,
                    igst: context.controller.data.igst
                };
                for (var i in customerMaster.mapping) {
                    delete customerMaster.mapping[i].unit;
                    delete customerMaster.mapping[i].amount;
                    delete customerMaster.mapping[i].operationFrom;
                    delete customerMaster.mapping[i].operationTo;
                }
                update(customerMaster).then(function(newCustomerMaster) {
                    context.controller.data.customerCode = newCustomerMaster.id;
                    newCustomerMaster.customerCode = context.controller.data.customerCode;
                    update(newCustomerMaster);
                    promiseRes.resolve();
                });
            }


            return promiseRes.promise;
        },
        invoiceSubmit: function() {
            context.controller.methods.updateCustomerDetail().then(function() {
                context.commonFact.submit();
            });

        },
        callBackSubmit: function() {
            context.controller.methods.updateInvoicePartStock();
        },
        callBeforeDelete: function(id, item) {
            context.controller.data = item;
            context.controller.methods.updateInvoicePartStock(true);
        },
        invoicePartUpdate: function(data, key, field, fieldMapKey) {
            context.commonFact.changeMapping(data, key, field, fieldMapKey);
            data['rate'] = context.commonFact.getRate(field.options[key]);
        },
        updatePartMapData: function(data, key, field, fieldMapKey) {
            for (var dataKey in data) {
                if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                    if (key === null || key === '') {
                        data[dataKey] = angular.copy(context.controller.masterData[dataKey]);
                    } else if (key !== undefined && field.options[key] && field.options[key][dataKey]) {
                        if (typeof(field.options[key][dataKey]) !== 'object') {
                            data[dataKey] = field.options[key][dataKey];
                        }
                    }
                }
            }
        }
    };
};

erpConfig.moduleFiles.cashBill = erpConfig.moduleFiles.invoice;