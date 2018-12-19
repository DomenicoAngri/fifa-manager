import {updateObject} from '../../common/utilities/utilities';
import {commonConstants as actionType} from './common.actions.constants';

const initialState = {
    showModalMessage: false,
    messageBody: ''
};

export function commonReducer(state = initialState, action){
    switch(action.type){
        case actionType.SHOW_MODAL_MESSAGE:
            return updateObject(state, {
                showModalMessage: true,
                messageBody: action.messageBody
            });

        case actionType.HIDE_MODAL_MESSAGE:
            return updateObject(state, {
                showModalMessage: false
            });

        default:
            return state;
    }
}