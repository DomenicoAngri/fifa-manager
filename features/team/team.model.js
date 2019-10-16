/*******************************
 * Team model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const teamSchema = new mongoose.Schema({
    name: {
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
        required: false
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
        required: false
    },
    concededGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    wonMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    lossesMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    drawMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    totalMatches: {
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
    currentConcededGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentWonMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentLossesMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentDrawMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    currentTotalMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    totalManagers:{
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
    }
});

module.exports = mongoose.model('team', teamSchema);