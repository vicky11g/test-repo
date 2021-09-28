const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Settelment = new Schema({
  username: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  recepient: { type: String },
  groupname: { type: String },
});

mongoose.model('Settelment', Settelment, 'Settelment');