erpApp.controller('bomCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
    	getRm: function(context, data, key, field) {
            // context.form.fields['rmCode'] = angular.extend(context.form.fields['rmCode'], {
            //     filter: {}
            // });
            // context.actions.makeOptionsFields(context.form.fields['rmCode']);
        }
    });
    $scope.context = erpAppConfig.modules.production.bom;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);