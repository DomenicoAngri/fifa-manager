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

        // TODO - Perchè si chiama checkusernameurl?
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
                    // Username and password are blank in the backend, check why.
                    break;

                case 401:
                    // Password is incorrect.
                    break;

                case 404:
                    // User not found.
                    break;

                case 500:
                    // Internal server error, check why
                    break;

                default: ?
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





