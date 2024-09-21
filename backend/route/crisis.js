const express = require("express");
const controller = require('../controller/crisisController');
const router = express.Router();

router.post('/', controller.post)
      .get('/', controller.getAllApproved)
      .get('/all', controller.getAll)
      .get('/specific', controller.getSpecific)
      .put('/', controller.update)
      .post('/assign-volunteer', controller.assignVolunteer)

module.exports = router;