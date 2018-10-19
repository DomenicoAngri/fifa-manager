import request from 'axios';
import {registrationActions} from './registration.actions';

export const registrationActionCreators = {
    checkUserExists
};

function checkUserExists(username){
    return (dispatch) => {
        const requestConfig = {
            baseURL: 'http://localhost:7100'
        };

        const url = '/api/user/checkUsernameExists/' + username;

        request.get(url, requestConfig)
        .then(function(response){
            if(response.data.isUsernameUsed){
                dispatch(registrationActions.usernameExists('This username already exists! Please try another.'));
            }
            else{
                dispatch(registrationActions.usernameNotExists('Good, this username is not used!'));
            }
        })
        .catch(function(error){
            // TODO capire che fare con errore.
            console.log('Response in catch --> ' + error);
        });
    };
}