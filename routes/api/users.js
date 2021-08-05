const express = require('express');
const router = express.Router();
const passport = require('passport');
// const authenticate = require('../../middleware/authenticate');
const { users: ctrl } = require('../../controllers');

router.get('/profile', passport.authenticate("jwt", { session: false }, (error, user) => {
  console.log(error);
  console.log(user);
}), ctrl.getProfile);

module.exports = router;
