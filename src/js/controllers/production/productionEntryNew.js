erpApp.controller('productionEntryNewCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {});
    $scope.context = erpAppConfig.modules.production.productionEntryNew;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);