/*******************************
 * Team helper
 *******************************/

const teamModel = require('./team.model');

function teamHelper(){
    let teamHelper = this;

    teamHelper.getTeamByName = getTeamByName;
    teamHelper.getTeamById = getTeamById;
    teamHelper.getAllTeams = getAllTeams;
    teamHelper.getTeamByUser = getTeamByUser;
    teamHelper.insertNewTeam = insertNewTeam;
    teamHelper.updateteam = updateteam;
    // teamHelper.setUserTeam = setUserTeam;
    teamHelper.deleteTeam = deleteTeam;

    return teamHelper;

    function getTeamByName(teamName){
        return new Promise(function(resolve, reject){
            // This regex transform teamName in lowercase that comes from FE, for match with backend teamName lowercase.
            // new RegExp('^' + teamName + '$', 'i')
            teamModel.findOne({teamName: new RegExp('^' + teamName + '$', 'i')})
            .then(function(team){
                resolve(team);
            })
            .catch(function(error){
                reject(error);
            })
        });
    }

    function getTeamById(teamId){
        return new Promise(function(resolve, reject){
            teamModel.findOne({_id: teamId})
            .then(function(team){
                resolve(team);
            })
            .catch(function(error){
                reject(error);
            })
        });
    }

    function getAllTeams(){
        return new Promise(function(resolve, reject){
            teamModel.find({})
            .then(function(teams){
                resolve(teams);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getTeamByUser(username){
        return new Promise(function(resolve, reject){
            teamModel.findOne({managerUser: username})
            .then(function(team){
                resolve(team);
            })
            .catch(function(error){
                reject(error);
            })
        });
    }

    function insertNewTeam(teamBody){
        return new Promise(function(resolve, reject){
            let team = new teamModel(teamBody);

            team.save()
            .then(function(teamSaved){
                resolve(teamSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function updateteam(teamName, teamBody){
        return new Promise(function(resolve, reject){
            teamModel.updateOne(
                {teamName: new RegExp('^' + teamName + '$', 'i')},
                {$set: teamBody},
                {new: true}
            )
            .then(function(teamUpdated){
                resolve(teamUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function deleteTeam(teamName){
        return new Promise(function(resolve, reject){
            teamModel.deleteOne({teamName: new RegExp('^' + teamName + '$', 'i')})
            .then(function(teamDeleted){
                resolve(teamDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}

module.exports = new teamHelper();