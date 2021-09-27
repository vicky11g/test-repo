const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
  name: { type: String, default: '' },
  username: { type: String, default: '', unique:true},
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' }
});


mongoose.model('User', User, 'User');