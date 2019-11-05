/*******************************
 * Team model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        lowercase: true,
        unique: true,
        required: true
    },
    originalTeamName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: true,
        required: true
    },
    createdData: {
        type: Date,
        default: Date.now,
        required: true
    },
    managerUser: {
        type: ObjectId,
        ref: 'user',
        unique: true,
        required: false,
        sparse: true
    },
    leagues: {
        type: [ObjectId],
        ref: 'league',
        unique: false,
        required: false
    },
    scoredGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    concededGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    wonMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    lossesMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    drawMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    totalMatches: {
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
    currentConcededGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentWonMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentLossesMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentDrawMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    currentTotalMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    totalManagers:{
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
    }
});

module.exports = mongoose.model('team', teamSchema);