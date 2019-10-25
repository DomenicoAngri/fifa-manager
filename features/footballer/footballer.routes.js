/*******************************
 * Fooballer routes
 *******************************/

// Requirements
const express = require('express');
const footballerController = require('./footballer.controller');
const footballerMiddleware = require('./footballer.middleware');
const auth = require('../../middlewares/authentication');

// Initialize
const router = express.Router();

// TODO - Prevedere specie di paginazione in servizio getAll per non farsi restituire 20K record.
// TODO - set footballer to team - search footballer from name, id - footballer pagination

/**************
 * Routes
 **************/

router.get('/:footballerId',
    auth.authentication,
    footballerController.getFootballerById
);

router.get('/',
    auth.authentication,
    footballerController.getAllFootballers
);

router.post('/',
    auth.authenticationLikeAdmin,
    footballerController.insertNewFootballer
);

router.put('/:footballerId',
    auth.authenticationLikeAdmin,
    footballerController.updateFootballer
);

router.delete('/:footballerId',
    auth.authenticationLikeAdmin,
    footballerController.deleteFootballer
);

router.post('/insertFootballersCollection',
    auth.authenticationLikeAdmin,
    footballerController.insertFootballersCollection
);

module.exports = router;