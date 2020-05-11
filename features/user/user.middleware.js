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
    userMiddleware.checkIfUserNotHaveTeam = checkIfUserNotHaveTeam;
    userMiddleware.checkIfUserHaveTeam = checkIfUserHaveTeam;
    userMiddleware.checkUserConsistency = checkUserConsistency;

    return userMiddleware;

    /**
     * Check mandatory fields.
     */

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

        const username = request.params.username != null ? request.params.username : request.body.username;

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

        const username = request.params.username != null ? request.params.username : request.body.username;

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

    function checkIfUserNotHaveTeam(request, response, next){
        log.info('userMiddleware --> checkIfUserNotHaveTeam start.');

        const username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then((user) => {
            if(user){
                if(user.team == null){
                    log.info('User ' + username + ' not have a team! You can continue with next step!');
                    log.info('userMiddleware --> checkIfUserNotHaveTeam ended.');
                    next();
                }
                else{
                    log.warn('WARN_045 - User ' + username + ' already have a team! You cannot continue with next step.');
                    log.debug(user);
                    log.info('userMiddleware --> checkIfUserNotHaveTeam ended.');
                    response.status(409).send(new responseMessage('WARN_045', 'WARN --> User ' + username + ' already have a team! You cannot continue with next step!'));
                    return;
                }
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User ' + username + ' not found!'));
                log.info('userMiddleware --> checkIfUserNotHaveTeam ended.');
                return;
            }
        })
        .catch((error) => {
            log.error('FAT_059 - Fatal error on checking ' + username + ' not have a team.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_059', 'FATAL --> Fatal error on checking ' + username + ' not have a team. Check immediately console and logs.'));
            log.info('userMiddleware --> checkIfUserNotHaveTeam ended.');
            return;
        });
    }

    function checkIfUserHaveTeam(request, response, next){
        log.info('userMiddleware --> checkIfUserHaveTeam start.');

        const username = request.params.username != null ? request.params.username : request.body.username;

        userHelper.getUserByUsername(username)
        .then((user) => {
            if(user){
                if(user.team){
                    log.info('User ' + username + ' have a team! You can continue with next step!');
                    log.info('userMiddleware --> checkIfUserHaveTeam ended.');
                    next();
                }
                else{
                    log.warn('WARN_046 - User ' + username + ' not have a team! You cannot continue with next step.');
                    log.debug(user);
                    log.info('userMiddleware --> checkIfUserHaveTeam ended.');
                    response.status(409).send(new responseMessage('WARN_046', 'WARN --> User ' + username + ' not have a team! You cannot continue with next step!'));
                    return;
                }
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User ' + username + ' not found!'));
                log.info('userMiddleware --> checkIfUserHaveTeam ended.');
                return;
            }
        })
        .catch((error) => {
            log.error('FAT_060 - Fatal error on checking ' + username + ' have a team.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_060', 'FATAL --> Fatal error on checking ' + username + ' have a team. Check immediately console and logs.'));
            log.info('userMiddleware --> checkIfUserHaveTeam ended.');
            return;
        });
    }

    function checkUserConsistency(request, response, next){
        log.info('userMiddleware --> checkUserConsistency start.');

        userId = request.params.userId != null ? request.params.userId : request.body.userId;
        username = request.params.username != null ? request.params.username : request.body.username;
        log.debug('UserID = ' + userId);
        log.debug('Username = ' + username);

        log.info('Getting user ' + username + ' info...');
        userHelper.getUserByUsername(username)
        .then((user) => {
            if(user && user.userId === userId){
                log.info("Good! User information are consistent! You can continue with next step!");
                log.debug(user);
                log.info('userMiddleware --> checkUserConsistency ended.');
                next();
            }
            else{
                log.error('ERR_046 - User ' + username + ' and userID = ' + userId + 'aren\'t not consistent. You cannot continue with next step!');
                response.status(400).send(new responseMessage('ERR_046', 'ERROR --> User ' + username + ' and userID = ' + userId + 'aren\'t not consistent. You cannot continue with next step!'));
                log.info('userMiddleware --> checkUserConsistency ended.');
                return;
            }
        })
        .catch((error) => {
            log.error('FAT_061 - Fatal error on getting ' + username + ' user.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_061', 'FATAL --> Fatal error on getting ' + username + ' user. Check immediately console and logs.'));
            log.info('userMiddleware --> checkUserConsistency ended.');
            return;
        });
    }

    // async function checkUserAndTeamInfoConsistency(request, response, next){
    //     log.info('userMiddleware --> checkUserAndTeamInfoConsistency start.');

    //     username = request.params.username != null ? request.params.username : request.body.username;
    //     teamName = request.params.teamName != null ? request.params.teamName : request.body.teamName;

    //     let user;
    //     let team;

    //     log.info('Getting user by username info...');
    //     await userHelper.getUserByUsername(username)
    //     .then((userResult) => {
    //         log.info(userResult);
    //         user = userResult;
    //     })
    //     .catch((error) => {
    //         log.error('FAT_061 - Fatal error on getting ' + username + ' user.');
    //         log.error(error);
    //         response.status(500).send(new responseMessage('FAT_061', 'FATAL --> Fatal error on getting ' + username + ' user. Check immediately console and logs.'));
    //         log.info('userMiddleware --> checkUserAndTeamInfoConsistency ended.');
    //         return;
    //     });

    //     log.info('Getting team info...');
    //     await teamHelper.getTeamByName(teamName)
    //     .then((teamResult) => {
    //         log.info(teamResult);
    //         team = teamResult;
    //     })
    //     .catch((error) => {
    //         log.error('FAT_062 - Fatal error on getting ' + teamName + ' team.');
    //         log.error(error);
    //         response.status(500).send(new responseMessage('FAT_062', 'FATAL --> Fatal error on getting ' + teamName + ' team. Check immediately console and logs.'));
    //         log.info('userMiddleware --> checkUserAndTeamInfoConsistency ended.');
    //         return;
    //     });

    //     log.info('Checking user and team info consistency...');
    //     if(user._id == team.mangerUser){
    //         log.info('User ' + username + ' and team ' + teamName + ' are correctly connected together! You can continue with next step!');
    //         next();
    //         log.info('userMiddleware --> checkUserAndTeamInfoConsistency ended.');
    //     }
    //     else{
    //         log.error('ERR_045 - User ' + username + ' and team ' + teamName + 'aren\'t connected together, there aren\'t info consistency! You cannot continue with next step!');
    //         response.status(400).send(new responseMessage('ERR_045', 'ERROR --> User ' + username + ' and team ' + teamName + ' aren\'t connected together, there aren\'t info consistency! You cannot continue with next step! Check immediately console and logs.'));
    //         log.info('userMiddleware --> checkUserAndTeamInfoConsistency ended.');
    //         return;
    //     }
    // }
}

module.exports = new userMiddleware();