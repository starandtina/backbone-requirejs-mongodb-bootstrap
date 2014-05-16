'use strict';

var mongoose = require('mongoose');
var User = require('../schemas/user');
var logger = require('../utils').logan;

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
User.find({}).remove(function () {
  User.create({
    id: '1',
    name: 'Dave',
    logoutUrl: 'http://www.google.com/'
  }, {
    id: '2',
    name: 'David',
    logoutUrl: 'http://www.google.com/'
  }, {
    id: '3',
    name: 'JavaScript',
    logoutUrl: 'http://www.google.com/'
  }, function () {
    logger.success('Populating data of users done!');
  });
});