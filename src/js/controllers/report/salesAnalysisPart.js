erpConfig.moduleFiles.salesAnalysisPart = function (context) {
    return {
        callBackList: function () {
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var invoiceData = context.controller.methods.getSalesDetails(listViewData);
            context.commonFact.getData('marketing.cashBill').then(function (res) {
                context.controller.listViewData = context.controller.methods.getSalesDetails(res.data, invoiceData);
            });
        },
        getSalesDetails: function (listViewData, isListViewData) {
            var partDetailList = isListViewData || [];
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterPartNo = context.controller.filterView.data['partNo'];

                var date = new Date(listViewData[i]['date']);
                frmDate = frmDate && new Date(frmDate) || false;
                toDate = toDate && new Date(toDate) || false;
                toDate = toDate && new Date(toDate.setDate(toDate.getDate() + 1)) || false;

                for (var j in listViewData[i].mapping) {

                    var partDetail;
                    var partNo = listViewData[i].mapping[j].id;
                    if ((!filterPartNo || (partNo === filterPartNo)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {

                        partDetail = {
                            partNo: listViewData[i].mapping[j].id,
                            amount: listViewData[i].mapping[j].amount,
                            rate: listViewData[i].mapping[j].rate,
                            cgst: listViewData[i].cgst,
                            sgst: listViewData[i].sgst,
                            igst: listViewData[i].igst,
                            unit: listViewData[i].mapping[j].unit
                        };

                        if (!context.controller.cashBill) {
                            var cgstTotal = partDetail.cgst && (parseFloat(partDetail.amount) * parseFloat(partDetail.cgst / 100)) || 0;
                            var sgstTotal = partDetail.sgst && (parseFloat(partDetail.amount) * parseFloat(partDetail.sgst / 100)) || 0;
                            var igstTotal = partDetail.igst && (parseFloat(partDetail.amount) * parseFloat(partDetail.igst / 100)) || 0;
                            var taxRateTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));
                            partDetail.amount = parseFloat(partDetail.amount) + parseFloat(taxRateTotal);
                        }
                        var isPartExist = context.commonFact.findObjectByKey(partDetailList, 'partNo', partDetail['partNo']);
                        if (isPartExist) {
                            isPartExist.amount = parseFloat(isPartExist.amount) + parseFloat(partDetail.amount);
                            isPartExist.unit = parseFloat(isPartExist.unit) + parseFloat(partDetail.unit);
                        } else {
                            partDetailList.push(partDetail);
                        }
                    }
                }
            }

            return partDetailList;
        }
    };
};
