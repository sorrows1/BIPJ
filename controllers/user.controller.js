const { User } = require('../models/associations');

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({attributes: ['id', 'name', 'balance', 'createdAt']});
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};