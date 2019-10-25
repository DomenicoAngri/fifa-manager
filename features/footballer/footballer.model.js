/*******************************
 * Footballer model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const footballerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: false,
        required: true
    },
    surname: {
        type: String,
        minlength: 2,
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
    overall: {
        type: Number,
        minlength: 1,
        unique: false,
        required: false
    },
    marketValue: {
        type: Number,
        minlength: 1,
        unique: false,
        required: false
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
        required: true
    },
    yellowCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    redCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentScoredGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentYellowCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentRedCards: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    position: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: false,
        required: false
    },
    preferredFoot: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: false,
        required: false
    }

    // TODO: create injuries and expulsion models.
});

module.exports = mongoose.model('footballer', footballerSchema);