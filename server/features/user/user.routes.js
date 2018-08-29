/*******************************
 * User routes
 *******************************/

 // Requirements.
const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');

// Initialize.
const router = express.Router();

// Routes.

// TODO - Add login logic
// TODO - Add other get type, like name, surname, team, ecc..

router.get('/:username',
        userMiddleware.checkUserExists,
        userController.getUserByUsername);

router.get('/', userController.getAllUsers);

router.post('/',
        userMiddleware.checkMandatoryFields,
        userMiddleware.checkUserNotExists,
        userController.insertNewUser);

router.put('/:username',
        userMiddleware.checkUserExists,
        userController.updateUser);

router.delete('/:username',
        userMiddleware.checkUserExists,
        userController.deleteUser);

module.exports = router;