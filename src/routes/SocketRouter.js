const express = require('express');
const deck = require('../models/Deck');

const GameRouter = require('./Game');


function SocketRouter(io) {
    const router = express.Router();



    router.use('/game', GameRouter(io));

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
        deck1 = new deck();

        await deck1.initDeck();

        res.header("Access-Control-Allow-Origin", "*");

        res.json(deck1).status(200);
    })
    return router;
}


module.exports = SocketRouter;
