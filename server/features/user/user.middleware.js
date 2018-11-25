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
        const body = request.body;
        const whiteSpaceValidation = RegExp('^ *$');
        const emailValidation = RegExp('/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/');

        if(!body.username || whiteSpaceValidation.test(body.username)){
            log.logSeparator(console.error, 'ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
        }


        // TODO - WHAT A FUCK?!?!?! QUESTO NON DEVE ESSERCI AUSHDUAUHSDUAS
        else if(emailValidation.test(body.email)){
            log.logSeparator(console.error, 'ERROR - ERR_021 --> Wrong email format! Email: ' + body.email + '.');
            response.status(400).send(new responseMessage('ERR_021', 'ERROR --> Wrong email format!'));
        }
        else if(!body.password || whiteSpaceValidation.test(body.password)){
            log.logSeparator(console.error, 'ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
        }

        // TODO - TOGLIERE STA ROBA DELL'ADMIN.
        else if(body.isAdmin == null){
            log.logSeparator(console.error, 'ERROR - ERR_040 --> It is must necessary specify if user is an admin.');
            response.status(400).send(new responseMessage('ERR_040', 'ERROR --> It is must necessary specify if user is an admin.'));
        }
        else{
            next();
        }
    }

    function checkUserExists(request, response, next){
        username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then(function(user){
            if(user != null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_020 --> User ' + username + ' not exists!');
                response.status(404).send(new responseMessage('WARN_020', 'WARNING --> User ' + username + ' not exists!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_020 --> Fatal error on checking user ' + username + ' exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_020', 'FATAL --> Fatal error on checking user ' + username + ' exists. Check immediately console and logs.'));
        });
    }

    function checkUserNotExists(request, response, next){
        log.logSeparator(console.info, 'Function user.middleware.checkUserNotExists(): start.');

        username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then(function(user){
            if(user == null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_022 --> WARN --> User ' + username + ' exists!');
                log.logSeparator(console.debug, user);
                response.status(409).send(new responseMessage('WARN_022', 'WARN --> User ' + username + ' exists!'));
                return;
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_025 --> Fatal error on checking user ' + username + ' not exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_025', 'FATAL --> Fatal error on checking user ' + username + ' not exists. Check immediately console and logs.'));
            return;
        });
    }

}

module.exports = new userMiddleware();