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

    return authenticationMiddleware;

    function authentication(request, response, next){
        let token = request.header('auth');
        if(!token){
            log.logSeparator(console.error, 'ERROR - ERR_036 --> Not authorized.');
            response.status(401).send(new responseMessage('ERR_036', 'ERROR --> Not authorized.'));
        }

        log.logSeparator(console.log, 'Token --> ' + token);

        let payload = jwt.decode(token, process.env.SECRET_JWT_TOKEN);
        if(payload.ext <= moment().unix()){
            log.logSeparator(console.debug, 'Token time: ' + payload.ext + '.');
            log.logSeparator(console.error, 'ERROR - ERR_037 --> Your token expired. Please login again.');
            response.status(401).send(new responseMessage('ERR_037', 'ERROR --> Not authorized.'));
        }

        userHelper.getUserByUsername(payload.sub)
        .then(function(user){
            if(user != null){
                console.log(user),
                next();
            }
            else{
                console.log('user errore vuoto');
            }
        })
        .catch(function(error){
            log.console('some error occurred' + user)
        });
    }

}

module.exports = new authenticationMiddleware();