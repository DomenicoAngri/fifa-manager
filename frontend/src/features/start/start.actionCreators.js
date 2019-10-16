import request from 'axios';
import {startActions} from './start.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const startActionCreators = {
    checkLoginStatus
};

function checkLoginStatus(){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());

        const token = localStorage.getItem('token');
        const checkLoginStatusUrl = '/api/user/checkLoginStatus';

        const checkloginStatusBody = {
            token: token
        };  

        request.post(checkLoginStatusUrl, checkloginStatusBody)
        .then(function(userInfo){
            dispatch(startActions.userAuthenticated(userInfo.data));
            dispatch(commonActions.hideSpinner());
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
                dispatch(commonActions.hideSpinner());
            }
            else if(error.response.status === 401){
                dispatch(startActions.userNotAuthenticated(error.response.data.code));
                dispatch(commonActions.hideSpinner());
            }
            else if(error.response.status === 500){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
                dispatch(commonActions.hideSpinner());
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
                dispatch(commonActions.hideSpinner());
            }
        });
    }
}