erpApp.factory('appFact', ['staticConfig', 'authFact', 'commonFact', '$q', function(staticConfig, authFact, commonFact, $q) {
    var erpAppConfig = staticConfig;
    var erpLoadProm = $q.defer();
    var defaultActions = commonFact.defaultActions;

    var appModuleAccess = function(erpAppConfig) {
        return defaultActions.getData('admin.settings', '1').then(function(res) {
            erpAppConfig = angular.extend(erpAppConfig, res.data);

            for (var i in erpAppConfig.mapping) {
                var map = erpAppConfig.mapping[i];
                var module = defaultActions.getDeepProp(erpAppConfig.modules, map.module) || {};
                if (!userType || (userType && map.restrictUser !== userType)) {
                    module.disable = map.restrictUser && true;
                }
                if (module.page && (module.page.actions || module.page.actions === undefined)) {
                    module.page.actions = {
                        print: true
                    };
                    module.page.actions.add = map.restrictUser === userType && map['add'] || false;
                    module.page.actions.edit = map.restrictUser === userType && map['edit'] || false;
                    module.page.actions.delete = map.restrictUser === userType && map['delete'] || false;
                }
            }
            erpLoadProm.resolve();
        });
    };
    var loadErpAppConfig = (function() {
        var userType = authFact.isLogin();
        if (userType && userType !== 'ADMIN') {
            appModuleAccess(erpAppConfig);
        } else {
            erpLoadProm.resolve();
        }
    })();

    var initCtrl = function(scope, module, actions) {
        var returnPageProm = $q.defer();
        return erpLoadProm.promise.then(function() {
            var context = angular.copy(module);
            var parentModule;
            var pageProm = [];
            var userType = authFact.isLogin();
            var userDetails = authFact.getUserDetail();
            scope.context = context;
            context.module = module;
            context.erpAppConfig = erpAppConfig;
            context.actions = angular.extend(angular.copy(defaultActions), angular.copy(authFact), actions || {});
            if (context.data) {
                context.data.updatedUserId = userDetails && userDetails.id || null;
            }
            if (context.parentModule) {
                parentModule = angular.copy(context.actions.getDeepProp(context.erpAppConfig.modules, context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!userType && context.module.id !== 'login') {
                context.actions.goToPage(context.erpAppConfig.modules.login.page.link);
                return;
            } else if (context.disable) {
                context.actions.goToPage(context.erpAppConfig.modules.dashboard.page.link);
                return;
            }
            context.showLoading = true;
            pageProm.push(context.actions.updateFields(context, context.listView));
            context.filterView && pageProm.push(context.actions.updateFields(context, context.filterView.fields));

            scope.$broadcast('showAlertRol');

            Promise.all(pageProm).then(function() {
                if (context.actions[context.page.name]) {
                    context.actions[context.page.name](context).then(function() {
                        scope.context = context;
                        context.actions.showLoadingHttp(scope);
                        context.actions.onLoad && context.actions.onLoad(context);
                        returnPageProm.resolve(context);
                    });
                };

            });
            return returnPageProm.promise;
        });
    };
    return {
        initCtrl: initCtrl,
        erpAppConfig: erpAppConfig
    };

}]);