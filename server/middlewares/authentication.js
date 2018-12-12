/*******************************
 * Authentication middleware
 *******************************/

const log = require('../utils/logger');
const jwt = require('jwt-simple');
const responseMessage = require('../utils/responseMessage');
const userHelper = require('../features/user/user.helper');

function authenticationMiddleware(){
    let authenticationMiddleware = this;

    authenticationMiddleware.authentication = authentication;
    authenticationMiddleware.checkMandatoryFields = checkMandatoryFields;
    authenticationMiddleware.checkLoginStatus = checkLoginStatus;

    return authenticationMiddleware;

    function checkMandatoryFields(request, response, next){
        log.logSeparator(console.info, 'Function authentication --> checkMandatoryFields start.');

        const username = request.body.username;
        const password = request.body.password;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!username || whiteSpaceValidation.test(username)){
            log.logSeparator(console.error, 'ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
            return;
        }
        else if(!password || whiteSpaceValidation.test(password)){
            log.logSeparator(console.error, 'ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
            return;
        }
        else{
            next();
        }
    }

    function tokenDecode(token){
        log.logSeparator(console.info, 'Function authentication --> tokenDecode start.');

        try{
            return jwt.decode(token, process.env.SECRET_JWT_TOKEN);
        }
        catch{
            return null;
        }
    }

    function authentication(request, response, next){
        log.logSeparator(console.info, 'Function authentication --> authentication start.');

        let token = request.body.token;
        log.logSeparator(console.debug, 'token --> ' + token);

        if(!isTokenValid(token)){
            response.status(401).send(new responseMessage('ERR_037', 'ERROR --> You are not authorized. Please login first.'));
            return;
        }
        
        userHelper.getUserByUsername(payload.sub)
        .then(function(user){
            if(user !== null){
                log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
                log.logSeparator(console.debug, user);
                next();
            }
            else{
                log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
                response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
                return;
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_046 --> Fatal error on authentication user ' + payload.sub + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_046', 'FATAL --> Fatal error on authentication user ' + payload.sub + '. Check immediately console and logs.'));
            return;
        });
    }

    function checkLoginStatus(request, response){
        log.logSeparator(console.info, 'Function authentication --> checkLoginStatus start.');
        
        let token = request.body.token;
        log.logSeparator(console.debug, 'token --> ' + token);

        if(!isTokenValid(token)){
            response.status(401).send(new responseMessage('ERR_037', 'ERROR --> You are not authorized. Please login first.'));
            return;
        }

        userHelper.getUserByUsername(payload.sub)
        .then(function(user){
            if(user !== null){
                log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
                log.logSeparator(console.debug, user);
                response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + payload.sub + ' stored in token, found!'));
                return;
            }
            else{
                log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
                response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
                return;
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_048 --> Fatal error on checking login status.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_048', 'FATAL --> Fatal error on checking login status.'));
            return;
        });
    }

    function isTokenValid(token){
        log.logSeparator(console.info, 'Function authentication --> isTokenValid start.');

        if(!token){
            log.logSeparator(console.error, 'ERROR - ERR_037 --> You are not authorized. Please login first.');
            return false;
        }

        let payload = tokenDecode(token);

        if(!payload){
            log.logSeparator(console.error, 'ERROR - ERR_038 --> Your session is expired. Please login again.');
            return false;
        }

        return true;
    }

}

module.exports = new authenticationMiddleware();