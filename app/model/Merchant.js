const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Merchant = new Schema({
  _id: { type: String },
  name: { type: String, default: '' },
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  flowId: { type: String, default: '' },
  realm: { type: String, default: '' },
  applicationId: { type: String, default: '' },
  status: { type: String, default: '' },
  backopsUserId: { type: String, default: '' },
  onboardingStartDate: { type: Number, default: '' },
  autoLoginUrl: { type: String, default: '' },
  loginUrl: { type: String, default: '' },
  shortLoginUrl: { type: String, default: '' },
  shortAutoLoginUrl: { type: String, default: '' },
  landingPage: { type: String, default: '' },
  flowDetails: {
    name: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  path: { type: Array, default: [] },
  eventLastUpdatedAt: { type: Number, default: '' },
  eventSource: { type: String, default: '' },
  eventStatus: { type: String, default: '' }
});


mongoose.model('Merchant', Merchant, 'Merchant');