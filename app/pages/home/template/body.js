define([
    'jquery',
    'underscore',
    'backbone',
    'js/lib/backbone.baseview'
], function ($, _, Backbone, BaseView) {
    'use strict';

    var BodyView = BaseView.extend({
        name: 'body',
        attributes: {
            role: 'body'
        },
        id: 'body',
        className: 'body pure-u-1'
    });

    return BodyView;
});