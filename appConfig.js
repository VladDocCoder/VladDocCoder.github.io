'use strict';
angular
    .module('myApp')
    .config(MainRouting);

function MainRouting($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('main', {
            url: '/',
            templateUrl: './index.html',
            controller: 'ItemController',
            controllerAs: 'ctrl'
        });
    $urlRouterProvider.otherwise('/');
}
