function logger(){
    let logger = this;

    logger.logSeparator = logSeparator;
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;

    function logSeparator(logger, message){
        logger('----------------------------------------------------------------------------------------------------');
        logger(message);
    }

    function debug(message){
        console.debug('----------------------------------------------------------------------------------------------------');
        console.debug('DEBUG --> ' + message);
    }

    function info(message){
        console.info('----------------------------------------------------------------------------------------------------');
        console.info('INFO --> ' + message);
    }

    function warn(message){
        console.warn('----------------------------------------------------------------------------------------------------');
        console.warn('WARN --> ' + message);
    }

    function error(message){
        console.error('----------------------------------------------------------------------------------------------------');
        console.error('ERROR --> ' + message);
    }
}

module.exports = new logger();