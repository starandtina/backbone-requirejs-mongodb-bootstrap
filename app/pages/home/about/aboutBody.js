define([
  'jquery',
  'underscore',
  'backbone',
  'pages/home/about/aboutBody.html',
  'pages/home/template/body'
], function ($, _, Backbone, AboutTpl, BodyView) {
  'use strict';

  var AboutBodyView = BodyView.extend({
    initialize: function () {
      document.title = 'About Us';
    },
    render: function () {
      this.$el.html(AboutTpl());

      return this;
    }
  });

  return AboutBodyView;
});