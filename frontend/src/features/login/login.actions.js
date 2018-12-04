import {loginConstants} from './login.constants';

export const loginActions = {
    login,
    userAuthenticated,
    userNotAuthenticated,
    userNotFound,
    incorrectPassword,
    backendCredentialNull,
    logout
};

function login(user){
    return{
        type: loginConstants.LOGIN,
        user: user
    }
}

function userAuthenticated(){
    return{
        type: loginConstants.USER_AUTHENTICATED
    }
}

function userNotAuthenticated(){
    return{
        type: loginConstants.USER_NOT_AUTHENTICATED
    }
}

function userNotFound(loginErrorCode){
    return{
        type: loginConstants.USER_NOT_FOUND,
        loginErrorCode: loginErrorCode
    }
}

function incorrectPassword(loginErrorCode){
    return{
        type: loginConstants.INCORRECT_USER_PASSWORD,
        loginErrorCode: loginErrorCode
    }
}

function backendCredentialNull(loginErrorCode){
    return{
        type: loginConstants.BACKEND_CREDENTIAL_NULL,
        loginErrorCode: loginErrorCode
    }
}

function logout(){
    return{
        type: loginConstants.LOGOUT
    }
}