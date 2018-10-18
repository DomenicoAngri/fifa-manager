import request from 'axios';
import {registrationActions} from './registration.actions';





import {checkUsernameExists} from '../../features/registration/fakeMock';

export const registrationActionCreators = {
    checkUserExists
};

function checkUserExists(username){
    return (dispatch) => {

        const url = 'www.google.com';

        const usernameResponse = request.get(url)
            .then(function(response){
                console.log('sono nel then');
            })
            .catch(function(error){
                console.log('Sono nell\'error!');
            });
        
        if(usernameResponse){
            dispatch(registrationActions.usernameExists('This username already exists! Please try another.'));
        }
        else{
            dispatch(registrationActions.usernameNotExists('Good, this username is not used!'));
        }
    };
}