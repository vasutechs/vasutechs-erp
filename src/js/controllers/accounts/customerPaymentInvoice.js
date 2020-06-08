erpConfig.moduleFiles.customerPaymentInvoice = function(context) {
    return {
        callBackList: function() {
            context.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.form.fields['invoiceNo']);
            context.data['date'] = null;
        },
        callBackEdit: function() {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function() {
            context.data.balanceAmount = context.data.total;
            context.data['date'] = context.commonFact.dateFormatChange(context.data['date']);
        },
        updateBalanceAmount: function() {
            var amount = 0;
            for (var i in context.data.mapping) {
                amount += parseFloat(context.data.mapping[i].amount);
            }
            context.data.balanceAmount = parseFloat(context.data.total) - parseFloat(amount);
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
            if (context.data.balanceAmount < 0) {
                context.data.balanceAmount = 0;
                //data.amount = null;
            }
        }
    };
};

erpConfig.moduleFiles.customerPaymentCashBill = erpConfig.moduleFiles.customerPaymentInvoice;