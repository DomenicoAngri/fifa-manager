import {commonConstants} from './common.actions.constants';

export const commonActions = {
    showModalMessage,
    hideModalMessage
};

function showModalMessage(messageBody){
    return{
        type: commonConstants.SHOW_MODAL_MESSAGE,
        messageBody: messageBody
    }
}

function hideModalMessage(){
    return{
        type: commonConstants.HIDE_MODAL_MESSAGE
    }
}