erpApp.controller('salesAnalysisInvoiceCtrl', ['$scope', 'commonFact', 'serviceApi', '$location', function($scope, commonFact, serviceApi, $location) {
    var actions = {
        callBackList: function(context) {
            var partDetailList = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];
                var filterCustomerCode = context.filterView.data['customerCode'];
                var customerCode = listViewData[i]['customerCode'];
                var date = new Date(listViewData[i]['date']);
                if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                    for (var j in listViewData[i].mapping) {
                        var partDetail = {
                            partNo: listViewData[i].mapping[j].id,
                            amount: listViewData[i].mapping[j].amount,
                            rate: listViewData[i].mapping[j].rate,
                            taxRate: listViewData[i].mapping[j].taxRate,
                            unit: listViewData[i].mapping[j].unit,
                            customerCode: listViewData[i]['customerCode']
                        };

                        partDetail.amount = parseFloat(partDetail.amount) + (parseFloat(partDetail.amount) * parseFloat(partDetail.taxRate / 100));
                        var isPartExist = context.actions.findObjectByKey(partDetailList, 'partNo', partDetail['partNo']);
                        if (isPartExist && isPartExist.customerCode === partDetail.customerCode) {
                            isPartExist.amount = parseFloat(isPartExist.amount) + parseFloat(partDetail.amount);
                            isPartExist.unit = parseFloat(isPartExist.unit) + parseFloat(partDetail.unit);

                        }
                        else{
                            partDetailList.push(partDetail);
                        }
                    }
                }
            }
            context.pageSize = partDetailList.length + 1;
            context.listViewData = partDetailList;
        },
        partSalesFilter: function(context) {
            context.actions.callBackList(context);
        }
    };

    if ($location.search() && $location.search()['type'] === 'cashBill') {
        commonFact.initCtrl($scope, 'report.salesAnalysisCashBill', actions);
    } else {
        commonFact.initCtrl($scope, 'report.salesAnalysisInvoice', actions);
    }

}]);