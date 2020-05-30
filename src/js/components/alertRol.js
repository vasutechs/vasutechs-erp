erpApp.directive('alertRol', ['appFact', 'commonFact', 'authFact', function(appFact, commonFact, authFact) {
    var erpAppConfig = appFact.erpAppConfig;
    var showROL = true;
    var showAlertRol = function($scope) {
        var userType = authFact.isLogin();
        $scope.hideROL = function() {
            showROL = false;
        }
        if (userType) {
            commonFact.defaultActions.getData('marketing.partMaster').then(function(res) {
                var partMaster = res.data;
                commonFact.defaultActions.getData('report.partStock').then(function(res1) {
                    var partStockData = res1.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    for (var j in partMaster) {
                        var yellowAlert = partMaster[j].rolQtyYellowRage;
                        var redAlert = partMaster[j].rolQtyRedRage;
                        var checkPartStock = partStock[partMaster[j].id + '-' + erpAppConfig.finalStageOpp];

                        if (checkPartStock) {
                            checkPartStock.partName = partMaster[j].partName;
                            if (redAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolRed.push(checkPartStock);
                            } else if (yellowAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolYellow.push(checkPartStock);
                            }
                        }

                    }
                    if (($scope.alertRolContext.partRolRed.length > 0 || $scope.alertRolContext.partRolYellow.length > 0) && showROL) {
                        angular.element('#RolModal').modal('show');
                    }
                });
            });
        }
    }
    var alertRolComp = function($scope, element, attrs) {

        $scope.alertRolContext = {};
        $scope.alertRolContext.partRolYellow = [];
        $scope.alertRolContext.partRolRed = [];
        $scope.$on('showAlertRol', function() {
            showAlertRol($scope);
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/alertRol.html',
        link: alertRolComp
    };
}]);