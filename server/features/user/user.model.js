/*******************************
 * User model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        maxlength: 320,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required: false
    },
    password: {
        type: String,
        maxlength: 128,
        unique: false,
        required: true
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
    telephoneNumber: {
        type: String,
        minlength: 8,
        maxlength: 16,
        unique: true,
        required: false
    },
    team: {
        type: ObjectId,
        ref: 'team',
        unique: true,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }

    // TODOPOST - Add profile trophies.

});

module.exports = mongoose.model('user', userSchema);