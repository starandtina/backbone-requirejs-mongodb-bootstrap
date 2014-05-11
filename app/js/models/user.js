define([
    'underscore',
    'backbone',
    'js/app/home',
    'js/lib/backbone.api'
], function (_, Backbone, Tmpst, BackboneModelAPI) {
  'use strict';

  var model = Backbone.Model.extend({
    defaults: {
      name: 'fake',
      authenticated: false,
      email: 'fake@fake.com'
    },
    api: Tmpst.api,
    url: '/users',
    initialize: function () {},
    login: function (data) {
      this.set(data);
      this.initialize();
      this.set({
        authenticated: true
      });
      Tmpst.multitracker.get("204").queue.push(["user", this.get("id")]);
    }
  });

  _.extend(model.prototype, BackboneModelAPI);

  return model;
});
