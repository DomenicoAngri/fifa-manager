import {startConstants} from './start.constants';

export const startActions = {
    userAuthenticated,
    userNotAuthenticated
};

function userAuthenticated(userInfo){
    return{
        type: startConstants.USER_AUTHENTICATED,
        userInfo: userInfo
    }
}

function userNotAuthenticated(loginErrorCode){
    return{
        type: startConstants.USER_NOT_AUTHENTICATED,
        loginErrorCode: loginErrorCode
    }
}