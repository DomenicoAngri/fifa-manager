import {updateObject} from '../../common/utilities/utilities';
import {registrationConstants as actionType} from './registration.constants';

const initialState = {
    isUsernameUsed: false
};

export function registrationReducer(state = initialState, action){

    switch(action.type){
        case actionType.USERNAME_EXISTS:
            return updateObject(state, {isUsernameUsed: true});

        case actionType.USERNAME_NOT_EXISTS:
            return updateObject(state, {isUsernameUsed: false});

        case actionType.RESET_USERNAME_ERROR_STATE:
            return updateObject(state, {isUsernameUsed: false});

        default:
            return state;
    }
    
}