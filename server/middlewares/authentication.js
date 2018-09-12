/*******************************
 * Authentication middleware
 *******************************/

const log = require('../utils/logger');
const jwt = require('jwt-simple');
const moment = require('moment');
const responseMessage = require('../utils/responseMessage');
const userHelper = require('../features/user/user.helper');

function authenticationMiddleware(){
    let authenticationMiddleware = this;

    authenticationMiddleware.authentication = authentication;
    authenticationMiddleware.checkMandatoryFields = checkMandatoryFields;

    return authenticationMiddleware;

    function checkMandatoryFields(request, response, next){
        const username = request.body.username;
        const password = request.body.password;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!username || whiteSpaceValidation.test(username)){
            log.logSeparator(console.error, 'ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
        }
        else if(!password || whiteSpaceValidation.test(password)){
            log.logSeparator(console.error, 'ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
        }
        else{
            next();
        }
    }

    function authentication(request, response, next){
        let token = request.header('auth');
        log.logSeparator(console.debug, 'token --> ' + token);

        if(!token){
            log.logSeparator(console.error, 'ERROR - ERR_037 --> You are not authorized. Please login first.');
            response.status(401).send(new responseMessage('ERR_037', 'ERROR --> You are not authorized. Please login first.'));
        }

        let payload;
        try{
            payload = jwt.decode(token, process.env.SECRET_JWT_TOKEN);
        }
        catch{
            log.logSeparator(console.error, 'ERROR - ERR_038 --> Your session is expired. Please login again.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Your session is expired. Please login again.'));
        }
        
        userHelper.getUserByUsername(payload.sub)
        .then(function(user){
            if(user != null){
                log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
                log.logSeparator(console.debug, user);
                next();
            }
            else{
                log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
                response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_046 --> Fatal error on authentication user ' + payload.sub + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_046', 'FATAL --> Fatal error on authentication user ' + payload.sub + '. Check immediately console and logs.'));
        });
    }

}

module.exports = new authenticationMiddleware();