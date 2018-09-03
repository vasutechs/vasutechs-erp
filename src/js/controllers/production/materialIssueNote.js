erpApp.controller('materialIssueNoteCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getPartNo: function(context) {
            if (context.data.rmCode) {
                context.form.fields['partNo'].filter = {
                    rmCode: context.data.rmCode
                };
                context.actions.makeOptionsFields(context.form.fields['partNo']);
            }
        },
        getNorms: function(context) {
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
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom']);
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
                    }
                    else{
                        context.data.qtyCanMake = null;
                    }
                });
            }
        }
    });
    $scope.context = erpAppConfig.modules.production.materialIssueNote;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);