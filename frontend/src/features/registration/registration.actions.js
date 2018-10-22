import {registrationConstants} from './registration.constants';

export const registrationActions = {
    usernameExists,
    usernameNotExists
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