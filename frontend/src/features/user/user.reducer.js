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
                name: action.userInfo.name,
                surname: action.userInfo.surname,
                age: action.userInfo.age,
                nationality: action.userInfo.nationality,
                city: action.userInfo.city,
                email: action.userInfo.email,
                telephone: action.userInfo.telephone,
                teamName: action.userInfo.teamName,
                totalMatches: action.userInfo.totalMatches,
                wonMatches: action.userInfo.wonMatches,
                drawMatches: action.userInfo.drawMatches,
                lossesMatch: action.userInfo.lossesMatch,
                scoredGoals: action.userInfo.scoredGoals,
                concededGoals: action.userInfo.concededGoals,
                createdDate: action.userInfo.createdDate,
                totalTournaments: action.userInfo.totalTournaments,
                wonTrophies: action.userInfo.wonTrophies
            });

        default:
            return state;
    }
}