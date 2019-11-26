/*******************************
 * User routes
 *******************************/

 // Requirements
const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const teamMiddleware = require('../team/team.middleware');
const auth = require('../../middlewares/authentication');

// Initialize
const router = express.Router();

/**************
 * Routes
 **************/

// TODOPOST - Total errors and warns review.
// TODO - Pensare cosa mettere dentro il local storage così da evitare sempre le chiamate a BE
// TODO - Pensare ad un sistema di cache
// TODO - Fare metodo per "disabilitare" utente e per staccargli tutto, team giocatori, leghe ecc, cioè archiviarlo.

// TODO - Staccare il team assegnato ad utente che gli è stato assegnato precedentemente
// TODO - Aggiornare le statistiche

router.post('/checkLoginStatus',
    auth.checkLoginStatus
);

router.get('/:username',
    auth.authentication,
    userController.getUserByUsername
);

router.get('/',
    auth.authentication,
    userController.getAllUsers
);

router.post('/',
    userMiddleware.checkUsernameField,
    userMiddleware.checkPasswordField,
    userMiddleware.checkOriginalUsernameField,
    userMiddleware.checkUserNotExists,
    userController.insertNewUser
);

router.post('/login',
    userMiddleware.checkUsernameField,
    userMiddleware.checkPasswordField,
    userController.login
);

router.put('/setUserTeam',
    auth.authenticationLikeAdmin,
    userMiddleware.checkUsernameField,
    userMiddleware.checkTeamIdField,
    userMiddleware.checkUserExists,
    teamMiddleware.checkTeamExistsById,
    teamMiddleware.checkIfTeamIsFree,
    userController.setUserTeam
);

router.put('/unsetUserTeam',
    auth.authenticationLikeAdmin,
    userMiddleware.checkUsernameField,
    userMiddleware.checkUserExists,
    userController.unsetUserTeam
);

// TODO - mettere username qui nel body

router.put('/:username',
    auth.checkPersonalIdentity,
    userController.updateUser
);

router.delete('/:username',
    auth.checkPersonalIdentity,
    userController.deleteUser
);

module.exports = router;