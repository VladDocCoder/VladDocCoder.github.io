'use strict';

var myApp = angular.module('myApp',[
    'ngStorage', 'toastr', 'ngRoute'
]).config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "./index.html",
        controller: "ItemController"
    });
} ]);




