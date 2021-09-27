const mongoose = require('mongoose');
const Merchant = mongoose.model('Merchant');
let { logger } = require('../../common/index');
logger = logger();

const getList = (req, res) => {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      res.send(err).status(500);
    } else {
      const l = names.reduce((c, i) => {
        c.push(i.name);
        return c;
      }, []);
      res.send(l);
    }
  });
}

// cosnt health =

const getMerchant = async (req, res) => {
  const result = await Merchant.find({ username: req.params.name });
  res.send(result);
}

const createMerchant = async (req, res) => {
  await Merchant.create(req.body);
  res.send({ status: 'success' }).status(200);
}

module.exports.getList = getList;
module.exports.getMerchant = getMerchant;
module.exports.createMerchant = createMerchant;