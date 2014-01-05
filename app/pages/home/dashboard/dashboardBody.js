define([
    'jquery',
    'underscore',
    'backbone',
    'js/lib/backbone.widgetview',
    'pages/home/dashboard/dashboardBody.html',
    'pages/home/template/tab.html'
], function ($, _, Backbone, WidgetView, DashboardTpl, TabTpl) {
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
        className: 'body pure-u-1',
        initialize: function () {
            WidgetView.prototype.initialize.call(this, arguments);
        },
        render: function () {
            this.$el.html(DashboardTpl());
            this.$(this.dom.TABS).html(TabTpl());

            /*
            this.changeWidgetState({
                'page_num': 1111
            });
            this.addWidgetStateListener();
            this.bind('widget:changed', function (changedParams) {
                if (_.contains(changedParams, 'page_num')) {
                    var pageNum = this.getWidgetState('page_num');
                    console.log(pageNum)
                }
            });
*/
            return this;
        }
    });

    return BodyView;
});