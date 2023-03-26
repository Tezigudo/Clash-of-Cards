const mongoose = require('mongoose');
const Card = require('./Card');
const Schema = mongoose.Schema;


const DeckSchema = new Schema({
    deck: {
        type: Array,
        default: []
    }
});

DeckSchema.statics.initCard = async function () {

    const SpecialCard = [
        new Card({
            name: "Zero",
            value: 0,
            description: "This card is defense card. It can block any attack."
        }),
        new Card({
            name: "x2",
            value: 11,
            description: "This card can double the value of player ATK."
        }),
        new Card({
            name: "Divide by 2",
            value: 12,
            description: "This card can divide the value of opponent's ATK by 2. "
        }),
        new Card({
            name: "Special Zero",
            value: 13,
            description: "this card will refute opponents zero card if opponent play zero card. but if opponent not play it will cause current player turn ATK to 0."
        })

    ]

    oridinary_card = Array.from({ length: 10 }).map((_, i) => {
        return new Card({
            name: `Card ${i + 1}`,
            value: i + 1,
            description: `This card is a normal card. It has a value of ${i + 1}`
        });
    });

    all_card = oridinary_card.concat(SpecialCard);

    await Promise.all(all_card.map(card => card.save()))
}

DeckSchema.methods.createDeck = async function () {

    //check whether card is already in database or not
    //if not then create card


    if (await Card.countDocuments() == 0) {
        console.log("Card is not in database");
        Deck.initCard();
    }

    // load card from database
    const all_card = await Card.find().exec();
    // create a deck of 20 cards that contain 0-10 and 3 of each special card

    all_card.sort((a, b) => a.value - b.value);

    const specialCardVal = [11, 12, 13];

    for (let i = 0; i < 20; i++) {
        if (i < 10) {
            this.deck.push(all_card[i]);
        } else {
            this.deck.push(all_card[specialCardVal[(i - 10)%3]]);
        }
    }
    this.save()


}

DeckSchema.methods.shuffle = function () {
    // shuffle the deck

    let currentIndex = this.deck.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
    }
    this.save()

    return this.deck;
}

DeckSchema.methods.initDeck = function () {
    // create a deck
    // shuffle the deck
    // return the deck
    this.createDeck()
    this.shuffle();
    return this.deck;
}

DeckSchema.methods.draw = function () {
    // draw a card from the deck
    // return the card
    // if the deck is empty, throw an error
    if (this.deck.length === 0) {
        throw new Error("Deck is empty");
    }
    return this.deck.shift();
}

module.exports = Deck = mongoose.model('deck', DeckSchema);
