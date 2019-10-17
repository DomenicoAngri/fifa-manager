/*******************************
 * Turn model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const turnSchema = new mongoose.Schema({
    turnNumber: {
        type: Number,
        minlength: 1,
        default: 1,
        unique: true,
        required: true
    },
    turnDate: {
        type: Date,
        required: false
    },
    matches: {
        type: [ObjectId],
        ref: 'match',
        required: true
    }
});

module.exports = mongoose.model('turn', turnSchema);