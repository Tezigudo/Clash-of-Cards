const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchHistirySchema = new Schema({
    player1: {
        type: ObjectId,
        required: true
    },

    player2: {
        type: ObjectId,
        required: true
    },
    winner: {
        type: ObjectId,
        required: true
    },

    timeStamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = MatchHistory = mongoose.model('matchHistory', MatchHistirySchema);