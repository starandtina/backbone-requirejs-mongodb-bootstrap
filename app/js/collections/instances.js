define([
  'jquery',
  'underscore',
  'backbone',
  'js/app/home',
  'js/models/instance',
  'js/lib/backbone.api'
], function ($, _, Backbone, Tmpst, InstanceModel, BackboneModelAPI) {
  'use strict';

  var InstanceList = Backbone.Collection.extend({
    model: InstanceModel,
    api: Tmpst.api,
    url: '/instances'
  });

  InstanceList.prototype.sync = BackboneModelAPI.sync;

  return InstanceList;
});