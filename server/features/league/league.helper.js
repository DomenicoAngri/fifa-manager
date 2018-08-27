/*******************************
 * User helper
 *******************************/

 const leagueModel = require('./league.model');

 function leagueHelper(){
     let leagueHelper = this;

     leagueHelper.getCurrentLeagues = getCurrentLeagues;
     leagueHelper.getLeague = getLeague;
     leagueHelper.getAllLeagues = getAllLeagues;
     leagueHelper.insertNewLeague = insertNewLeague;
     leagueHelper.updateLeague = updateLeague;
     leagueHelper.setCurrentLeague = setCurrentLeague;
     leagueHelper.deleteLeague = deleteLeague;

     return leagueHelper;

     function getCurrentLeagues(){
         return new Promise(function(resolve, reject){
             leagueModel.find({current: true})
             .then(function(currentLeagues){
                 resolve(currentLeagues);
             })
             .catch(function(error){
                 reject(error);
             });
         });
     }

     function setCurrentLeague(id){
         return new Promise(function(resolve, reject){
             leagueModel.updateOne(
                 {_id: id},
                 {current: true},
                 {new: true}
             )
             .then(function(leagueModelUpdated){
                 resolve(leagueModelUpdated);
             })
            .catch(function(error){
                reject(error);
            });
         });
     }

     function getLeague(id){
         return new Promise(function(resolve, reject){
             leagueModel.findOne({_id: id})
             .then(function(league){
                 resolve(league);
             })
             .catch(function(error){
                 reject(error);
             })
         });
     }

     function getAllLeagues(){
        return new Promise(function(resolve, reject){
            leagueModel.find({})
            .then(function(leagues){
                resolve(leagues);
            })
            .catch(function(error){
                reject(error);
            });
        });

     }

     function insertNewLeague(leagueBody){
         return new Promise(function(resolve, reject){
             let league = new leagueModel();

             // TODO - Vedere se i campi sono nulli prima di salvarli.

             league._id = leagueBody._id;
             league.name = leagueBody.name;
             league.year = leagueBody.year;
             league.month = leagueBody.month;
             league.current = leagueBody.current;
             league.participantTeams = league.participantTeams;

             // TODO - Insert type of tournament (?)

             league.save()
             .then(function(leagueSaved){
                 resolve(leagueSaved);
             })
             .catch(function(error){
                 reject(error);
             });
         });
     }

     function updateLeague(id, leagueBody){
        return new Promise(function(resolve, reject){
            leagueModel.updateOne(
                {_id: id},
                {$set: leagueBody},
                {new: true}
            )
            .then(function(leagueModelUpdated){
                resolve(leagueModelUpdated);
            })
           .catch(function(error){
               reject(error);
           });
        });
     }

     function deleteLeague(id){
        return new Promise(function(resolve, reject){
            userModel.deleteOne({_id: id})
            .then(function(leagueDeleted){
                resolve(leagueDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
     }

 }

 module.exports = new leagueModel();