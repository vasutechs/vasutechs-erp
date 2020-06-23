erpConfig.moduleFiles.empPerformanceReport = function(context) {
    return {
        callBackList: function() {
            var list = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterPartNo = context.controller.filterView.data['partNo'];
                var partNo = listViewData[i]['partNo'];
                var filterOperator = context.controller.filterView.data['operator'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    var operator = listViewData[i].mapping[j].operator;
                    if ((!filterPartNo || (partNo === filterPartNo)) && (!filterOperator || (operator === filterOperator)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            partNo: partNo,
                            date: listViewData[i].mapping[j].date,
                            startTime: listViewData[i].mapping[j].startTime,
                            endTime: listViewData[i].mapping[j].endTime,
                            operator: operator,
                            operationTo: listViewData[i].mapping[j].operationTo,
                            planQty: listViewData[i].mapping[j].planQty,
                            acceptedQty: listViewData[i].mapping[j].acceptedQty
                        };
                        list.push(details);
                    }
                }
            }
            context.controller.listViewData = list;
        }
    };
};