erpConfig.moduleFiles.salesAnalysisInvoice = function(context) {
    return {
        callBackList: function() {
            var partDetailList = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterCustomerCode = context.controller.filterView.data['customerCode'];
                var customerCode = listViewData[i]['customerCode'];
                var filterPartNo = context.controller.filterView.data['partNo'];
                var date = new Date(listViewData[i]['date']);
                console.log(filterPartNo);
                frmDate = frmDate && new Date(frmDate) || false;
                toDate = toDate && new Date(toDate) || false;
                toDate = toDate && new Date(toDate.setDate(toDate.getDate() + 1)) || false;
                if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {
                    for (var j in listViewData[i].mapping) {
                        if(!filterPartNo || (filterPartNo === listViewData[i].mapping[j].id)){
                            var partDetail = {
                                partNo: listViewData[i].mapping[j].id,
                                amount: listViewData[i].mapping[j].amount,
                                rate: listViewData[i].mapping[j].rate,
                                cgst: listViewData[i].cgst,
                                sgst: listViewData[i].sgst,
                                igst: listViewData[i].igst,
                                unit: listViewData[i].mapping[j].unit,
                                customerCode: listViewData[i]['customerCode'],
                                dates: context.commonFact.dateFormatChange(date),
                                invoiceNos: !context.controller.cashBill ? 'VT-' + listViewData[i]['invoiceNo'] : listViewData[i]['invoiceNo']
                            };

                            if (!context.controller.cashBill) {
                                var cgstTotal = partDetail.cgst && (parseFloat(partDetail.amount) * parseFloat(partDetail.cgst / 100)) || 0;
                                var sgstTotal = partDetail.sgst && (parseFloat(partDetail.amount) * parseFloat(partDetail.sgst / 100)) || 0;
                                var igstTotal = partDetail.igst && (parseFloat(partDetail.amount) * parseFloat(partDetail.igst / 100)) || 0;
                                var taxRateTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));
                                partDetail.amount = parseFloat(partDetail.amount) + parseFloat(taxRateTotal);
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
            }
            context.controller.listViewData = partDetailList;
        }
    };
};
erpConfig.moduleFiles.salesAnalysisCashBill = erpConfig.moduleFiles.salesAnalysisInvoice