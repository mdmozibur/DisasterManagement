const express = require("express");
const controller = require('../controller/userController');
const router = express.Router();

router.post('/volunteers', controller.getVolunteers)
      .put('/verify', controller.verify)

module.exports = router;