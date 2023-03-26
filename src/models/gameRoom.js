const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        immutable: true,
        unique: true
    },
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

gameRoomSchema.method.setStatus = function (status) {
    this.status = status;
    this.save();
}

// gameRoomSchema.method.startGame = function () {

//     this.status = 'Playing';
//     this.save();
// }

// gameRoomSchema.method.finishGame = function () {
//     this.status = 'Finished';
//     this.save();
// }

gameRoom = mongoose.model('gameRoom', gameRoomSchema);
module.exports = gameRoom;
