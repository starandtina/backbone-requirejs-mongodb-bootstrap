define([
    'jquery',
    'underscore',
    'backbone',
    'js/app/home',
    'pages/home/template/header.html',
    'pages/home/user/user.html'
], function ($, _, Backbone, Tmpst, HeaderTemplate, UserTemplate) {
    'use strict';

    return Backbone.View.extend({
        name: 'header',
        id: 'header',
        tagName: 'header',
        className: 'header',
        render: function () {
            this.$el.html(HeaderTemplate());
            this.$('.user').html(UserTemplate({
                user: Tmpst.user.toJSON()
            }));
        }
    });
});