erpConfig.moduleFiles.customerPaymentInvoice = function (context) {
    var orgField = null;
    return {
        callBackList: function () {
            context.commonFact.accountsPayment();
            if(orgField){
                context.controller.form.fields = orgField;
            }
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
            orgField = angular.copy(context.controller.form.fields);
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
        },
        callBackChangeMapping: function () {
            context.controller.data.balanceAmount = context.controller.data.total;
            context.controller.data['date'] = new Date(context.controller.data['date']);
        },
        updateBalanceAmount: function (data) {
            var amount = 0;
            context.controller.methods.validateAmount(data);
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            if(!isNaN(amount)){
                context.controller.data.balanceAmount = parseFloat(context.controller.data.total) - parseFloat(amount);
            }  
        },
        validateAmount: function(data){
            var amount = 0;
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            if(amount > context.controller.data.total){
                data.amount = 0;
            }
        }
    };
};

erpConfig.moduleFiles.customerPaymentCashBill = erpConfig.moduleFiles.customerPaymentInvoice;
