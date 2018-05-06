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
                        if (page.controller && page.templateUrl) {
                            $routeProvider.when('/' + page.link, {
                                templateUrl: page.templateUrl,
                                controller: page.controller
                            });
                        }

                    } else {
                        for (var i in page) {
                            buildPage(page[i]);
                        }
                    }
                };
            for (var i in modules) {
                module = modules[i];
                if (module.page) {
                    buildPage(module.page);
                } else if (typeof(module) === 'object') {
                    buildRoute(module);
                }
            }
        };
        $routeProvider
            .otherwise({
                redirectTo: erpAppConfig.appBaseUrl
            });
        buildRoute(erpAppConfig.modules);
    }]);