'use strict';

angular.module('shelfiFormBuilder')
	.config(function (sfInputProvider) {
		sfInputProvider.add('text', '<input type="text">');
		sfInputProvider.add('hidden', '<input type="hidden">');
		sfInputProvider.add('password', '<input type="password">');
		sfInputProvider.add('checkbox', '<input type="checkbox">');
		sfInputProvider.add('file', '<input type="file">');
		sfInputProvider.add('email', '<input type="email">');
		sfInputProvider.add('date', '<input type="date">');
		sfInputProvider.add('datetime', '<input type="datetime">');
		sfInputProvider.add('datetimeLocal', '<input type="datetime-local">');
		sfInputProvider.add('month', '<input type="month">');
		sfInputProvider.add('number', '<input type="number">');
		sfInputProvider.add('range', '<input type="range">');
		sfInputProvider.add('search', '<input type="search">');
		sfInputProvider.add('tel', '<input type="tel">');
		sfInputProvider.add('time', '<input type="time">');
		sfInputProvider.add('url', '<input type="url">');
		sfInputProvider.add('week', '<input type="week">');
		sfInputProvider.add('color', '<input type="color">');
		sfInputProvider.add('textarea', '<textarea></textarea>');
		sfInputProvider.add('radio', '<input type="radio">');
		sfInputProvider.add('select', '<select></select>');
		//sfInputProvider.add('select', '<md-select></md-select>');
		//sfInputProvider.add('row', 'asd');
	})
	.provider('sfInput', function () {
		var input = {};
		this.add = function (name, tmpl) {
			input[name] = tmpl;
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