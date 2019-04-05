import {updateObject} from '../../common/utilities/utilities';
import {userConstants as actionType} from './user.constants';

const initialState = {
    name: '',
    surname: '',
    age: '',
    nationality: '',
    city: '',
    email: '',
    telephone: '',
    teamName: '',
    totalMatches: 0,
    wonMatches: 0,
    drawMatches: 0,
    lossesMatch: 0,
    scoredGoals: 0,
    concededGoals: 0,
    createdDate: '',
    totalTournaments: 0,
    wonTrophies: 0
};

export function userReducer(state = initialState, action){
    switch(action.type){
        case actionType.GET_USER:
            return updateObject(state, {
                name: action.userInfo.data.name,
                surname: action.userInfo.data.surname,
                age: action.userInfo.data.age,
                nationality: action.userInfo.data.nationality,
                city: action.userInfo.data.city,
                mail: action.userInfo.data.mail,
                telephone: action.userInfo.data.telephone,
                teamName: action.userInfo.data.teamName,
                totalMatches: action.userInfo.data.totalMatches,
                wonMatches: action.userInfo.data.wonMatches,
                drawMatches: action.userInfo.data.drawMatches,
                lossesMatch: action.userInfo.data.lossesMatches,
                scoredGoals: action.userInfo.data.scoredGoals,
                concededGoals: action.userInfo.data.concededGoals,
                createdDate: action.userInfo.data.createdDate,
                totalTournaments: action.userInfo.data.totalTournaments,
                wonTrophies: action.userInfo.data.wonTrophies
            });

        default:
            return state;
    }
}