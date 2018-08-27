/*******************************
 * League model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const leagueSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: false,
        required: true
    },
    year: {
        type: Number,
        minlength: 1900,
        maxlength: 2099,
        unique: false,
        required: true
    },
    month: {
        type: Number,
        minlength: 1,
        maxlength: 12,
        unique: false,
        required: true
    },
    current: {
        type: Boolean,
        default: false,
        required: true
    },
    participantTeams: {
        type: ObjectId,
        ref: 'team',
        required: false
    }
    
    // TODO - Type of tournament
    // type: {
    //     // Tipe of tournament
    // }
});

module.exports = mongoose.model('league', leagueSchema);