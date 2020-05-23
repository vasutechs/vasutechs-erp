erpApp.controller('bomAssemblePartCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'production.bomAssemblePart');
}]);