import {loginConstants} from './login.constants';

export const loginActions = {
    login,
    userAuthenticated,
    userNotAuthenticated,
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

function logout(){
    return{
        type: loginConstants.LOGOUT
    }
}