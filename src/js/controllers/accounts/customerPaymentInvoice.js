erpApp.controller('customerPaymentInvoiceCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context) {
            context.form.mapping.actions = {};
        },
        callBackAdd: function(context) {
            context.actions.makeOptionsFields(context, context.form.fields['invoiceNo']);
            context.data['date'] = null;
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
            context.data.balanceAmount = context.data.total;
            context.data['date'] = context.actions.dateFormatChange(context.data['date']);
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
                //data.amount = null;
            }
        }
    };

    if ($location.search() && $location.search()['type'] === 'cashBill') {
        commonFact.initCtrl($scope, 'accounts.customerPaymentCashBill', actions);
    } else {
        commonFact.initCtrl($scope, 'accounts.customerPaymentInvoice', actions);
    }


}]);