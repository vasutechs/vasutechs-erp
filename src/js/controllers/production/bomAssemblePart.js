erpApp.controller('bomAssemblePartCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackAdd: function(context) {
            context.actions.makeOptionsFields(context, context.form.fields['partNo']);
        },
        callBackEdit: function(context) {
            context.actions.callBackAdd(context);
        }
    };
    commonFact.initCtrl($scope, 'production.bomAssemblePart', actions);
}]);