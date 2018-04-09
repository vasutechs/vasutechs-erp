erpApp.controller('partMasterCtrl', ['erpAppConfig', '$scope', 'serviceApi', '$location', function(erpAppConfig, $scope, serviceApi, $location) {
    $scope.ctrlScope = erpAppConfig.master.partMaster;
    $scope.formFields = $scope.ctrlScope.form.fields;
    $scope.ctrlScope.pagePath = ($location.path() === '/partMaster/add' || $location.path() === '/partMaster/edit') ? 'entry' : 'list';
    serviceApi.callServiceApi(erpAppConfig.services.partMasterList).then(function(res) {
        $scope.ctrlScope.partMasterData = res.data;
    });
}]);