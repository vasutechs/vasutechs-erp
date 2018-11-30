erpApp.factory('erpAppConfig', ['staticConfig', 'serviceApi', function(staticConfig, serviceApi) {
    var erpAppConfig = staticConfig;
    var settingsService = erpAppConfig.modules.admin.settings.services.list;
    settingsService.url = settingsService.url + '/1';
    serviceApi.callServiceApi(settingsService).then(function(res) {
        erpAppConfig = angular.extend(erpAppConfig, res.data);
    });
    return erpAppConfig;
}]);