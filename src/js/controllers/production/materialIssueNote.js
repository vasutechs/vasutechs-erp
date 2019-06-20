erpApp.controller('materialIssueNoteCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackEdit: function(context) {
                context.actions.callBackAdd(context);
                orgItemVal = angular.copy(context.data);
            },
            callBackAdd: function(context) {
                orgItemVal = null;
                context.actions.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = [];
                    for (var i in rmStockData) {
                        rmStock.push(rmStockData[i] && rmStockData[i].rmCode || undefined);
                    }
                    context.form.fields['rmCode'] = angular.extend(context.form.fields['rmCode'], {
                        filter: {
                            id: rmStock
                        }
                    });
                    context.actions.makeOptionsFields(context, context.form.fields['rmCode']);
                });

            },
            getPartNo: function(context) {
                if (context.data.rmCode) {
                    context.form.fields['partNo'].filter = {
                        rmCode: context.data.rmCode
                    };
                    context.actions.makeOptionsFields(context, context.form.fields['partNo']);
                }
            },
            getNorms: function(context) {
                var restriction = {
                    partNo: context.data.partNo,
                    filter: {
                        source: ['Supplier']
                    }
                };
                if (context.data.rmCode && context.data.partNo) {
                    context.data.partNorms = null;
                    var serviceconf = context.actions.getServiceConfig('production.bom');
                    context.data.qtyCanMake = null;
                    context.data.issueQty = null;
                    serviceApi.callServiceApi(serviceconf).then(function(res) {
                        var bomData = res.data;
                        for (var i in bomData) {
                            if (bomData[i].partNo === context.data.partNo && bomData[i].rmCode === context.data.rmCode) {
                                context.data.partNorms = bomData[i].partNorms;
                            }
                        }
                    });
                    context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
                }
            },
            updateQtyMake: function(context) {
                if (context.data.rmCode) {
                    context.actions.getData('report.rmStock').then(function(res) {
                        var rmStockData = res.data,
                            rmStock = {};
                        for (var i in rmStockData) {
                            rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                        }
                        if (orgItemVal && orgItemVal.issueQty) {
                            context.form.fields['issueQty'].max = parseInt(orgItemVal.issueQty) + parseInt(rmStock[context.data.rmCode].rmStockQty);
                        } else {
                            context.form.fields['issueQty'].max = rmStock[context.data.rmCode].rmStockQty;
                        }

                        if (context.data.partNorms && context.data.issueQty && context.form.fields['issueQty'].max >= context.data.issueQty) {
                            context.data.qtyCanMake = context.data.issueQty / context.data.partNorms;
                        } else {
                            context.data.qtyCanMake = null;
                        }
                    });
                }
            },
            removeRMStockQty: function(context, del) {
                context.actions.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = {},
                        rmCode = context.data.rmCode,
                        existingStock = null,
                        removeQty = context.data.issueQty;
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }
                    existingStock = rmStock[rmCode];
                    if (existingStock) {
                        var rmStockQty;
                        if (!del && orgItemVal && orgItemVal.issueQty) {
                            removeQty = parseInt(orgItemVal.issueQty) - parseInt(removeQty);
                            rmStockQty = parseInt(existingStock.rmStockQty) + removeQty;
                        } else if (del) {
                            rmStockQty = parseInt(existingStock.rmStockQty) + parseInt(removeQty);
                        } else {
                            rmStockQty = parseInt(existingStock.rmStockQty) - parseInt(removeQty);
                        }
                        var data = {
                                id: existingStock.id,
                                rmCode: rmCode,
                                rmStockQty: rmStockQty,
                                uomCode: existingStock.uomCode
                            },
                            serviceconf = context.actions.getServiceConfig('report.rmStock', 'POST');
                        serviceApi.callServiceApi(serviceconf, data);
                    }

                })
            },
            callBackSubmit: function(context) {
                var qtyCanMake;
                context.actions.removeRMStockQty(context);

                if (orgItemVal && orgItemVal.issueQty) {
                    qtyCanMake = parseInt(context.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                    context.data.acceptedQty = qtyCanMake;
                } else {
                    context.data.acceptedQty = context.data.qtyCanMake;
                }
                context.actions.updatePartStock(context);
            },
            callBeforeDelete: function(context, id, item) {
                var qtyCanMake;
                context.data = item;
                context.actions.removeRMStockQty(context, true);
                context.data.acceptedQty = 0 - parseInt(context.data.qtyCanMake);
                context.actions.updatePartStock(context);
            }
        };

    commonFact.initCtrl($scope, 'production.materialIssueNote', actions);
}]);