erpApp.controller('loginCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'admin.login');
}]);