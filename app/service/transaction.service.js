const mongoose = require('mongoose');
Transactions = mongoose.model('Transactions');
Settelment = mongoose.model('Settelment');

const recordTransaction = async (req, res) => {
  try {
    await Transactions.create(req.body);
    res.send({ status: 'success' }).status(200);
  } catch (err) {
    res.send(err.message);
  }
};

// const getAgg = async (group, user) => {
//   return Transactions.aggregate([
//     { $match: { groupname: group } },
//     {
//       $group: {
//         _id: { groupname: "$groupname" },
//         total: { $sum: "$amount" },
//         usertotal: {
//           $sum: { $cond: [{ $eq: ["$username", user] }, "$amount", 0] }
//         }
//       }
//     },
//   ]);
// };

const getTransaction = async (req, res) => {
  try {
    const result = await Transactions.find({ groupname: req.params.groupname, username: req.params.username });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

const recordSettelment = async (req, res) => {
  try {
    const gpData = await getGroupData(req.body.groupname);
    const payload = {
      groupname: req.body.groupname,
      username: req.body.username,
      amount: req.body.amount
    };
    await Transactions.create(payload);
    const settelPayload = {
      groupname: req.body.groupname,
      username: req.body.username,
      amount: req.body.amount,
    };
    await Settelment.create(req.body);
    res.send({ status: 'success' }).status(200);
  } catch (err) {
    res.send(err.message);
  }
};

const getSettelment = async (req, res) => {
  try {
    const result = await Settelment.find({ groupname: req.params.groupname, username: req.params.username });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

const createData = (result, gp) => {
  console.log(result);
  let r = { total: result.total };
  const each = result.total / gp.members.length;
  gp.members.forEach(key => {
    const isOwn = each < result[key];
    if (!result[key]) {
      r[key] = {
        owe: each,
        spend: 0
      }
    } else {
      r[key] = {
        spend: result[key],
      };
      if (isOwn) {
        r[key]['own'] = result[key] - each;
      } else if (!isOwn) {
        r[key]['owe'] = each - result[key];
      }
    }
  });
  return r;
}

const getGroupData = async (req, res) => {
  res.send(await getGroupDetails(req.params.groupname));
}

const getGroupDetails = async (groupname) => {

  const rs = await Transactions.find({ groupname: groupname });
  const group = await Groups.find({ name: groupname });
  const result = rs.reduce((res, curr) => {
    if (res[curr.username]) {
      res[curr.username] += curr.amount;
    } else {
      res[curr.username] = curr.amount;
    }
    if (!curr.isAll) {
      Object.keys(curr.participants).forEach(key => {
        if (!res[key]) {
          res[key] = 0;
        }
        res[key] = res[key] - curr.participants[key];
      });
    }
    res['total'] += curr.amount;
    return res;
  }, { total: 0 });

  const response = createData(result, group[0]);
  Object.assign(response, { transactions: rs });

  return response;
};

module.exports.recordTransaction = recordTransaction;
module.exports.getTransaction = getTransaction;
module.exports.recordSettelment = recordSettelment;
module.exports.getSettelment = getSettelment;
module.exports.getGroupData = getGroupData;