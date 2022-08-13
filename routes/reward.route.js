const express = require('express');
const rewardController = require('../controllers/reward.controller');
const router = express.Router();

const multer = require('multer');
const path = require('path');

router.param('id', rewardController.checkID);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback({ message: 'image Only' });
  }
}

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000,
  },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
}).single('image');

router
  .route('/')
  .get(rewardController.getAllRewards)
  .post(uploadImage, rewardController.createReward);

router
  .route('/:id')
  .get(rewardController.getReward)
  .delete(rewardController.removeReward)
  .patch(uploadImage, rewardController.updateReward);

router.route('/redeem/:rewardId').patch(rewardController.redeemReward);

router.route('/user/:userId').get(rewardController.getAllRedemptions);

module.exports = router;
