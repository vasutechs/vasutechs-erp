erpApp.controller('partSalesAnalysisCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var partDetailList = [];
            for (var i in context.listViewData) {
                var frmDate = context.filterViewData['frmDate'];
                var toDate = context.filterViewData['toDate'];
                var date = new Date(context.listViewData[i]['date']);
                if ((!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                    console.log(context.filterViewData, context.listViewData[i]['date']);
                    for (var j in context.listViewData[i].mapping) {
                        var partDetail = {
                            partNo: context.listViewData[i].mapping[j].id,
                            amount: context.listViewData[i].mapping[j].amount,
                            rate: context.listViewData[i].mapping[j].rate,
                            unit: context.listViewData[i].mapping[j].unit,
                            date: context.listViewData[i]['date']
                        };
                        if (partDetailList[partDetail['partNo']]) {
                            partDetail.amount = parseFloat(partDetailList[partDetail['partNo']].amount) + parseFloat(partDetail.amount);
                            partDetail.unit = parseFloat(partDetailList[partDetail['partNo']].unit) + parseFloat(partDetail.unit);

                        }
                        partDetailList[partDetail['partNo']] = partDetail;
                    }
                }
            }
            context.listViewData = partDetailList;
        },
        partSalesFilter: function(context) {
            context.actions.callBackList(context);
        }
    };

    commonFact.initCtrl($scope, 'report.partSalesAnalysis', actions);

}]);