erpApp.controller('productionEntryCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        checkAcceptedQty: function(context) {
            var qtyCanMake=0,
                rejectionQtyMax = 0,
                rwQtyMax = 0;
            if(context.data.partNo && context.data.operationFrom){
                qtyCanMake = context.partStock[context.data.partNo + '-' + context.data.operationFrom] && context.partStock[context.data.partNo + '-' + context.data.operationFrom].partStockQty || 0;
            }
            context.form.fields['acceptedQty'].max = qtyCanMake;
            rejectionQtyMax = qtyCanMake - context.data.acceptedQty;
            rwQtyMax = context.data.rejectionQty ? qtyCanMake - context.data.acceptedQty - context.data.rejectionQty : qtyCanMake - context.data.acceptedQty;
            context.form.fields['rejectionQty'].max = rejectionQtyMax;
            context.form.fields['rwQty'].max = rwQtyMax;
        },
        callBackEdit: function(context, key) {
            context.data['startTime'] = context.actions.timeFormatChange(context.data['startTime']);
            context.data['endTime'] = context.actions.timeFormatChange(context.data['endTime']);
        },
        callBackChangeMapping: function(context, data, key, field){
            context.actions.updatePartDetails(context, data, key, field);
        },
        updatePartDetails: function(context, data, key, field) {
            if (context.data.jobCardNo) {
                var restriction = {
                    partNo: context.data.partNo
                },
                jobCardNoDetail = context.form.fields['jobCardNo'].options[context.data.jobCardNo],
                serviceconf = context.actions.getServiceConfig('report.partStock');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var partStockData = res.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    restriction.partStock = partStock;
                    context.partStock = partStock;
                    context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);

                });
            }
        },
        updateOperationTo: function(context, data, key, field) {
            var restriction = {
                partNo: context.data.partNo,
                limit: 1,
                source: ['In-House'],
                startWith: context.data.operationFrom
            };

            context.form.fields['operationTo'].startWith = context.data.operationFrom;
            context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
        },
        calculatePlanQty: function(context) {
            var startDate = new Date(context.data.startTime);
            var endDate = new Date(context.data.endTime);
            var milisecondsDiff = endDate - startDate;
            var timeDiff = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 1 }) + "." + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            context.data.planQty = timeDiff * context.form.fields['partNo'].options[context.data.partNo].prodRateHr;
        },
        callBackSubmit: function(context) {
            if (context.data.operationTo === erpAppConfig.finalStageOpp) {
                context.actions.updateMaterialIssue(context, {
                    'operationFrom': context.data.operationTo,
                    'status': 1
                }, context.data.jobCardNo);
            } else {
                context.actions.updateMaterialIssue(context, { 'operationFrom': context.data.operationTo }, context.data.jobCardNo);
            }
            context.actions.updatePartStock(context);
        }
    });
    $scope.context = erpAppConfig.modules.production.productionEntry;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);