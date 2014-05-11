define([
  'jquery',
  'underscore',
  'backbone',
  'js/app/home',
  'pages/home/template/footer.html'
], function ($, _, Backbone, Tmpst, FooterTpl) {
  'use strict';

  var FooterView = Backbone.View.extend({
    name: 'footer',
    id: 'footer',
    tagName: 'footer',
    className: 'tmpst-footer',
    attributes: {
      role: "footer"
    },
    render: function () {
      this.$el.html(FooterTpl({
        config: Tmpst.config
      }));

      return this;
    }
  });

  return FooterView;
});