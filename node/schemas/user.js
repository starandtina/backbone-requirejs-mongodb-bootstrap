var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false
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
