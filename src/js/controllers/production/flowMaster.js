erpApp.controller('flowMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'production.flowMaster');
}]);