const Stage = require('../models/Stage');




async function createGameroom(req, res){
    const {name} = req.body;
    const {id} = req.payload;

    const stage = new Stage({
        name: name,
        player1BoardID: id
    })

    await stage.save();

    res.json({
        message: `Stage ${name} created successfully`
    })
}