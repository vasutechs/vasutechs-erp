'use strict'

var erpApp = angular.module('erpApp', ['ngRoute']) 
    .directive('myApp', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/app.html'
        };
    })
    .config(function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'template/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when('/partMaster', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            })
            .when('/partMaster/edit', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            })
            .when('/partMaster/add', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            });
    });