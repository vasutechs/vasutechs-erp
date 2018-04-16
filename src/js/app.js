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
            .when('/master/partMaster/list', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            })
            .when('/master/partMaster/edit', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            })
            .when('/master/partMaster/add', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            })
            .when('/master/partMaster/delete', {
                templateUrl: 'template/master/partMaster.html',
                controller: 'partMasterCtrl'
            });
    });