const express = require('express');



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
    return router;
}

module.exports = SocketRouter;
