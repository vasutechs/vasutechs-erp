erpConfig.moduleFiles.purchaseSupplier = function (context) {
    var frmDate;
    var toDate;
    var date;
    var filterSupplierCode;
    return {
        callBackList: function () {
            var listViewData = context.controller.listViewData;
            var details;
            context.controller.listViewData = [];
            filterSupplierCode = context.controller.filterView.data['supplierCode'];
            frmDate = context.controller.filterView.data['frmDate'];
            toDate = context.controller.filterView.data['toDate'];

            for (var x in listViewData) {
                if ((!filterSupplierCode || (listViewData[x].supplierCode === filterSupplierCode)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {
                    for(var y in listViewData[x].mapping){
                        details = {
                            rmCode: listViewData[x].mapping[y].id,
                            rate: listViewData[x].mapping[y].rate,
                            total: listViewData[x].mapping[y].total,
                            acceptedQty: listViewData[x].mapping[y].acceptedQty
                        };
    
                        context.controller.listViewData.push(angular.extend({},listViewData[x], details));
                    }
                }
            }
        }
    };
};
