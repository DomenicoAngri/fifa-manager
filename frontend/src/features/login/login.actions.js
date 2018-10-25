import {loginConstants} from './login.constants';

export const loginActions = {
    login,
    logout
};

function login(user){
    return{
        type: loginConstants.LOGIN,
        user: user
    }
}

function logout(){
    return{
        type: loginConstants.LOGOUT
    }
}