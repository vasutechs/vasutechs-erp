erpApp.factory('appFact', ['staticConfig', '$location', 'authFact', 'commonFact', '$q', function(staticConfig, $location, authFact, commonFact, $q) {
    var erpAppConfig = staticConfig;
    var erpLoadProm = $q.defer();
    var defaultActions = commonFact.defaultActions;

    var appModuleAccess = function(erpAppConfig) {
        var settingsService = angular.copy(erpAppConfig.modules.appAdmin.settings.services.list);
        settingsService.url = settingsService.url + '/1';
        return serviceApi.callServiceApi(settingsService).then(function(res) {
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
            var erpAppConfig = getErpAppConfig();
            var context = angular.copy(defaultActions.getDeepProp(erpAppConfig.modules, module));
            var parentModule;
            var pageProm = [];
            var userType = authFact.isLogin();
            var userDetails = authFact.getUserDetail();
            context.showLoading = true;
            scope.context = context;
            context.module = module;
            context.erpAppConfig = erpAppConfig;
            context.actions = angular.extend(angular.copy(defaultActions), actions || {});
            if (context.data) {
                context.data.updatedUserId = userDetails && userDetails.id || null;
            }
            if (context.parentModule) {
                parentModule = angular.copy(context.actions.getDeepProp(context.erpAppConfig.modules, context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!userType) {
                context.actions.goToPage(context.erpAppConfig.modules.login.page.link);
                return;
            }
            if (context.disable) {
                context.actions.goToPage(context.erpAppConfig.modules.dashboard.page.link);
                return;
            }



            pageProm.push(context.actions.updateFields(context, context.listView));
            context.filterView && pageProm.push(context.actions.updateFields(context, context.filterView.fields));

            scope.$broadcast('showAlertRol');

            Promise.all(pageProm).then(function() {
                if (context.actions[context.page.name]) {
                    context.actions[context.page.name](context).then(function() {
                        scope.context = context;
                        context.actions.showLoadingHttp(scope);
                        returnPageProm.resolve(context);
                    });
                };

            });
            return returnPageProm.promise;
        });
    };
    var getErpAppConfig = function() {
        return erpAppConfig;
    };
    return {
        initCtrl: initCtrl,
        getErpAppConfig: getErpAppConfig
    };

}]);