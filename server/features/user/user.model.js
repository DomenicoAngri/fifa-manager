const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: true,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 320,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        unique: false,
        required: true
    },
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
        required: true
    },
    telephoneNumber: {
        type: String,
        minlength: 8,
        maxlength: 16,
        unique: true,
        required: true
    },
    stickers: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('users', userSchema);