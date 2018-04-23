'use strict'

var erpApp = angular.module('erpApp', ['ngRoute'])
    .directive('myApp', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/app.html'
        };
    })
    .config(['$routeProvider', 'erpAppConfig', function($routeProvider, erpAppConfig) {
        var buildRoute = function(modules) {
            var module,
                buildPage = function(page) {
                    if (page.link) {
                        $routeProvider.when('/' + page.link, {
                            templateUrl: page.templateUrl,
                            controller: page.controller
                        });
                    } else {
                        for (var i in page) {
                            buildPage(page[i]);
                        }
                    }
                };
            for (var i in modules) {
                module = modules[i];
                if (module.pages) {
                    buildPage(module.pages);
                } else {
                    buildRoute(module);
                }
            }
        };
        $routeProvider
            .when('/', {
                redirectTo: erpAppConfig.appBaseUrl
            });
        buildRoute(erpAppConfig.modules);
    }]);