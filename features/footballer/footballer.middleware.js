/*******************************
 * Footballer middleware
 *******************************/

const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function footballerMiddleware(){
    let footballerMiddleware = this;

    this.checkMandatoryFields = checkMandatoryFields;

    return footballerMiddleware;

    function checkMandatoryFields(request, response, next){
        log.info('footballerMiddleware --> checkMandatoryFields start.');

        const body = request.body;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!body.name || whiteSpaceValidation.test(body.name)){
            log.error('ERR_040 - Footballer name cannot be empty or null!');
            log.info('footballerMiddleware --> checkMandatoryFields ended.');
            response.status(400).send(new responseMessage('ERR_040', 'ERROR --> Footballer name cannot be empty or null!'));
            return;
        }
        else{
            log.info('Footballer name is valid!');
            log.info('footballerMiddleware --> checkMandatoryFields ended.');
            next();
        }
    }
}

module.exports = new footballerMiddleware();