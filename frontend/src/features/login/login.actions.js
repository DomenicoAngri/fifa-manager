import {loginConstants} from './login.constants';

export const loginActions = {
    userNotFound,
    incorrectUserPassword,
    showModalMessage,
    resetLoginErrorStates,
    hideModalMessage
};

function userNotFound(loginErrorCode){
    return{
        type: loginConstants.USER_NOT_FOUND,
        loginErrorCode: loginErrorCode
    }
}

function incorrectUserPassword(loginErrorCode){
    return{
        type: loginConstants.INCORRECT_USER_PASSWORD,
        loginErrorCode: loginErrorCode
    }
}

function showModalMessage(loginErrorCode){
    return{
        type: loginConstants.SHOW_MODAL_MESSAGE,
        loginErrorCode: loginErrorCode
    }
}

function hideModalMessage(){
    return{
        type: loginConstants.HIDE_MODAL_MESSAGE
    }
}

function resetLoginErrorStates(){
    return{
        type: loginConstants.RESET_LOGIN_ERROR_STATES
    }
}