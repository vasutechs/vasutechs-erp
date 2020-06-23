erpConfig.moduleFiles.machineRunningTime = function(context) {
    return {
        callBackList: function() {
            var list = [];
            context.controller.listViewData = [];
            context.commonFact.getAllYearData().then(function(listViewYearData) {
                for (var x in listViewYearData) {
                    var listViewData = listViewYearData[x];
                    for (var i in listViewData) {
                        var frmDate = context.controller.filterView.data['frmDate'];
                        var toDate = context.controller.filterView.data['toDate'];
                        var filterMachineNo = context.controller.filterView.data['machineNo'];

                        for (var j in listViewData[i].mapping) {
                            var date = new Date(listViewData[i].mapping[j].date);
                            var machineNo = listViewData[i].mapping[j]['machineNo'];
                            if ((!filterMachineNo || (machineNo === filterMachineNo)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                                var details = {
                                    machineNo: machineNo,
                                    date: listViewData[i].mapping[j].date,
                                    startTime: listViewData[i].mapping[j].startTime,
                                    endTime: listViewData[i].mapping[j].endTime
                                };

                                details.runningTime = details.cumRunningTime = parseFloat(details.endTime) - parseFloat(details.startTime);
                                var isExist = context.commonFact.findObjectByKey(list, { machineNo: details.machineNo });
                                if (isExist) {
                                    details.cumRunningTime += parseFloat(isExist.cumRunningTime);
                                }
                                list.push(details);
                            }
                        }
                    }
                }
                context.controller.listViewData = list;
            });

        }
    };
};