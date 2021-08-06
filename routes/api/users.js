const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const { users: ctrl } = require('../../controllers');

router.get('/current', authenticate, ctrl.getProfile);

module.exports = router;
