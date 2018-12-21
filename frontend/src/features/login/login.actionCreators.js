import request from 'axios';
import {loginActions} from './login.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const loginActionCreators = {
    login,
    checkLoginStatus,
    resetLoginErrorStates,
    hideModalMessage
};

function login(username, password){
    return (dispatch) => {

        // TODO - mettere indirizzo con il file env.
        const baseUrlConfig = {
            baseURL: 'http://localhost:7100'
        };

        const loginUrl = '/api/user/login';

        const loginBody = {
            username: username,
            password: password
        };

        request.post(loginUrl, loginBody, baseUrlConfig)
        .then(function(userWithToken){
            localStorage.setItem('token', userWithToken.data.token);
            localStorage.setItem('username', userWithToken.data.user.username);
            dispatch(loginActions.userAuthenticated());
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(loginActions.incorrectUserPassword(error.response.data.code));
            }
            else if(error.response.status === 404){
                dispatch(loginActions.userNotFound(error.response.data.code));
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    };
}

function checkLoginStatus(token){
    return (dispatch) => {
        const baseUrlConfig = {
            baseURL: 'http://localhost:7100'
        };

        const checkLoginStatusUrl = '/api/user/checkLoginStatus';

        const loginStatusBody = {
            token: token
        };  

        request.post(checkLoginStatusUrl, loginStatusBody, baseUrlConfig)
        .then(function(result){
            dispatch(loginActions.userAuthenticated());
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(loginActions.userNotAuthenticated(error.response.data.code));
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    };
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