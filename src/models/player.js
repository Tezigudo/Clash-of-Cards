const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true

    },
    winCount: {
        type: Number,
        default: 0
    },
    matchHistory: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['Online', 'waiting', 'Playing', 'Offline'],
        default: 'Offline'
    }
});

PlayerSchema.methods.setStatus = function (status) {
    this.status = status;
    this.save();
}


module.exports = Player = mongoose.model('player', PlayerSchema);
