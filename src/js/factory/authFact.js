erpConfig.moduleFiles.authFact = function(serviceApi, $window) {
    var login = function(context) {
        var usersService = angular.copy(context.erpAppConfig.modules.controllers.admin.users.services.list);
        return serviceApi.callServiceApi(usersService).then(function(res) {
            var data = res.data;
            var userDetail;
            for (var i in data) {
                if (data[i].userName === context.data.userName && data[i].password === context.data.password) {
                    userDetail = {
                        id: data[i].id,
                        userName: data[i].userName,
                        userType: data[i].userType
                    };
                }
            }
            setUserDetail(userDetail);
            return userDetail;
        });
    };
    var setUserDetail = function(userDetail) {
        $window.sessionStorage.setItem('erpUserDetail', JSON.stringify(userDetail));
        return userDetail;
    };
    var getUserDetail = function() {
        var userDetail = $window.sessionStorage.getItem('erpUserDetail');
        if (userDetail !== 'undefined') {
            userDetail = JSON.parse(userDetail);
        }
        return userDetail;
    };
    var isLogin = function() {
        var userDetail = getUserDetail();
        if (userDetail) {
            return userDetail.userType;
        }
        return false;
    };
    var logout = function() {
        setUserDetail();
    };

    return {
        login: login,
        logout: logout,
        setUserDetail: setUserDetail,
        getUserDetail: getUserDetail,
        isLogin: isLogin
    };
};

erpApp.factory('authFact', erpConfig.moduleFiles.authFact);