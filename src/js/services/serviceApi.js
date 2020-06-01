erpConfig.moduleFiles.serviceApi = function($http, $cacheFactory, $q) {
    this.callServiceApi = function(serviceConf, inputData) {
        var servicePromise,
            httpCache = $cacheFactory.get('$http');
        var deferred = $q.defer();
        if (inputData) {
            serviceConf['data'] = inputData;
        }
        if (serviceConf.method === 'POST') {
            httpCache.remove(serviceConf.url);
            if (inputData.id !== undefined) {
                httpCache.remove(serviceConf.url + '/' + inputData.id);
            }
        }
        if (!serviceConf.url) {
            setTimeout(function() {
                deferred.reject();
            }, 200);
            servicePromise = deferred.promise;
        } else {
            servicePromise = $http(serviceConf);
        }

        return servicePromise;
    };
};

erpApp.service('serviceApi', erpConfig.moduleFiles.serviceApi);