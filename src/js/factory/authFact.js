erpConfig.moduleFiles.authFact = function($window) {
    return function(context) {
        var erpUserDetails = null;
        var login = function() {
            return context.commonFact.updateData(context.controller, context.controller.data).then(function(res) {
                var data = res.data;

                if (data.userName === context.controller.data.userName) {
                    setUserDetail(data);
                }

                return data;
            });
        };
        var setUserDetail = function(userDetail) {
            erpUserDetails = JSON.stringify(userDetail);
            !context.erpAppConfig.serverAuth && $window.sessionStorage.setItem(context.erpAppConfig.appName, erpUserDetails);
            return userDetail;
        };
        var getUserDetail = function() {
            var userDetail = erpUserDetails || !context.erpAppConfig.serverAuth && $window.sessionStorage.getItem(context.erpAppConfig.appName);
            if (userDetail !== 'undefined') {
                userDetail = JSON.parse(userDetail);
            }
            return userDetail;
        };

        var logout = function() {
            var promiseRes = context.commonFact.getPromiseRes();
            setUserDetail();
            erpUserDetails = null;
            if (context.erpAppConfig.serverAuth) {
                context.commonFact.getData({
                    dataUri: 'logout',
                    cache: false
                }).then(function(res) {
                    promiseRes.resolve();
                });
            } else {
                promiseRes.resolve();
            }
            return promiseRes.promise;

        };

        var isLogged = function() {
            var userDetail = getUserDetail();
            if (userDetail && userDetail.userType) {
                return true;
            }
            return false;
        };

        var loadAuth = function() {
            var path = context.commonFact.location.path();
            var promiseRes = context.commonFact.getPromiseRes();

            if (context.erpAppConfig.serverAuth && path !== '/login') {
                context.commonFact.getData({ dataUri: 'checkLoggedIn', cache: false }).then(function(res) {
                    var data = res.data || {};
                    if (data.userName) {
                        context.authFact.setUserDetail(data);
                    }
                    promiseRes.resolve();
                });
            } else {
                promiseRes.resolve();
            }
            return promiseRes.promise;
        }


        return {
            loadAuth: loadAuth,
            login: login,
            logout: logout,
            setUserDetail: setUserDetail,
            getUserDetail: getUserDetail,
            isLogged: isLogged
        };
    };
};

erpApp.factory('authFact', erpConfig.moduleFiles.authFact);