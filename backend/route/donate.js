const express = require("express");
const controller = require('../controller/donationController');
const router = express.Router();

router.post('/', controller.post)
      .get('/', controller.getAll)
      .get('/daywise', controller.getDaywise)
      .get('/alltime', controller.getAllTime);

module.exports = router;