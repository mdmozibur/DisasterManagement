const express = require("express");
const controller = require('../controller/inventoryController');
const router = express.Router();

router.post('/', controller.get)
      .post('/daywiseExpense', controller.getDaywiseExpense)
      .post('/balance', controller.getAvailableBalance)
      .post('/purchase', controller.purchase);

module.exports = router;