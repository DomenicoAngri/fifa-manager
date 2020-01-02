/*******************************
 * Team middleware
 *******************************/

const teamHelper = require('./team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

const whiteSpaceValidation = RegExp('^ *$');

function teamMiddleware(){
    let teamMiddleware = this;
    
    teamMiddleware.checkTeamNameField = checkTeamNameField;
    teamMiddleware.checkOriginalTeamNameField = checkOriginalTeamNameField;
    teamMiddleware.checkTeamExists = checkTeamExists;
    teamMiddleware.checkTeamIdField = checkTeamIdField;
    teamMiddleware.checkTeamExistsById = checkTeamExistsById;
    teamMiddleware.checkTeamNotExists = checkTeamNotExists;
    teamMiddleware.checkIfTeamIsFree = checkIfTeamIsFree;

    return teamMiddleware;

    function checkTeamNameField(request, response, next){
        log.info('teamMiddleware --> checkTeamName start.');

        const teamName = request.body.teamName;
        log.debug('Team name = ' + teamName);

        if(!teamName || whiteSpaceValidation.test(teamName)){
            log.error('ERR_033 --> Team name cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_033', 'ERROR --> Team name cannot be empty or null!'));
            log.info('teamMiddleware --> checkTeamName ended.');
            return;
        }
        else{
            log.info('Team name is valid!');
            log.info('teamMiddleware --> checkTeamName ended.');
            next();
        }
    }

    function checkOriginalTeamNameField(request, response, next){
        log.info('teamMiddleware --> checkOriginalTeamName start.');

        const originalTeamName = request.body.originalTeamName;
        log.debug('Original team name = ' + originalTeamName);

        if(!originalTeamName || whiteSpaceValidation.test(originalTeamName)){
            log.error('ERR_034 --> Original team name cannot be empty or null!');
            log.info('teamMiddleware --> checkOriginalTeamName ended.');
            response.status(400).send(new responseMessage('ERR_034', 'ERROR --> Original team name cannot be empty or null!'));
            return;
        }
        else{
            log.info('Original team name is valid!');
            log.info('teamMiddleware --> checkOriginalTeamName ended.');
            next();
        }
    }

    function checkTeamExists(request, response, next){
        log.info('teamMiddleware --> checkTeamExists start.');

        const teamName = request.params.teamName != null ? request.params.teamName : request.body.teamName;
        log.debug('Team name = ' + teamName + '.');

        teamHelper.getTeamByName(teamName)
        .then(function(team){
            if(team){
                log.info('Team exists, you can go to next step!');
                log.debug(team);
                log.info('teamMiddleware --> checkTeamExists ended.');
                next();
            }
            else{
                log.warn('WARN_025 --> Team ' + teamName + ' not exists, you cannot go to next step!');
                log.info('teamMiddleware --> checkTeamExists ended.');
                response.status(404).send(new responseMessage('WARN_025', 'WARNING --> Team ' + teamName + ' not exists, you cannot go to next step!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_043 --> Fatal server error on checking team ' + teamName + ' exists.');
            log.error(error);
            log.info('teamMiddleware --> checkTeamExists ended.');
            response.status(500).send(new responseMessage('FAT_043', 'FATAL --> Fatal server error on checking team ' + teamName + ' exists. Check immediately console and logs.'));
            return;
        });
    }

    function checkTeamIdField(request, response, next){
        log.info('teamMiddleware --> checkTeamIdField start.');

        const teamId = request.body.teamId;
        log.debug('Team ID = ' + teamId);
        
        if(!teamId || whiteSpaceValidation.test(teamId)){
            log.error('ERR_043 - Team ID cannot be empty or null!');
            log.info('teamMiddleware --> checkTeamIdField ended.');
            response.status(400).send(new responseMessage('ERR_043', 'ERROR --> Team ID cannot be empty or null!'));
            return;
        }
        else{
            log.info('Team ID is valid!');
            log.info('teamMiddleware --> checkTeamIdField ended.');
            next();
        }
    }

    function checkTeamExistsById(request, response, next){
        log.info('teamMiddleware --> checkTeamExistsById start.');

        const teamId = request.params.teamId != null ? request.params.teamId : request.body.teamId;
        log.debug('Team ID = ' + teamId + '.');

        teamHelper.getTeamById(teamId)
        .then(function(team){
            if(team){
                log.info('Team exists, you can go to next step!');
                log.debug(team);
                log.info('teamMiddleware --> checkTeamExistsById ended.');
                next();
            }
            else{
                log.warn('WARN_040 --> Team with ID = ' + teamId + ' not exists, you cannot go to next step!');
                log.info('teamMiddleware --> checkTeamExistsById ended.');
                response.status(404).send(new responseMessage('WARN_040', 'WARNING --> Team with ID = ' + teamId + ' not exists, you cannot go to next step!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_047 --> Fatal server error on checking team with ID = ' + teamId + ' exists.');
            log.error(error);
            log.info('teamMiddleware --> checkTeamExistsById ended.');
            response.status(500).send(new responseMessage('FAT_047', 'FATAL --> Fatal server error on checking team with ID = ' + teamId + ' exists. Check immediately console and logs.'));
            return;
        });
    }

    function checkTeamNotExists(request, response, next){
        log.info('teamMiddleware --> checkTeamNotExists start.');

        const teamName = request.params.teamName != null ? request.params.teamName : request.body.teamName;
        log.debug('Team name = ' + teamName + '.');

        teamHelper.getTeamByName(teamName)
        .then(function(team){
            if(team == null){
                log.info('Team not exists, you can go to next step!')
                log.info('teamMiddleware --> checkTeamNotExists ended.');
                next();
            }
            else{
                log.warn('WARN_026 --> Team ' + teamName + ' already exists, you cannot go to next step!');
                log.debug(team);
                log.info('teamMiddleware --> checkTeamNotExists ended.');
                response.status(409).send(new responseMessage('WARN_026', 'WARN --> Team ' + teamName + ' already exists, you cannot go to next step!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_036 --> Fatal error on checking team ' + teamName + ' not exists.');
            log.error(error);
            log.info('teamMiddleware --> checkTeamNotExists ended.');
            response.status(500).send(new responseMessage('FAT_036', 'FATAL --> Fatal error on checking team ' + teamName + ' not exists. Check immediately console and logs.'));
        });
    }

    function checkIfTeamIsFree(request, response, next){
        log.info('userMiddleware --> checkIfTeamIsFree start.');

        const teamId = request.params.teamId != null ? request.params.teamId : request.body.teamId;
        log.debug('Team id = ' + teamId);

        teamHelper.getTeamById(teamId)
        .then(function(team){
            if(team){
                log.info('Team with id = ' + teamId + ' found!');
                log.debug(team);

                if(!team.managerUser){
                    log.info('Manager is not assigned to this club, you can continue with next step!');
                    log.info('userMiddleware --> checkIfTeamIsFree ended.');
                    next();
                }
                else{
                    log.warn('WARN_041 - Manager is already assigned to club with id ' + teamId + ', you cannot continue with next step!');
                    log.info('userMiddleware --> checkIfTeamIsFree ended.');
                    response.status(409).send(new responseMessage('WARN_041', 'Manager is already assigned to club with id ' + teamId + ', you cannot continue with next step!'));
                    return;
                }
            }
            else{
                log.warn('WARN_040 --> Team with ID = ' + teamId + ' not exists, you cannot go to next step!');
                log.info('teamMiddleware --> checkIfTeamIsFree ended.');
                response.status(404).send(new responseMessage('WARN_040', 'WARNING --> Team with ID = ' + teamId + ' not exists, you cannot go to next step!'));
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_055 --> Fatal error on checking team with ID ' + teamId + ' is free.');
            log.error(error);
            log.info('teamMiddleware --> checkTeamNotExists ended.');
            response.status(500).send(new responseMessage('FAT_055', 'FATAL --> Fatal error on checking team with ID ' + teamId + ' is free. Check immediately console and logs.'));
        });
    }
}

 module.exports = new teamMiddleware();