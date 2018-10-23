erpApp.controller('poSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            //context.actions.getPartStock(context);
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);