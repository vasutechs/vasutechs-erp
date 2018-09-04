erpApp.controller('dcSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updatePoSubContractor: function(context) {
            context.actions.getData('purchase.poSubContractor', context.data.poNo).then(function(res) {
                var poSubContractor = res.data;
                poSubContractor.status = 1;
                context.actions.updateData('purchase.poSubContractor', poSubContractor, context.data.poNo);
            });
        },
        callBackSubmit: function(context) {
            context.actions.updatePoSubContractor(context);
        },
        callBackChangeMapping: function(context, data, key){
            context.form.mapping.fields['operationFrom'].endWith = context.data.mapping[0].operationTo;
            context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationFrom'], key, 'In-house');
        }
    });

    $scope.context = erpAppConfig.modules.store.dcSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);