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
// TODOPOST - Check lowercase fields.
// TODOPOST - Add other get type, like name, surname, team, ecc..

router.get('/:username',
        auth.authentication,
        userMiddleware.checkUserExists,
        userController.getUserByUsername);

router.get('/',
        auth.authentication,
        userController.getAllUsers);

router.post('/',
        userMiddleware.checkMandatoryFields,
        userMiddleware.checkUserNotExists,
        userController.insertNewUser);

router.post('/login',
        auth.checkMandatoryFields,
        userController.login);

router.put('/:username',
        auth.authentication,
        userMiddleware.checkUserExists,
        userController.updateUser);

// TODO - Develop this method correctly.
router.put('/userteam/:username/:teamId',
        auth.authentication,
        userMiddleware.checkUserExists,
        userController.setUserTeam);

router.delete('/:username',
        auth.authentication,
        userMiddleware.checkUserExists,
        userController.deleteUser);

module.exports = router;