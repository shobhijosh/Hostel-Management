const Mess = require('../models/MessModel')

// Get all the mess items
const getAllItems = async(req,res)=>{
    try {
        const allItems = await Mess.find()
        if(!allItems){
            res.status(404).json({success:false,message:'No items found'})
        }
        res.status(200).json({success:true,data:allItems})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server error --- ${error.message}`})
    }
}

// Add menu items
const addMenuItems = async(req,res)=>{
    try {
        const details = req.body
        const existing = await Mess.findOne({day:details.day})
        if(existing){
            res.status(409).json({success:false,message:"Menu items for this day already exists"})
        }
        else{
            const newItem = new Mess(details)
            await newItem.save()
            res.status(200).json({success:true,message:"Menu item for the day added successfully"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server error --- ${error.message}`})
    }
}

// Update menu items
const updateItems = async(req,res)=>{
    try {
        const {id} = req.params
        const newDetails = req.body
        const updateItem = await Mess.findByIdAndUpdate(id,newDetails,{new:true,runValidators:true})
        if(!updateItem) res.status(404).json({success:false,message:'Record not found'})
        
        const allData = await Mess.find()
        res.status(200).json({success:true,message:"Updated successfully",data:allData})

    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server error --- ${error.message}`})
    }
}

module.exports = {getAllItems,addMenuItems,updateItems}