const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Stage = require('./Stage');
const Board = require('./Board');
const Player = require('./Player');
const Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    players: { // array of player id
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['Waiting', 'Playing', 'Finished'],
        default: 'Waiting'
    },
    maxPlayer: {
        type: Number,
        default: 2,
        max: 2,
        min: 2,
        immutable: true
    },
    StageId: {
        type: ObjectId,
        ref: 'Stage'
    }
});

gameRoomSchema.methods.addPlayer = function (playerId) {
    this.players.push(playerId);
    this.save();
}

gameRoomSchema.method.isReady = function () {
    return this.players.length === this.maxPlayer;
}

gameRoomSchema.method.startGame = function () {

    this.status = 'Playing';
    this.save();
}

module.exports = gameRoom = mongoose.model('gameRoom', gameRoomSchema);
