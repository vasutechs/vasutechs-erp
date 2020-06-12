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
            context.controller.data[context.controller.form.autoGenKey] = context.controller.data[context.controller.form.autoGenKey] + '/' + year + '-' + ('' + parseInt(year + 1)).substring(2);
        },
        callBackChangeMapping: function(data, key, field) {
            context.controller.methods.getPartStockDetail(data, key, field);
            orgItemVal.mapping = angular.copy(context.controller.data.mapping);
            context.controller.methods.updateTotalAmount();
        },
        callBackRemoveMapping: function(data, key) {
            if (context.controller.page.name === 'edit') {
                delMapItemVal.push(orgItemVal.mapping[key]);
            }
            delete orgItemVal.mapping.splice(key, 1);
        },
        callBackAdd: function() {
            orgItemVal = angular.copy(context.controller.data);
            delMapItemVal = [];
        },
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
            delMapItemVal = [];
        },
        getPartStockDetail: function() {
            var newMapData = [];
            newMapData = context.controller.data.mapping.filter(function(data) {
                if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                    data.operationFrom = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                    data.operationTo = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                }

                return (context.controller.partStock && context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp] && parseInt(context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty) > 0);
            });
            context.controller.data.mapping = newMapData;
        },
        updateTotal: function(data, updateValue, field, fieldKey) {
            var partDetail = context.controller.form.mapping.fields['id'].options[data.id],
                totalBeforTax = 0,
                partStock = 0;

            if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                partStock = parseInt(context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty);
                if (context.controller.page.name === 'edit') {
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
                context.controller.data.taxRate = context.controller.data.gst;
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
        callBackSubmit: function() {
            context.controller.methods.updateInvoicePartStock();
        },
        callBeforeDelete: function(id, item) {
            context.controller.data = item;
            context.controller.methods.updateInvoicePartStock();
        }
    };
};

erpConfig.moduleFiles.cashBill = erpConfig.moduleFiles.invoice;