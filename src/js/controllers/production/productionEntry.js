erpApp.controller('productionEntryCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        checkAcceptedQty: function(context) {
            var qtyCanMake = 0,
                rejectionQtyMax = 0,
                rwQtyMax = 0;
            if (context.data.partNo && context.data.operationFrom) {
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
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.updateOperationFrom(context, data, key, field);
            context.actions.updateOperationTo(context, data, key, field);
        },
        updateOperationFrom: function(context, data, key, field) {
            if (context.data.jobCardNo) {
                var restriction = {
                        partNo: context.data.partNo
                    },
                    operation = [];
                for (var i in context.partStock) {
                    if (context.partStock[i].partStockQty > 0) {
                        operation.push(context.partStock[i].operationTo);
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
            if (context.data.jobCardNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo,
                        filter: {
                            source: 'In-House'
                        }
                    },
                    operation = [];
                if (context.data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: context.data.operationFrom
                    });
                }
                var serviceconf = this.getServiceConfig('production.flowMaster');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp;
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === partNo) {
                            for (var j in flowMasterData[i].mapping) {
                                prevOpp = flowMasterData[i].mapping[j - 1];
                                if (prevOpp && context.partStock[partNo + '-' + prevOpp.id] && context.partStock[partNo + '-' + prevOpp.id].partStockQty > 0) {
                                    operation.push(flowMasterData[i].mapping[j].id);
                                }
                            }
                        }
                    }
                    restriction.filter = angular.extend(restriction.filter, {
                        id: operation
                    });

                    context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
                });
            }
        },
        calculatePlanQty: function(context) {
            var startDate = context.data.startTime;
            var endDate = context.data.endTime;
            var timeDiff = endDate - startDate;
            context.data.planQty = timeDiff * context.form.fields['partNo'].options[context.data.partNo].prodRateHr;
        },
        updateMaterialIssue: function(context, replaceData, key) {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.actions.updateData('production.materialIssueNote', jobCard);
            // context.actions.getPRQty(context).then(function(PRStock) {
            //     if (parseInt(jobCardQty) <= parseInt(PRStock)) {
            //         context.actions.updateData('production.materialIssueNote', jobCard);
            //     }
            // });
        },
        getJobQty: function(context) {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var DCQty = 0;
            var poNo = context.data.poNo;

            for (var i in jobCard.mapping) {
                DCQty += jobCard.mapping[i].acceptedQty;
            }
            return DCQty;
        },
        getPRQty: function(context) {
            var PRRejQty = parseInt(context.data.rejectionQty) + parseInt(context.data.rwQty);
            var PRQty = context.data.acceptedQty;
            return context.actions.getData('production.productionEntry').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.data.jobCardNo === listViewData[i].jobCardNo) {
                        PRRejQty += parseInt(listViewData[i].rejectionQty) + parseInt(listViewData[i].rwQty);
                    }
                }
                PRQty += PRRejQty;
                return PRQty;
            });
        },
        callBackSubmit: function(context) {
            if (context.data.operationTo === erpAppConfig.finalStageOpp) {
                context.actions.updateMaterialIssue(context);
            }
            context.actions.updatePartStock(context);
        }
    });
    $scope.context = erpAppConfig.modules.production.productionEntry;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);