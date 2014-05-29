define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  Backbone.BaseView = Backbone.View.extend({
    assign: function (view, selector) {
      var selectors;

      if (_.isObject(selector)) {
        selectors = selector;
      } else {
        selectors = {};
        selectors[selector] = view;
      }

      if (!selectors) return;

      _.each(selectors, function (view, selector) {
        view.setElement(this.$(selector)).render();
      }, this);
    }
  });

  return Backbone.BaseView;
});
