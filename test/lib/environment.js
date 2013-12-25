var jsdom = require('jsdom');
var path = require('path');
var requirejs = require('requirejs');

var appDir = path.resolve(__dirname, '../../app');

requirejs.config({
    baseUrl: appDir,
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
            init: function (_, $) {
                _.noConflict();
                $.noConflict();
                return Backbone.noConflict();
            }
        },
        'sinon': {
            exports: 'sinon'
        }
    },
    paths: {
        'jquery': 'bower_components/jquery/jquery',
        'underscore': 'bower_components/underscore/underscore',
        'backbone': 'bower_components/backbone/backbone',
        'sinon': '../test/lib/sinon'
    },
    nodeRequire: require,
    suppress: {
        nodeShim: true
    }
});

global.window = jsdom.jsdom().createWindow('');
global.document = window.document;
global.navigator = window.navigator;
global.jQuery = requirejs('jquery');

exports.browser = function (staticDir) {
    requirejs('pages/home/routes');
    return {
        require: requirejs
    }
}