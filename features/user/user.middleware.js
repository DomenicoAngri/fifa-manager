/*******************************
 * User middleware
 *******************************/

const userHelper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');
const whiteSpaceValidation = RegExp('^ *$');

function userMiddleware(){
    let userMiddleware = this;

    userMiddleware.checkUserIdField = checkUserIdField;
    userMiddleware.checkUsernameField = checkUsernameField;
    userMiddleware.checkPasswordField = checkPasswordField;
    userMiddleware.checkOriginalUsernameField = checkOriginalUsernameField;
    userMiddleware.checkUserExists = checkUserExists;
    userMiddleware.checkUserNotExists = checkUserNotExists;

    return userMiddleware;

    function checkUserIdField(request, response, next){
        log.info('userMiddleware --> checkUserIdField start.');

        const userId = request.body.userId;
        log.debug('User ID = ' + userId);

        if(!userId || whiteSpaceValidation.test(userId)){
            log.error('ERR_044 - User ID cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_044', 'ERROR --> User ID cannot be empty or null!'));
            log.info('userMiddleware --> checkUserIdField ended.');
            return;
        }
        else{
            log.info('User ID is valid!');
            log.info('userMiddleware --> checkUserIdField ended.');
            next();
        }
    }

    /**
     * Check mandatory fields.
     */
    
    function checkUsernameField(request, response, next){
        log.info('userMiddleware --> checkUsernameField start.');

        const username = request.body.username;
        log.debug('Username = ' + username);

        if(!username || whiteSpaceValidation.test(username)){
            log.error('ERR_020 - Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
            log.info('userMiddleware --> checkUsernameField ended.');
            return;
        }
        else{
            log.info('Username is valid!');
            log.info('userMiddleware --> checkUsernameField ended.');
            next();
        }
    }

    function checkPasswordField(request, response, next){
        log.info('userMiddleware --> checkPasswordField start.');

        const password = request.body.password;

        if(!password || whiteSpaceValidation.test(password)){
            log.error('ERR_022 - Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
            log.info('userMiddleware --> checkPasswordField ended.');
            return;
        }
        else{
            log.info('Password is valid!');
            log.info('userMiddleware --> checkPasswordField ended.');
            next();
        }
    }

    function checkOriginalUsernameField(request, response, next){
        log.info('userMiddleware --> checkOriginalUsernameField start.');

        const originalUsername = request.body.originalUsername;
        log.debug('Original username = ' + originalUsername);

        if(!originalUsername || whiteSpaceValidation.test(originalUsername)){
            log.error('ERR_035 - Original username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_035', 'ERROR --> Original username cannot be empty or null!'));
            log.info('userMiddleware --> checkOriginalUsernameField ended.');
            return;
        }
        else{
            log.info('Original username is valid!');
            log.info('userMiddleware --> checkOriginalUsernameField ended.');
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
                log.info('userMiddleware --> checkUserNotExists ended.');
                response.status(409).send(new responseMessage('WARN_022', 'WARN --> User ' + username + ' exists!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_025 - Fatal error on checking user ' + username + ' not exists.');
            log.error(error);
            log.info('userMiddleware --> checkUserNotExists ended.');
            response.status(500).send(new responseMessage('FAT_025', 'FATAL --> Fatal error on checking user ' + username + ' not exists. Check immediately console and logs.'));
            return;
        });
    }
}

module.exports = new userMiddleware();