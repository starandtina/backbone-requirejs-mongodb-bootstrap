define([
    'jquery',
    'underscore',
    'backbone',
    'js/lib/backbone.baseview',
    'js/lib/jquery.migrate',
    'js/lib/jquery.bbq'
], function ($, _, Backbone, BaseView) {
    var WIDGET_INFIX = '-state-';
    var WidgetView = BaseView.extend({
        initialize: function (args) {
            this.options = _.extend({}, args.options);
        },
        getWidgetId: function () {
            this.widgetId = this.widgetId || this.options.widgetId || _.uniqueId();
            return this.widgetId;
        },
        getWidgetKey: function (key) {
            console.log(this.getWidgetId() + WIDGET_INFIX + key)
            return this.getWidgetId() + WIDGET_INFIX + key;
        },
        addWidgetStateListener: function () {
            var self = this;

            function getHashParams(url) {
                if (url.indexOf('#') > -1) {
                    var params = $.deparam(url.split('#')[1]);
                    _.each(params, function (value, key) {
                        if (key.indexOf(WIDGET_INFIX) == -1) delete params[key];
                    });
                    return params;
                }
                return {};
            }

            var oldURL = window.location.href;
            var newURL;

            $(window).bind('hashchange', function (e) {
                newURL = window.location.href;
                var oldParams = getHashParams(oldURL);
                var newParams = getHashParams(newURL);
                /* Figure out what params changed between the new and old params.
                 * Note that we dont care if something existed before and no longer does,
                 * because that currently never happens.*/
                var changedParams = [];
                _.each(newParams, function (value, key) {
                    if (oldParams[key] && oldParams[key] !== value) {
                        changedParams.push(key);
                    }
                });

                changedParams = _.union(changedParams, _.difference(_.keys(newParams), _.keys(oldParams)));
                changedParams = _.map(changedParams, function (key) {
                    return key.split(WIDGET_INFIX)[1]
                });
                self.trigger('widget:changed', changedParams);
                oldURL = window.location.href;
            });
        },
        getWidgetState: function (key) {
            return $.bbq.getState(this.getWidgetKey(key));
        },
        changeWidgetState: function (params) {
            var self = this;
            var state = {};
            _.each(params, function (value, key) {
                state[self.getWidgetKey(key)] = value;
            });
            $.bbq.pushState(state);
        }
    });

    return WidgetView;
});