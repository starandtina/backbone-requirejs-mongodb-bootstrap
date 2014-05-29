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
    className: 'tmpst-body',
    animate: 'replace'
  });

  return BodyView;
});
