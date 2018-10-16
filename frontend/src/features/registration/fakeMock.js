const FAKE_USERNAME = 'testUser';

export function checkUsernameExists(username){
    if(username == FAKE_USERNAME){
        return true;
    }

    return false;
}