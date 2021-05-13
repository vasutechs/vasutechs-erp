erpConfig.moduleFiles.customerPaymentInvoice = function (context) {
    return {
        callBackViewFilterBy: function () {
            context.controller.methods.callBackList();
        },
        callBackList: function () {
            var filterInvoiceNo = context.controller.filterView.data['invoiceNo'];
            var filterCustomerCode = context.controller.filterView.data['customerCode'];
            var paymentList = angular.copy(context.controller.listViewData);
            var paymentDetails = {};
            var paymentByCus = [];
            var paymentByCusMap = [];
            context.controller.listViewData = [];
            context.controller.form.mapping.actions = {};
            context.controller.orderByProperty = 'idVal';
            context.controller.orderByAsc = false;
            var idVal = 0;
			paymentList = context.controller.filterView.data.length > 0 && context.commonFact.findObjectByKey(paymentList, context.controller.filterView.data, null, true) || paymentList;
            for (var i in paymentList) {
			

                    paymentList[i].idVal = idVal;
                    paymentList[i].consolidatedAmount = paymentList[i].total;
                    paymentList[i].balanceAmountTotal = paymentList[i].total;
                    if (paymentByCusMap && paymentByCusMap[paymentByCusMap.length - 1]) {
                        paymentList[i].consolidatedAmount += paymentByCusMap[paymentByCusMap.length - 1].consolidatedAmount;
                        paymentList[i].balanceAmountTotal += paymentByCusMap[paymentByCusMap.length - 1].balanceAmountTotal;
                        paymentList[i].consolidatedPaidAmount = paymentByCusMap[paymentByCusMap.length - 1].consolidatedPaidAmount;
                    } else if (paymentByCus && paymentByCus[paymentByCus.length - 1]) {
                        paymentList[i].balanceAmountTotal += paymentByCus[paymentByCus.length - 1].balanceAmountTotal;
                        paymentList[i].consolidatedAmount += paymentByCus[paymentByCus.length - 1].consolidatedAmount;
                        paymentList[i].consolidatedPaidAmount = paymentByCus[paymentByCus.length - 1].consolidatedPaidAmount;
                    }
                    idVal++;

                    for (var j in paymentList[i].mapping) {

                        paymentDetails.id = paymentList[i].id;
                        paymentDetails.invoiceNo = paymentList[i].invoiceNo;
                        paymentDetails.customerCode = paymentList[i].customerCode;
                        paymentDetails.idVal = idVal;
                        paymentDetails.paymentReceivedDate = context.commonFact.dateFormatChange(paymentList[i].mapping[j].date);
                        paymentDetails.paymentReceivedAmount = paymentList[i].mapping[j].amount;
                        paymentDetails.consolidatedPaidAmount = paymentDetails.paymentReceivedAmount;
                        paymentDetails.consolidatedAmount = paymentList[i].consolidatedAmount;

                        if (paymentByCusMap && paymentByCusMap[paymentByCusMap.length - 1]) {
                            paymentDetails.consolidatedPaidAmount += paymentByCusMap[paymentByCusMap.length - 1].consolidatedPaidAmount;
                            paymentDetails.balanceAmountTotal = paymentDetails.consolidatedAmount - paymentDetails.consolidatedPaidAmount;

                        } else {
                            paymentDetails.balanceAmountTotal = paymentList[i].mapping[j].balanceAmount;
                        }

                        context.controller.listViewData.splice(0, 0, angular.copy(paymentDetails));
                        paymentByCusMap.push(angular.copy(paymentDetails));
                        idVal++;
                    }
                    context.controller.listViewData.push(angular.copy(paymentList[i]));
                    paymentByCus.push(angular.copy(paymentList[i]));
                
            }

            console.log(context.controller.listViewData);
        },
        getInvoice: function () {
            context.controller.form.fields['invoiceNo']['filter'] = {
                customerCode: context.controller.data['customerCode']
            };
            context.commonFact.makeOptionsFields(context.controller.form.fields['invoiceNo']);
        },
        callBackAdd: function () {
            context.controller.data['date'] = null;
        },
        callBackEdit: function () {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
            context.controller.data.date = context.commonFact.dateFormatChange(context.controller.data.date);
        },
        callBackChangeMapping: function () {
            context.controller.data.balanceAmount = context.controller.data.total;
            context.controller.data['date'] = context.commonFact.dateFormatChange(context.controller.data['date']);
        },
        updateBalanceAmount: function (data) {
            var amount = 0;
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            context.controller.data.balanceAmount = parseFloat(context.controller.data.total) - parseFloat(amount);
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
            if (context.controller.data.balanceAmount < 0) {
                context.controller.data.balanceAmount = 0;
                //data.amount = null;
            }
        }
    };
};

erpConfig.moduleFiles.customerPaymentCashBill = erpConfig.moduleFiles.customerPaymentInvoice;
