import request from 'axios';
import {loginActions} from './login.actions';

export const loginActionCreators = {
    login,
    checkLoginStatus,
    resetLoginErrorStates
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
        .then(function(userInfoWithToken){
            localStorage.setItem('token', userInfoWithToken.data.token);
            localStorage.setItem('username', userInfoWithToken.data.user.username);
            dispatch(loginActions.userAuthenticated());
        })
        .catch(function(error){
            switch(error.response.status){
                case 401:
                    dispatch(loginActions.incorrectUserPassword(error.response.data.code));
                    break;

                case 404:
                    dispatch(loginActions.userNotFound(error.response.data.code));
                    break;

                default:
                    dispatch(loginActions.generalError(error.response.data.code));
                    break;
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
            switch(error.response.status){
                case 401:
                    dispatch(loginActions.userNotAuthenticated(error.response.data.code));
                    break;

                default:
                    dispatch(loginActions.generalError(error.response.data.code));
                    break;
            }
        });
    };
}

function resetLoginErrorStates(){
    return (dispatch) => {
        dispatch(loginActions.resetLoginErrorStates());
    }
}