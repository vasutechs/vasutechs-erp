erpConfig.moduleFiles.subContractorPayment = function(context) {
    return {
        callBackList: function() {
            context.controller.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.controller.form.fields['grnNo']);
        },
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(data, key, field) {
            var total = 0;
            var grnMap = field.options[context.controller.data.grnNo];
            context.controller.data.total = grnMap.total;
            context.controller.data.subContractorDCDate = context.commonFact.dateFormatChange(context.controller.data.subContractorDCDate);
            context.controller.data.balanceAmount = context.controller.data.total;
        },
        updateBalanceAmount: function() {
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
            }
        }
    };
};