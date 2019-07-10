erpApp.controller('empMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackChangeMapping: function(context, mappingData, key, field) {
            var restriction = {
                partNo: mappingData.id,
                filter: {
                    source: ['Supplier']
                }
            };
            //context.form.mapping.fields['operationTo'].options = {};
            //context.actions.getOperationFromFlow(context, context.form.mapping[key].fields['operationTo'], restriction);
        }
    };
    commonFact.initCtrl($scope, 'marketing.empMaster', actions);
}]);