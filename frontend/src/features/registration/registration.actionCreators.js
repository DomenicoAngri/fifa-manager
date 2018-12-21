import request from 'axios';
import {registrationActions} from './registration.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const registrationActionCreators = {
    userRegistration,
    resetUsernameErrorState
};

function userRegistration(username, password){
    return (dispatch) => {
        const baseUrlConfig = {
            baseURL: 'http://localhost:7100'
        };

        const userRegistrationUrl = '/api/user';

        const userRegistrationBody = {
            username: username,
            password: password
        };

        request.post(userRegistrationUrl, userRegistrationBody, baseUrlConfig)
        .then(function(result){
            dispatch(registrationActions.usernameNotExists());
        })
        .catch(function(error){
            // TODO - Capire se mettere messaggio in console.

            if(error.response == null){
                // Server not available.
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 409){
                // Username already exists.
                dispatch(registrationActions.usernameExists(error.response.data.code));
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });        
    };
}

function resetUsernameErrorState(){
    return (dispatch) => {
        dispatch(registrationActions.resetUsernameErrorState());
    }
}