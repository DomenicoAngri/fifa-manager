import {updateObject} from '../../common/utilities/utilities';
import {loginConstants as actionType} from './login.constants';

const initialState = {
    username: '',
    token: '',
    isUserAuthenticated: false
};

export function loginReducer(state = initialState, action){

    switch(action.type){
        case actionType.LOGIN:
            return updateObject(state, {
                username: action.username,
                token: action.token
            });

        case actionType.USER_AUTHENTICATED:
            return updateObject(state, {
                isUserAuthenticated: true
            });

        case actionType.USER_NOT_AUTHENTICATED:
            return updateObject(state, {
                isUserAuthenticated: false
            });

        // case actionType.LOGOUT:
        //     return updateObject(state, {isUsernameUsed: false});

        default:
            return state;
    }

}