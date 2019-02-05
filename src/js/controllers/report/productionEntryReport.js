erpApp.controller('productionEntryReportCtrl', ['$scope', 'commonFact', 'serviceApi', '$location', function($scope, commonFact, serviceApi, $location) {
    var actions = {
        callBackList: function(context) {
            if ($location.search() && $location.search()['type']) {
                context.actions[$location.search()['type']](context);
            } else {
                context.actions.productionEntryReport(context);
            }
        },
        toolHistoryCard: function(context) {
            var list = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];
                var filterToolNo = context.filterView.data['toolNo'];
                var filterPartNo = context.filterView.data['partNo'];
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

                        var isPartExist = context.actions.findObjectByKey(list, { toolNo: details.toolNo, partNo: details.partNo });
                        if (isPartExist) {
                            details.cummulativeQty += parseInt(isPartExist.cummulativeQty);
                        }
                        list.push(details);
                    }
                }
            }
            context.listViewData = list;
        },
        machineRunningTime: function(context) {
            var list = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];
                var filterMcNo = context.filterView.data['mcNo'];
                var mcNo = listViewData[i]['mcNo'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    if ((!filterMcNo || (mcNo === filterMcNo)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            mcNo: mcNo,
                            date: listViewData[i].mapping[j].date,
                            startTime: listViewData[i].mapping[j].startTime,
                            endTime: listViewData[i].mapping[j].endTime
                        };

                        details.runningTime = details.cumRunningTime = parseFloat(details.endTime) - parseFloat(details.startTime);
                        var isExist = context.actions.findObjectByKey(list, { mcNo: details.mcNo});
                        if (isExist) {
                            details.cumRunningTime += parseFloat(isExist.cumRunningTime);
                        }
                        list.push(details);
                    }
                }
            }
            context.listViewData = list;
        },
        productionEntryReport: function(context) {
            var list = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    if ((!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            mcNo: listViewData[i].mcNo,
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
            context.listViewData = list;
        }
    };
    if ($location.search() && $location.search()['type']) {
        commonFact.initCtrl($scope, 'report.' + $location.search()['type'], actions);
    } else {
        commonFact.initCtrl($scope, 'report.productionEntryReport', actions);
    }

}]);