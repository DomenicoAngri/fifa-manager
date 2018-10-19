function responseMessage(code, message){
    const responseJSON = {
        'error': false,
        'code': code,
        'message': message
    };

    return responseJSON;
}

module.exports = responseMessage;