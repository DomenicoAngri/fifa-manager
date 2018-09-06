/*******************************
 * Team routes
 *******************************/

// Requirements.
const express = require('express');
const teamMiddleware = require('./team.middleware');
const teamController = require('./team.controller');

// Initialize.
const router = express.Router();

// Routes.

router.get('/userteam/:username',
            teamMiddleware.checkTeamExists,
            teamController.getTeamByUser);

router.get('/:id',
            teamMiddleware.checkTeamExists,
            teamController.getTeamById);

router.get('/', teamController.getAllTeams);

router.post('/',
            teamMiddleware.checkMandatoryFields,
            teamMiddleware.checkTeamNotExists,
            teamController.insertNewTeam);

router.put('/:id',
            teamMiddleware.checkTeamExists,
            teamController.updateTeam);

// router.put('/:id/:username', teamController.setUserTeam);

router.delete('/:id',
            teamMiddleware.checkTeamExists,
            teamController.deleteTeam);

module.exports = router;