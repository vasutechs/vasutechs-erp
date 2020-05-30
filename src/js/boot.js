'use strict'

var erpConfig = STATIC_CONFIG;
var erpApp = (function() {
    var erpAngularApp = angular.module('erpApp', ['ngRoute']).directive('myApp', function() {
            return {
                restrict: 'E',
                templateUrl: 'template/app.html'
            };
        })
        .constant('staticConfig', erpConfig)
        .config(['$routeProvider', 'staticConfig', function($routeProvider, staticConfig) {
            var page;
            for (var i in routers) {
                page = routers[i];
                $routeProvider.when('/' + page.link, {
                    templateUrl: page.templateUrl,
                    controller: page.controller
                });
            }
            $routeProvider.otherwise({
                redirectTo: staticConfig.appBaseUrl
            });
        }]);
    var routers = [];
    var buildModules = function(modules) {
        var module,
            buildModule = function(module) {
                if (module.page.link) {
                    if (module.page.controller && module.page.templateUrl) {
                        erpAngularApp.controller(module.page.controller, function($scope, appFact) {
                            var moduleFile = erpConfig.moduleFiles[module.id] && erpConfig.moduleFiles[module.id]();
                            var moduleActions = moduleFile && moduleFile.actions;
                            appFact.initCtrl($scope, module, moduleActions);
                        });
                        routers.push(module.page);
                    }

                } else {
                    for (var i in page) {
                        buildModule(page[i]);
                    }
                }
            };
        for (var i in modules) {
            module = modules[i];
            if (module.page) {
                buildModule(module);
            } else if (typeof(module) === 'object') {
                buildModules(module);
            }
        }
    };
    buildModules(erpConfig.modules);

    return erpAngularApp;
})();