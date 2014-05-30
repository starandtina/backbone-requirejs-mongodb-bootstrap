define([
  'underscore',
  'backbone',
  'js/app/home',
  'js/lib/backbone.api'
], function (_, Backbone, Tmpst, BackboneModelAPI) {
  'use strict';

  var Instance = Backbone.Model.extend({
    defaults: {
      password: null,
      database: null,
      createTime: null,
      type: 'MSSQL 2012',
      description: 'Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections'
    },
    api: Tmpst.api,
    url: '/instances',
    validation: {
      database: {
        required: true
      },
      password: {
        required: true,
        rangeLength: [8, 32]
      },
      'password-repeat': {
        equalTo: 'password'
      }
    },
    initialize: function () {
      this.listenTo(this, 'validated', this.handleError);
    },
    handleError: function (isValid, model, errorList) {
      var errorMsg = '';

      if (!isValid) {
        errorMsg = _.map(errorList, function (error) {
          return '✗ ' + error;
        }).join('<br/>');
      }

      $('.validation-error').html(errorMsg);
    },
    labels: {
      'password-repeat': 'Confirm Password'
    }
  });

  _.extend(Instance.prototype, BackboneModelAPI);

  return Instance;
});