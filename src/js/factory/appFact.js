erpConfig.moduleFiles.appFact = function(authFact, commonFact, serviceApi, $q) {
    var erpLoadProm = $q.defer();
    var context = {
        erpAppConfig: erpConfig,
        erpLoadProm: erpLoadProm,
        showLoading: true
    };
    var initApp = (function() {
        context = angular.extend(context, {
            serviceApi: serviceApi(context),
            commonFact: commonFact(context),
            authFact: authFact(context)
        });
        context.authFact.loadAuth().then(function() {
            return context.commonFact.appModuleAccess();
        }).then(function() {
            erpLoadProm.resolve();
        });
    })();

    var initCtrl = function(scope, module, methods) {
        var returnPageProm = $q.defer();
        return erpLoadProm.promise.then(function() {
            var parentModule;

            context.controller = angular.extend(angular.copy(module), { methods: methods && methods(context) || {} });
            var isLogged = context.authFact.isLogged();
            scope.context = context;
            if (context.controller.parentModule) {
                parentModule = angular.copy(context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, context.controller.parentModule));
                context.controller = angular.merge({}, angular.copy(parentModule), context.controller);
            }
            if (!isLogged && context.controller.id !== 'login') {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                return;
            } else if (context.controller.disable) {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
                return;
            }
            context.showLoading = true;


            scope.$broadcast('showAlertRol');


            if (context.commonFact[context.controller.page.name]) {
                context.commonFact[context.controller.page.name]().then(function() {
                    scope.context = context;
                    context.commonFact.showLoadingHttp(scope);
                    context.controller.methods.onLoad && context.controller.methods.onLoad();
                    returnPageProm.resolve();
                });
            } else {
                context.controller.methods.onLoad && context.controller.methods.onLoad();
                returnPageProm.resolve();
            }

            return returnPageProm.promise;
        });
    };
    return {
        initCtrl: initCtrl,
        context: context
    };
};

erpApp.factory('appFact', erpConfig.moduleFiles.appFact);