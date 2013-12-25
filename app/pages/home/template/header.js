define([
    'jquery',
    'underscore',
    'backbone',
    'js/app/home',
    'pages/home/template/header.html',
    'pages/home/user/user.html',
    'js/models/user'
], function ($, _, Backbone, Tmpst, HeaderTemplate, UserTemplate, UserModel) {
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