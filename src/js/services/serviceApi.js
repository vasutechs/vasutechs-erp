erpApp.service('serviceApi', function($http) {
    this.callServiceApi = function (service) {
        return $http.get(service.url);
    }
});