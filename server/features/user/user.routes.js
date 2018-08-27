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

// TODO - Aggiungere a quel punto il controllo della login (?)
// TODO - Aggiungere altri tipi di getUser (anche per update ?) in base alla ricerca che si fa (ad esempio: nome, cognome, ecc.)

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