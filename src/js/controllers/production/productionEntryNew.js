erpApp.controller('productionEntryNewCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackAdd: function(context) {
            context.page.printViewMapping = false;
            context.finalMapping = 0;
        },
        callBackEdit: function(context) {
            if (!context.page.printView) {
                context.page.printViewMapping = true;
                context.actions.applyFieldValues(context, context.form.mapping.fields, context.printData.mapping, context.page.printViewMapping);
                context.actions.addMapping(context.data.mapping);
                context.finalMapping = context.data.mapping.length - 1;
                setTimeout(function() {
                    context.actions.callBackChangeMapping(context, context.data.mapping[context.finalMapping]);
                }, 1000);
            }
        },
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        checkAcceptedQty: function(context, mappingData, value, key, field) {
            var qtyCanMake = 0,
                rejectionQty = mappingData.rejectionQty || 0,
                rwQty = mappingData.rwQty || 0,
                acceptedQty = mappingData.acceptedQty || 0,
                qty = acceptedQty + rejectionQty + rwQty;
            if (context.data.partNo && mappingData.operationFrom) {
                qtyCanMake = context.partStock[context.data.partNo + '-' + mappingData.operationFrom] && context.partStock[context.data.partNo + '-' + mappingData.operationFrom].partStockQty || 0;
            }
            if (qty > qtyCanMake) {
                mappingData[field.id] = null
            }
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
                    if (context.partStock[i].partStockQty > 0 && context.data.partNo === context.partStock[i].partNo) {
                        operation.push(context.partStock[i].operationTo);
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, mappingData, key, field) {
            if (context.data.jobCardNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo,
                        filter: {
                            source: 'In-House'
                        }
                    },
                    operation = [];
                if (mappingData.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: mappingData.operationFrom
                    });
                }
                var serviceconf = this.getServiceConfig('production.flowMaster');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp;
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === partNo) {
                            var flowMasterMap = context.actions.objectSort(flowMasterData[i].mapping, 'id');
                            for (var j in flowMasterMap) {
                                prevOpp = flowMasterMap[j - 1];
                                if (prevOpp && context.partStock[partNo + '-' + prevOpp.id] && context.partStock[partNo + '-' + prevOpp.id].partStockQty > 0) {
                                    operation.push(flowMasterMap[j].id);
                                }
                            }
                        }
                    }
                    restriction.filter = angular.extend(restriction.filter, {
                        id: operation
                    });

                    context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationTo'], restriction);
                });
            }
        },
        calculatePlanQty: function(context, mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            mappingData.planQty = timeDiff * context.form.fields['partNo'].options[context.data.partNo].prodRateHr;
        },
        updateMaterialIssue: function(context, replaceData, key) {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            var jobCardPrdQty = jobCard && jobCard.productionQty || 0;
            jobCard.status = 1;
            context.actions.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function(context) {
            var PRRejQty = 0;
            var PRQty = 0;
            return context.actions.getData('production.productionEntry').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.data.jobCardNo === listViewData[i].jobCardNo) {
                        if (listViewData[i].operationTo === 1) {
                            PRRejQty += parseInt(listViewData[i].rejectionQty) + parseInt(listViewData[i].rwQty);
                            PRQty += parseInt(listViewData[i].acceptedQty);
                        }
                    }
                }
                PRQty += PRRejQty;
                return PRQty;
            });
        },
        callBackSubmit: function(context) {
            var newQty;
            var data = angular.copy(context.data.mapping[context.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.data.partNo;
            newContext.data = data;
            context.actions.updatePartStock(newContext);
            context.actions.updateMaterialIssue(context);
        }
    });
    $scope.context = erpAppConfig.modules.production.productionEntryNew;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);