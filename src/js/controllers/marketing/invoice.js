erpConfig.moduleFiles.invoice = function(context) {
    var orgItemVal = null,
        delMapItemVal = [];
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            delMapItemVal = [];
        },
        callBackSetAutoGenKey: function() {
            var year = context.erpAppConfig.calendarYear;
            context.data[context.form.autoGenKey] = context.data[context.form.autoGenKey] + '/' + year + '-' + ('' + parseInt(year + 1)).substring(2);
        },
        callBackChangeMapping: function(data, key, field) {
            context.commonFact.getPartStockDetail(data, key, field);
            orgItemVal.mapping = angular.copy(context.data.mapping);
            context.methods.updateTotalAmount();
        },
        callBackRemoveMapping: function(data, key) {
            if (context.page.name === 'edit') {
                delMapItemVal.push(orgItemVal.mapping[key]);
            }
            delete orgItemVal.mapping.splice(key, 1);
        },
        callBackAdd: function() {
            orgItemVal = angular.copy(context.data);
            delMapItemVal = [];
        },
        callBackEdit: function() {
            orgItemVal = angular.copy(context.data);
            delMapItemVal = [];
        },
        getPartStockDetail: function() {
            var newMapData = [];
            newMapData = context.data.mapping.filter(function(data) {
                if (context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                    data.operationFrom = context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                    data.operationTo = context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                }

                return (context.partStock && context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp] && parseInt(context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty) > 0);
            });
            context.data.mapping = newMapData;
        },
        updateTotal: function(data, updateValue, field, fieldKey) {
            var partDetail = context.form.mapping.fields['id'].options[data.id],
                totalBeforTax = 0,
                partStock = 0;

            if (context.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                partStock = parseInt(context.partStock[data.id + '-' + context.erp.finalStageOpp].partStockQty);
                if (context.page.name === 'edit') {
                    partStock += parseInt(orgItemVal.mapping[fieldKey].unit);
                }
                data.unit = partStock < data.unit ? null : data.unit;
            }

            totalBeforTax = data.unit * data.rate;

            data.amount = parseFloat(totalBeforTax).toFixed(2);
            context.methods.updateTotalAmount();

        },
        updateTotalAmount: function() {
            var taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                igstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.data.mapping;

            for (var i in mapping) {
                subTotal += mapping[i].amount && parseFloat(mapping[i].amount) || 0;
            }

            if (context.cashBill === false) {

                cgstTotal = context.data.cgst && (parseFloat(subTotal) * parseFloat(context.data.cgst / 100)) || 0;
                sgstTotal = context.data.sgst && (parseFloat(subTotal) * parseFloat(context.data.sgst / 100)) || 0;
                igstTotal = context.data.igst && (parseFloat(subTotal) * parseFloat(context.data.igst / 100)) || 0;
                taxRateTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));

                total = subTotal + taxRateTotal;
                context.data.taxRate = context.data.gst;
                context.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
                context.data.igstTotal = parseFloat(igstTotal).toFixed(2);
            } else {
                total = subTotal;
            }

            context.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.data.total = Math.round(total);
            if (context.cashBill) {
                context.methods.updatePreBalance();
            }
        },
        updatePreBalance: function() {
            var total = parseFloat(context.data.subTotal);
            if (context.data.preBalance) {
                total = total + parseFloat(context.data.preBalance);
            }
            context.data.total = Math.round(total);
        },
        updateInvoicePartStock: function() {
            var mapStockUpdate = function(map, key, del) {
                var data = angular.copy(map);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                if (!del && orgItemVal && orgItemVal.mapping && orgItemVal.mapping[key]) {
                    if (orgItemVal.id) {
                        data.acceptedQty = parseInt(orgItemVal.mapping[key].unit) - parseInt(map.unit);
                    } else {
                        data.acceptedQty = 0 - parseInt(map.unit);
                    }
                } else {
                    data.acceptedQty = parseInt(map.unit);
                }
                newContext.data = data;
                newContext.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.data.mapping) {
                mapStockUpdate(context.data.mapping[i], i, false);
            }
            for (var j in delMapItemVal) {
                mapStockUpdate(delMapItemVal[j], j, true);
            }

        },
        callBackSubmit: function() {
            context.methods.updateInvoicePartStock();
        },
        callBeforeDelete: function(id, item) {
            context.data = item;
            context.methods.updateInvoicePartStock();
        }
    };
};

erpConfig.moduleFiles.cashBill = erpConfig.moduleFiles.invoice;