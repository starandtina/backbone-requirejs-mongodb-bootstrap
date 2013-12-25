define([
    'backbone',
    'underscore',
    'js/app/home',
    'js/lib/backbone.api'
], function (Backbone, _, Tmpst, BackboneModelAPI) {
    'use strict';

    var model = Backbone.Model.extend({
        defaults: {
            name: '',
            logoutUrl: ''
        },
        api: Tmpst.api,
        url: '/users'
    });

    _.extend(model.prototype, BackboneModelAPI);

    return model;
});