erpConfig.moduleFiles.productionEntryReport = function(context) {
    return {
        callBackList: function() {
            var list = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);

            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    var machineNo = listViewData[i].mapping[j]['machineNo'];
                    if ((!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            machineNo: machineNo,
                            jobCardNo: listViewData[i].jobCardNo,
                            partNo: listViewData[i].partNo,
                            operationFrom: listViewData[i].mapping[j].operationFrom,
                            operationTo: listViewData[i].mapping[j].operationTo,
                            toolNo: listViewData[i].mapping[j].toolNo,
                            operator: listViewData[i].mapping[j].operator,
                            startTime: listViewData[i].mapping[j].startTime,
                            endTime: listViewData[i].mapping[j].endTime,
                            planQty: listViewData[i].mapping[j].planQty,
                            acceptedQty: listViewData[i].mapping[j].acceptedQty,
                            rejectionQty: listViewData[i].mapping[j].rejectionQty,
                            rwQty: listViewData[i].mapping[j].rwQty,
                            date: listViewData[i].mapping[j].date
                        };
                        list.push(details);
                    }
                }
            }
            context.controller.listViewData = list;
        }
    };
};