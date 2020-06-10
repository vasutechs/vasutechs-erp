erpConfig.moduleFiles.salesAnalysisInvoice = function(context) {
    var cashBill = false;
    return {
        callBackList: function() {
            var partDetailList = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];
                var filterCustomerCode = context.filterView.data['customerCode'];
                var customerCode = listViewData[i]['customerCode'];
                var date = new Date(listViewData[i]['date']);
                frmDate = frmDate && new Date(frmDate) || false;
                toDate = toDate && new Date(toDate) || false;
                toDate = toDate && new Date(toDate.setDate(toDate.getDate() + 1)) || false;
                if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {
                    for (var j in listViewData[i].mapping) {
                        var partDetail = {
                            partNo: listViewData[i].mapping[j].id,
                            amount: listViewData[i].mapping[j].amount,
                            rate: listViewData[i].mapping[j].rate,
                            taxRate: listViewData[i].taxRate || listViewData[i].igst,
                            unit: listViewData[i].mapping[j].unit,
                            customerCode: listViewData[i]['customerCode'],
                            dates: context.commonFact.dateFormatChange(date),
                            invoiceNos: !cashBill ? 'H-' + listViewData[i]['invoiceNo'] : listViewData[i]['invoiceNo']
                        };

                        if (!cashBill) {
                            partDetail.amount = parseFloat(partDetail.amount) + (parseFloat(partDetail.amount) * parseFloat(partDetail.taxRate / 100));
                        }
                        var isPartExist = context.commonFact.findObjectByKey(partDetailList, 'partNo', partDetail['partNo']);
                        if (isPartExist && isPartExist.customerCode === partDetail.customerCode) {
                            isPartExist.amount = parseFloat(isPartExist.amount) + parseFloat(partDetail.amount);
                            isPartExist.unit = parseFloat(isPartExist.unit) + parseFloat(partDetail.unit);
                            isPartExist.dates = isPartExist.dates + ', ' + partDetail.dates;
                            isPartExist.invoiceNos = isPartExist.invoiceNos + ', ' + partDetail.invoiceNos;

                        } else {
                            partDetailList.push(partDetail);
                        }
                    }
                }
            }
            context.controller.listViewData = partDetailList;
        }
    };
};
erpConfig.moduleFiles.salesAnalysisCashBill = erpConfig.moduleFiles.salesAnalysisInvoice