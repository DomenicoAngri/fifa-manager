const initialState = {
    username: '',
    password: '',
    submitted: false,
    error: false
};

export function registrationReducer(state = initialState, action){
    switch(action.type){
        case 'USERNAME_EXISTS':
            return {registering: false};
        case 'USERNAME_NOT_EXISTS':
            return {registering: true};
        default:
            return state;
    }
}