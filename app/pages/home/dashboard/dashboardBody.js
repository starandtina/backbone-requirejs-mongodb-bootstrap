define([
  'jquery',
  'underscore',
  'backbone',
  'js/lib/readme',
  'pages/home/dashboard/dashboardBody.html',
  'pages/home/template/body',
  'pages/home/template/tab.html'
], function ($, _, Backbone, ReadMe, DashboardTpl, BodyView, TabTpl) {
  'use strict';

  var DashboardBodyView = BodyView.extend({
    dom: {
      TABS: '[data-js-ui-tabs]'
    },
    initialize: function () {
      BodyView.prototype.initialize.call(this, arguments);

      this.listenTo(this, 'view:appended', this.showReadME);
    },
    render: function () {
      this.$el.html(DashboardTpl());
      this.$(this.dom.TABS).html(TabTpl({
        currentTabId: 1,
        tabItems: []
      }));
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
    },
    showReadME: function () {
      ReadMe($('[data-readme]')[0], {
        //'show.count': 2,
        expires: 'August 1, 2019'
      });
    }
  });

  return DashboardBodyView;
});
