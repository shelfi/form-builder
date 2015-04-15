'use strict';

angular.module('formBuilder', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			controllerAs: 'ctrl'
		});

		$urlRouterProvider.otherwise('/');
	});