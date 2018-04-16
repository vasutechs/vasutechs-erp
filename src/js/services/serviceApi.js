erpApp.service('serviceApi', function($http) {
    this.callServiceApi = function(serviceConf, inputData) {
        return serviceConf.method === 'GET' ? $http.get(serviceConf.url) : $http.post(serviceConf.url, inputData);
    }
});