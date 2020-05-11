/*******************************
 * User controller
 *******************************/

const userHelper = require('./user.helper');
const teamHelper = require('../team/team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');
const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');

function userController(){
    let userController = this;

    userController.getUserByUsername = getUserByUsername;
    userController.getAllUsers = getAllUsers;
    userController.insertNewUser = insertNewUser;
    userController.updateUser = updateUser;
    userController.deleteUser = deleteUser;
    userController.setUserTeam = setUserTeam;
    userController.unsetUserTeam = unsetUserTeam;
    userController.login = login;

    return userController;

    function getUserByUsername(request, response){
        log.info('userController --> getUserByUsername start.');

        const username = request.params.username;

        userHelper.getUserByUsername(username)
        .then(function(user){
            if(user != null){
                log.info('User ' + username + ' found!');
                log.debug(user);
                response.status(200).send(user);
                log.info('userController --> getUserByUsername ended.');
                return;
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User ' + username + ' not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_023 - Fatal error on getting user ' + username + ' from DB.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_023', 'FATAL --> Fatal error on getting user ' + username + ' from DB. Check immediately console and logs.'));
            return;
        });
    }

    function getAllUsers(request, response){
        log.info('userController --> getAllUsers start.');

        userHelper.getAllUsers()
        .then(function(users){
            log.info('Users found in db: ' + users.length + '.');

            if(users != null && users.length > 0){
                log.debug(users);
                log.info('userController --> getAllUsers ended.');
                response.status(200).send(users);
                return;
            }
            else{
                log.warn('WARN_021 - No users found!');
                log.info('userController --> getAllUsers ended.');
                response.status(404).send(new responseMessage('WARN_021','WARN --> No users found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_022 - Fatal error on getting all users from DB.');
            log.error(error);
            log.info('userController --> getAllUsers ended.');
            response.status(500).send(new responseMessage('FAT_022', 'FATAL --> Fatal error on getting all users from DB. Check immediately console and logs.'));
            return;
        });
    }

    function insertNewUser(request, response){
        log.info('userController --> insertNewUser start.');

        const username = request.body.username;
        const password = request.body.password;
        log.debug('Username = ' + username);

        let newUser = {
            username: username,
            originalUsername: username,
            password: bcrypt.hashSync(password, 16)
        };

        userHelper.insertNewUser(newUser)
        .then(function(userSaved){
            log.info('User ' + username + ' registered!');

            if(userSaved.password){
                userSaved.password = undefined;
            }
            
            log.info('Creating token for new user ' + username + '...');
            let userInfoWithToken = createJWTToken(userSaved);
            
            log.info('Token for ' + username + ' created!');

            log.info('userController --> insertNewUser ended.');
            response.status(200).send(userInfoWithToken);
            return;
        })
        .catch(function(error){
            log.error('FAT_021 - Fatal error on user ' + username + ' registration.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_021', 'FATAL --> Fatal error on user ' + username + ' registration. Check immediately console and logs.'));
            log.info('userController --> insertNewUser ended.');
            return;
        });
    }

    function updateUser(request, response){
        log.info('userController --> updateUser start.');

        const username = request.params.username;
        log.debug('Updating user ' + username + '.');

        userHelper.updateUser(username, null, request.body)
        .then(function(userUpdated){
            if(userUpdated.nModified > 0){
                log.info('User ' + username + ' updated!');
                log.info('userController --> updateUser ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + username + ' updated correctly!'));
                return;
            }
            else{
                log.warn('WARN_032 - User ' + username + ' not updated; this can be occurred when user not exists, or nothing new was updated.');
                log.info('userController --> updateUser ended.');
                response.status(404).send(new responseMessage('WARN_031','WARN --> User ' + username + ' not updated; this can be occurred when user not exists, or nothing new was updated.'));
                return;
            }            
        })
        .catch(function(error){
            log.error('FAT_024 - Fatal error on updating user ' + username + '.');
            log.error(error);
            log.info('userController --> updateUser ended.');
            response.status(500).send(new responseMessage('FAT_024', 'FATAL --> Fatal error on updating user ' + username + '. Check immediately console and logs.'));
            return;
        }); 
    }

    function deleteUser(request, response){
        log.info('userController --> deleteUser start.');

        const username = request.params.username;
        log.info('Deleting user: ' + username);

        userHelper.deleteUser(username)
        .then(function(userDeleted){
            if(userDeleted.deletedCount > 0){
                log.info('User ' + username + ' deleted correctly!');
                log.info('userController --> deleteUser ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + username + ' deleted correctly!'));
                return;
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not found!');
                log.info('userController --> deleteUser ended.');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User ' + username + ' not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_026 - Fatal error on deleting user ' + username + '.');
            log.error(error);
            log.info('userController --> deleteUser ended.');
            response.status(500).send(new responseMessage('FAT_026', 'FATAL --> Fatal error on deleting user ' + username + '. Check immediately console and logs.'));
            return;
        });
    }

    /*
        TODO SONO QUI, DEVO FARE I TEST. NON funziona unset.

        TODO NICEHAVE: Se si chiamano due servizi uno interno all'altro, il cui risultato dipende dall'altro, e se succede che uno va in errore 
        e l'altro resta aggiornato, bisognerebbe trovare il modo di rollbackare il tutto.

        TODO: vedere se il manager +1 funziona. Visto, sembra non funzionare, ma forse per colpa del bug di sopra. Vedere quando si risolve altro bug.
    */

    function setUserTeam(request, response){
        log.info('userController --> setUserTeam start.');

        const userId = request.body.userId;
        const username = request.body.username;
        const teamId = request.body.teamId;
        const teamName = request.body.teamName;
        const body = {team: teamId};
        log.debug('User ID = ' + userId);
        log.debug('Username = ' + username);
        log.debug('Team ID = ' + teamId);
        log.debug('Team name = ' + teamName);

        // Here we are updating first user profile with team ID.
        userHelper.updateUser(username, null, body)
        .then(function(userUpdated){
            if(userUpdated.nModified > 0){
                log.info('Team with ID = ' + teamId + ' correctly assigned to ' + username + '!');
                
                // After user update, we have to update the team info with user ID.
                // We are restoring all current information to default value, but we will increase total manager with +1.
                const body = {
                    managerUser: userId,
                    currentScoredGoals: 0,
                    currentConcededGoals: 0,
                    currentWonMatches: 0,
                    currentLossesMatches: 0,
                    currentDrawMatches: 0,
                    currentTotalMatches: 0,
                    currentYellowCards: 0,
                    currentRedCards: 0,
                    totalManager: +1
                };

                log.info('Starting updating team\'s manager id...');
                
                teamHelper.updateteam(teamName, null, body)
                .then(function(teamUpdated){
                    if(teamUpdated.nModified > 0){
                        log.info('Team ' + teamName + ' updated with new user manager!');
                        log.debug(teamUpdated);
                        log.info('userController --> setUserTeam ended.');
                        response.status(200).send(new responseMessage('INFO', 'INFO --> Team with ID = ' + teamId + ' correctly assigned to ' + username + '!'));
                        return;
                    }
                    else{
                        log.warn('WARN_043 - ' + username + '\'s team not updated; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated. This is very strange, because user is updated a little while ago, check immediatly probably for probably errors.');
                        log.info('userController --> setUserTeam ended.');
                        response.status(404).send(new responseMessage('WARN_043','WARN --> ' + username + '\'s team not updated; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated. This is very strange, because user is updated a little while ago, check immediatly for probably errors.'));
                        return;
                    }
                })
                .catch(function(error){
                    log.error('FAT_056 --> Fatal error on updating team with new info.');
                    log.error(error);
                    log.info('userController --> setUserTeam ended.');
                    response.status(500).send(new responseMessage('FAT_056', 'FATAL --> Fatal error on updating team with new info. Check immediately console and logs.'));
                    return;
                });
            }
            else{
                log.warn('WARN_039 - Team with ID = ' + teamId + ' not assigned to ' + username + '; this can be occurred when user or team not exists, or nothing new was updated.');
                log.info('userController --> setUserTeam ended.');
                response.status(404).send(new responseMessage('WARN_039','WARN --> Team with ID = ' + teamId + ' not assigned to ' + username + '; this can be occurred when user or team not exists, or nothing new was updated.'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_044 --> Fatal error on adding team with ID = ' + teamId + ' to user ' + username + '.');
            log.error(error);
            log.info('userController --> setUserTeam ended.');
            response.status(500).send(new responseMessage('FAT_044', 'FATAL --> Fatal error on adding team with ID = ' + teamId + ' to user ' + username + '. Check immediately console and logs.'));
            return;
        });
    }

    function unsetUserTeam(request, response){
        log.info('userController --> unsetUserTeam start.');

        const userId = request.body.userId;
        const username = request.body.username;
        const teamId = request.body.teamId;
        const teamName = request.body.teamName;
        const body = {team: null}
        log.debug('User ID = ' + userId);
        log.debug('Username = ' + username);
        log.debug('Team ID = ' + teamId);
        log.debug('Team name = ' + teamName);

        userHelper.updateUser(username, '$unset', body)
        .then(function(userUpdated){
            if(userUpdated.nModified > 0){
                log.info(username + '\'s team correctly unset from user model!');

                // After user update, we have to update the team info with user ID.
                // We are restoring all current information to default value.
                const body = {
                    currentScoredGoals: 0,
                    currentConcededGoals: 0,
                    currentWonMatches: 0,
                    currentLossesMatches: 0,
                    currentDrawMatches: 0,
                    currentTotalMatches: 0,
                    currentYellowCards: 0,
                    currentRedCards: 0
                };

                log.info('Starting remove user with ID = ' + userId + ' from ' + teamName + '\'s team...');

                teamHelper.updateteam(teamName, '$unset', body)
                .then(teamUpdated => {
                    if(teamUpdated.nModified > 0){
                        log.info('User with ID = ' + userId + ' deleted from ' + teamName + ' team!');
                        log.debug(teamUpdated);
                        log.info('userController --> unsetUserTeam ended.');
                        response.status(200).send(new responseMessage('INFO', 'INFO --> ' + username + '\'s team correctly unset!'));
                        return;
                    }
                    else{
                        log.warn('WARN_042 - ' + username + '\'s team not unsetted; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated.');
                        log.info('userController --> setUserTeam ended.');
                        response.status(404).send(new responseMessage('WARN_042','WARN --> ' + username + '\s team not unsetted; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated.'));
                        return;
                    }
                })
                .catch(error => {
                    log.error('FAT_057 --> Fatal error on updating team ' + teamName + ' for unset manager with ID = ' + userId + '.');
                    log.error(error);
                    log.info('userController --> unsetUserTeam ended.');
                    response.status(500).send(new responseMessage('FAT_057', 'FATAL --> Fatal error on updating team ' + teamName + ' for unset manager with ID = ' + userId + '. Check immediately console and logs.'));
                    return;
                });                
            }
            else{
                log.warn('WARN_042 - ' + username + '\'s team not unsetted; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated.');
                log.info('userController --> unsetUserTeam ended.');
                response.status(404).send(new responseMessage('WARN_042','WARN --> ' + username + '\s team not unsetted; this can be occurred when user cannot have assigned team, user or team not exists, or nothing new was updated.'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_044 --> Fatal error on unsetting ' + username + '\'s team.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_044', 'FATAL --> Fatal error on unsetting ' + username + '\s team. Check immediately console and logs.'));
            return;
        });
    }

    function login(request, response){
        log.info('userController --> login start.');

        const username = request.body.username;
        const password = request.body.password;

        userHelper.getUserWithPasswordByUsername(username)
        .then(function(user){
            if(user !== null){
                log.info('User ' + user.username + ' found!');

                if(bcrypt.compareSync(password, user.password)){
                    log.info('Password is correct!');

                    if(user.password){
                        user.password = undefined;
                    }

                    let userInfoWithToken = createJWTToken(user);
                    log.info('Token and information created!');

                    response.status(200).send(userInfoWithToken);
                    log.info('userController --> login ended.');
                    return;
                }
                else{
                    log.error('ERR_036 - Password is incorrect. Please insert correct password.');
                    response.status(401).send(new responseMessage('ERR_036', 'ERROR --> Password is incorrect. Please insert correct password.'));
                    log.info('userController --> login ended.');
                    return;
                }
            }
            else{
                log.warn('WARN_020 - User ' + username + ' not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User  ' + username + ' not found!'));
                log.info('userController --> login ended.');
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_045 - Fatal error occurred on ' + username + '\'s login.');
            log.error(error);
            response.status(500).send(new responseMessage('FAT_045', 'FATAL --> Fatal error occurred on ' + username + '\'s login. Check immediately console and logs.'));
            return;
        });
    }

    function createJWTToken(userInfo){
        log.info('userController --> createJWTToken start.');

        const payload = {
            sub : userInfo,
            iat : moment().unix(),
            exp : moment().add(1, 'days').unix()
            // exp : moment().add(10, 'seconds').unix()
        };

        log.info('userController --> createJWTToken ended.');
        return {
            token: jwt.encode(payload, process.env.SECRET_JWT_TOKEN),
            userInfo: payload.sub,
            expirationDate: payload.exp
        };
    }
}

module.exports = new userController();