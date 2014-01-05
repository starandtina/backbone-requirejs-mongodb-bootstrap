define([
    'jquery',
    'underscore',
    'backbone',
    'require',
    'js/app/home',
    'js/models/user',
    'js/lib/popups',
    'js/lib/browser',
    'js/lib/modals',
    'js/lib/supports',
    'js/lib/browser',
    'js/lib/backbone.baseview',
    'js/lib/backbone.queryparams',
    'pages/home/template/page',
    'pages/home/template/header',
    'pages/home/template/footer'
], function ($, _, Backbone, require, Tmpst, UserModel) {
    'use strict';

    var routes = {};
    var homeUrl = Tmpst.config.dir.home.replace(/^\//, '');

    routes[homeUrl] = routes[homeUrl + 'dashboard'] = function (args) {
        Tmpst.region.open({
            'pages/home/template/page': {
                regions: {
                    body: {
                        'pages/home/dashboard/dashboardBody': {
                            id: 'dashboard',
                            initialize: {
                                args: args
                            }
                        }
                    }
                }
            }
        });
    };

    routes[homeUrl + 'about'] = function (args) {
        Tmpst.region.open({
            'pages/home/template/page': {
                regions: {
                    body: {
                        'pages/home/about/aboutBody': {
                            id: 'about',
                            initialize: { // it'll be as arguments to constructor of view
                                id: 'about'
                            }
                        }
                    }
                }
            }
        });
    };

    Tmpst.router.setupLinks(Tmpst.config.url.base, 'internal-home');
    Tmpst.router.addRoutes(routes);

    $(function () {
        var user = new UserModel({
            id: 1
        });
        user.read({
            message: {
                waiting: 'loading User details ...'
            }
        }).done(function () {
            Tmpst.user = user;

            // boost Backbone
            Backbone.history.start({
                pushState: true
            });
        });
    });
});