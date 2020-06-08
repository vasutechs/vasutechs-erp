erpConfig.moduleFiles.authFact = function($window) {
    return function(context) {
        var erpUserDetails = null;
        var login = function() {
            return context.commonFact.updateData(context, context.data).then(function(res) {
                var data = res.data;

                if (data.userName === context.data.userName) {
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
            setUserDetail();
            erpUserDetails = null;
            return context.commonFact.getData({
                dataUri: 'logout',
                cache: false
            });

        };

        var isLogged = function() {
            var userDetail = getUserDetail();
            if (userDetail && userDetail.userType) {
                return true;
            }
            return false;
        };


        return {
            login: login,
            logout: logout,
            setUserDetail: setUserDetail,
            getUserDetail: getUserDetail,
            isLogged: isLogged
        };
    };
};

erpApp.factory('authFact', erpConfig.moduleFiles.authFact);