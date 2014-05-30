define([
  'underscore',
  'backbone',
  'js/core/tmpst'
], function (_, Backbone, Tmpst) {
  'use strict';

  var banner = Backbone.View.extend({
    name: 'banner',
    className: 'tmpst-banner',
    attributes: {
      role: 'navigation'
    }
  });

  return banner;
});