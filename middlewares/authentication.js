/*******************************
 * Authentication middleware
 *******************************/

const log = require('../utils/logger');
const jwt = require('jwt-simple');
const responseMessage = require('../utils/responseMessage');

function authenticationMiddleware(){
    let authenticationMiddleware = this;

    authenticationMiddleware.authentication = authentication;
    authenticationMiddleware.checkMandatoryFields = checkMandatoryFields;
    authenticationMiddleware.checkLoginStatus = checkLoginStatus;
    authenticationMiddleware.checkPersonalIdentity = checkPersonalIdentity;

    return authenticationMiddleware;

    function checkMandatoryFields(request, response, next){
        log.info('authenticationMiddleware --> checkMandatoryFields start.');

        const username = request.body.username;
        const password = request.body.password;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!username || whiteSpaceValidation.test(username)){
            log.error('ERR_020 - Username cannot be empty or null!');
            log.info('authenticationMiddleware --> checkMandatoryFields ended.');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
            return;
        }
        else if(!password || whiteSpaceValidation.test(password)){
            log.error('ERR_022 - Password cannot be empty or null!');
            log.info('authenticationMiddleware --> checkMandatoryFields ended.');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
            return;
        }
        else{
            log.info('Username and password are valid!');
            log.info('authenticationMiddleware --> checkMandatoryFields ended.');
            next();
        }
    }

    function authentication(request, response, next){
        log.info('authenticationMiddleware --> authentication start.');

        const token = request.params.token != null ? request.params.token : request.body.token;

        const payload = isTokenValid(token);

        if(payload){
            log.info('Token is valid! You are authorized.');
            log.info('authenticationMiddleware --> authentication ended.');
            next();
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> authentication ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }
    }

    function checkLoginStatus(request, response){
        log.info('authenticationMiddleware --> checkLoginStatus start.');

        const payload = isTokenValid(request.body.token);

        if(payload){
            log.info('Token is valid! You are authorized.');
            log.info('authenticationMiddleware --> checkLoginStatus ended.');
            response.status(200).send(payload.sub);
            return;
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> checkLoginStatus ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }

        // TODOPOST - This validation is very useful for user validation, but in this moment is not our goal.
        // userHelper.getUserByUsername(payload.sub)
        // .then(function(user){
        //     if(user !== null){
        //         log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
        //         log.logSeparator(console.debug, user);
        //         response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + payload.sub + ' stored in token, found!'));
        //         return;
        //     }
        //     else{
        //         log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
        //         response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
        //         return;
        //     }
        // })
        // .catch(function(error){
        //     log.logSeparator(console.error, 'FATAL - FAT_048 --> Fatal error on checking login status.');
        //     log.logSeparator(console.error, error);
        //     response.status(500).send(new responseMessage('FAT_048', 'FATAL --> Fatal error on checking login status.'));
        //     return;
        // });
    }

    function checkPersonalIdentity(request, response, next){
        log.info('authenticationMiddleware --> checkPersonalIdentity start.');

        const payload = isTokenValid(request.body.token);
        const username = request.params.username;

        if(payload){
            log.info('Token is valid! You are authorized.');

            log.info('Checking if user\'s personal identity is valid...');
            if(payload.sub === username){
                log.info('Username is valid! You are authorized.');
                log.info('authenticationMiddleware --> checkPersonalIdentity ended.');
                next();
            }
            else{
                log.warn('WARN_028 - Username is not valid! Please logout and repeate the operation.');
                log.info('authenticationMiddleware --> checkPersonalIdentity ended.');
                response.status(401).send(new responseMessage('INFO', 'INFO --> Token is not valid, your session is expired. Please login again!'));
                return;
            }   
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> checkPersonalIdentity ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }
    }
    
    function isTokenValid(token){
        log.info('authenticationMiddleware --> isTokenValid start.');

        if(!token){
            log.error('ERR_037 - Token is null or empty, you are not authorized. Please login first.');
            log.info('authenticationMiddleware --> isTokenValid ended.');
            return null;
        }

        log.debug('Token = ' + token);

        log.info('Decoding token...');
        let payload = null;

        try{
            payload = jwt.decode(token, process.env.SECRET_JWT_TOKEN);
        }
        catch(error){
            log.error(error);
            log.error('ERR_038 - Token is not valid, your session is expired. Please login again.');
            log.info('authenticationMiddleware --> isTokenValid ended.');
            return null;
        }

        log.info('Token is decoded and is valid.');
        log.debug('Token username = ' + payload.sub + ' - Token expiration date = ' + payload.exp);
        log.info('authenticationMiddleware --> isTokenValid ended.');

        return payload;
    }

}

module.exports = new authenticationMiddleware();