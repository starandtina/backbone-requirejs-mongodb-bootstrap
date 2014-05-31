'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9999;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
global.window = require('jsdom').jsdom().createWindow('');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('load-grunt-tasks')(grunt);

  // load custom tasks
  grunt.loadTasks('tasks');

  // configurable paths
  var appConfig = {
    app: 'app',
    dist: 'dist',
    server: 'node',
    tmp: '.tmp'
  };

  grunt.initConfig({
    appConfig: appConfig,
    watch: {
      js: {
        files: ['<%= appConfig.app %>/js/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/{,*/}*.js'],
        tasks: ['newer:jshint:test']
      },
      css: {
        files: ['<%= appConfig.app %>/css/{,*/}*.css'],
        tasks: ['concat:css']
      },
      jade: {
        files: ['<%= appConfig.app %>/html/**/*.jade'],
        tasks: ['jade:compile']
      },
      jadeamd: {
        files: ['<%= appConfig.app %>/js/**/*.jade', '<%= appConfig.app %>/pages/**/*.jade'],
        tasks: ['jadeamd:compile']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= appConfig.tmp %>/js/**/*.js',
          '<%= appConfig.tmp %>/css/{,*/}*.css',
          '<%= appConfig.app %>/*.html',
          '<%= appConfig.app %>/{js,pages}/**/*.js',
          '<%= appConfig.app %>/img/{,*/}**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              require('connect-modrewrite')(
                [
                  '!\\.html|/api|\\.js|\\.svg|\\.css|\\.png|\\.gif|\\.ico|\\.md$ /index.html [L]',
                  '^/api/(.*)$ http://localhost:3000/api/$1 [P]'
                ]
              ),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect, dist) {
            return [
              require('connect-modrewrite')(
                [
                  '!\\.html|/api|\\.js|\\.svg|\\.css|\\.png|\\.gif|\\.ico|\\.md$ /index.html [L]',
                  '^/api/(.*)$ http://localhost:3000/api/$1 [P]'
                ]
              ),
              mountFolder(connect, appConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true, //report JSHint errors but not fail the task
        reporter: require('jshint-stylish')
        //reporter: 'jslint',
        //reporterOutput: '<%= appConfig.dist %>/docs/jshint/jshint.xml'
      },
      all: {
        files: {
          src: [
            '<%= appConfig.app %>/pages/home/{,*/}*.js',
            '!<%= appConfig.app %>/pages/home/{,*/}*.html.js',
            '<%= appConfig.app %>/js/**/*.js',
            '!<%= appConfig.app %>/js/core/**/*.js',
            '!<%= appConfig.app %>/js/lib/**/*.js',
            '<%= appConfig.server %>/**/*.js',
            '!<%= appConfig.server %>/node_modules/**/*.js'
          ]
        }
      },
      server: {
        options: {
          jshintrc: '<%= appConfig.server %>/.jshintrc'
        },
        files: {
          src: [
            '<%= appConfig.server %>/**/*.js',
            '!<%= appConfig.server %>/node_modules/**/*.js'
          ]
        }
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*_test.js']
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      css: {
        options: {
          separator: ''
        },
        files: {
          '<%= appConfig.tmp %>/css/common.css': [
            '<%= appConfig.app %>/css/base/reset.css',
            '<%= appConfig.app %>/css/base/base.css',
            '<%= appConfig.app %>/css/base/layout.css',
            '<%= appConfig.app %>/css/base/bootstrap.css',
            '<%= appConfig.app %>/css/ui/**/*.css',
            '<%= appConfig.app %>/css/base/tmpst.css'
          ]
        }
      }
    },
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: {
          src: [
            '<%= appConfig.dist %>/js/*.js',
            '<%= appConfig.dist %>/css/{,*/}*.css',
            '<%= appConfig.dist %>/img/{,*/}**/*.{png,jpg,jpeg,gif,webp}',
            '<%= appConfig.dist %>/css/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= appConfig.app %>/index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= appConfig.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/img',
          src: '{,*/}**/*.{png,jpg,jpeg}',
          dest: '<%= appConfig.dist %>/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= appConfig.dist %>/img'
        }]
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= appConfig.dist %>/css/common.css': [
            '.tmp/css/common.css',
            '<%= appConfig.app %>/css/common.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'img/{,*/}**/*.{webp,gif}',
            'js/**/*.js',
            'pages/**/*.js',
            'css/fonts/*'
          ]
        }]
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: [
        'concat:css',
        'jadeamd:compile'
      ],
      test: [
        'concat:css',
        'newer:csslint',
        'newer:jshint',
        'mochaTest'
      ],
      dist: [
        'concat:css',
        'requirejs:compile',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    shell: {
      deps: {
        command: './node_modules/grunt-cli/bin/grunt'
      }
    },
    jadeamd: {
      compile: {
        options: {},
        expand: true,
        cwd: '<%= appConfig.app %>',
        src: ['pages/home/**/*.jade', 'js/**/*.jade']
      }
    },
    // refer to https://github.com/jrburke/r.js/blob/master/build/example.build.js
    requirejs: {
      compile: {
        options: {
          appDir: './<%= appConfig.app %>/',
          baseUrl: './',
          dir: './<%= appConfig.dist %>/',
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
          optimize: 'uglify2',
          skipDirOptimize: false,
          //fileExclusionRegExp: /^docs$/,
          //normalizeDirDefines: "skip",
          // refer to https://github.com/mishoo/UglifyJS2
          uglify2: {
            output: {
              beautify: false
            },
            compress: {
              sequences: true,
              drop_debugger: true,
              global_defs: {
                DEBUG: false
              }
            },
            warnings: true,
            mangle: true
          },
          modules: [{
            name: 'pages/home/routes'
          }, {
            name: 'pages/about/routes'
          }],
          preserveLicenseComments: false,
          optimizeCss: 'standard',
          useStrict: true,
          removeCombined: true
        }
      }
    },
    mochaTest: {
      options: {
        globals: ['chai', '_', 'Backbone', 'jade'],
        timeout: 3000,
        reporter: 'spec',
        ignoreLeaks: false,
        ui: 'bdd'
      },
      src: {
        src: 'test/**/*_test.js'
      }
    },
    notify: {
      server: {
        options: {
          message: 'Servier is Ready!'
        }
      },
      test: {
        options: {
          title: 'Test Completed!',
          message: 'Test finished running'
        }
      }
    },
    styleguide: {
      docs: {
        options: {
          framework: {
            name: 'styledocco'
          },
          name: 'Style Guide'
        },
        files: {
          '<%= appConfig.dist %>/docs/styleguide': '<%= appConfig.app %>/css/**/*.css'
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc',
        absoluteFilePathsForFormatters: true
      },
      // output the result to formatters
      all: {
        options: {
          formatters: [{
            id: 'text',
            dest: '<%= appConfig.dist %>/docs/csslint/csslint.txt'
          }, {
            id: 'csslint-xml',
            dest: '<%= appConfig.dist %>/docs/csslint/csslint.xml'
          }]
        },
        src: [
          '<%= appConfig.app %>/css/**/*.css',
          '!<%= appConfig.app %>/css/base/bootstrap.css'
        ]
      }
    },
    docco: {
      docs: {
        src: [
          '<%= appConfig.app %>/js/**/*.js',
          '<%= appConfig.app %>/pages/**/*.js',
          '!<%= appConfig.app %>/pages/**/*.html.js',
        ],
        options: {
          output: '<%= appConfig.dist %>/docs/docco'
        }
      }
    },
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: function (dest, src) {
            var configFile = './' + appConfig.app + '/js/core/config.js';
            return {
              config: require('requirejs')(configFile)
            };
          }
        },
        files: {
          '<%= appConfig.app %>/index.html': ['<%= appConfig.app %>/html/index.jade']
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        report: 'gzip'
      },
      compile: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: '{js,pages}/**/*.js',
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    devperf: {
      options: {
        urls: [
          'http://localhost:<%= connect.options.port %>'
        ],
        numberOfRuns: 5,
        timeout: 120,
        openResults: true,
        resultsFolder: './devperf'
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'devperf',
      'notify:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'notify:test'
  ]);

  grunt.registerTask('test-keep-alive', [
    'clean:server',
    'concurrent:test',
    'connect:test'
  ]);

  grunt.registerTask('test-e2e', [
    'clean:server',
    'concurrent:server',
    'connect:livereload'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'useminPrepare',
    'copy',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('docs', [
    'newer:jshint',
    'newer:csslint',
    'styleguide:docs',
    'docco:docs'
  ]);

  grunt.registerTask('default', [
    'newer:csslint',
    'newer:jshint',
    'test',
    'build'
  ]);
};