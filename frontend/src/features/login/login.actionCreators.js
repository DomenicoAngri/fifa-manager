import request from 'axios';
import {loginActions} from './login.actions';
import {startActions} from '../start/start.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const loginActionCreators = {
    login,
    resetLoginErrorStates,
    hideModalMessage
};

function login(username, password){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());

        const loginUrl = '/api/user/login';

        const loginBody = {
            username: username,
            password: password
        };

        request.post(loginUrl, loginBody)
        .then(function(userInfoWithToken){
            localStorage.setItem('token', userInfoWithToken.data.token);
            localStorage.setItem('username', userInfoWithToken.data.userInfo.originalUsername);

            dispatch(startActions.userAuthenticated(userInfoWithToken));
            dispatch(commonActions.hideSpinner());
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(commonActions.hideSpinner());
                dispatch(loginActions.incorrectUserPassword(error.response.data.code));
            }
            else if(error.response.status === 404){
                dispatch(commonActions.hideSpinner());
                dispatch(loginActions.userNotFound(error.response.data.code));
            }
            else{
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    }
}

function resetLoginErrorStates(){
    return (dispatch) => {
        dispatch(loginActions.resetLoginErrorStates());
    }
}

function hideModalMessage(){
    return (dispatch) => {
        dispatch(commonActions.hideModalMessage());
    }
}