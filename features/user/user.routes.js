/*******************************
 * User routes
 *******************************/

 // Requirements
const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const auth = require('../../middlewares/authentication');

// Initialize
const router = express.Router();

/**************
 * Routes
 **************/

// TODOPOST - Total errors and warns review.

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
    userMiddleware.checkMandatoryFields,
    userMiddleware.checkUserNotExists,
    userController.insertNewUser
);

router.post('/login',
    auth.checkMandatoryFields,
    userController.login
);

router.put('/:username',
    auth.checkPersonalIdentity,
    userController.updateUser
);

// // TODO - Develop this method correctly.
// router.put('/userteam/:username/:teamId',
//         auth.authentication,
//         userMiddleware.checkUserExists,
//         userController.setUserTeam
// );

router.delete('/:username',
    auth.checkPersonalIdentity,
    userController.deleteUser
);

module.exports = router;