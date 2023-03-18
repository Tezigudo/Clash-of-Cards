const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
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
    }
});

module.exports = Player = mongoose.model('player', PlayerSchema);
