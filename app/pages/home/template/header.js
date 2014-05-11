define([
  'jquery',
  'underscore',
  'backbone',
  'js/app/home',
  'pages/home/template/header.html',
  'pages/home/user/user.html'
], function ($, _, Backbone, Tmpst, HeaderTpl, UserTpl) {
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