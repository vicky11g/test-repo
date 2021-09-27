const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Transactions = new Schema({
  groupname: { type: String, default: '' },
  username: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  participants: { type: Schema.Types.Mixed },
  isAll: { type: Boolean }
});

mongoose.model('Transactions', Transactions, 'Transactions');