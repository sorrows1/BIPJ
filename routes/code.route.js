const express = require('express');
const codeController = require('../controllers/code.controller');
const router = express.Router();


router
  .route('/')
  .post(codeController.createCode);

router
  .route('/:id')
  .delete(codeController.removeCode)
  .patch(codeController.updateCode);

router
  .route('/redeem/:id')
  .patch(codeController.updateCode)



module.exports = router;
