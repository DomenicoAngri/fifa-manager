import request from 'axios';
import {userActions} from './user.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const userActionCreators = {
    getUser
};

function getUser(username, token){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());

        const getUserUrl = '/api/user/' + username + '/' + token;

        request.get(getUserUrl)
        .then(function(user){
            dispatch(userActions.getUser(user));
            dispatch(commonActions.hideSpinner());
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
            else if(error.response.status === 404){
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage('ERR_039')));
            }
            else{
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    }
}