/*******************************
 * User middleware
 *******************************/

const userHelper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function userMiddleware(){
    let userMiddleware = this;

    userMiddleware.checkMandatoryFields = checkMandatoryFields;
    userMiddleware.checkUserExists = checkUserExists;
    userMiddleware.checkUserNotExists = checkUserNotExists;

    return userMiddleware;

    /**
     * Check mandatory fields for new user.
     */
    function checkMandatoryFields(request, response, next){
        log.info('userMiddleware --> checkMandatoryFields start.');

        const body = request.body;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!body.username || whiteSpaceValidation.test(body.username)){
            log.error('ERR_020 - Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
            log.info('userMiddleware --> checkMandatoryFields ended.');
            return;
        }
        else if(!body.password || whiteSpaceValidation.test(body.password)){
            log.error('ERR_022 - Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
            log.info('userMiddleware --> checkMandatoryFields ended.');
            return;
        }
        else{
            log.info('Username and password are valid!');
            log.info('userMiddleware --> checkMandatoryFields ended.');
            next();
        }
    }

    function checkUserExists(request, response, next){
        log.info('userMiddleware --> checkUserExists start.');

        username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then(function(user){
            if(user != null){
                log.info('User ' + username + ' exists!');
                log.info('userMiddleware --> checkUserExists ended.');
                next();
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not exists!');
                response.status(404).send(new responseMessage('WARN_020', 'WARNING --> User ' + username + ' not exists!'));
                log.info('userMiddleware --> checkUserExists ended.');
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_020 - Fatal error on checking user ' + username + ' exists.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_020', 'FATAL --> Fatal error on checking user ' + username + ' exists. Check immediately console and logs.'));
            log.info('userMiddleware --> checkUserExists ended.');
            return;
        });
    }

    function checkUserNotExists(request, response, next){
        log.info('userMiddleware --> checkUserNotExists start.');

        username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then(function(user){
            if(user == null){
                log.info('User ' + username + ' not found!');
                log.info('userMiddleware --> checkUserNotExists ended.');
                next();
            }
            else{
                log.warn('WARN_022 - User ' + username + ' exists! Username is not available.');
                log.debug(user);
                response.status(409).send(new responseMessage('WARN_022', 'WARN --> User ' + username + ' exists!'));
                log.info('userMiddleware --> checkUserNotExists ended.');
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_025 - Fatal error on checking user ' + username + ' not exists.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_025', 'FATAL --> Fatal error on checking user ' + username + ' not exists. Check immediately console and logs.'));
            log.info('userMiddleware --> checkUserNotExists ended.');
            return;
        });
    }
}

module.exports = new userMiddleware();