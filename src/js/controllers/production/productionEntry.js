erpApp.controller('productionEntryCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.machineMaster.services.list, context.form.fields[1].options, 'machineName');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.materialIssueNote.services.list, context.form.fields[2].options, 'jobCardNo');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.partMaster.services.list, context.form.fields[3].options, 'partNo');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.operationMaster.services.list, context.form.fields[4].options, 'opName');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.operationMaster.services.list, context.form.fields[5].options, 'opName');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.toolMaster.services.list, context.form.fields[6].options, 'partNo');
            // $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.empMaster.services.list, context.form.fields[7].options, 'employeeName');

        },
        callBackEdit: function(context, key) {
            context.data['startTime'] = new Date(context.data['startTime']);
            context.data['endTime'] = new Date(context.data['endTime']);
        }
    });
    $scope.context = erpAppConfig.modules.production.productionEntry;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);