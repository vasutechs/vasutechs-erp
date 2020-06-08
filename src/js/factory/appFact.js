erpConfig.moduleFiles.appFact = function(authFact, commonFact, serviceApi, $q) {
    var erpLoadProm = $q.defer();
    var context = {};

    var appModuleAccess = function() {
        return new Promise(function(resolve) {
            if (context.commonFact.isAppUser()) {
                context.commonFact.getData(context.erpAppConfig.modules.controllers.admin.settings, '1').then(function(res) {
                    context.erpAppConfig = angular.extend(context.erpAppConfig, res.data);
                    for (var i in context.erpAppConfig.mapping) {
                        var map = context.erpAppConfig.mapping[i];
                        var module = context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, map.module) || {};
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
                    resolve();
                });
            } else {
                resolve();
            }
        });
    };

    var loadAuth = function() {
        var path = context.commonFact.location.path();

        return new Promise(function(resolve) {
            if (context.erpAppConfig.serverAuth && path !== '/login') {
                context.commonFact.getData({ dataUri: 'checkLoggedIn', cache: false }).then(function(res) {
                    var data = res.data || {};
                    if (data.userName) {
                        context.authFact.setUserDetail(data);
                    }
                    resolve()
                });
            } else {
                resolve();
            }
        })

    };

    var initApp = (function() {
        context = {
            erpAppConfig: erpConfig,
            erpLoadProm: erpLoadProm,
            showLoading: true
        };
        context = angular.extend(context, {
            serviceApi: serviceApi(context),
            commonFact: commonFact(context),
            authFact: authFact(context)
        });
        loadAuth().then(appModuleAccess()).then(function() {
            erpLoadProm.resolve();
        });
    })();

    var initCtrl = function(scope, module, methods) {
        var returnPageProm = $q.defer();
        return erpLoadProm.promise.then(function() {
            var parentModule;
            var pageProm = [];
            var isLogged = context.authFact.isLogged();
            context = angular.extend(context, angular.copy(module), { methods: methods && methods(context) || {} });
            scope.context = context;
            if (context.parentModule) {
                parentModule = angular.copy(context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!isLogged && context.id !== 'login') {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                return;
            } else if (context.disable) {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
                return;
            }
            context.showLoading = true;
            pageProm.push(context.commonFact.updateFields(context.listView));
            context.filterView && pageProm.push(context.commonFact.updateFields(context.filterView.fields));

            scope.$broadcast('showAlertRol');

            Promise.all(pageProm).then(function() {
                if (context.commonFact[context.page.name]) {
                    context.commonFact[context.page.name]().then(function() {
                        scope.context = context;
                        context.commonFact.showLoadingHttp(scope);
                        context.methods.onLoad && context.methods.onLoad();
                        returnPageProm.resolve();
                        context.showLoading = false;
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