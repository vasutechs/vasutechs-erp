erpApp.controller('productionEntryCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        checkAcceptedQty: function(context) {
            var qtyCanMake = context.form.fields[2].options[context.data.jobCardNo].qtyCanMake;
            context.form.fields[11].max = qtyCanMake;
        },
        callBackEdit: function(context, key) {
            context.data['startTime'] = context.actions.timeFormatChange(context.data['startTime']);
            context.data['endTime'] = context.actions.timeFormatChange(context.data['endTime']);
        },
        updatePartDetails: function(context, data, key, field) {
            if (context.data.jobCardNo) {
                context.actions.changeMapping(context, data, key, field);
                context.actions.getOperationFromFlow(context, context.form.fields[4]);
                context.form.fields[5].startWith = context.data.operationFrom;
                context.actions.getOperationFromFlow(context, context.form.fields[5]);
            }
        },
        calculatePlanQty: function(context) {
            var startDate = new Date(context.data.startTime);
            var endDate = new Date(context.data.endTime);
            var milisecondsDiff = endDate - startDate;
            var timeDiff = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 1 }) + "." + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            context.data.planQty = timeDiff * context.form.fields[3].options[context.data.partNo].prodRateHr;
        },
        removeRMStockQty: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.rmStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var rmStockData = res.data,
                    rmStock = {};
                for (var i in rmStockData) {
                    rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                }
                var jobCardNo = context.form.fields[2].options[context.data.jobCardNo];
                var rmCode = jobCardNo.rmCode;
                var existingStock = rmStock[rmCode];
                var removeQty = jobCardNo.issueQty;
                if (existingStock) {
                    var rmStockQty = parseInt(existingStock.rmStockQty) - parseInt(removeQty);
                    var data = {
                            id: existingStock.id,
                            rmCode: rmCode,
                            rmStockQty: rmStockQty,
                            uomCode: existingStock.uomCode
                        },
                        serviceconf = context.actions.getServiceConfig('report.rmStock', 'POST', existingStock.id);
                    serviceApi.callServiceApi(serviceconf, data);
                }

            })
        },
        callBackSubmit: function(context) {
            if (context.data.operationFrom === 1) {
                context.actions.removeRMStockQty(context);
            }
            if (context.data.operationTo === 7) {
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