/*******************************
 * User controller
 *******************************/

const helper = require('./user.helper');
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
    userController.login = login;

    return userController;

    function getUserByUsername(request, response){
        log.info('userController --> getUserByUsername start.');

        const username = request.params.username;

        helper.getUserByUsername(username)
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

        helper.getAllUsers()
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

        helper.insertNewUser(newUser)
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

        helper.updateUser(username, request.body)
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

        helper.deleteUser(username)
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

    function setUserTeam(request, response){
        const username = request.params.username;
        const teamId = request.params.teamId;

        helper.setUserTeam(username, teamId)
        .then(function(userUpdated){
            log.logSeparator(console.info, 'INFO --> ' + teamId + ' team correctly added to user ' + username + '!');
            log.logSeparator(console.debug, userUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> ' + teamId + ' team correctly added to user ' + username + '!'));
            return;
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_044 --> Fatal error on adding ' + teamId + ' team to user ' + username + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_044', 'FATAL --> Fatal error on adding ' + teamId + ' team to user ' + username + '. Check immediately console and logs.'));
            return;
        });
    }

    function login(request, response){
        log.info('userController --> login start.');

        const username = request.body.username;
        const password = request.body.password;

        helper.getUserWithPasswordByUsername(username)
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