erpConfig.moduleFiles.login = function() {
    var actions = {
        submit: function(context) {
            context.actions.login(context).then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.alertMessage = 'Invalid User!!!';
                } else {
                    context.actions.goToPage(context.erpAppConfig.modules.dashboard.page.link, true);
                }
            });
        },
        onLoad: function(context) {
            if (context.actions.location.search() && context.actions.location.search()['type'] === 'logout') {
                context.actions.logout(undefined);
                context.actions.location.search('');
                context.actions.goToPage(context.erpAppConfig.modules.dashboard.page.link, true);
            }
        }
    };
    return {
        actions: actions
    };
};