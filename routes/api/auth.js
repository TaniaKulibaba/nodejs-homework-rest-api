const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const authenticate = require('../../middleware/authenticate');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
