/*******************************
 * Match model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const matchSchema = new mongoose.Schema({

    // TODO: ID della partita?
    
    homeTeam: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: true,
        required: true
    },
    awayTeam: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: true,
        required: true
    },
    homeGoals: {
        type: Number,
        default: 0,
        unique: false,
        required: true
    },
    awayGoals: {
        type: Number,
        default: 0,
        unique: false,
        required: true
    },
    matchDate: {
        type: Date,
        required: false
    },
    league: {
        type: ObjectId,
        ref: 'league',
        required: true
    },
    played: {
        type: Boolean,
        default: false,
        required: true
    },
    playerOfTheMatch: {
        type: ObjectId,
        ref: 'footballer',
        required: true
    },
    admonishedPlayers: {
        type: ObjectId,
        ref: 'footballer',
        required: true
    },
    expelledPlayers: {
        type: ObjectId,
        ref: 'footballer',
        required: true
    },
    injuredPlayers: {
        type: ObjectId,
        ref: 'footballer',
        required: true
    }
});

module.exports = mongoose.model('match', matchSchema);