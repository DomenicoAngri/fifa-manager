/*******************************
 * Team middleware
 *******************************/

const teamHelper = require('./team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function teamMiddleware(){
    let teamMiddleware = this;

    teamMiddleware.checkMandatoryFields = checkMandatoryFields;
    teamMiddleware.checkTeamExists = checkTeamExists;
    teamMiddleware.checkTeamNotExists = checkTeamNotExists;

    return teamMiddleware;

    function checkMandatoryFields(request, response, next){
        log.info('teamMiddleware --> checkMandatoryFields start.');

        const teamName = request.body.teamName;
        const originalTeamName = request.body.originalTeamName;
        const whiteSpaceValidation = RegExp('^ *$');
        log.debug('Team name = ' + teamName + '.');

        if(!teamName || whiteSpaceValidation.test(teamName)){
            log.error('ERR_033 --> Team name cannot be empty or null!');
            log.info('teamMiddleware --> checkMandatoryFields ended.');
            response.status(400).send(new responseMessage('ERR_033', 'ERROR --> Team name cannot be empty or null!'));
            return;
        }
        else if(!originalTeamName || whiteSpaceValidation.test(originalTeamName)){
            log.error('ERR_034 --> Original team name cannot be empty or null!');
            log.info('teamMiddleware --> checkMandatoryFields ended.');
            response.status(400).send(new responseMessage('ERR_034', 'ERROR --> Original team name cannot be empty or null!'));
            return;
        }
        else{
            log.info('Team name is valid!');
            log.info('teamMiddleware --> checkMandatoryFields ended.');
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
}

 module.exports = new teamMiddleware();