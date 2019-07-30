erpApp.controller('empMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackChangeMapping: function(context, mappingData, key, field, _this) {

        },
        updateStage: function(context, mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
            field.options = {};
            context.actions.getOperationFromFlow(context, field, restriction);
        },
        callBackEdit: function(context) {
            context.data.mapping = !context.data.mapping && context.masterData.mapping || context.data.mapping;
        }
    };
    commonFact.initCtrl($scope, 'marketing.empMaster', actions);
}]);