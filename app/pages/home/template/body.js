define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var BodyView = Backbone.View.extend({
        name: 'body',
        attributes: {
            role: ''
        },
        id: 'body',
        className: 'body pure-u-1'
    });

    return BodyView;
});