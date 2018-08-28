/*******************************
 * Team routes
 *******************************/

// Requirements.
const express = require('express');
const teamController = require('./team.controller');
const teamMiddleware = require('./team.middleware');

// Initialize.
const router = express.Router();

// Routes.

router.get('/:id', teamController.getTeamById);

router.get('/', teamController.getAllTeams);

// TODO - sbagliatissimo, se lo getto dallo username è inutile avere id del team -.-'
router.get('/:id/:username', teamController.getTeamByUser);

router.post('/', teamController.insertNewTeam);

router.put('/:id', teamController.updateTeam);

router.put('/:id/:username', teamController.setUserTeam);

router.delete('/:id', teamController.deleteTeam);

module.exports = router;