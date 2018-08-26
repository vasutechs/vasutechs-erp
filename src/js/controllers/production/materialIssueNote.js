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
                var serviceconf = context.actions.getServiceConfig('production.bom');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var bomData = res.data;
                    for (var i in bomData) {
                        if (bomData[i].partNo === context.data.partNo && bomData[i].rmCode === context.data.rmCode) {
                            context.data.partNorms = bomData[i].partNorms;
                        }
                    }
                });
                context.actions.getOperations(context);
            }
        },
        getOperations: function(context) {
            context.actions.getOperationFromFlow(context, context.form.fields['operationFrom']);
        },
        updateQtyMake: function(context) {
            if (context.data.partNorms && context.data.issueQty) {
                context.data.qtyCanMake = context.data.issueQty * (context.data.partNorms * 100);
            }
        }
    });
    $scope.context = erpAppConfig.modules.production.materialIssueNote;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);