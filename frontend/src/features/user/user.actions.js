import {userConstants} from './user.constants';

export const userActions = {
    getUser
};

function getUser(user){
    return{
        type: userConstants.GET_USER,
        userInfo: user
    }
}