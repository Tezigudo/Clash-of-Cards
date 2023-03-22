const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    playerID: {
        type: ObjectId,
        required: true
    },
    hp: {
        type: Number,
        default: 30 // setdefault hp to 30
    },
    hand: {
        type: Array, // array of card id or array of card object
        default: []
    },
    deck: {
        type: ObjectId, // ID of deck
        required: true
    },
    cardOnBoard: {
        type: Array, // array of card id or array of card object
        default: [] // maximum is 2 cards
    }
});

module.exports = Board = mongoose.model('player', BoardSchema);
