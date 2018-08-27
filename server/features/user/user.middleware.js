/*******************************
 * User middlewares
 *******************************/

const userHelper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function usersMiddlewares(){
    let usersMiddlewares = this;

    usersMiddlewares.checkRegisterFields = checkRegisterFields;
    usersMiddlewares.checkUserExists = checkUserExists;
    usersMiddlewares.checkUserNotExists = checkUserNotExists;

    return usersMiddlewares;

    /**
     * Check mandatory fields for new user.
     */
    function checkRegisterFields(request, response, next){
        const body = request.body;
        const whiteSpaceValidationString = RegExp('^ *$');
        const emailValidationString = RegExp('/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/');

        if(!body._id || whiteSpaceValidationString.test(body._id)){
            log.logSeparator(console.error, 'ERROR - ERR_027 --> ID cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_027', 'ERROR --> ID cannot be empty or null!'));
        }
        else if(!body.username || whiteSpaceValidationString.test(body.username)){
            log.logSeparator(console.error, 'ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
        }
        else if(emailValidationString.test(body.email)){
            log.logSeparator(console.error, 'ERROR - ERR_021 --> Wrong email format! Email: ' + body.email);
            response.status(400).send(new responseMessage('ERR_021', 'ERROR --> Wrong email format!'));
        }
        else if(!body.password || whiteSpaceValidationString.test(body.password)){
            log.logSeparator(console.error, 'ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
        }
        else{
            next();
        }
    }

    function checkUserExists(request, response, next){
        requestParam = request.params.username;
        requestBody = request.body.username;

        userHelper.getUserByUsername(requestParam != null ? requestParam : requestBody)
        .then(function(user){
            if(user != null){
                log.logSeparator(console.info, 'INFO - User found!');
                log.logSeparator(console.debug, user);
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_020 --> User not found!');
                response.status(404).send(new responseMessage('WARN_020', 'WARNING --> User not found!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_020 --> Fatal server error on checking user exists. Check immediately console and logs.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_020', 'FATAL --> Fatal server error on checking user exists. Check immediately console and logs.'));
        });
    }

    function checkUserNotExists(request, response, next){
        requestParam = request.params.username;
        requestBody = request.body.username;

        userHelper.getUserByUsername(requestParam != null ? requestParam : requestBody)
        .then(function(user){
            if(user == null){
                log.logSeparator(console.info, 'INFO - User not found!');
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_022 --> WARN --> User found!');
                log.logSeparator(console.debug, user);
                response.status(409).send(new responseMessage('WARN_022', 'WARN --> User found!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_025 --> Fatal error on checking user not exists. Check immediately console and logs.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_025', 'FATAL --> Fatal error on checking user not exists. Check immediately console and logs.'));
        });
    }

}

module.exports = new usersMiddlewares();