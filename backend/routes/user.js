const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');

const emailCheck = require('../middleware/email-check');
const passwordCheck = require('../middleware/password-check');
const usernameCheck = require('../middleware/username-check');

router.post('/signup', usernameCheck, emailCheck, passwordCheck, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;