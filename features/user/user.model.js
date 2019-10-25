/*******************************
 * User model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
    /* Personal information */
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true,
        required: true
    },
    email: {
        type: String,
        maxlength: 320,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required: false,
        sparse: true
    },
    password: {
        type: String,
        maxlength: 128,
        unique: false,
        required: true,
        select: false
    },
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
    city: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: false
    },
    telephoneNumber: {
        type: String,
        minlength: 8,
        maxlength: 16,
        unique: true,
        required: false,
        sparse: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    /* Tournaments information */
    team: {
        type: ObjectId,
        ref: 'team',
        unique: true,
        required: false,
        sparse: true
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
    wonTrophies: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },
    totalTournaments: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: true
    },

    // TODO 
    lastLogin: {
        type: Date,
        required: false
    },

    /* Admin information */
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
        required: true
    }

    // TODOPOST - Add profile trophies.

});

module.exports = mongoose.model('user', userSchema);