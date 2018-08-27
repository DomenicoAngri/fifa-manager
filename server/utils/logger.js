function logger(){
    let logger = this;

    logger.logSeparator = logSeparator;

    // TODO - Capire come effettuare polimorfismo qualora si possa fare.
    // function logSeparator(){
    //     console.log('--------------------------------------------------');
    // }

    function logSeparator(logger, message){
        logger('--------------------------------------------------');
        logger(message);
    }
    
}

module.exports = new logger();