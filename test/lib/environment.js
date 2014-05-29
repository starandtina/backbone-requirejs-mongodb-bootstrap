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
    'jquery': 'js/core/jquery',
    'underscore': 'js/core/underscore',
    'backbone': 'js/core/backbone',
    'jquery.bbq': 'js/lib/jquery.bbq',
    'jquery.migrate': 'js/lib/jquery.migrate',
    'js/models/user.json': 'empty:'
  },
  //Pass the top-level require function to requirejs so that node modules are loaded relative to the top-level JS file.
  nodeRequire: require,
  suppress: {
    nodeShim: true
  }
});

global.window = jsdom.jsdom().createWindow('');
global.document = window.document;
global.navigator = window.navigator;
global.jQuery = requirejs('jquery');
// should make it cors as true on the server-side
global.jQuery.support.cors = true;

exports.browser = function (staticDir) {
  //requirejs('pages/home/routes');
  return {
    require: requirejs
  }
}