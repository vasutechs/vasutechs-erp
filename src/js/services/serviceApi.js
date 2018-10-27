erpApp.service('serviceApi', ['$http', '$cacheFactory', function($http, $cacheFactory) {
    this.callServiceApi = function(serviceConf, inputData) {
        var servicePromise,
        httpCache = $cacheFactory.get('$http');
        if(inputData){
        	serviceConf['data'] = inputData;
        }
        if(serviceConf.method==='POST'){
            httpCache.remove(serviceConf.url);
            if(inputData.id!==undefined){
                httpCache.remove(serviceConf.url + '/' + inputData.id);
            }
        }
        servicePromise = $http(serviceConf);
        return servicePromise;
    };
}]);