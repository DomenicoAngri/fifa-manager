import {registrationConstants} from './registration.constants';

export const registrationActions = {
    usernameExists,
    usernameNotExists,
    resetUsernameErrorState
};

function usernameExists(){
    return{
        type: registrationConstants.USERNAME_EXISTS
    }
}

function usernameNotExists(){
    return{
        type: registrationConstants.USERNAME_NOT_EXISTS
    }
}

function resetUsernameErrorState(){
    return{
        type: registrationConstants.RESET_USERNAME_ERROR_STATE
    }
}