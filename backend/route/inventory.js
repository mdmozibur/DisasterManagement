const express = require("express");
const controller = require('../controller/inventoryController');
const router = express.Router();

router.get('/', controller.get)
      .get('/daywiseExpense', controller.getDaywiseExpense)
      .get('/balance', controller.getAvailableBalance)
      .post('/purchase', controller.purchase);

module.exports = router;