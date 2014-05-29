define([
  'jquery',
  'underscore',
  'backbone',
  'js/app/home',
  'pages/home/template/header.html'
], function ($, _, Backbone, Tmpst, HeaderTpl) {
  'use strict';

  return Backbone.View.extend({
    name: 'header',
    tagName: 'header',
    id: 'header',
    className: 'tmpst-header',
    attributes: {
      role: 'header'
    },
    render: function () {
      this.$el.html(HeaderTpl({
        user: Tmpst.user.toJSON()
      }));
    }
  });
});