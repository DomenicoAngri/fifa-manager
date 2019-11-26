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
    authenticationMiddleware.checkPersonalIdentity = checkPersonalIdentity;
    authenticationMiddleware.authenticationLikeAdmin = authenticationLikeAdmin;
    authenticationMiddleware.authenticationLikeSuperAdmin = authenticationLikeSuperAdmin;

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
        
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

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

    function authenticationLikeAdmin(request, response, next){
        log.info('authenticationMiddleware --> authenticationLikeAdmin start.');
        
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const payload = isTokenValid(token);

        if(payload){
            log.info('Token is valid! You are authorized.');

            if(payload.sub.isAdmin){
                log.info('Good you are an admin, so you can acces to this resource!');
                log.info('authenticationMiddleware --> authenticationLikeAdmin ended.');
                next();
            }
            else{
                log.info('I\'m sorry, but you aren\'t an admin, and you aren\'t authorized to access to this resource.');
                log.info('authenticationMiddleware --> authenticationLikeAdmin ended.');
                response.status(401).send(new responseMessage('ERR_041', 'ERROR --> I\'m sorry, but you aren\'t an admin, and you aren\'t authorized to access to this resource.'))
                return;
            }
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> authenticationLikeAdmin ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }
    }

    function authenticationLikeSuperAdmin(request, response, next){
        log.info('authenticationMiddleware --> authenticationLikeSuperAdmin start.');
        
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const payload = isTokenValid(token);

        if(payload){
            log.info('Token is valid! You are authorized.');

            if(payload.sub.isSuperAdmin){
                log.info('Good you are a super admin, so you can acces to this resource!');
                log.info('authenticationMiddleware --> authenticationLikeSuperAdmin ended.');
                next();
            }
            else{
                log.info('I\'m sorry, but you aren\'t a super admin, and you aren\'t authorized to access to this resource.');
                log.info('authenticationMiddleware --> authenticationLikeSuperAdmin ended.');
                response.status(401).send(new responseMessage('ERR_042', 'ERROR --> I\'m sorry, but you aren\'t a super admin, and you aren\'t authorized to access to this resource.'))
                return;
            }
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> authenticationLikeSuperAdmin ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }
    }

    function checkLoginStatus(request, response){
        log.info('authenticationMiddleware --> checkLoginStatus start.');

        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const payload = isTokenValid(token);

        if(payload){
            log.info('Token is valid! Checking username...');
            const username = payload.sub.username;

            userHelper.getUserByUsername(username)
            .then(function(user){
                if(user){
                    log.info('User ' + username + ' stored in token, found! You are authorized!');
                    log.debug(user);
                    log.info('authenticationMiddleware --> checkLoginStatus ended.');
                    response.status(200).send(payload.sub);
                    return;
                }
                else{
                    log.error('ERR_039 --> Username stored in session not found. Please login again.');
                    log.info('authenticationMiddleware --> checkLoginStatus ended.');
                    response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
                    return;
                }
            })
            .catch(function(error){
                log.error('FAT_048 --> Fatal error on checking login status.');
                log.error(error);
                log.info('authenticationMiddleware --> checkLoginStatus ended.');
                response.status(500).send(new responseMessage('FAT_048', 'FATAL --> Fatal error on checking login status. Check immediately console and logs.'));
                return;
            });
        }
        else{
            log.info('Token is not valid, your session is expired. Please login again!');
            log.info('authenticationMiddleware --> checkLoginStatus ended.');
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again!'))
            return;
        }
    }

    /**
     * This method check if the user is the same that wants to access (and add, edit or delete) to API for his resources.
     * For example, if user wants edit his username, through backend API (not in FE, because it cannot access by UI)
     * teorically it can add, edit or delete every username in the system. This middleware function, prevent this behavior,
     * and allows to user, to add, edit or delete only his information, and not other from other users.
     */
    function checkPersonalIdentity(request, response, next){
        log.info('authenticationMiddleware --> checkPersonalIdentity start.');

        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const payload = isTokenValid(token);
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
                response.status(401).send(new responseMessage('INFO', 'WARN_028 --> Username is not valid! Please logout and repeate the operation.'));
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
        log.debug('Token username = ' + payload.sub.username + ' - Token expiration date = ' + payload.exp);
        log.info('authenticationMiddleware --> isTokenValid ended.');

        return payload;
    }
}

module.exports = new authenticationMiddleware();