erpApp.controller('customerPaymentInvoiceCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
	var actions = {
		callBackAdd: function(context){
			context.data.date=null;
		},
		callBackEdit: function(context){
			for(var i in context.data.mapping){
        		context.data.mapping[i].date = new Date(context.data.mapping[i].date);
        	}
		},
        updateBalanceAmount: function(context, data, key, field) {
        	var amount = 0;
        	for(var i in context.data.mapping){
        		amount += parseFloat(context.data.mapping[i].amount);
        	}
        	context.data.balanceAmount = parseFloat(context.data.total) - parseFloat(amount);
        }
	};

	if ($location.search() && $location.search()['type'] === 'cashBill') {
        commonFact.initCtrl($scope, 'accounts.customerPaymentCashBill', actions);
    } else {
        commonFact.initCtrl($scope, 'accounts.customerPaymentInvoice', actions);
    }

    
}]);