const mongoose = require('mongoose');
const Merchant = mongoose.model('Merchant');
let { logger } = require('../../common/index');
logger = logger();