const express = require("express");
const controller = require('../controller/crisisController');
const router = express.Router();

router.post('/', controller.post)
      .get('/', controller.getAllApproved);

module.exports = router;