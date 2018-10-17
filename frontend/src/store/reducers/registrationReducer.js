const initialState = {
    username: '',
    password: '',
    submitted: false,
    error: false,
    isUsernameUsed: false
};

export function registrationReducer(state = initialState, action){
    switch(action.type){
        case 'USERNAME_EXISTS':
            console.log('State reducer --> ' + state);
            return {...state, isUsernameUsed: true};
        case 'USERNAME_NOT_EXISTS':
            console.log('State reducer --> ' + state);
            return {...state, isUsernameUsed: false};
        default:
            console.log('State reducer --> ' + state);
            return state;
    }
}