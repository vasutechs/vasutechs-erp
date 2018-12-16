erpApp.factory('authFact', ['commonFact', 'serviceApi', '$window', function(commonFact, serviceApi, $window) {
    var erpAppConfig = commonFact.getErpAppConfig();
    var authFact = {
        login: function(context) {
            var usersService = angular.copy(erpAppConfig.modules.admin.users.services.list);
            var _this = this;
            return serviceApi.callServiceApi(usersService).then(function(res) {
                var data = res.data;
                var userDetail;
                for (var i in data) {
                    if (data[i].userName === context.data.userName && data[i].password === context.data.password) {
                        userDetail = {
                            userName: data[i].userName,
                            userType: data[i].userType
                        };
                    }
                }
                _this.setUserDetail(userDetail);
                return userDetail;
            });
        },
        setUserDetail: function(userDetail) {
            $window.sessionStorage.setItem('erpUserDetail', JSON.stringify(userDetail));
            return userDetail;
        },
        getUserDetail: function(context) {
            var userDetail = $window.sessionStorage.getItem('erpUserDetail');
            if(userDetail !== 'undefined'){
            	userDetail = JSON.parse(userDetail);
            }
            return userDetail;
        },
        isLogin: function(context) {
            var userDetail = this.getUserDetail();
            if (userDetail) {
                return userDetail.userType;
            }
            return false;
        }
    };


    return authFact;
}]);