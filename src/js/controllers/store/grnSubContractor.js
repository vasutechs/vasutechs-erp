erpApp.controller('grnSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getDCSubContractor: function(context, data, key, field) {
            context.form.fields[4] = angular.extend(context.form.fields[4], {
                filter: { 
                	poNo: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields[4]);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields[3] = angular.extend(context.form.fields[3], {
                filter: {
                    subContractorCode: key
                }
            });
            context.actions.makeOptionsFields(context.form.fields[3]);
        },
        updateDCSubContractor: function(context) {
            context.actions.getData('store.dcSubContractor', context.data.dcNo).then(function(res) {
                var dcSubContractor = res.data;
                dcSubContractor.status = 1;
                context.actions.updateData('store.dcSubContractor', dcSubContractor, context.data.dcNo);
            });
        },
        callBackSubmit: function(context) {
            context.data.mapping[0].partNo = context.data.mapping[0].id;
            context.actions.updatePartStock({
                data: context.data.mapping[0]
            });
            context.actions.updateDCSubContractor(context);
        },
        updatePartTotal: function(data, updateValue) {
            var total = 0,
                totalBeforTax = 0;
            totalBeforTax = updateValue * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100)) + (totalBeforTax * (data.cgst / 100)) + (totalBeforTax * (data.sgst / 100))
            data.total = parseFloat(total).toFixed(2);
        }
    });;

    $scope.context = erpAppConfig.modules.store.grnSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);