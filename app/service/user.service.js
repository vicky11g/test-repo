const mongoose = require('mongoose');
User = mongoose.model('User');

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.send({ status: 'success' }).status(200);
  } catch (err) {
    res.send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await User.find({ username: req.params.username });
    res.send(result);
  } catch (error) {
    res.send(err.message);
  }
}

const isUserExist = async (username) => {
  try {
    const result = await User.countDocuments({ username: username });
    return !!result
  } catch (error) {
    console.log(error);
  }
}

module.exports.createUser = createUser
module.exports.getUser = getUser
module.exports.isUserExist = isUserExist