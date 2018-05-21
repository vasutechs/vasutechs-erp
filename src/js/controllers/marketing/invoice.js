erpApp.controller('invoiceCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            context.actions.makeOptionsFields(erpAppConfig.modules.marketing.customerMaster.services.list, $scope.context.form.fields['customerCode'].options, 'customerName');
            context.actions.makeOptionsFields(erpAppConfig.modules.marketing.partMaster.services.list, $scope.context.form.mapping.fields[1].options, 'partName');
        },
        ownSetAutoGenKey: function(context) {
            var year = new Date().getFullYear();
            context.data[context.form.autoGenKey] = context.data[context.form.autoGenKey] + '/' + year;
            console.log(context);
        }
    });

    $scope.context = erpAppConfig.modules.marketing.invoice;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);

}]).
directive('entryInvoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/entryInvoice.html'
    };
});