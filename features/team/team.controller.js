/*******************************
 * Team controller
 *******************************/

const helper = require('./team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function teamController(){
    let teamController = this;

    teamController.getTeamByName = getTeamByName;
    teamController.getAllTeams = getAllTeams;
    teamController.getTeamByUser = getTeamByUser;
    teamController.insertNewTeam = insertNewTeam;
    teamController.updateTeam = updateTeam;
    // teamController.setUserTeam = setUserTeam;
    teamController.deleteTeam = deleteTeam;

    return teamController;

    function getTeamByName(request, response){
        log.info('teamController --> getTeamByName start.');

        const teamName = request.params.teamName;
        log.info('Getting ' + teamName + ' info from DB...');

        helper.getTeamByName(teamName)
        .then(function(team){
            if(team){
                log.info('Team ' + teamName + ' found!');
                log.debug(team);
                log.info('teamController --> getTeamByName ended.');
                response.status(200).send(team);
                return;
            }
            else{
                log.warn('WARN_034 - Team ' + teamName + ' not found!');
                log.info('teamController --> getTeamByName ended.');
                response.status(404).send(new responseMessage('WARN_034','WARN --> Team ' + teamName + ' not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_037 --> Fatal error on getting team ' + teamName + ' from DB.');
            log.error(error);
            log.info('teamController --> getTeamByName ended.');
            response.status(500).send(new responseMessage('FAT_037', 'FATAL --> Fatal error on getting team ' + teamName + ' from DB. Check immediately console and logs.'));
            return;
        });
    }

    function getAllTeams(request, response){
        log.info('teamController --> getAllTeams start.');

        helper.getAllTeams()
        .then(function(teams){
            log.info('Teams found: ' + teams.length + '.');

            if(teams && teams.length > 0){
                log.debug(teams);
                log.info('teamController --> getAllTeams ended.');
                response.status(200).send(teams);
                return;
            }
            else{
                log.warn('WARN_035 - No teams found!');
                log.info('teamController --> getAllTeams ended.');
                response.status(404).send(new responseMessage('WARN_035','WARN --> No teams found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_038 --> Fatal error on getting all teams from DB.');
            log.error(error);
            log.info('teamController --> getAllTeams ended.');
            response.status(500).send(new responseMessage('FAT_038', 'FATAL --> Fatal error on getting all teams from DB. Check immediately console and logs.'));
            return;
        });
    }

    function getTeamByUser(request, response){
        log.info('teamController --> getTeamByUser start.');

        const username = request.params.username;
        log.info('Getting ' + username + '\'s team...');

        helper.getTeamByUser(username)
        .then(function(team){
            if(team){
                log.info(username + '\'s team found!');
                log.debug(team);
                log.info('teamController --> getTeamByUser ended.');
                response.status(200).send(team);
                return;
            }
            else{
                log.warn('WARN_036 - ' + username + '\s team not found!');
                log.info('teamController --> getTeamByUser ended.');
                response.status(404).send(new responseMessage('WARN_036','WARN --> ' + username + '\s team not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_039 --> Fatal error on getting ' + username + '\'s team from DB.');
            log.error(error);
            log.info('teamController --> getTeamByUser ended.');
            response.status(500).send(new responseMessage('FAT_039', 'FATAL --> Fatal error on getting ' + username + '\'s team from DB. Check immediately console and logs.'));
            return;
        });
    }

    function insertNewTeam(request, response){
        log.info('teamController --> insertNewTeam start.');

        const teamName = request.body.teamName;
        log.debug('Inserting ' + teamName + ' team into DB...');

        helper.insertNewTeam(request.body)
        .then(function(teamSaved){
            log.info('Team ' + teamName + ' registered!');
            log.debug(teamSaved);
            log.info('teamController --> insertNewTeam ended.');
            response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + teamName + ' saved correctly!'));
            return;
        })
        .catch(function(error){
            log.error('FAT_040 --> Fatal error on saving team ' + teamName + ' on DB.');
            log.error(error);
            log.info('teamController --> insertNewTeam ended.');
            response.status(500).send(new responseMessage('FAT_040', 'FATAL --> Fatal error on saving team ' + teamName + ' on DB. Check immediately console and logs.'));
            return;
        });
    }

    function updateTeam(request, response){
        log.info('teamController --> updateTeam start.');

        const teamName = request.params.teamName;
        log.debug('Updating ' + teamName + '\s team...');

        helper.updateteam(teamName, request.body)
        .then(function(teamUpdated){
            if(teamUpdated.nModified > 0){
                log.info('Team ' + teamName + ' updated!');
                log.info('teamController --> updateTeam ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + teamName + ' updated correctly!'));
                return;
            }
            else{
                log.warn('WARN_037 - Team ' + teamName + ' not updated; this can be occurred when team not exists, or nothing new was updated.');
                log.info('teamController --> updateTeam ended.');
                response.status(404).send(new responseMessage('WARN_037', 'WARN --> Team ' + teamName + ' not updated; this can be occurred when footballer not exists, or nothing new was updated.'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_041 - Fatal error on updating team ' + teamName + '.');
            log.error(error);
            log.info('teamController --> updateTeam ended.');
            response.status(500).send(new responseMessage('FAT_041', 'Fatal error on updating team ' + teamName + '. Check immediately console and logs.'));
            return;
        });
    }

    // function setUserTeam(request, response){
    // }

    function deleteTeam(request, response){
        log.info('teamController --> deleteTeam start.');

        const teamName = request.params.teamName;
        log.info('Deleting ' + teamName + ' team...');

        helper.deleteTeam(teamName)
        .then(function(teamDeleted){
            if(teamDeleted.deletedCount > 0){
                log.info('Team' + teamName + ' deleted correctly!');
                log.info('teamController --> deleteTeam ended.');
                response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + teamName + ' deleted correctly!'));
                return;
            }
            else{
                log.warn('WARN_038 - Team ' + teamName + ', not found!');
                log.info('teamController --> deleteTeam ended.');
                response.status(404).send(new responseMessage('WARN_038', 'WARN --> Team ' + teamName + ', not found!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_042 - Fatal error on deleting team ' + teamName + 'from DB.');
            log.error(error);
            log.info('teamController --> deleteTeam ended.');
            response.status(500).send(new responseMessage('FAT_042', 'Fatal error on deleting team ' + teamName + ' from DB. Check immediately console and logs.'));
            return;
        });
    }
}

module.exports = new teamController();