erpConfig.moduleFiles.customerPaymentInvoice = function (context) {
    return {
        callBackList: function () {
            context.commonFact.accountsPayment();
        },
		callBackViewFilterBy: function(){
			context.commonFact.accountsPayment();
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
			context.controller.data['date'] = new Date(context.controller.form.fields['invoiceNo'].options[context.controller.data['invoiceNo']].date);
			console.log(context.controller.data);
        },
        callBackChangeMapping: function () {
            context.controller.data.balanceAmount = context.controller.data.total;
            context.controller.data['date'] = new Date(context.controller.data['date']);
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
