import {loginConstants} from './login.constants';

export const loginActions = {
    userAuthenticated,
    userNotAuthenticated,
    incorrectUserPassword,
    userNotFound,
    generalError,
    resetLoginErrorStates
    // logout
};

function userAuthenticated(){
    return{
        type: loginConstants.USER_AUTHENTICATED
    }
}

function userNotAuthenticated(loginErrorCode){
    return{
        type: loginConstants.USER_NOT_AUTHENTICATED,
        loginErrorCode: loginErrorCode
    }
}

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

function generalError(loginErrorCode){
    return{
        type: loginConstants.GENERAL_ERROR,
        loginErrorCode: loginErrorCode
    }
}

function resetLoginErrorStates(){
    return{
        type: loginConstants.RESET_LOGIN_ERROR_STATES
    }
}

// function logout(){
//     return{
//         type: loginConstants.LOGOUT
//     }
// }