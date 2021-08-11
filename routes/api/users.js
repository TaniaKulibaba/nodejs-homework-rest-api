const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const { users: ctrl } = require('../../controllers');
const upload = require('../../middleware/multer');

router.get('/current', authenticate, ctrl.getProfile);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
