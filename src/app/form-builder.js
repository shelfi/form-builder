(function () {
	
	'use strict';

	angular.module('formBuilder')
		.run(function ($templateCache) {
			$templateCache.put('row', '' + 
				'<div layout="column">' + 
					'<div ng-repeat="item in structure">' + 
						'<sf-form-builder structure="item" ng-model="data" form="form"></sf-form-builder>' + 
					'</div>' + 
				'</div>'
			);
			$templateCache.put('column', '' + 
				'<div layout="row">' + 
					'<div ng-repeat="item in structure">' + 
						'<sf-form-builder structure="item" ng-model="data" form="form"></sf-form-builder>' + 
					'</div>' + 
				'</div>'
			);
			$templateCache.put('inputContainer', '' + 
				'<md-input-container>' + 
					'<label>{{ label }}</label>' + 
					'<sf-input attrs="input" ng-model="data" form="form"></sf-input>' + 
				'</md-input-container>'
			);
			$templateCache.put('lines', '' + 
				'<div>' + 
					'<h2>{{ title }}</h2>' + 
					'<sf-form-builder ng-repeat="item in data[items]" structure="repeat" ng-model="item" form="form"></sf-form-builder>' + 
					'<md-button ng-click="add()">Add</md-button>' + 
					'<md-button ng-click="removeAll()">Remove all</md-button>' + 
				'</div>'
			);
		})
		.provider('sfFormBuilder', function () {
			this.$get = ['$templateCache', function ($templateCache) {
				return {
					getTemplate: function (key) {
						var tmpl = $templateCache.get(key);
						if(!tmpl) {
							//http://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not
							if (/<[a-z][\s\S]*>/i.test(key)) {
								return key;
							}
							throw 'Error: Template not found! Template name: ' + key;
						}
						return tmpl;
					}
				};
			}];
		})
		.directive('sfFormBuilder', function ($compile, sfFormBuilder) {
			return {
				restrict: 'E',
				scope: {
					structure: '=',
					data: '=ngModel',
					form: '=',
					live: '@'
				},
				link: function (scope, element) {
					var compileTemplate = function (key, val) {
						if (!angular.isObject(val)) {
							//console.log('returned', key, val);
							return;
						}
						//console.log('------------------');
						//console.log(key, val, scope);
						var template = sfFormBuilder.getTemplate(key);
						var childScope = scope.$new(true);
						angular.forEach(val, function (scopeVal, scopeKey) {
							childScope[scopeKey] = scopeVal;
						});
						childScope.structure = val;
						childScope.data = scope.data;
						scope.$watch('data', function (v) {
							childScope.data = v;
						}, true);
						childScope.form = scope.form;
						if (key === 'lines') {
							childScope.add = function () {
								childScope.data[val.items].push({});
							};
							childScope.removeAll = function () {
								childScope.data[val.items] = [];
							};
							childScope.remove = function (index) {
								childScope.data[val.items].splice(index, 1);
							};
						}
						var el = angular.element(template);
						element.append(el);
						$compile(el)(childScope);
						//console.log('------------------');
						//console.log('renderrr');
						//console.log(template);
						//console.log(childScope);
					};
					var render = function () {
						element.html('');
						//console.log('====================');
						//console.log(scope.structure);
						angular.forEach(scope.structure, function (structureVal, structureKey) {
							//console.log('------------------------');
							//console.log(structureKey, structureVal);
							if (angular.isArray(structureVal) && structureKey !== 'row' && structureKey !== 'column') {
								angular.forEach(structureVal, function (arrayVal) {
									compileTemplate(structureKey, arrayVal);
								});
							}
							else {
								compileTemplate(structureKey, structureVal);
							}
						});
					};
					if (!scope.live) {
						scope.live = 'false';
					}
					if (scope.live === 'true') {
						scope.$watch('structure', function () {
							render();
						}, true);
					}
					else {
						render();
					}
				}
			};
		});

})();