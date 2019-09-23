import request from 'axios';
import {startActions} from './start.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';

export const startActionCreators = {
    checkLoginStatus
};

function checkLoginStatus(){
    return (dispatch) => {
        const token = localStorage.getItem('token');

        const checkLoginStatusUrl = '/api/user/checkLoginStatus';

        const checkloginStatusBody = {
            token: token
        };  

        request.post(checkLoginStatusUrl, checkloginStatusBody)
        .then(function(userInfo){
            dispatch(startActions.userAuthenticated(userInfo.data));
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(startActions.userNotAuthenticated(error.response.data.code));
            }
            else if(error.response.status === 500){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    }
}