/*******************************
 * Users controllers
 *******************************/

const helper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');

function userController(){
    let userController = this;

    userController.getUser = getUser;
    userController.getAllUsers = getAllUsers;
    userController.insertNewUser = insertNewUser;
    userController.updateUser = updateUser;
    userController.deleteUser = deleteUser;

    return userController;

    function getUser(request, response){
        helper.getUser(request.params.username)
        .then(function(user){
            if(user != null){
                console.info('INFO --> User found!');
                console.debug(user);
                response.status(200).send(user);
            }
            else{
                console.warn('WARN - WARN_020 --> User not found!');
                response.status(404).send(new responseMessage('WARN_020','WARN --> User not found!'));
            }
        })
        .catch(function(error){
            console.error('FATAL - FAT_023 --> Fatal error on getting user from DB.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_023', 'FATAL --> Fatal error on getting user from DB. Check immediately console and logs.'));
        });
    }

    function getAllUsers(request, response){
        helper.getAllUsers()
        .then(function(users){
            console.info('INFO --> Users found in db: ' + users.length);

            if(users != null && users.length > 0){
                console.debug(users);
                response.status(200).send(users);
            }
            else{
                console.warn('WARN - WARN_021 --> Users not found!');
                response.status(404).send(new responseMessage('WARN_021','WARN --> Users not found!'));
            }
        })
        .catch(function(error){
            console.error('FATAL - FAT_022 --> Fatal error on getting all users from DB.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_022', 'FATAL --> Fatal error on getting all users from DB. Check immediately console and logs.'));
        });
    }

    function insertNewUser(request, response){
        helper.insertNewUser(request.body)
        .then(function(userSaved){
            console.info('INFO --> User registered!');
            console.debug(userSaved);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User saved correctly!'));
        })
        .catch(function(error){
            console.error('FATAL - FAT_021 --> Fatal error on user registration.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_021', 'FATAL --> Fatal error on user registration. Check immediately console and logs.'));
        });
    }

    function updateUser(request, response){
        helper.updateUser(request.params.username, request.body)
        .then(function(userUpdated){
            console.info('INFO --> User updated!');
            console.log(userUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User updated correctly!'));
        })
        .catch(function(error){
            console.error('FATAL - FAT_024 --> Fatal error on updating user.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_024', 'FATAL --> Fatal error on updating user. Check immediately console and logs.'));
        });
    }

    function deleteUser(request, response){
        helper.deleteUser(request.params.username)
        .then(function(userDeleted){
            console.info('INFO --> User deleted correctly!');
            console.log(userDeleted);
            response.status(200).send(new responseMessage('INFO', 'INFO --> User deleted correctly!'));
        })
        .catch(function(error){
            console.error('FATAL - FAT_026 --> Fatal error on deleting user.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_026', 'FATAL --> Fatal error on deleting user. Check immediately console and logs.'));
        });
    }

}

module.exports = new userController();