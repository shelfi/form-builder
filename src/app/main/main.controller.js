'use strict';

angular.module('app')
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