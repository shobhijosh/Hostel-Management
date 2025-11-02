const Students = require('../models/StudentModel')

// Get all students
const getAllStudents = async(req,res)=>{
    try {
        const students = await Students.find()
        if(!students || students.length === 0){
            res.status(404).json({message:"No Student found"})
        }
        res.status(200).json({success:true,data:students})
        
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error-----${error.message}`})
    }
}

// Add a student
const addStudent = async(req,res)=>{
    try {
        const details = req.body
        const existingStudent = await Students.findOne({studentID:req.body.studentID})
        if(existingStudent){
            res.status(409).json({message:"Student already exists"})
        }
        const student = new Students(details)
        await student.save()
        res.status(201).json({successs:true,message:"Student added successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error ----- ${error.message}`})
    }
}

// Find a student
const findStudent = async(req,res) =>{
    try {
        if(!req.body.studentID){
            res.status(400).json({message:"Invalid Syntax"})
        }
        const student = await Students.findOne({studentID:req.body.studentID})
        if(!student){
            res.status(404).json({message:"No Student found"})
        }
        res.status(200).json({success:true,data:student})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error ----- ${error.message}`})
    }
}

// Update student details
const updateStudent = async(req,res)=>{
    try {
        const {id} = req.params
        const newDetails = req.body
        // console.log(id,newDetails);
        
        const updatedStudent = await Students.findByIdAndUpdate(id,newDetails,{
            new:true,
            runValidators:true
        })
        if(!updatedStudent){
            res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({success:true,newData:updatedStudent})
    } catch (error) {
        res.status(500).json({success:false,message:`Internal Server Error ----- ${error.message}`})
    }
}

module.exports = {getAllStudents,addStudent,findStudent,updateStudent}