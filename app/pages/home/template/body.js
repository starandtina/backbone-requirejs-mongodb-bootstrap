define([
  'jquery',
  'underscore',
  'backbone',
  'js/lib/backbone.widgetview'
], function ($, _, Backbone, WidgetView) {
  'use strict';

  var BodyView = WidgetView.extend({
    name: 'body',
    attributes: {
      role: 'article'
    },
    className: 'tmpst-body pure-g-r',
    animate: 'replace'
  });

  return BodyView;
});