define([
  'jquery',
  'underscore',
  'backbone',
  'js/app/home',
  'pages/home/template/page.html'
], function ($, _, Backbone, Tmpst, PageTpl) {
  'use strict';

  // The Page
  // ---------------

  // Our overall **PageView** is the top-level piece of UI.
  var PageView = Backbone.View.extend({
    // Given a name used by region in order to distinguish different regions 
    name: 'page',

    // Define custom sub regions for the top page, and these subviews will be rendered automatically
    subregions: {
      header: 'pages/home/template/header',
      body: 'pages/home/template/body',
      footer: 'pages/home/template/footer'
    },

    // At initialization we bind to the relevant events 
    initialize: function () {
      this.on('view:appended', this.scroll);
      this.on('view:updated', this.scroll);
    },

    //
    scroll: function () {
      $('html, body').scrollTop(0);
    },

    // Set up the whole skeleton of UI for the page
    render: function () {
      var regions = this.region.regions;
      var me = this;
      var $element = $(PageTpl());

      this.$el.append($element);

      _.forEach(_.keys(this.subregions), function (region) {
        if (regions[region]) {
          me.$el.find('#' + region).replaceWith(regions[region].view.el);
        }
      });
    },
    hasUnsavedModel: function () {
      return false;
    }
  });

  return PageView;
});