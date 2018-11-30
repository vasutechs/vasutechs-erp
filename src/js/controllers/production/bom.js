erpApp.controller('bomCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'production.bom');
}]);