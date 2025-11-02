const Fees = require('../models/FeesModel')

// Get all student fee details
const getAllStudentFees = async(req,res)=>{
    try {
        const getAllFees = await Fees.find()
        if(!getAllFees){
            res.status(404).json({message:"No record found"})
        }
        res.status(200).json({success:true,data:getAllFees})
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal server error ---- ${error.message}` })
    }
}

// Add fee details
const addFeeDetails = async(req,res)=>{
    try {
        const details = req.body
        const feeDetails = new Fees(details)
        await feeDetails.save()
        res.status(200).json({success:true,message:"Fee details added successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal server error ---- ${error.message}` })
    }
}

// Update fee details once the student is allocated a room
const updateFeeDetails = async (req, res) => {
    try {
        const { id } = req.params
        const details = await Fees.findById(id)
        if (!details) {
            res.status(404).json({message: "Student not found" })
        }
        const dueAmount = req.body.dueAmount
        const newDetails = {
            "totalAmount": req.body.totalAmount,
            "amountPaid": 0,
        }
        const updatedDetails = await Fees.findByIdAndUpdate(id, { $set: newDetails }, {
            new: true, runValidators: true
        })
        res.status(200).json({ success: true, data: updatedDetails, dueAmount: dueAmount })

    } catch (error) {
        res.status(500).json({ success: false, message: `Internal server error ---- ${error.message}` })
    }
}

// Update fee details once the student deposit fees
const depositFees = async(req,res)=>{
    const {id} = req.params
    const {amount,method,transactionID} = req.body
    
    const feeRecord = await Fees.findById(id)
    if(!feeRecord){
        return res.status(404).json({message:"Fee record not found"})
    }
    if(feeRecord.paymentStatus === 'Paid'){
        return res.status(400).json({message:"Fees already paid"})
    }

    const newAmtPaid = feeRecord.amountPaid + amount
    const dueAmount = Math.max(feeRecord.totalAmount - newAmtPaid,0)
    const newStatus = (dueAmount === 0) ? 'Paid':'Pending'

    const transaction = {
        transactionId: transactionID || `TXN-${Date.now()}`,
        amount,method,
        date:new Date()
    }

    const updateRecord = await Fees.findByIdAndUpdate(id,{
        $set:{
            amountPaid:newAmtPaid,
            paymentStatus:newStatus,
            lastPaymentDate:new Date()
        },
        $push:{paymentHistory:transaction},
    },{new:true,runValidators:true})

    return res.status(200).json({success:true,message:'Payment recorded successfully',data:updateRecord})
}

module.exports = {getAllStudentFees,addFeeDetails,updateFeeDetails,depositFees}