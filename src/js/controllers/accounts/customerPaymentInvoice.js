erpConfig.moduleFiles.customerPaymentInvoice = function (context) {
    return {
        callBackList: function () {
			var invoicePaymentList = angular.copy(context.controller.listViewData);
			context.controller.listViewData = [];
            context.controller.form.mapping.actions = {};
            for (var i in invoicePaymentList) {
				var invoicePayment = invoicePaymentList[i];
				//for(invoicePayment.mapping){
					//invoicePayment
				//}
                context.controller.listViewData.push(invoicePaymentList[i]);
            }
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
        updateBalanceAmount: function () {
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
