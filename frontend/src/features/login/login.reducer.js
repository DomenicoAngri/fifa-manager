import {updateObject} from '../../common/utilities/utilities';
import {loginConstants as actionType} from './login.constants';

const initialState = {
    isUserAuthenticated: false,
    userNotFound: false,
    incorrectUserPassword: false,
    modalMessage: false
};

export function loginReducer(state = initialState, action){

    // TODO-FE: fare revisione se tutto corretto e se sono usati tutti gli stati.

    switch(action.type){
        case actionType.USER_AUTHENTICATED:
            return updateObject(state, {
                isUserAuthenticated: true,
                userInfoWithToken: action.userInfoWithToken
            });

        case actionType.USER_NOT_FOUND:
            return updateObject(state, {
                isUserAuthenticated: false,
                loginErrorCode: action.loginErrorCode,
                userNotFound: true
            });

        case actionType.INCORRECT_USER_PASSWORD:
            return updateObject(state, {
                isUserAuthenticated: false,
                loginErrorCode: action.loginErrorCode,
                incorrectUserPassword: true
            });

        case actionType.GENERAL_ERROR:
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