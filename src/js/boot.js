'use strict'
var erpConfig = STATIC_CONFIG;
var routers = [];
var erpApp = angular.module('erpApp', ['ngRoute'])
    .directive('myApp', function() {
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

                erpApp.controller(ctrl.id, ['$scope', 'appFact', function($scope, appFact) {
                    appFact.initCtrl($scope, ctrl, erpConfig.moduleFiles[ctrl.id]);
                }]);
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
        erpApp.directive(comp.id, ['appFact', function(appFact) {
            var compMethods = erpConfig.moduleFiles[comp.id] && erpConfig.moduleFiles[comp.id](appFact);
            return {
                restrict: comp.restrict || 'E',
                templateUrl: comp.template || comp.template === undefined ? 'template/components/' + comp.id + '.html' : '',
                link: compMethods && compMethods.link,
                scope: compMethods && compMethods.scope
            };
        }]);
    };
    for (var i in components) {
        buildComp(components[i]);
    }
};

buildControllers(erpConfig.modules.controllers);
buildComponents(erpConfig.modules.components);