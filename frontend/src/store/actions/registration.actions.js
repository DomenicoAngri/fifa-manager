import {checkUsernameExists} from '../../features/registration/fakeMock';

export const registrationActions = {
    checkUserExists
};

function checkUserExists(username){
    return (dispatch) => {
        if(checkUsernameExists(username)){
            console.log('exists');
            dispatch(usernameExists('username already exists.'));
        }
        else{
            console.log('not exists');
            dispatch(usernameNotExists('username not exists'));
        }
    };

    function usernameExists(result){
        return{
            type: 'USERNAME_EXISTS',
            result
        }
    }

    function usernameNotExists(result){
        return{
            type: 'USERNAME_NOT_EXISTS',
            result
        }
    }
}