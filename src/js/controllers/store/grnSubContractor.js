erpApp.controller('grnSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getDCSubContractor: function(context, data, key, field) {
            context.form.fields['dcNo'] = angular.extend(context.form.fields['dcNo'], {
                filter: {
                    poNo: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['dcNo']);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updateDCSubContractor: function(context) {
            context.actions.getData('store.dcSubContractor', context.data.dcNo).then(function(res) {
                var dcSubContractor = res.data;
                dcSubContractor.status = 1;
                dcSubContractor.id = context.data.dcNo;
                context.actions.updateData('store.dcSubContractor', dcSubContractor);
            });
        },
        callBackSubmit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].partNo = context.data.mapping[i].id;
                context.actions.updatePartStock({
                    data: context.data.mapping[i]
                });
                context.actions.updateDCSubContractor(context);
            }
        },
        callBackUpdatePartTotal: function(context, data, newValue, mapKey){
            if(data.acceptedQty){
                data.receivedQty = data.acceptedQty < data.receivedQty ? null : data.receivedQty;
            }
        }
    });;

    $scope.context = erpAppConfig.modules.store.grnSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);