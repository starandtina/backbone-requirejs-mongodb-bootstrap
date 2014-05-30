define([
  'js/core/origami',
  'jquery',
  'underscore',
  'backbone',
  'js/core/config',
  'js/lib/log',
  'js/lib/multitracker',
  'js/lib/supports',
  'js/lib/language',
  'js/lib/moment',
  'i18n!js/lib/nls/moment.lang'
], function (Origami, $, _, Backbone, config, Log, MultiTracker, Supports, Language, Moment) {
  'use strict';

  Moment.lang(Language.getLanguageCode());

  var Tmpst = new Origami('#tmpst');

  Tmpst.config = config;
  Tmpst.supports = Supports;
  Tmpst.log = Log({
    level: config.log
  });

  //handle errors
  window.onerror = function (message, url, lineNum) {
    // First check the URL and line number of the error
    url = url || window.location.href;
    // 99% of the time, errors without line numbers arent due to our code,
    // they are due to third party plugins and browser extensions
    if (lineNum === undefined || lineNum == null) return;

    // Now figure out the actual error message
    // If it's an event, as triggered in several browsers
    if (message.target && message.type) {
      message = message.type;
    }
    if (!message.indexOf) {
      message = 'Non-string, non-event error: ' + (typeof message);
    }

    var errorDescrip = {
      message: message,
      script: url,
      line: lineNum,
      url: document.URL
    }

    var err = {
      key: 'page.error.javascript',
      value: errorDescrip
    }

    Tmpst.multitracker.push(['page.error.javascript', errorDescrip]);
  }

  if (config.enviroment === 'production') {
    requirejs.onError = function (Error) {
      Tmpst.multitracker.push(['page.error.requirejs', {
        url: location.href,
        message: Error.message,
        type: Error.requireType,
        modules: Error.requireModules
      }]);

      Tmpst.log.error(Error);

      var match = Error.message.match(/context:\s*(.*)\s*\n/);
      if (match && '_' == match[1]) {
        var message = '<div>oooops! something unexpected happened, please <a href="" + location.href + "">refresh</a> your browser</div>'
        var $screen = $('<div>').addClass('fullscreen');
        Tmpst.message.add($(message).addClass('message'));
        $screen.appendTo('body').show();
      }
    };
  }

  Tmpst.multitracker = new MultiTracker({
    logger: Tmpst.log
  });

  Tmpst.multitracker.register('204', []);

  //sometimes we need to track what pages user alwasy like to scroll
  var $window = $(window);
  var scrollTracker = function () {
    var source = _.compact((window.location.pathname || '').split('/')).join('-') || 'homepage';
    Tmpst.multitracker.push(['user.scroll.' + source, $window.scrollTop()])
  };
  $window.scroll(_.throttle(scrollTracker, 2e3))

  return Tmpst;
});