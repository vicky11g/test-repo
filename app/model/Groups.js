const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Groups = new Schema({
  createdby: { type: String, required: true },
  name: { type: String, default: '', unique: true },
  members: [{ type: String }]
});


mongoose.model('Groups', Groups, 'Groups');