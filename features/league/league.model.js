/*******************************
 * League model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const leagueSchema = new mongoose.Schema({

    // TODO: ID della lega?

    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: false,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    current: {
        type: Boolean,
        default: false,
        required: true
    },
    participantTeams: {
        type: [ObjectId],
        ref: 'team',
        required: false
    },
    winningTeam: {
        type: ObjectId,
        ref: 'team',
        required: false
    }
    
    // TODO - Add type of tournament.
    
});

module.exports = mongoose.model('league', leagueSchema);