erpConfig.moduleFiles.serviceApi = function($http, $cacheFactory, $q, $httpParamSerializer) {
    return function(context) {
        var callServiceApi = function(serviceConf, inputData) {
            var servicePromise,
                httpCache = $cacheFactory.get('$http');
            var promiseRes = context.commonFact.getPromiseRes();
            var removeListCacheUrl;
            var removeEditCacheUrl;
            var paramsId;
            serviceConf['data'] = inputData;
            if (serviceConf.method === 'POST') {
                removeListCacheUrl = serviceConf.url;
                removeListCacheUrl += serviceConf.params ? '?' + $httpParamSerializer(serviceConf.params) : '';
                httpCache.remove(removeListCacheUrl);
                if (inputData && inputData.id) {
                    paramsId = angular.extend({}, angular.copy(serviceConf.params), { id: inputData.id });
                }
                removeEditCacheUrl = serviceConf.url;
                removeEditCacheUrl += paramsId ? '?' + $httpParamSerializer(paramsId) : '';
                httpCache.remove(removeEditCacheUrl);

            }
            if (!serviceConf.url) {
                setTimeout(function() {
                    promiseRes.resolve({});
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