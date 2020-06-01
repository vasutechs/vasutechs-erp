erpConfig.moduleFiles.login = function(context) {
    return {
        submit: function() {
            context.methods.login(context).then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.alertMessage = 'Invalid User!!!';
                } else {
                    context.methods.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                }
            });
        },
        onLoad: function() {
            if (context.methods.location.search() && context.methods.location.search()['type'] === 'logout') {
                context.methods.logout(undefined);
                context.methods.location.search('');
                context.methods.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
            }
        }
    };
};