var mongoose = require('mongoose');

var Instance = new mongoose.Schema({
  id: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  database: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Instance', Instance);
