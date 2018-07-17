/****************************************************
 * App routes
 * This router handle all get and post app requests.
 ****************************************************/

// Requirements.
const express = require('express');
const userRoutes = require('../features/user/user.routes');

// Initialize.
const router = express.Router();

// Routes.
router.use('/user', userRoutes);

module.exports = router;