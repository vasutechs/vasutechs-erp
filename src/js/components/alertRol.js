erpApp.directive('alertRol', ['commonFact', 'authFact', function(commonFact, authFact) {
    var appConfig = commonFact.getErpAppConfig();
    var showAlertRol = function($scope) {
        var userType = authFact.isLogin();
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
                        var checkPartStock = partStock[partMaster[j].id + '-' + appConfig.finalStageOpp];

                        if (checkPartStock) {
                            checkPartStock.partName = partMaster[j].partName;
                            if (redAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolRed.push(checkPartStock);
                            } else if (yellowAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolYellow.push(checkPartStock);
                            }
                        }

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
            showAlertRol($scope)
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/alertRol.html',
        link: alertRolComp
    };
}]);