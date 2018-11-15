import request from 'axios';
import {registrationActions} from './registration.actions';

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
            password: password,

            // TODO - delete this is admin
            isAdmin: false
        };

        request.post(userRegistrationUrl, userRegistrationBody, baseUrlConfig)
        .then(function(result){
            dispatch(registrationActions.usernameNotExists());
        })
        .catch(function(error){
            // TODO - Capire se mettere messaggio in console.
            // TODO - mettere popup di errore quando ci sono error fatali.

            switch(error.response.status){
                case 409:
                    // Username already exists.
                    dispatch(registrationActions.usernameExists(error.response.data.code));
                    break;

                default:
                    // Null fields, blank fields or Fatal error.
                    dispatch(registrationActions.usernameExists(error.response.data.code));
                    break;
            }
        });



















        

        // const baseUrlConfig = {
        //     baseURL: 'http://localhost:7100'
        // };
        // const checkUsernameUrl = '/api/user/checkUsernameExists/' + username;

        // request.get(checkUsernameUrl, baseUrlConfig)
        // .then(function(response){
        //     if(!response.data.isUsernameUsed){
        //         const userRegistrationUrl = '/api/user';
        //         const userRegistrationBody = {
        //             username: username,
        //             password: password,
        //             // TODO - delete this is admin
        //             isAdmin: false
        //         };

        //         request.post(userRegistrationUrl, userRegistrationBody, baseUrlConfig)
        //         .then(function(result){
        //             dispatch(registrationActions.usernameNotExists());
        //         })
        //         .catch(function(error){
        //             // TODO - capire che fare con errore.
        //             console.log('Response in catch --> ' + error);
        //         });                
        //     }
        //     else{
        //         dispatch(registrationActions.usernameExists());
        //     }
        // })
        // .catch(function(error){
        //     // TODO - capire che fare con errore.
        //     console.log('Response in catch --> ' + error);
        // });
    };
}

function resetUsernameErrorState(){
    return (dispatch) => {
        dispatch(registrationActions.resetUsernameErrorState());
    }
}