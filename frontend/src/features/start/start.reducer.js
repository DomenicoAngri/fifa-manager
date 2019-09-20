import {updateObject} from '../../common/utilities/utilities';
import {startConstants as actionType} from './start.constants';

const initialState = {
    isUserAuthenticated: false,
    isAdmin: false,
    isSuperAdmin: false
};

export function startReducer(state = initialState, action){
    switch(action.type){
        case actionType.USER_AUTHENTICATED:
            return updateObject(state, {
                isUserAuthenticated: true,
                isAdmin: action.isAdmin,
                isSuperAdmin: action.isSuperAdmin
            });

        case actionType.USER_NOT_AUTHENTICATED:
            return updateObject(state, {
                isUserAuthenticated: false
            });

        default:
            return state;
    }
}