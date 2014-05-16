var uuid = require('node-uuid');
var logan = require('logan');

logan.set({
  error: ['%', 'red'],
  success: ['%', 'green'],
  info: ['%', 'grey'],
  url: ['  http://localhost:%/'.grey + '%'.cyan, '.']
});

exports.logan = logan;

exports.uuid = uuid.v4;
