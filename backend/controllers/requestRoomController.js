const RoomRequest = require('../models/RoomRequestModel')

// Get all room requests
const getAllRoomRequests = async(req,res)=>{
    try {
        const roomRequests = await RoomRequest.find()
        if(!roomRequests){
            res.status(404).json({message:"No room requests found"})
        }
        res.status(200).json({success:true,data:roomRequests})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error-----${error.message}`})
    }
}

// Add room request
const addRoomRequest = async(req,res)=>{
    try {
        const details = req.body
        const existingRequest = await RoomRequest.findOne({studentID:req.body.studentID})
        if(existingRequest){
            res.status(404).json({message:'Room request exists already'})
        }
        const roomRequests = new RoomRequest(details)
        await roomRequests.save()
        res.status(200).json({success:true,data:roomRequests})

    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error-----${error.message}`})
    }
}

// Delete room request

module.exports = {getAllRoomRequests,addRoomRequest}