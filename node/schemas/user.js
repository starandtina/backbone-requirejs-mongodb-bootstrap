var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  logoutUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
