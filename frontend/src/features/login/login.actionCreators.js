import request from 'axios';
import {loginActions} from './login.actions';

export const loginActionCreators = {
    login,
    checkLoginStatus
};

function login(username, password){
    return (dispatch) => {
        const baseUrlConfig = {
            baseURL: 'http://localhost:7100'
        };

        // TODO - Perchè si chiama checkusernameurl?
        const checkUsernameUrl = '/api/user/login';

        const loginBody = {
            username: username,
            password: password
        };

        request.post(checkUsernameUrl, loginBody, baseUrlConfig)
        .then(function(userResult){
            localStorage.setItem('token', userResult.token);
            localStorage.setItem('username', userResult.username);
            dispatch(loginActions.login(userResult));
        })
        .catch(function(error){
            // TODO - capire errore che fare
            console.log('ERRORE nel catch della login..');
            console.log('ERORRE in logignn --> ' + error);
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





