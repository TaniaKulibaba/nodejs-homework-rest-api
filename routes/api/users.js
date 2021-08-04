const express = require('express');
const router = express.Router();
const useAuth = require('../../middleware/useAuth');
const { users: ctrl } = require('../../controllers');

router.get('/profile', useAuth, ctrl.getProfile);

module.exports = router;
