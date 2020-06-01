erpConfig.moduleFiles.subContractorPayment = function() {
    return {
        callBackList: function(context) {
            context.form.mapping.actions = {};
        },
        callBackAdd: function(context) {
            context.methods.makeOptionsFields(context, context.form.fields['grnNo']);
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            var total = 0;
            var grnMap = field.options[context.data.grnNo];
            context.data.total = grnMap.total;
            context.data.subContractorDCDate = context.methods.dateFormatChange(context.data.subContractorDCDate);
            context.data.balanceAmount = context.data.total;
        },
        updateBalanceAmount: function(context, data, key, field) {
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