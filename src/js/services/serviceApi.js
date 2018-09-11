erpApp.service('serviceApi', ['$http', '$cacheFactory', function($http, $cacheFactory) {
    this.cacheData = [];

    this.callServiceApi = function(serviceConf, inputData) {
        var servicePromise;
        if(inputData){
        	serviceConf['data'] = inputData;
        }
        //serviceConf['cache'] = true;
        servicePromise = $http(serviceConf);
        return servicePromise;
    };
}]);