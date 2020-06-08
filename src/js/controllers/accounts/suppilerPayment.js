erpConfig.moduleFiles.suppilerPayment = function(context) {
    return {
        callBackList: function() {
            context.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.form.fields['grnNo']);
        },
        callBackEdit: function() {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(data, key, field) {
            var total = 0;
            var grnMap = field.options[context.data.grnNo];
            context.data.total = grnMap.total;
            context.data.supplierInvoiceDate = context.commonFact.dateFormatChange(context.data.supplierInvoiceDate);
            context.data.balanceAmount = context.data.total;
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
            }
        }
    };
};