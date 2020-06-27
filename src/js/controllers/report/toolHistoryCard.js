erpConfig.moduleFiles.toolHistoryCard = function(context) {
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
                        var filterToolNo = context.controller.filterView.data['toolNo'];
                        var filterPartNo = context.controller.filterView.data['partNo'];
                        var partNo = listViewData[i]['partNo'];

                        for (var j in listViewData[i].mapping) {
                            var toolNo = listViewData[i].mapping[j].toolNo;
                            var date = new Date(listViewData[i].mapping[j].date);
                            if ((!filterToolNo || (toolNo === filterToolNo)) && (!filterPartNo || (partNo === filterPartNo)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                                var details = {
                                    partNo: partNo,
                                    toolNo: toolNo,
                                    qty: listViewData[i].mapping[j].acceptedQty,
                                    activity: listViewData[i].mapping[j].operationTo,
                                    date: listViewData[i].mapping[j].date,
                                    cummulativeQty: parseInt(listViewData[i].mapping[j].acceptedQty)
                                };

                                var isPartExist = context.commonFact.findObjectByKey(list, { toolNo: details.toolNo, partNo: details.partNo });
                                if (isPartExist) {
                                    if (details.toolNo == '38' && details.partNo == '3') {
                                        console.log('exist:', isPartExist, isPartExist.cummulativeQty, details.toolNo, details.partNo);
                                    }
                                    details.cummulativeQty += parseInt(isPartExist.cummulativeQty);
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