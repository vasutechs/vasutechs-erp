erpConfig.moduleFiles.alertRol = function(appFact) {
    return function(scope) {
        scope.$on('showAlertRol', function() {
            scope.alertRolContext = appFact.context.commonFact.showAlertRol(scope);
        });
    };
};