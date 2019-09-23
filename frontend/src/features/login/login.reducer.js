import {updateObject} from '../../common/utilities/utilities';
import {loginConstants as actionType} from './login.constants';

const initialState = {
    userNotFound: false,
    incorrectUserPassword: false,
    loginErrorCode: ''
};

export function loginReducer(state = initialState, action){
    switch(action.type){
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

        case actionType.SHOW_MODAL_MESSAGE:
            return updateObject(state, {
                isUserAuthenticated: false,
                loginErrorCode: action.loginErrorCode,
                showModalMessage: true
            });

        case actionType.HIDE_MODAL_MESSAGE:
            return updateObject(state, {
                showModalMessage: false
            });

        case actionType.RESET_LOGIN_ERROR_STATES:
            return updateObject(state, {
                userNotFound: false,
                incorrectUserPassword: false,
                loginErrorCode: '',
                showModalMessage: false
            });

        default:
            return state;
    }
}