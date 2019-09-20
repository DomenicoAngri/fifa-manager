import request from 'axios';
import {registrationActions} from './registration.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import {startActions} from '../start/start.actions';
import getMessage from '../../common/utilities/messages';

export const registrationActionCreators = {
    userRegistration,
    resetUsernameErrorState
};

function userRegistration(username, password){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());

        const userRegistrationUrl = '/api/user';

        const userRegistrationBody = {
            username: username,
            password: password
        };

        request.post(userRegistrationUrl, userRegistrationBody)
        .then(function(userInfoWithToken){
            localStorage.setItem('token', userInfoWithToken.data.token);
            localStorage.setItem('username', userInfoWithToken.data.userInfo.username);

            dispatch(startActions.userAuthenticated(userInfoWithToken));
            dispatch(commonActions.hideSpinner());
        })
        .catch(function(error){
            if(error.response == null){
                // Server not available.
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 409){
                // Username already exists.
                dispatch(commonActions.hideSpinner());
                dispatch(registrationActions.usernameExists(error.response.data.code));
            }
            else{
                dispatch(commonActions.hideSpinner());
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