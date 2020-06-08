erpConfig.moduleFiles.serviceApi = function($http, $cacheFactory, $q, $httpParamSerializer) {
    return function(context) {
        var callServiceApi = function(serviceConf, inputData) {
            var servicePromise,
                httpCache = $cacheFactory.get('$http');
            var deferred = $q.defer();
            serviceConf['data'] = angular.extend(serviceConf['data'] || {}, inputData || {});
            if (serviceConf.method === 'POST') {
                httpCache.remove(serviceConf.url + '?' + $httpParamSerializer(serviceConf.params));
            }
            if (!serviceConf.url) {
                setTimeout(function() {
                    deferred.reject();
                }, 200);
                servicePromise = deferred.promise;
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