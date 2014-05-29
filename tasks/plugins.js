'use strict';

module.exports = function (grunt) {
  grunt.registerMultiTask('jadeamd', 'Convert Jade Template to JS client-side functions', function () {
    var jade = require('jade');
    var path = require('path');
    var tally = 0;
    var jadeOptions = {
      compileDebug: false,
      self: false,
      pretty: false,
      debug: false
    };

    var tpl = [
      '! (function (wndw) {',
      'var jadify = function (jade, _t) {',
        'var yudify = <%= compiledJadeStr %>',
        'return function (locals) {',
          'if (locals && locals._t) _t = locals._t.merge(_t);',
          'return yudify(locals);',
        '}',
      '};',
      '"function" == typeof define && define.amd ? define("<%= templateName %>", ["js/lib/jade", "<%= i18n %>"], function (e, _t) {',
      'return jadify(e, _t); ',
      '}) : wndw.jade.templates["<%= templateBaseName %>"]= jadify(wndw.jade.helpers);',
      '}(window));'
    ].join('\n');

    this.files.forEach(function (filePair) {
      filePair.src.forEach(function (file) {
        try {
          var templateName = file.replace(/^app\/|\.jade$/g, '');
          var i18n = 'i18n!' + path.dirname(templateName) + '/nls/' + path.basename(templateName);
          grunt.file.write(file.replace(/\.jade$/, '.js'), grunt.template.process(tpl, {
            data: {
              compiledJadeStr: jade.compileClient(grunt.file.read(file), jadeOptions).toString(),
              templateName: file.replace(/^app\/|\.jade$/g, ''),
              i18n: i18n.replace(/\.html$/g, ''),
              templateBaseName: file.replace(/^app\/|\.html\.jade$/g, '')
            }
          }));
        } catch (err) {
          grunt.fatal(err);
        }

        tally += 1;
        grunt.log.debug('Jade ' + file);
      });
    });
    grunt.log.debug('Convert Jade Templates on ' + String(tally).cyan + ' files.');
  });
};