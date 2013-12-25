'use strict';

var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var appConfig = {
        app: 'app',
        dist: 'out',
        tmp: '.tmp'
    };

    grunt.initConfig({
        appConfig: appConfig,
        watch: {
            css: {
                files: ['<%= appConfig.app %>/css/{,*/}*.css'],
                tasks: ['concat:css']
            },
            neuter: {
                files: ['<%= appConfig.app %>/js/{,*/}*.js'],
                tasks: ['neuter', 'requirejs']
            },
            jade: {
                files: ['<%= appConfig.app %>/**/*.jade'],
                tasks: ['jade:pages']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
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
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')({
                                port: LIVERELOAD_PORT
                            }),
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
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect, dist) {
                        return [
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
                        '<%= appConfig.dist %>/*',
                        '!<%= appConfig.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            console: [
                '<%= appConfig.app %>/js/**/*.js',
                '!<%= appConfig.app %>/js/core/**/*.js',
                '!<%= appConfig.app %>/js/lib/**/*.js'
            ],
            docs: {
                options: {
                    force: true,
                    reporter: 'jslint',
                    reporterOutput: '<%= appConfig.dist %>/docs/jshint/jshint.xml'
                },
                files: {
                    src: [
                        '<%= appConfig.app %>/js/**/*.js',
                        '!<%= appConfig.app %>/js/core/**/*.js',
                        '!<%= appConfig.app %>/js/lib/**/*.js',
                        'test/**/*_test.js'
                    ]
                }
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
                        '<%= appConfig.app %>/css/base/pure.css',
                        '<%= appConfig.app %>/css/ui/**/*.css',
                        '<%= appConfig.app %>/css/base/tmpst.css',
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
                        '<%= appConfig.dist %>/js/{,*/}*.js',
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
                'jade:pages'
            ],
            test: [
                'concat:css',
                'csslint:console',
                'jshint:console',
                'mochaTest'
            ],
            dist: [
                'concat:css',
                'requirejs:app',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        karma: {
            e2e: {
                configFile: 'karma-e2e.conf.js',
                singleRun: true
            },
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9876,
                browsers: ['PhantomJS'],
                singleRun: true
            },
            server: {
                configFile: 'karma.conf.js',
                singleRun: false,
                autoWatch: true
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return 'app/' + filepath;
                    }
                },
                src: '<%= appConfig.app %>/js/app.js',
                dest: '<%= appConfig.tmp %>/js/combined-js.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        shell: {
            deps: {
                command: './node_modules/grunt-cli/bin/grunt'
            }
        },
        jade: {
            pages: {
                options: {},
                expand: true,
                cwd: '<%= appConfig.app %>',
                src: ['pages/home/**/*.jade', 'js/**/*.jade']
            }
        },
        requirejs: {
            app: {
                options: {
                    baseUrl: './<%= appConfig.app %>/',
                    name: 'pages/home/routes',
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
                        'jquery': 'bower_components/jquery/jquery',
                        'underscore': 'bower_components/underscore/underscore',
                        'backbone': 'bower_components/backbone/backbone'
                    },
                    out: '<%= appConfig.dist %>/pages/home/routes.js',
                    optimize: 'uglify2',
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
            // output the result to stdout
            console: {
                src: [
                    '<%= appConfig.app %>/css/**/*.css',
                    '!<%= appConfig.app %>/css/base/pure.css'
                ]
            },
            // output the result to formatters
            docs: {
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
                    '!<%= appConfig.app %>/css/base/pure.css'
                ]
            }
        },
        docco: {
            docs: {
                src: ['<%= appConfig.app %>/pages/**/*.js'],
                options: {
                    output: '<%= appConfig.dist %>/docs/docco'
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open',
            'notify:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'neuter:app',
        //'karma:unit',
        'notify:test'
    ]);

    grunt.registerTask('test-keep-alive', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'neuter:app'
        //'karma:server'
    ]);

    grunt.registerTask('test-e2e', [
        'clean:server',
        'concurrent:server',
        'neuter:app',
        'connect:livereload'
        //'karma:e2e'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'copy',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        //'rev',
        'usemin'
    ]);

    grunt.registerTask('docs', [
        'jshint:docs',
        'csslint:docs',
        'styleguide:docs',
        'docco:docs'
    ]);

    grunt.registerTask('default', [
        'csslint:console',
        'jshint:console',
        'test',
        'build'
    ]);

    // -- Jade Task -------------------------------------------------------------
    grunt.registerMultiTask('jade', 'Convert Jade Template to JS client-side functions', function () {
        var jade = require('jade');
        var path = require('path');
        var tally = 0;
        var jadeOptions = {
            compileDebug: false,
            client: true,
            self: false,
            debug: false
        };

        var tpl = [
            '(function (wndw) {',
            'var jadify = function (jade) {',
            'return <%= compiledJadeStr %>',
            '};',
            '"function" == typeof define && define.amd ? define("<%= templateName %>", ["js/lib/jade"], function (e) {',
            'return jadify(e); ',
            '}) : wndw.jade.templates.<%= templateBaseName %>= jadify(wndw.jade.helpers);',
            '}(window));'
        ].join('\n');

        this.files.forEach(function (filePair) {
            filePair.src.forEach(function (file) {
                grunt.file.write(file.replace(/\.jade$/, '.js'), grunt.template.process(tpl, {
                    data: {
                        compiledJadeStr: jade.compile(grunt.file.read(file), jadeOptions).toString(),
                        templateName: file.replace(/\.jade$/, '').replace(/^app\//, ''),
                        templateBaseName: path.basename(file, '.html.jade')
                    }
                }));

                tally += 1;
                grunt.log.debug(file);
            });
        });
        grunt.log.writeln('Convert Jade Templates on ' + String(tally).cyan + ' files.');
    });
};