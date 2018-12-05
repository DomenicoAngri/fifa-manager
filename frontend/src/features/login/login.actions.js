import {loginConstants} from './login.constants';

export const loginActions = {
    userAuthenticated,
    incorrectUserPassword,
    userNotFound,
    generalError
    // logout
};

function userAuthenticated(userInfoWithToken){
    return{
        type: loginConstants.USER_AUTHENTICATED,
        userInfoWithToken: userInfoWithToken
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

// function logout(){
//     return{
//         type: loginConstants.LOGOUT
//     }
// }