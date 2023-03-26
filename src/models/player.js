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
        enum: ['Online', 'Waiting', 'Playing', 'Offline'],
        default: 'Offline'
    },
    room: {
        type: String,
        required: [() => this.status in ['Waiting', 'Playing'], 'Room id is required for player in waiting or playing status'],
        validate: {
            validator: (v) => /^[A-Za-z0-9]{5}$/.test(v)
        },
        message: props => `${props.value} is not a valid room id`
    }
});

PlayerSchema.methods.setStatus = function (status) {
    this.status = status;
    this.save();
}

PlayerSchema.method.setRoom = function (roomId) {
    this.room = roomId;
    this.save();
}


module.exports = Player = mongoose.model('player', PlayerSchema);
