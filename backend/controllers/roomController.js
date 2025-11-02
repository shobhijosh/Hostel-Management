const Rooms = require('../models/RoomModel')

// Get all rooms
const getAllRooms = async(req,res)=>{
    try {
        const rooms = await Rooms.find()
        if(!rooms || rooms.length === 0){
            res.status(404).json({message:"No room found"})
        }
        res.status(200).json({success:true,data:rooms})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal server error ..... ${error.message}`})
    }
}

// Add a room
const addRoom = async(req,res) =>{
    try {
        const existingRoom = await Rooms.findOne({roomNum:req.body.roomNum})
        if(existingRoom){
            res.status(409).json({message:"Room already exists"})
        }
        const newRoom = new Rooms(req.body)
        await newRoom.save()
        res.status(201).json({success:true,message:'Room added successfully'})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal server error ..... ${error.message}`})
    }
}

// Edit a room
const editRoom = async(req,res)=>{
    try {
        const {id} = req.params
        const newDetials = req.body

        const updatedRoom = await Rooms.findByIdAndUpdate(id,newDetials,{
            new:true,
            runValidators:true
        })
        if(!updatedRoom){
            res.status(404).json({message:'Room not found'})
        }
        res.status(200).json({success:true,message:'Room details updated successfully'})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal server error ..... ${error.message}`})
    }
}

// Check for room availability
const findRoomAvailability = async(req,res)=>{
    try {
        if(!req.body.roomNum){
            res.status(400).json({message:"Invalid Syntax"})
        }
        const room = await Rooms.findOne({roomNum:req.body.roomNum})
        if(!room){
            res.status(404).json({message:'Room not found'})
        }
        res.status(200).json({success:true,status:room.status})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal server error ..... ${error.message}`})
    }
}

module.exports = {getAllRooms,addRoom,editRoom,findRoomAvailability}