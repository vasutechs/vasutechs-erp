erpApp.controller('partMasterCtrl', ['erpAppConfig', '$scope', 'serviceApi', '$location', 'commonFact', function(erpAppConfig, $scope, serviceApi, $location, commonFact) {
    var editPartMaster = function() {
        var serviceconf = {
            url: erpAppConfig.services.partMasterList.url + "/" + $location.search()['id'],
            method: 'GET'
        };
        serviceApi.callServiceApi(serviceconf).then(function(res) {
            $scope.formScope.data = res.data;
        });
    };
    var deletePartMaster = function() {
        var serviceconf = {
            url: erpAppConfig.services.partMasterList.url,
            method: 'POST'
        };
        serviceApi.callServiceApi(serviceconf, { id: $location.search()['id'], delete: 'yes' }).then(function(res) {
            $scope.formScope.data = res.data;
        });
        $location.path(erpAppConfig.pages.master.partMaster.list.link).search({});
    };
    $scope.ctrlScope = erpAppConfig.master.partMaster;
    $scope.ctrlScope.pages = erpAppConfig.pages;
    $scope.formScope = $scope.ctrlScope.form;
    $scope.ctrlScope.pagePath = commonFact.getPage();
    $scope.submit = function() {
        var serviceconf = {
            url: erpAppConfig.services.partMasterList.url,
            method: 'POST'
        };
        serviceApi.callServiceApi(serviceconf, $scope.formScope.data);
        $location.path(erpAppConfig.pages.master.partMaster.list.link).search({});
    };
    if ($scope.ctrlScope.pagePath.name === 'list') {
        serviceApi.callServiceApi(erpAppConfig.services.partMasterList).then(function(res) {
            $scope.ctrlScope.partMasterData = res.data;
        });
    }
    if ($scope.ctrlScope.pagePath.name === 'edit') {
        editPartMaster();
    }
    if ($scope.ctrlScope.pagePath.name === 'delete') {
        deletePartMaster();
    }

}]);