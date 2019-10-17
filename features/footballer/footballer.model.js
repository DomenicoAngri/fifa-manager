/*******************************
 * Footballer model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const footballerSchema = new mongoose.Schema({

    // TODO: ID del giocatore?

    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: false
    },
    surname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    nationality: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: false
    },
    vg: {
        type: Number,
        minlength: 1,
        default: 1,
        unique: false,
        required: true
    },
    marketValue: {
        type: Number,
        minlength: 1,
        default: 1,
        unique: false,
        required: true
    },
    currentTeam: {
        type: [ObjectId],
        ref: 'team',
        required: false
    },
    pastTeams: {
        type: Number,
        minlength: 0,
        default: 0,
        required: true
    },
    scoredGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    yellowCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    redCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentScoredGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentYellowCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentRedCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    position: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: false
    }

    // TODO: create injuries and expulsion models.
});

module.exports = mongoose.model('footballer', footballerSchema);