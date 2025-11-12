const Complaints = require('../models/ComplaintModel')

// Get all complaints
const getAllComplaints = async(req,res)=>{
    try {
        const complaints = await Complaints.find()
        if(!complaints){
            res.status(404).json({success:false,message:"Complaints not found"})
        }
        res.status(200).json({success:true,data:complaints})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error-----${error.message}`})
    }
}

// Add complaint
const addComplaint = async(req,res)=>{
    const details = req.body
    const existingComplaint = await Complaints.findById(details.student)
    if(existingComplaint){
        res.status(409).json({success:false,message:"Complaint already exists"})
    }
    else{
        const newComplaint = new Complaints(details)
        await newComplaint.save()
        res.status(200).json({success:true,message:"Complaint added successfully"})
    }
}

// Update complaint details
const updateComplaintDetails = async(req,res)=>{
    try {
        const {id} = req.params
        const {assignedTo,status} = req.body
        const newDetails = {assignedTo,status}
        const complaintDetails = await Complaints.findById(id)
        if(!complaintDetails){
            res.status(404).json({success:false,message:"No such complaint found"})
        }
        const updatedDetails = await Complaints.findByIdAndUpdate(id,{$set:newDetails},{new:true,runValidators:true})
        res.status(200).json({success:true,data:updatedDetails})

    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error-----${error.message}`})
    }
}

module.exports = {getAllComplaints,addComplaint,updateComplaintDetails}