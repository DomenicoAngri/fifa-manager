import {registrationConstants} from './registration.constants';

export const registrationActions = {
    usernameExists,
    usernameNotExists
};

function usernameExists(result){
    return{
        type: registrationConstants.USERNAME_EXISTS,
        result
    }
}

function usernameNotExists(result){
    return{
        type: registrationConstants.USERNAME_NOT_EXISTS,
        result
    }
}