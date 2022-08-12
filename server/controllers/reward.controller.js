const {
  Code,
  Reward,
  User,
  UserCodes,
  RewardCodes,
} = require('../models/associations');
const { Op } = require('sequelize');

exports.checkID = async (req, res, next, val) => {
  try {
    const response = await Reward.findByPk(+val);
    if (!response)
      return res
        .status(400)
        .json({ status: 'fail', message: `Product does not exist` });
  } catch (err) {
    return res.status(400).json({ status: 'fail', message: `${err}` });
  }
  next();
};

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.findAll();
    res.status(200).json(rewards);
  } catch (err) {
    res
      .status(500)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};

exports.getReward = async (req, res) => {
  const { id } = req.params;
  try {
    const reward = await Reward.findByPk(id, {
      include: {
        model: Code,
        as: 'codes',
      },
    });
    if (!reward) throw new Error('Product does not exist');
    res.status(200).json(reward);
  } catch (err) {
    res
      .status(404)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};

exports.createReward = async (req, res) => {
  const image = req.file.originalname;
  const codes = JSON.parse(req.body.codes);
  console.log({
    ...req.body,
    image,
    codes,
  });
  try {
    const reward = await Reward.create(
      {
        ...req.body,
        image,
        codes,
      },
      {
        include: [
          {
            association: RewardCodes,
          },
        ],
      }
    );

    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: `error trying to create product ${err}`,
    });
  }
};

exports.updateReward = async (req, res) => {
  const { id } = req.params;
  let update = req.body
  if (req.file) {
    const image = req.file.originalname;
    let update = { ...req.body, image };
  }
  // const codes = JSON.parse(req.body.codes);
  try {
    const reward = await Reward.update(
      update,
      { where: { id } }
    );
    // const listOfCodes = codes.map((code) => {
    //   return code.code;
    // });
    // Code.bulkCreate(codes, {
    //   where: { code: listOfCodes },
    //   updateOnDuplicate: true,
    // });
    res.status(200).json(reward);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to update product, ${err}`,
    });
  }
};

exports.removeReward = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Reward.destroy({
      where: {
        id,
      },
    });
    if (!result) throw new Error(`Product ${id} does not exists!`);
    res.status(204).json();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to remove product ${id}, ${err}`,
    });
  }
};

exports.getAllRedemptions = async (req, res) => {
  const { userId } = req.params;
  try {
    const rewards = await Reward.findAll({
      include: {
        model: Code,
        where: { userId },
        attributes: ['id', 'redeemed'],
      },
    });
    res.status(200).json(rewards);
  } catch (err) {
    res
      .status(500)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};

exports.redeemReward = async (req, res) => {
  const { rewardId } = req.params;
  const { price, userId } = req.body;

  try {
    const availableCode = await Code.findOne({
      where: { rewardId, userId: { [Op.eq]: null } },
      raw: true,
    });
    if (!availableCode)
      res
        .status(400)
        .json({ status: 'fail', message: 'Reward is not available' });
    const response = await Code.update(req.body, {
      where: { id: availableCode.id },
    });
    if (!response[0])
      res
        .status(400)
        .json({ status: 'fail', message: 'Failed to redeem code' });
    const user = await User.findByPk(userId, { raw: true });
    const remainingBalance = user.balance - price;
    User.update({ balance: remainingBalance }, { where: { id: userId } });
    res.status(200).json({
      status: 'ok',
      message: `successfully updated code ${availableCode.id}`,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to update code, ${err}`,
    });
  }
};
