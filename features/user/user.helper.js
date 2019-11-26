/*******************************
 * User helper
 *******************************/

const userModel = require('./user.model');

function userHelper(){
    let userHelper = this;

    userHelper.getUserByUsername = getUserByUsername;
    userHelper.getUserWithPasswordByUsername = getUserWithPasswordByUsername;
    userHelper.getAllUsers = getAllUsers;
    userHelper.insertNewUser = insertNewUser;
    userHelper.updateUser = updateUser;
    userHelper.deleteUser = deleteUser;

    return userHelper;

    function getUserByUsername(username){
        return new Promise(function(resolve, reject){
            userModel.findOne({username: new RegExp('^' + username + '$', 'i')})
            .populate('team')
            .then(function(user){
                resolve(user);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getUserWithPasswordByUsername(username){
        return new Promise(function(resolve, reject){
            // This regex transform username in lowercase that comes from FE, for match with backend username lowercase.
            // new RegExp('^' + username + '$', 'i')
            userModel.findOne({username: new RegExp('^' + username + '$', 'i')})
            .select('+password')
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
            .populate('team')
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
            let user = new userModel(userBody);

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
                {username: new RegExp('^' + username + '$', 'i')},
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
            userModel.deleteOne({username: new RegExp('^' + username + '$', 'i')})
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