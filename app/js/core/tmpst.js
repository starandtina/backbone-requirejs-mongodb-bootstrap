define([
    'js/core/origami',
    'jquery',
    'underscore',
    'backbone',
    'js/core/config',
    'js/lib/log',
    'js/lib/multitracker',
    'js/lib/supports'
], function (Origami, $, _, Backbone, config, Log, MultiTracker, supports) {
    'use strict';

    var Tmpst = new Origami('#tmpst');

    Tmpst.config = config;
    Tmpst.supports = supports;
    Tmpst.log = Log({
        level: config.log
    });

    //handle errors
    window.onerror = function (message, url, lineNum) {
        url = url || window.location.href;

        if (lineNum) {
            if (message.target && message.type) {
                message = message.type;
            }
            if (!message.indexOf) {
                message = "Non-string, non-event error: " + typeof message;
            }

            var errorDescrip = {
                message: message,
                script: url,
                line: lineNum,
                url: document.URL
            };

            Tmpst.multitracker.push(["page.error.javascript", errorDescrip]);
        }
    }

    if (config.enviroment === 'production') {
        requirejs.onError = function (Error) {
            Tmpst.multitracker.push(["page.error.requirejs", {
                url: location.href,
                message: Error.message,
                type: Error.requireType,
                modules: Error.requireModules
            }]);

            Tmpst.log.error(Error);

            var match = Error.message.match(/context:\s*(.*)\s*\n/);
            if (match && "_" == match[1]) {
                var message = "<div>oooops! something unexpected happened, please <a href='" + location.href + "'>refresh</a> your browser</div>"
                var $screen = $("<div>").addClass("fullscreen");
                Tmpst.message.add($(message).addClass("message"));
                $screen.appendTo("body").show();
            }
        };
    }

    Tmpst.multitracker = new MultiTracker({
        logger: Tmpst.log
    });

    Tmpst.multitracker.register("204", []);

    return Tmpst;
});