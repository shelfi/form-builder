# Shelfi Form Builder

## Demo
[Click here to see the demo.](http://shelfi.github.io/form-builder)


## Basic usage

```html
<div ng-controller="MainCtrl as ctrl">
	<form name="form">
		<sf-form-builder structure="ctrl.structure" ng-model="ctrl.data" form="form"></sf-form-builder>
	</form>
</div>
```

```js
angular.module('formBuilder')
	.controller('MainCtrl', function () {
		this.structure = {
			row: [
				{
					inputContainer: {
						label: 'Disabled',
						input: {
							type: 'checkbox',
							ngModel: 'data.disabled'
						}
					}
				},
				{
					inputContainer: {
						label: 'Name',
						input: {
							type: 'text',
							name: 'name',
							ngModel: 'data.name',
							ngDisabled: 'data.disabled === true',
							required: 'required',
							validationTexts: {
								required : 'Name is required.'
							}
						}
					}
				},
				{
					inputContainer: {
						label: 'Surname',
						input: {
							type: 'text',
							ngModel: 'data.surname',
							ngDisabled: 'data.disabled === true'
						}
					}
				}
			]
		};

		this.data = {
			disabled: false,
			name: 'Emre',
			surname: 'Terzi'
		};
	});
```

## About structure & templates
If the value is object or array then key indicates that being to use as template key. Otherwise, value assign to scope completely. Some words reserved for internal use. These words are input, structure, data and form. You should not be used these words.

```js
this.structure = {
	inputContainer: {
		label: 'Name',
		holder: 'input goes here'
	}
};
```

Assumes inputContainer templates will be;
```html
<md-input-container>
	<label>{{ label }}</label>
	{{ holder }}
</md-input-container>
```

In example above, processor pick a template named "inputContainer", because inputContainer value is object. All keys and values that contains value of inputContainer, assing to scope seperately. And whole object assign to structure.

The output will be
```html
<md-input-container>
	<label>Name</label>
	input goes here
</md-input-container>
```

### Adding a template
$templateCache used to store template contents. You can easily add a new template in example below;

```js
angular.module('formBuilder')
	.run(function ($templateCache) {
		$templateCache.put('newTemplate', 'template content');
	});
```
### Embedded templates
row, column, inputContainer templates comes with embedded. 

#### row
```html
<div layout="column">
	<div ng-repeat="item in structure">
		<sf-form-builder structure="item" ng-model="data" form="form"></sf-form-builder>
	</div>
</div>
```

#### column
```html
<div layout="row">
	<div ng-repeat="item in structure">
		<sf-form-builder structure="item" ng-model="data" form="form"></sf-form-builder>
	</div>
</div>
```

#### inputContainer
```html
<md-input-container>
	<label>{{ label }}</label>
	<sf-input attrs="input" ng-model="data" form="form"></sf-input>
</md-input-container>
```

# sfInput
All keys and values assign to input as attribute. Type attribute is required.

```js
this.structure = {
	input: {
	  type: 'checkbox',
	  ngModel: 'data.disabled'
	}
};
```
```html
<sf-input attrs="input" ng-model="data" form="form"></sf-input>
```

### Adding a new input
You can easily add a new input in example below;

```js
angular.module('formBuilder')
	.config(function (sfInputProvider) {
		sfInputProvider.add('textAngular', '<text-angular></text-angular>');
	});
```

## Licence
MIT