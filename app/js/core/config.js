(function (wndw) {
  'use strict';

  var config = {
    environment: 'production',
    
    out: 'js/core/config.js',
    log: 'info',
    debug: true,
    url: {
      base: '',
      api: 'http://localhost:3001/api',
      app_assets: '/'
    },
    version: '1.0.0',
    dir: {
      home: '/'
    }
  };

  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return config;
    });
  } else {
    return wndw.configure = config;
  }
})(window);
