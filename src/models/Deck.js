const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    card: {
        type: Array,
        default: []
    }
});

// DeckSchema.methods.addCard = function (card) {
//     this.card.push(card);
//     return this.save();
// }

module.exports = Deck = mongoose.model('deck', DeckSchema);
