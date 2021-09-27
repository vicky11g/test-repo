const mongoose = require('mongoose');
Groups = mongoose.model('Groups');
const userService = require('./user.service');

const createGroup = async (req, res) => {
  try {
    const flag = await userService.isUserExist(req.params.username);
    if (!flag) {
      throw Error("User does not exist !!");
    }
    const payload = req.body;
    Object.assign(payload, {
      createdby: req.params.username,
      members: [req.params.username]
    });
    await Groups.create(req.body);
    res.send({ status: 'success' }).status(200);
  } catch (err) {
    res.send(err.message);
  }
};

const getGroup = async (req, res) => {
  try {
    const result = await Groups.find({ name: req.params.name });
    res.send(result);
  } catch (error) {
    res.send(err.message);
  }
};

const getAllGroup = async (req, res) => {
  try {
    const result = await Groups.find({});
    res.send(result);
  } catch (error) {
    res.send(err.message);
  }
};

const addMember = async (req, res) => {
  try {
    const flag = await userService.isUserExist(req.params.username);
    if (!flag) {
      throw Error("User does not exist !!");
    }
    const result = await Groups.updateOne(
      {
        name: req.params.name
      }, {
      $push: {
        members: req.params.username
      }
    });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.createGroup = createGroup
module.exports.getGroup = getGroup
module.exports.getAllGroup = getAllGroup
module.exports.addMember = addMember