/*******************************
 * League routes
 *******************************/

  // Requirements.
const express = require('express');
const leagueController = require('./league.controller');
// const leagueMiddleware = require('./user.middleware');

// Initialize.
const router = express.Router();

// Routes.
router.get('/:_id', // getcurrent);

router.get('/', // get all leagues);

router.post('/', // create new leagues);

router.put('/:_id', // update leagues);

router.delete('/:_id', // delete leagues);

module.exports = router;