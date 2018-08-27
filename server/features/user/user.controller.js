/*******************************
 * User controllers
 *******************************/

const helper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function userController(){
    let userController = this;

    userController.getUserByUsername = getUserByUsername;
    userController.getAllUsers = getAllUsers;
    userController.insertNewUser = insertNewUser;
    userController.updateUser = updateUser;
    userController.deleteUser = deleteUser;

    return userController;

    function getUserByUsername(request, response){
        helper.getUserByUsername(request.params.username)
        .then(function(user){
            if(user != null){
                log.logSeparator(console.info, 'INFO --> User found!');
                log.logSeparator(console.debug, user);
                response.status(200).send(user);
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_020 --> User not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User not found!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_023 --> Fatal error on getting user from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_023', 'FATAL --> Fatal error on getting user from DB. Check immediately console and logs.'));
        });
    }

    function getAllUsers(request, response){
        helper.getAllUsers()
        .then(function(users){
            log.logSeparator(console.info, 'INFO --> Users found in db: ' + users.length);

            if(users != null && users.length > 0){
                log.logSeparator(console.debug, users);
                response.status(200).send(users);
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_021 --> Users not found!');
                response.status(404).send(new responseMessage('WARN_021','WARN --> Users not found!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_022 --> Fatal error on getting all users from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_022', 'FATAL --> Fatal error on getting all users from DB. Check immediately console and logs.'));
        });
    }

    function insertNewUser(request, response){
        helper.insertNewUser(request.body)
        .then(function(userSaved){
            log.logSeparator(console.info, 'INFO --> User registered!');
            log.logSeparator(console.debug, userSaved);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User saved correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_021 --> Fatal error on user registration.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_021', 'FATAL --> Fatal error on user registration. Check immediately console and logs.'));
        });
    }

    function updateUser(request, response){
        helper.updateUser(request.params.username, request.body)
        .then(function(userUpdated){
            log.logSeparator(console.info, 'INFO --> User updated!');
            log.logSeparator(console.log, userUpdated)
            response.status(200).send(new responseMessage('INFO', 'INFO --> User updated correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_024 --> Fatal error on updating user.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_024', 'FATAL --> Fatal error on updating user. Check immediately console and logs.'));
        });
    }

    function deleteUser(request, response){
        helper.deleteUser(request.params.username)
        .then(function(userDeleted){
            log.logSeparator(console.info, 'INFO --> User deleted correctly!');
            log.logSeparator(console.debug, userDeleted);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User deleted correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_026 --> Fatal error on deleting user.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_026', 'FATAL --> Fatal error on deleting user. Check immediately console and logs.'));
        });
    }

}

module.exports = new userController();