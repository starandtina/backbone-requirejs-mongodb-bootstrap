define([
    'jquery',
    'underscore',
    'backbone',
    'js/lib/backbone.widgetview',
    'pages/home/services/servicesBody.html',
    'pages/home/template/tab.html'
], function ($, _, Backbone, WidgetView, servicesTpl, TabTpl) {
    'use strict';

    var BodyView = WidgetView.extend({
        dom: {
            TABS: '[data-js-ui-tabs]'
        },
        name: 'body',
        attributes: {
            role: 'body'
        },
        id: 'body',
        className: 'body pure-u-r',
        initialize: function () {
            WidgetView.prototype.initialize.call(this, arguments);
        },
        render: function () {
            this.$el.html(servicesTpl());
            this.$(this.dom.TABS).html(TabTpl({
                currentTabId: 4
            }));

            return this;
        }
    });

    return BodyView;
});