/*******************************
 * User helper
 *******************************/

const userModel = require('./user.model');

function userHelper(){
    let userHelper = this;

    userHelper.getUserByUsername = getUserByUsername;
    userHelper.getAllUsers = getAllUsers;
    userHelper.insertNewUser = insertNewUser;
    userHelper.updateUser = updateUser;
    userHelper.deleteUser = deleteUser;

    return userHelper;

    function getUserByUsername(username){
        return new Promise(function(resolve, reject){
            userModel.findOne({username: username})
            .then(function(user){
                resolve(user);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getAllUsers(){
        return new Promise(function(resolve, reject){
            userModel.find({})
            .then(function(users){
                resolve(users);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function insertNewUser(userBody){
        return new Promise(function(resolve, reject){
            let user = new userModel();

            user.username = userBody.username;
            user.email = userBody.email;
            user.password = userBody.password;
            user.name = userBody.name;
            user.surname = userBody.surname;
            user.telephoneNumber = userBody.telephoneNumber;
            user.team = userBody.team;

            user.save()
            .then(function(userSaved){
                resolve(userSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function updateUser(username, userBody){
        return new Promise(function(resolve, reject){
            userModel.updateOne(
                {username: username},
                {$set: userBody},
                {new: true}
            )
            .then(function(userUpdated){
                resolve(userUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function deleteUser(username){
        return new Promise(function(resolve, reject){
            userModel.deleteOne({username: username})
            .then(function(userDeleted){
                resolve(userDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

}

module.exports = new userHelper();