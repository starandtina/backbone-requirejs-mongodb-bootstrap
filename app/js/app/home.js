define([
    'jquery',
    'underscore',
    'backbone',
    'js/core/tmpst',
    'js/lib/api',
    'js/lib/asyncMessages'
], function ($, _, Backbone, Tmpst, API, asyncMessages) {
    'use strict';

    // add async message
    var $messageElement = $('<div>')
        .appendTo('body')
        .addClass('tmpst-async-message');

    Tmpst.message = asyncMessages.create($messageElement);

    // add ajax api
    Tmpst.api = API(Tmpst.config.url.api, {
        message: Tmpst.message,
        type: 'rest',
        'csrf.cookie': 'csrf_token',
        'csrf.token': 'X-CSRF-Token',
        'csrf.path': Tmpst.config.url.base
    });

    // add fetching and fetched callback and show the loading message using ayncMessage component
    Tmpst.on("region:fetching", function (region) {
        Tmpst.message.add($("<div>loading page</div>")
            .addClass("waiting"), {
                id: region.name + region.uid
            }
        );
    });

    Tmpst.on("region:fetched", function (region) {
        Tmpst.message.remove(region.name + region.uid);
    });

    // add the ajax log tracker, by default it will be pushed into `Tmpst.tracker` array
    Tmpst.api.on('always', function (api) {
        if (api.xhr.status >= 400) {
            Tmpst.tracker.push({
                key: 'api.error.' + api.xhr.status,
                value: {
                    timing: api.timing,
                    url: api.url,
                    status: api.xhr.status,
                    response: api.xhr.responseText
                }
            });
        } else {
            Tmpst.tracker.push({
                key: 'api.ok.' + api.xhr.status,
                value: {
                    timing: api.timing,
                    url: api.url,
                    status: api.xhr.status
                }
            });
        }
    });

    return Tmpst;
});