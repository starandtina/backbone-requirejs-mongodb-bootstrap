describe('models', function () {
  'use strict';

  var chai = require('chai');
  var expect = chai.expect;
  var path = require('path');
  var testDir = path.resolve(__dirname, '.');
  var env = require(path.join(testDir, 'lib', 'environment'));
  var fs = require('fs');

  var staticDir = path.resolve(testDir, '..');
  var Tmpst;
  var browser;
  var sinon;
  var server;
  var _;

  chai.should();

  beforeEach(function () {
    browser = env.browser(staticDir);
    Tmpst = browser.require('js/app/home');
    sinon = browser.require('js/lib/sinon');
    _ = browser.require('underscore');
  });

  describe('user model', function () {
    /**
          {              
              'id': 1,
              'email': 'khalilz@vmware.com',
              'name': 'kz',
              'logoutUrl': 'http://www.google.com/'
          }
         */
    var user = fs.readFileSync(path.join(testDir, 'json/user.json'), 'utf-8');
    var userJSON = JSON.parse(user);

    beforeEach(function () {
      var UserModel = browser.require('js/models/user');
      this.userModel = new UserModel({
        id: 1
      });

      server = sinon.fakeServer.create();
      server.respondWith('GET', /users\/(\d+)/, [200, {
          'Content-Type': 'application/json'
        },
        user
      ]);
    });

    afterEach(function () {
      server.restore();
    });

    it('should default "uri" property to "/users"', function () {
      this.userModel.url.should.to.be.equal('/users');
    });

    it('should read user model data from server correctly', function () {
      var callback = sinon.spy();

      this.userModel.read({}, callback);
      server.respond();

      callback.called.should.to.be.true;
      callback.calledWith(null, userJSON).should.to.be.true;
      expect(callback.getCall(0).args[0]).to.null;
      expect(callback.getCall(0).args[1]).to.eql(userJSON);

      this.userModel.toJSON().should.to.be.ok;
      this.userModel.toJSON().should.to.be.a('object');
      this.userModel.id.should.to.be.equal(userJSON.id);
      this.userModel.get('email').should.to.be.equal(userJSON.email);
      this.userModel.get('name').should.to.be.equal(userJSON.name);
      this.userModel.get('logoutUrl').should.to.be.equal(userJSON.logoutUrl);
    });
  });
});