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
    // userController.checkIfUsernameIsUsed = checkIfUsernameIsUsed;
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
                response.status(404).send(new responseMessage('WARN_020','WARN --> User  ' + username + ' not found!'));
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

    // Is useful?
    // function checkIfUsernameIsUsed(request, response){
    //     const username = request.params.username;

    //     log.logSeparator(console.info, 'INFO --> Checking username ' + username + ' is used..');
    //     helper.getUserByUsername(username)
    //     .then(function(user){
    //         if(user != null){
    //             log.logSeparator(console.warn, 'WARN - WARN_027 --> User ' + username + ' found!');
    //             log.logSeparator(console.debug, user);
    //             response.status(200).send({isUsernameUsed: true});
    //             return;
    //         }
    //         else{
    //             log.logSeparator(console.info, 'INFO --> Good! Username ' + username + ' is not used!');
    //             response.status(200).send({isUsernameUsed: false});
    //             return;
    //         }
    //     })
    //     .catch(function(error){
    //         log.logSeparator(console.error, 'FATAL - FAT_047 --> Fatal error on checking if username ' + username + ' is used.');
    //         log.logSeparator(console.error, error);
    //         response.status(500).send(new responseMessage('FAT_047', 'FATAL --> Fatal error on checking if username ' + username + ' is used. Check immediately console and logs.'));
    //         return;
    //     });
    // }

    function getAllUsers(request, response){
        helper.getAllUsers()
        .then(function(users){
            log.logSeparator(console.info, 'INFO --> Users found in db: ' + users.length + '.');

            if(users != null && users.length > 0){
                log.logSeparator(console.debug, users);
                response.status(200).send(users);
                return;
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_021 --> No users found!');
                response.status(404).send(new responseMessage('WARN_021','WARN --> No users found!'));
                return;
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_022 --> Fatal error on getting all users from DB.');
            log.logSeparator(console.error, error);
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
            password: bcrypt.hashSync(password, 16)
        };

        helper.insertNewUser(newUser)
        .then(function(userSaved){
            log.info('User ' + username + ' registered!');
            
            log.info('Creating token for new user ' + username + '...');
            const userWithToken = createJWTToken(userSaved.username);
            log.info('Token for ' + username + ' created!');

            log.info('userController --> insertNewUser ended.');
            response.status(200).send(userWithToken);
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
        const username = request.params.username;

        helper.updateUser(username, request.body)
        .then(function(userUpdated){
            log.logSeparator(console.info, 'INFO --> User ' + username + ' updated!');
            log.logSeparator(console.log, userUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + username + ' updated correctly!'));
            return;
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_024 --> Fatal error on updating user ' + username + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_024', 'FATAL --> Fatal error on updating user ' + username + '. Check immediately console and logs.'));
            return;
        }); 
    }

    function deleteUser(request, response){
        const username = request.params.username;

        helper.deleteUser(username)
        .then(function(userDeleted){
            log.logSeparator(console.info, 'INFO --> User ' + username + ' deleted correctly!');
            log.logSeparator(console.debug, userDeleted);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + username + ' deleted correctly!'));
            return;
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_026 --> Fatal error on deleting user ' + username + '.');
            log.logSeparator(console.error, error);
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

                    const userWithToken = createJWTToken(user.username);

                    log.info('Token and information created!');
                    log.debug(userWithToken);

                    response.status(200).send(userWithToken);
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

    function createJWTToken(username){
        log.info('userController --> createJWTToken start.');

        const payload = {
            sub : username,
            iat : moment().unix(),
            exp : moment().add(1, 'days').unix()
            // exp : moment().add(10, 'seconds').unix()
        };

        log.info('userController --> createJWTToken ended.');
        return {
            token: jwt.encode(payload, process.env.SECRET_JWT_TOKEN),
            username: payload.sub,
            expirationDate: payload.exp
        };
    }
}

module.exports = new userController();