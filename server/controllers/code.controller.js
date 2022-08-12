const { Code, Reward } = require('../models/associations');
const io = require('../socket.js')


exports.createCode = async (req, res) => {
  try {
    const code = await Code.bulkCreate(req.body);
    res.status(201).json(code);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: `error trying to create product ${err}`,
    });
  }
};

exports.updateCode = async (req, res) => {
  const { id } = req.params;
  try {
    await Code.update(req.body, { where: { id } });
    io.getIo().emit('redeemed', { url: '/shop'})
    res
      .status(200)
      .json({ status: 'ok', message: `successfully updated code ${id}` });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to update code, ${err}`,
    });
  }
};


exports.removeCode = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Code.destroy({
      where: {
        id,
      },
    });
    if (!result) throw new Error(`Code ${id} does not exists!`)
    
    res.status(204).json();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to remove code ${id}, ${err}`,
    });
  }
};

