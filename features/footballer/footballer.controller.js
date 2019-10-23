/*******************************
 * Footballer controller
 *******************************/

const helper = require('./footballer.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function footballerController(){
    let footballerController = this;

    footballerController.getFootballerById = getFootballerById;
    footballerController.getAllFootballers = getAllFootballers;
    footballerController.insertNewFootballer = insertNewFootballer;
    footballerController.updateFootballer = updateFootballer;
    footballerController.deleteFootballer = deleteFootballer;

    return footballerController;

    function getFootballerById(request, response){
        log.info('footballerController --> getFootballerById start.');
        
        const id = request.params.footballerId;
        log.debug('Footballer id = ' + id);

        log.info('Getting footballer from DB by id...');
        helper.getFootballerById(id)
        .then(function(footballer){
            if(footballer){
                log.info('Footballer found!');
                log.debug(footballer);
                response.status(200).send(footballer);
                log.info('footballerController --> getFootballerById ended.');
                return;
            }
            else{
                log.warn('WARN_029 - Footballer with id = ' + id + ', not found!');
                log.info('footballerController --> getFootballerById ended.');
                response.status(404).send(new responseMessage('WARN_029','WARN --> Footballer with id = ' + id + ', not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_049 - Fatal error on getting footballer with id = ' + id + ' from DB.');
            log.error(error);
            log.info('footballerController --> getFootballerById ended.');
            response.status(500).send(new responseMessage('FAT_049', 'Fatal error on getting footballer with id = ' + id + ' from DB. Check immediately console and logs.'));
            return;
        });
    }

    function getAllFootballers(request, response){
        log.info('footballerController --> getAllFootballers start.');

        helper.getAllFootballers()
        .then(function(footballers){
            log.info('Footballers found in db: ' + footballers.length + '.');

            if(footballers && footballers.length > 0){
                // log.debug(footballers); --> Footballers could be over 10K, is not good print them in log for performance.
                log.info('footballerController --> getAllFootballers ended.');
                response.status(200).send(footballers);
                return;
            }
            else{
                log.warn('WARN_030 - No footballers found!');
                log.info('footballerController --> getAllFootballers ended.');
                response.status(404).send(new responseMessage('WARN_030','WARN --> No footballers found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_050 - Fatal error on getting all footballers from DB.');
            log.error(error);
            log.info('footballerController --> getAllFootballers ended.');
            response.status(500).send(new responseMessage('FAT_050', 'FATAL --> Fatal error on getting all footballers from DB. Check immediately console and logs.'));
            return;
        });
    }

    function insertNewFootballer(request, response){
        log.info('footballerController --> insertNewFootballer start.');

        const footballerName = request.body.name + (request.body.surname ? ' ' + request.body.surname : '');
        log.debug('Inserting ' + footballerName + ' into DB...');

        helper.insertNewFootballer(request.body)
        .then(function(footballerSaved){
            log.info('Footballer ' + footballerName + ' registered!');
            log.debug(footballerSaved);
            log.info('footballerController --> insertNewFootballer ended.');
            response.status(200).send(new responseMessage('INFO', 'INFO --> Footballer ' + footballerName + ' saved correctly!'));
            return;
        })
        .catch(function(error){
            log.error('FAT_051 - Fatal error on footballer ' + footballerName + ' registration.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_051', 'FATAL --> Fatal error on footballer ' + footballerName + ' registration. Check immediately console and logs.'));
            log.info('footballerController --> insertNewFootballer ended.');
            return;
        });
    }

    function updateFootballer(request, response){
        log.info('footballerController --> updateFootballer start.');

        const id = request.params.footballerId;
        log.debug('Updating footballer with id = ' + id + '.');

        helper.updateFootballer(id, request.body)
        .then(function(footballerUpdated){
            if(footballerUpdated.nModified > 0){
                log.info('Footballer with id = ' + id + ' updated!');
                log.info('footballerController --> updateFootballer ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> Footballer with id = ' + id + ' updated correctly!'));
                return;
            }
            else{
                log.warn('WARN_031 - Footballer with id = ' + id + ' not updated; this can be occurred when footballer not exists, or nothing new was updated.');
                log.info('footballerController --> updateFootballer ended.');
                response.status(404).send(new responseMessage('WARN_031','WARN --> Footballer with id = ' + id + ' not updated; this can be occurred when footballer not exists, or nothing new was updated.'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_052 - Fatal error on updating footballer with id = ' + id + '.');
            log.error(error);
            log.info('footballerController --> updateFootballer ended.');
            response.status(500).send(new responseMessage('FAT_052', 'FATAL --> Fatal error on updating footballer with id = ' + id + '. Check immediately console and logs.'));
            return;
        }); 
    }

    function deleteFootballer(request, response){
        log.info('footballerController --> deleteFootballer start.');

        const id = request.params.footballerId;
        log.info('Deleting footballer with id = ' + id + '.');

        helper.deleteFootballer(id)
        .then(function(footballerDeleted){
            if(footballerDeleted.deletedCount > 0){
                log.info('Footballer with id = ' + id + ' deleted correctly!');
                log.info('footballerController --> deleteFootballer ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> Footballer with id = ' + id + ' deleted correctly!'));
                return;
            }
            else{
                log.warn('WARN_029 - Footballer with id = ' + id + ', not found!');
                log.info('footballerController --> deleteFootballer ended.');
                response.status(404).send(new responseMessage('WARN_029','WARN --> Footballer with id = ' + id + ', not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_053 - Fatal error on deleting footballer with id = ' + id + '.');
            log.error(error);
            log.info('footballerController --> deleteFootballer ended.');
            response.status(500).send(new responseMessage('FAT_053', 'FATAL --> Fatal error on deleting footballer with id = ' + id + '. Check immediately console and logs.'));
            return;
        });
    }
}

module.exports = new footballerController();