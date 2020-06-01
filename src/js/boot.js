'use strict'
var erpConfig = STATIC_CONFIG;
var erpApp = (function() {
    var routers = [];
    var erpAngularApp = angular.module('erpApp', ['ngRoute']).directive('myApp', function() {
            return {
                restrict: 'E',
                templateUrl: 'template/app.html'
            };
        })
        .config(['$routeProvider', function($routeProvider) {
            var ctrl;
            for (var i in routers) {
                ctrl = routers[i];
                $routeProvider.when('/' + ctrl.page.link, {
                    templateUrl: ctrl.page.templateUrl || "template/defaultView.html",
                    controller: ctrl.id
                });
            }
            $routeProvider.otherwise({
                redirectTo: erpConfig.appBaseUrl
            });
        }]);

    var buildControllers = function(controllers) {
        var ctrl,
            buildCtrl = function(ctrl) {
                if (ctrl.page.link) {

                    erpAngularApp.controller(ctrl.id, function($scope, appFact) {
                        appFact.initCtrl($scope, ctrl, erpConfig.moduleFiles[ctrl.id]);
                    });
                    routers.push(ctrl);
                } else {
                    for (var i in page) {
                        buildCtrl(page[i]);
                    }
                }
            };
        for (var i in controllers) {
            ctrl = controllers[i];
            if (ctrl.page) {
                buildCtrl(ctrl);
            } else if (typeof(ctrl) === 'object') {
                buildControllers(ctrl);
            }
        }
    };
    var buildComponents = function(components) {
        var buildComp = function(comp) {
            erpAngularApp.directive(comp.id, function(appFact) {
                var compMethods = erpConfig.moduleFiles[comp.id];
                var compLink = compMethods && compMethods(appFact);
                return {
                    restrict: comp.restrict || 'E',
                    templateUrl: 'template/components/' + comp.id + '.html',
                    link: compLink
                };
            });
        };
        for (var i in components) {
            buildComp(components[i]);
        }
    };

    buildControllers(erpConfig.modules.controllers);
    buildComponents(erpConfig.modules.components);


    return erpAngularApp;
})();