erpConfig.moduleFiles.login = function(context) {
    return {
        loginSubmit: function() {
            context.authFact.login().then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.controller.alertMessage = 'Invalid User!!!';
                } else {
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                }
            });
        },
        redirectLogin: function() {
            context.commonFact.location.search('');
            context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link, true);
        },
        onLoad: function() {
            if (context.commonFact.location.search() && context.commonFact.location.search()['type'] === 'logout') {
                context.erpAppConfig.serverAuth && context.authFact.logout().then(function() {
                    context.controller.methods.redirectLogin();
                }) || context.controller.methods.redirectLogin();

            }
        }
    };
};