erpConfig.moduleFiles.serviceApi = function($http, $cacheFactory, $q, $httpParamSerializer) {
    return function(context) {
        var callServiceApi = function(serviceConf, inputData) {
            var servicePromise,
                httpCache = $cacheFactory.get('$http');
            var promiseRes = context.commonFact.getPromiseRes();
            var removeCacheUrl;
            serviceConf['data'] = inputData;
            if (serviceConf.method === 'POST') {
                removeCacheUrl = serviceConf.url;
                removeCacheUrl += serviceConf.params ? '?' + $httpParamSerializer(serviceConf.params) : '';
                httpCache.remove(removeCacheUrl);
            }
            if (!serviceConf.url) {
                setTimeout(function() {
                    promiseRes.reject();
                }, 200);
                servicePromise = promiseRes.promise;
            } else {
                servicePromise = $http(serviceConf)
                    .then(function(res) {
                        return res;
                    }, function(e) {
                        return context.commonFact.errorHandler(e);

                    });
            }
            return servicePromise;
        };
        return {
            callServiceApi: callServiceApi
        }
    };
};

erpApp.service('serviceApi', erpConfig.moduleFiles.serviceApi);