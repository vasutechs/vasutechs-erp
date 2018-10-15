erpApp.controller('materialIssueNoteCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackEdit: function(context) {
            context.actions.callBackAdd(context);
        },
        callBackAdd: function(context) {
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
                context.actions.makeOptionsFields(context.form.fields['rmCode']);
            });

        },
        getPartNo: function(context) {
            if (context.data.rmCode) {
                context.form.fields['partNo'].filter = {
                    rmCode: context.data.rmCode
                };
                context.actions.makeOptionsFields(context.form.fields['partNo']);
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
                    context.form.fields['issueQty'].max = rmStock[context.data.rmCode].rmStockQty;
                    if (context.data.partNorms && context.data.issueQty && context.form.fields['issueQty'].max >= context.data.issueQty) {
                        context.data.qtyCanMake = context.data.issueQty / context.data.partNorms;
                    } else {
                        context.data.qtyCanMake = null;
                    }
                });
            }
        },
        removeRMStockQty: function(context) {
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
                    var rmStockQty = parseInt(existingStock.rmStockQty) - parseInt(removeQty);
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
            context.actions.removeRMStockQty(context);
            context.data.acceptedQty = context.data.qtyCanMake;
            context.actions.updatePartStock(context);
        }
    });
    $scope.context = erpAppConfig.modules.production.materialIssueNote;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);