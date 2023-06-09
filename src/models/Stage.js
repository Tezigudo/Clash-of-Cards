const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StageSchema = new Schema({
    name: {
        type: String,
        required: true,
        reference: 'gameRoom'
    },
    player1BoardID: {
        type: ObjectId,
        required: true,
        ref: 'board'
    },
    player2BoardID: {
        type: ObjectId,
        required: true,
        ref: 'board'
    },
    currentTurn: {
        type: Number,
        default: 0 // 0 for player1, 1 for player2 2 for calculating
    },
    round: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        enum: ["Playing", "Finished"],
        default: "Playing"
    }
});

module.exports = Stage = mongoose.model('stage', StageSchema);

