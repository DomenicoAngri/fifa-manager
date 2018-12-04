import {updateObject} from '../../common/utilities/utilities';
import {loginConstants as actionType} from './login.constants';

const initialState = {
    username: '',
    token: '',
    isUserAuthenticated: false,
    userNotFound: false,
    incorrectPassword: false,
    modalMessage: false
};

export function loginReducer(state = initialState, action){

    // TODO-FE: fare revisione se tutto corretto e se sono usati tutti gli stati.

    switch(action.type){
        case actionType.LOGIN:
            return updateObject(state, {
                isUserAuthenticated: true,
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

        case actionType.USER_NOT_FOUND:
            return updateObject(state, {
                isUserAuthenticated: false,
                userNotFound: false
            });

        case actionType.INCORRECT_USER_PASSWORD:
            return updateObject(state, {
                isUserAuthenticated: false,
                incorrectPassword: true
            });

        case actionType.BACKEND_CREDENTIAL_NULL:
            return updateObject(state, {
                isUserAuthenticated: false,
                loginErrorCode: action.loginErrorCode,
                modalMessage: true
            });


        // case actionType.LOGOUT:
        //     return updateObject(state, {isUsernameUsed: false});

        default:
            return state;
    }

}