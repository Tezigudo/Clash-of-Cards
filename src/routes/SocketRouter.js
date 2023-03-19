const express = require('express');
const deck = require('../models/Deck');



function SocketRouter(io) {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send("eieiei");
    });


    router.get('/test', (req, res) => {
        const q = req.query.q;
        if (!q) {
            res.json({ "message": "No query" }).status(401);
        }

        io.emit("testQ", q);
        res.json({ "message": `Sent ${q}` }).status(200);
    });

    router.get('/test2', async (req, res) => {
        console.log("test2")
        deck1 = new deck();

        await deck1.initDeck();

        console.log(deck1.deck);

        res.header("Access-Control-Allow-Origin", "*");

        res.json(deck1).status(200);
    })
    return router;
}

module.exports = SocketRouter;
