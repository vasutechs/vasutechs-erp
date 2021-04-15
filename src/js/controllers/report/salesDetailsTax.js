erpConfig.moduleFiles.salesDetailsTax = function(context) {
    return {
        callBackList: function() {
            var invoiceData = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterCustomerCode = context.controller.filterView.data['customerCode'];
                var customerCode = listViewData[i]['customerCode'];
                var date = new Date(listViewData[i]['date']);
                frmDate = frmDate && new Date(frmDate) || false;
                toDate = toDate && new Date(toDate) || false;
                toDate = toDate && new Date(toDate.setDate(toDate.getDate() + 1)) || false;
                if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {
					invoiceData.push(listViewData[i]);
				}
			}
			context.controller.listViewData = invoiceData;
        }
	}
};