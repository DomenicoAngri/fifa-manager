/*******************************
 * League routes
 *******************************/

  // Requirements.
const express = require('express');
const leagueController = require('./league.controller');
const leagueMiddleware = require('./league.middleware');

// Initialize.
const router = express.Router();

// Routes.

router.put('/currentLeague/:id',
        leagueMiddleware.checkLeagueExists,
        leagueController.setCurrentLeague);

router.get('/currentLeagues', leagueController.getCurrentLeagues);

router.get('/:id',
        leagueMiddleware.checkLeagueExists,
        leagueController.getLeagueById);

router.get('/', leagueController.getAllLeagues);

router.post('/',
        leagueMiddleware.checkMandatoryFields,
        leagueMiddleware.checkLeagueNotExists,
        leagueController.insertNewLeague);

router.put('/:id',
        leagueMiddleware.checkLeagueExists,
        leagueController.updateLeague);

router.delete('/:id',
        leagueMiddleware.checkLeagueExists,
        leagueController.deleteLeague);

module.exports = router;