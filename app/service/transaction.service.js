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

const getTransaction = async (req, res) => {
  try {
    const result = await Transactions.find({ groupname: req.params.groupname, username: req.params.username });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

const recordSettelment = async (req, res) => {
  const gpData = await getGroupDetails(req.params.groupname);
  let settlementAmt = req.body.amount;
  const settelPayload = [];
  Object.keys(gpData.members).forEach(member => {
    if (
      member !== req.body.username
      && gpData.members[member].spend > gpData.members[member].owe
      && settlementAmt > 0
    ) {
      let own = gpData.members[member].spend - gpData.members[member].owe;
      let sAmt = 0;
      if (settlementAmt > own) {
        sAmt = own;
        settlementAmt = settlementAmt - own;
      } else {
        sAmt = settlementAmt;
        settlementAmt = 0;
      }
      console.log(settlementAmt);
      settelPayload.push({
        groupname: req.body.groupname,
        username: req.body.username,
        recepient: member,
        amount: sAmt
      });
    }
  });
  await Settelment.create(settelPayload);
  res.send({ status: 'success' }).status(200);

};

const getSettelment = async (req, res) => {
  try {
    const result = await Settelment.find({ groupname: req.params.groupname, username: req.params.username });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

const getGroupData = async (req, res) => {
  res.send(await getGroupDetails(req.params.groupname));
}

const calculate = (rs, gp, st) => {
  const mCount = gp.members.length;
  const members = gp.members.reduce((r, member) => {
    r[member] = { spend: 0, owe: 0 };
    return r;
  }, {});
  let total = 0;

  st.forEach(settlement => {
    members[settlement.username].owe -= settlement.amount;
    members[settlement.recepient].spend -= settlement.amount;
  });

  rs.forEach((curr) => {
    let directed = 0;
    let eachShare = 0;
    total += curr.amount;
    members[curr.username].spend += curr.amount;
    if (!curr.isAll) {
      Object.keys(curr.participants).forEach(key => {
        directed += curr.participants[key];
        members[key].owe += curr.participants[key];
      });
    }
    eachShare = Math.round(((curr.amount - directed) / mCount) * 100) / 100;
    gp.members.forEach((member) => {
      members[member].owe += eachShare;
    });
  });

  return { members, total };
};

const getGroupDetails = async (groupname) => {
  const rs = await Transactions.find({ groupname: groupname });
  const group = await Groups.find({ name: groupname });
  const settelment = await Settelment.find({ groupname: groupname });
  const result = calculate(rs, group[0], settelment);
  Object.assign(result, { transactions: rs, settelment: settelment });

  return result;
};

module.exports.recordTransaction = recordTransaction;
module.exports.getTransaction = getTransaction;
module.exports.recordSettelment = recordSettelment;
module.exports.getSettelment = getSettelment;
module.exports.getGroupData = getGroupData;