const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validation/authValidation');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', getMe);
router.post('/logout', logout);

module.exports = router;
