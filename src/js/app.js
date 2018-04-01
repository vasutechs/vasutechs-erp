'use strict'

var erpApp = angular.module('erpApp', [])
    .directive('myApp', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/app.html'
        };
    });
// erpApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
//     $routeProvider.
//     when('/dashboard', {
//         //templateUrl: 'template/app.html',
//         controller: 'indexCtl'
//     }).
//     otherwise({
//         redirectTo: '/dashboard'
//     });
// }]);