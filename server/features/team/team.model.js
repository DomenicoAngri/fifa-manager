/*******************************
 * Team model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const teamSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
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
        // TODO - fare vettore di leagues.
        type: ObjectId,
        ref: 'league',
        unique: false,
        required: false
    },

    // TODO - Players

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
    }

    // TODO - Points - ?
});

module.exports = mongoose.model('team', teamSchema);