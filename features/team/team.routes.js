/*******************************
 * Team routes
 *******************************/

// Requirements
const express = require('express');
const teamMiddleware = require('./team.middleware');
const teamController = require('./team.controller');
const auth = require('../../middlewares/authentication');

// Initialize
const router = express.Router();

// TODO - set team to user - search team from name, id - team pagination (??)
// TODO - Delete team by user, set - unset team by user

/**************
 * Routes
 **************/

router.get('/userteam/:username',
    auth.authentication,
    teamController.getTeamByUser
);

router.get('/:teamName',
    auth.authentication,
    teamMiddleware.checkTeamExists,
    teamController.getTeamByName
);

router.get('/',
    auth.authentication,
    teamController.getAllTeams
);

router.post('/',
    auth.authenticationLikeAdmin,
    teamMiddleware.checkTeamNameField,
    teamMiddleware.checkTeamNotExists,
    teamController.insertNewTeam
);

router.put('/:teamName',
    auth.authenticationLikeAdmin,
    teamMiddleware.checkTeamExists,
    teamController.updateTeam
);

router.delete('/:teamName',
    auth.authenticationLikeAdmin,
    teamMiddleware.checkTeamExists,
    teamController.deleteTeam
);

module.exports = router;