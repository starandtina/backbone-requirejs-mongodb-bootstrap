describe('about pages', function () {
    var chai = require('chai');
    var should = chai.should();
    var path = require('path');
    var testDir = path.resolve(__dirname, '.');
    var env = require(path.join(testDir, 'lib', 'environment'));
    var fs = require('fs');

    var appDir = path.resolve(testDir, '..');
    var Tmpst;
    var browser;
    var server;
    var _;

    beforeEach(function () {
        browser = env.browser(appDir);        
        Tmpst = browser.require('js/app/home');
        _ = browser.require('underscore');
    });

    describe('aboutBody', function () {
        it('about page content', function () {
            var aboutBody = browser.require('pages/home/about/aboutBody');
            var body = new aboutBody();
            var view = body.render();
            
            document.title.should.to.be.equal('About Us');
        });
    });
});
