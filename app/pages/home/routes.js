define([
    'jquery',
    'underscore',
    'backbone',
    'require',
    'js/app/home',
    'js/models/user',
    'js/lib/popups',
    'js/lib/browser',
    'js/lib/backbone.queryparams',
    'pages/home/template/page',
    'pages/home/template/header',
    'pages/home/template/footer'
], function ($, _, Backbone, require, Tmpst, UserModel) {
    'use strict';

    var routes = {};
    var homeUrl = Tmpst.config.dir.home.replace(/^\//, '');

    routes[homeUrl] = function (args) {
        Tmpst.region.open({
            'pages/home/template/page': {
                regions: {

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
                            defaults: {
                                query: args
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