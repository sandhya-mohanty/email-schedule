


const express = require('express');
const { scheduleEmail } = require('../controllers/emailController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/schedule-email', authenticateToken, scheduleEmail);

module.exports = router;
