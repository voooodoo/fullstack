const express = require('express');
const controllers = require('../controllers/auth');
const router = express.Router();

// api/auth/login
router.post('/login', controllers.login);

// api/auth/register
router.post('/register', controllers.register);

module.exports = router;
