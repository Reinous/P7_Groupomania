const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user');
const checkEmail = require('../middleware/ctrlEmail');

router.post('/signup', checkEmail, signup);
router.post('/login', login);

module.exports = router;
