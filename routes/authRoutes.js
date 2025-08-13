const express = require('express');
const router = express.Router();
const { userValidationRules, loginValidationRules, validateUser } = require('../middlewares/validateUser');
const { register, login } = require('../controllers/authController');

router.post('/register', userValidationRules, validateUser, register);
router.post('/login', loginValidationRules, validateUser, login);

module.exports = router;
