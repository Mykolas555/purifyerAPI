const fs = require('fs')


exports.createPlayer = async (req, res) =>{

    
    try{
        const newPlayer = await Player.create(req.body)
        res.status(201).json({
            status: "created player successfuly",
            message: "New Player is created",
            data: {newPlayer}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.getPlayer = async (req, res)=>{
    try{
        const player = await Player.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {player}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}