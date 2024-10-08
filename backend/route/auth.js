const express = require("express");
const controller = require('../controller/authController');
const router = express.Router();

router.post('/register', controller.register)
      .post('/login', controller.login)

module.exports = router;