var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

var socket = io.connect();


myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/partials/new_user.html',
			controller: 'UsersController as UC'
		})
		.when('/bids', {
			templateUrl: '/partials/bids.html',
			controller: 'UsersController as UC'
		})
		.otherwise({
			redirectTo: '/'
		})
})
