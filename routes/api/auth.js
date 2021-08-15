const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const authenticate = require('../../middleware/authenticate');

router.post('/signup', ctrl.signup);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

router.get('/verify/:verifyCode', ctrl.verify);

module.exports = router;
