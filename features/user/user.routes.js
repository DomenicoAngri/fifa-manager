/*******************************
 * User routes
 *******************************/

 // Requirements.
const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const auth = require('../../middlewares/authentication');

// Initialize.
const router = express.Router();

// Routes.

// TODO - Develop admin permission for method.
// TODOPOST - Total errors and warns review.

// Is useful?
// router.get('/checkUsernameExists/:username',
//         userController.checkIfUsernameIsUsed
// );

router.post('/checkLoginStatus',
        auth.checkLoginStatus
);

router.get('/:username/:token',
        auth.authentication,
        // userMiddleware.checkUserExists,
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
        auth.authentication,
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
        auth.authentication,
        auth.checkPersonalIdentity,
        userController.deleteUser
);

module.exports = router;