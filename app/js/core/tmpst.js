define([
    'js/core/origami',
    'jquery',
    'underscore',
    'backbone',
    'js/core/config',
    'js/lib/log'
], function (Origami, $, _, Backbone, config, Log) {
    'use strict';

    var Tmpst = new Origami('#tmpst');

    Tmpst.config = config;
    Tmpst.log = Log({
        level: config.log
    });

    return Tmpst;
});