import {commonActions} from './common.actions.actions';

export const commonActionCreators = {
    showModalMessage,
    hideModalMessage
};

function showModalMessage(messageBody){
    return (dispatch) => {
        dispatch(commonActions.showModalMessage(messageBody));
    }
}

function hideModalMessage(){
    return (dispatch) => {
        dispatch(commonActions.hideModalMessage());
    }
}