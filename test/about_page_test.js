describe('about pages', function () {
  'use strict';

  var chai = require('chai');
  var path = require('path');
  var testDir = path.resolve(__dirname, '.');
  var env = require(path.join(testDir, 'lib', 'environment'));

  var appDir = path.resolve(testDir, '..');
  var Tmpst;
  var browser;
  var _;

  chai.should();
  beforeEach(function () {
    browser = env.browser(appDir);
    //console.dir(browser.require('js/models/user.json'));
    Tmpst = browser.require('js/app/home');
    _ = browser.require('underscore');
  });

  describe('aboutBody', function () {
    it('about page content', function () {
      var AboutBody = browser.require('pages/home/about/aboutBody');
      var body = new AboutBody();

      body.render();

      document.title.should.to.be.equal('About Us');
    });
  });
});