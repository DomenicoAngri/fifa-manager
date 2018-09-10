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

// TODO - Add login logic
// TODO - Add other get type, like name, surname, team, ecc..

router.get('/:username',
        userMiddleware.checkUserExists,
        userController.getUserByUsername);

router.get('/',
        auth.authentication,
        userController.getAllUsers);

router.post('/',
        userMiddleware.checkMandatoryFields,
        userMiddleware.checkUserNotExists,
        userController.insertNewUser);

// TODO - Check field?
router.post('/login', userController.login);

router.put('/:username',
        userMiddleware.checkUserExists,
        userController.updateUser);

router.put('/userteam/:username/:teamId',
        userMiddleware.checkUserExists,
        userController.setUserTeam);

router.delete('/:username',
        userMiddleware.checkUserExists,
        userController.deleteUser);

module.exports = router;