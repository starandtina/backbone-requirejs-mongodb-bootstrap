define([
  'jquery',
  'underscore',
  'backbone',
  'require',
  'js/app/home',
  'js/models/user',
  'js/models/user.json',
  'js/lib/readme',
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
], function ($, _, Backbone, require, Tmpst, User, UserJSON, ReadMe) {
  'use strict';

  var routes = {};
  var homeUrl = Tmpst.config.dir.home.replace(/^\//, '');

  routes[homeUrl] = routes[homeUrl + 'vms'] = routes[homeUrl + 'gws'] = routes[homeUrl + 'dashboard'] = function (args) {
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

  routes[homeUrl + 'services/:section'] = function (section) {
    Tmpst.region.open({
      'pages/home/template/page': {
        regions: {
          body: {
            'pages/home/services/servicesBody': {
              id: 'services',
              initialize: {
                id: 'services',
                section: section
              }
            }
          }
        }
      }
    });
  };

  routes[homeUrl + 'about'] = function () {
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
    Tmpst.user = new User();
    Tmpst.multitracker.get('204').queue.push(['client', 'home']);
    if (!_.isEmpty(UserJSON)) {
      Tmpst.user.login(UserJSON);
    }
    if (Tmpst.user.get('authenticated')) {
      Tmpst.multitracker.get('204').queue.push(['user', Tmpst.user.get('id')]);
    }

    // boost Backbone
    if (!Backbone.history.start({
      pushState: true
    })) {
      Tmpst.router.trigger('error', 404);
    }
  });
});