import {updateObject} from '../../common/utilities/utilities';
import {loginConstants as actionType} from './login.constants';

const initialState = {
    username: '',
    token: ''
};

export function loginReducer(state = initialState, action){

    switch(action.type){
        case actionType.LOGIN:
            return updateObject(state, {
                username: action.username,
                token: action.token
            });

        // case actionType.LOGOUT:
        //     return updateObject(state, {isUsernameUsed: false});

        default:
            return state;
    }

}