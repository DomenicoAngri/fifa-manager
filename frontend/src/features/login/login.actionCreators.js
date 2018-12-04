import request from 'axios';
import {loginActions} from './login.actions';

export const loginActionCreators = {
    login,
    checkLoginStatus
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
            localStorage.setItem('token', userInfoWithToken.token);
            localStorage.setItem('username', userInfoWithToken.user.username);
            dispatch(loginActions.login(userInfoWithToken));
        })
        .catch(function(error){
            switch(error.response.status){
                case 400:
                    dispatch(loginActions.backendCredentialNull(error.response.data.code));
                    break;

                case 401:
                    dispatch(loginActions.incorrectPassword(error.response.data.code));
                    break;

                case 404:
                    dispatch(loginActions.userNotFound(error.response.data.code));
                    break;

                    // TODO - I'm here, sto finendo di scrivere gli errori provenienti dal BE e poi devo farli vedere a FE.

                default:
                    // Internal server error, check why
                    break;
            }

            // 400 error, username or password blank

            // status 200 tutt appost

            // 401 password incorrect

            // 404 user not found

            // 500 internal server erro

        });
    };
}

function checkLoginStatus(){
    return (dispatch) => {
        const baseUrlConfig = {
            baseURL: 'http://localhost:7100'
        };

        const checkLoginStatusUrl = '/api/user/checkLoginStatus';

        request.get(checkLoginStatusUrl, baseUrlConfig)
        .then(function(result){
            dispatch(loginActions.userAuthenticated());
        })
        .catch(function(error){
            // TODO - loggare qualcosa?
            dispatch(loginActions.userNotAuthenticated());
        });
    };
}





