const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    player1BoardID: {
        type: ObjectId,
        required: true
    },
    player2BoardID: {
        type: ObjectId,
    },
    currentTurn: {
        type: Number,
        default: 0 // 0 for player1, 1 for player2
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

