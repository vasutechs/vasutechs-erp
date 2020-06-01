erpConfig.moduleFiles.appFact = function(authFact, commonFact, $q) {
    var erpLoadProm = $q.defer();
    var context = {
        erpAppConfig: erpConfig,
        erpLoadProm: erpLoadProm
    };
    context.methods = angular.extend(commonFact(context), authFact);

    var appModuleAccess = function() {
        return context.methods.getData(context.erpAppConfig.modules.controllers.admin.settings, '1').then(function(res) {
            context.erpAppConfig = angular.extend(context.erpAppConfig, res.data);

            for (var i in context.erpAppConfig.mapping) {
                var map = context.erpAppConfig.mapping[i];
                var module = context.methods.getDeepProp(context.erpAppConfig.modules.controllers, map.module) || {};
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
    var loadErpAppConfig = function() {
        if (context.methods.isAppUser()) {
            appModuleAccess();
        } else {
            erpLoadProm.resolve();
        }
    }();

    var initCtrl = function(scope, module, methods) {
        var returnPageProm = $q.defer();
        return erpLoadProm.promise.then(function() {
            var parentModule;
            var pageProm = [];
            var userType = authFact.isLogin();
            context = angular.extend(context, angular.copy(module));
            scope.context = context;
            context.methods = angular.extend(context.methods, methods && methods(context) || {});

            if (context.parentModule) {
                parentModule = angular.copy(context.methods.getDeepProp(context.erpAppConfig.modules.controllers, context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!userType && context.id !== 'login') {
                context.methods.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                return;
            } else if (context.disable) {
                context.methods.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
                return;
            }
            context.showLoading = true;
            pageProm.push(context.methods.updateFields(context, context.listView));
            context.filterView && pageProm.push(context.methods.updateFields(context, context.filterView.fields));

            scope.$broadcast('showAlertRol');

            Promise.all(pageProm).then(function() {
                if (context.methods[context.page.name]) {
                    context.methods[context.page.name](context).then(function() {
                        scope.context = context;
                        context.methods.showLoadingHttp(scope);
                        context.methods.onLoad && context.methods.onLoad(context);
                        returnPageProm.resolve(context);
                    });
                };
            });
            return returnPageProm.promise;
        });
    };
    return {
        initCtrl: initCtrl,
        context: context
    };
};

erpApp.factory('appFact', erpConfig.moduleFiles.appFact);