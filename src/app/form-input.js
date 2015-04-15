(function () {
	
	'use strict';

	angular.module('formBuilder')
		.provider('sfInput', function () {
			var input = {
				text: '<input type="text">',
				hidden: '<input type="hidden">',
				password: '<input type="password">',
				checkbox: '<input type="checkbox">',
				file: '<input type="file">',
				email: '<input type="email">',
				date: '<input type="date">',
				datetime: '<input type="datetime">',
				datetimeLocal: '<input type="datetime-local">',
				month: '<input type="month">',
				number: '<input type="number">',
				range: '<input type="range">',
				search: '<input type="search">',
				tel: '<input type="tel">',
				time: '<input type="time">',
				url: '<input type="url">',
				week: '<input type="week">',
				color: '<input type="color">',
				textarea: '<textarea></textarea>',
				radio: '<input type="radio">',
				select: '<select></select>'
			};

			this.add = function (name, template) {
				input[name] = template;
			};

			this.$get = function () {
				return {
					getTemplate: function (name) {
						if (!input[name]) {
							throw 'Error: Input not found! Input name: ' + name;
						}
						return input[name];
					},
					getElement: function (attrs) {
						var t = this.getTemplate(attrs.type);
						var c = angular.element('<div />');
						var e = angular.element(t);
						//console.log('-------------------');
						//console.log(attrs);
						angular.forEach(attrs, function (val, key) {
							if (['type', 'multi'].indexOf(key) === -1 && (angular.isString(val) || angular.isFunction(val))) {
								//camelCase to hyphen-case
								//http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space
								//http://stackoverflow.com/questions/3673138/javascript-regex-camel-to-file-case
								//str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
								e.attr(key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), angular.isFunction(val) ? 'event_' + key + '()' : val);
							}
							/*
							else if (attrs.name === 'cvc' && angular.isFunction(val)) {
								//console.log('isFunction', key, val);
								//e.bind(key, val);
								e.attr(key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), 'event_' + key + '()');
							}
							*/
						});
						c.append(e);
						if (attrs.validationTexts) {
							angular.forEach(attrs.validationTexts, function (val, key) {
								//console.log(key, val);
								var code = angular.element('<code />');
								code.attr('ng-show', 'form.' + attrs.name + '.$error.' + key);
								code.html('{{ "' + val + '" }}'); // TODO: translate filter will be added
								c.append(code);
							});
						}
						return {
							multi: false,
							element: c.children()
						};
					}
				};
			};
		})
		.directive('sfInput', function ($compile, sfInput) {
			return {
				restrict: 'E',
				scope: {
					attrs: '=',
					data: '=ngModel',
					form: '='
				},
				link: function (scope, element) {
					angular.forEach(scope.attrs, function (val, key) {
						if (angular.isFunction(val)) {
							scope['event_' + key] = val;
						}
					});
					var input = sfInput.getElement(scope.attrs);
					element.replaceWith(input.element);
					$compile(input.element)(scope);
				}
			};
		});

})();