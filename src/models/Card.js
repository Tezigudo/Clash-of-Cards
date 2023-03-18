const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""

    },
    matchHistory: {
        type: Array,
        default: []
    }
});

module.exports = Card = mongoose.model('card', CardSchema);