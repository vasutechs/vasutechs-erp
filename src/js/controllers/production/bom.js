erpApp.controller('bomCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackEdit: function(context, key) {
            var partNos = [];
            for (var i in context.form.fields['partNo'].options) {
                var val = context.form.fields['partNo'].options[i].id;
                if(!context.actions.findObjectByKey(context.listViewDataMaster, context.form.fields['partNo'].id, val)){
                    partNos.push(val);
                }
            }
            if(partNos.length === 0 && !key){
                partNos = 'nil';
            }
            else if(key){
                partNos.push(context.data.partNo);
            }
            context.form.fields['partNo'].filter = {
                id: partNos
            };
            context.actions.makeOptionsFields(context.form.fields['partNo']);
        },
        callBackAdd: function(context) {
            context.actions.callBackEdit(context);
        }
    });
    $scope.context = erpAppConfig.modules.production.bom;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);