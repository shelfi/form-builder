'use strict';

angular.module('app', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'shelfiFormBuilder'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			controllerAs: 'ctrl'
		});

		$urlRouterProvider.otherwise('/');
	});