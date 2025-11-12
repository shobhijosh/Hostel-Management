const Students = require('../models/StudentModel')

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Students.find()
        if (!students || students.length === 0) {
            return res.status(404).json({ success: false, message: "No Student found" })
        }
        return res.status(200).json({ success: true, data: students })

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error-----${error.message}` })
    }
}

// Add a student
const addStudent = async (req, res) => {
    try {
        const details = req.body
        const existingStudent = await Students.findOne({ studentID: req.body.studentID })
        if (existingStudent) {
            return res.status(409).json({ success: false, message: "Student already exists" })
        }
        else if (details.roomNo !== '') {
            const roomAllocated = await Students.findOne({ roomNo: details.roomNo })
            if (roomAllocated) return res.status(409).json({ success: false, message: "Room is already allocated to another student" })
        }
        const student = new Students(details)
        await student.save()

        const allStudents = await Students.find()
        return res.status(201).json({ success: true, message: "Student added successfully", data: allStudents })
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error ----- ${error.message}` })
    }
}

// Find a student
// const findStudent = async(req,res) =>{
//     try {
//         const {id} = req.params
//         const student = await Students.findById(id)
//         if(!student){
//             return res.status(404).json({message:"No Student found"})
//         }
//         res.status(200).json({success:true,data:student})
//     } catch (error) {
//         res.status(500).json({success:false,message:`Internal Server Error ----- ${error.message}`})
//     }
// }

// Get student object id by room number
const getStudentByRoomNum = async (req, res) => {
    try {
        const { roomNum } = req.params
        const student = await Students.findOne({ roomNo: roomNum })
        if (!student) {
            return res.status(404).json({ success: false, message: "No student found" })
        }
        return res.status(200).json({ success: true, id: student._id })
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error ----- ${error.message}` })
    }
}

// Update student details
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const newDetails = req.body

        if (newDetails.roomNo !== '') {
            const roomAlloted = await Students.findOne({ roomNo: newDetails.roomNo })
            if (roomAlloted) return res.status(409).json({ success: false, message: "Room is already allocated to Student" })
        }
    
        const updatedStudent = await Students.findByIdAndUpdate(id, newDetails, {
            new: true,
            runValidators: true
        })
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }
        const allStudents = await Students.find()
        return res.status(200).json({ success: true, message: "Student Record edited successfully", newData: updatedStudent, data: allStudents })

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error ----- ${error.message}` })
    }
}

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await Students.findByIdAndDelete(id)
        if (!student) {
            return res.status(404).json({ success: false, message: "Student record not found" })
        }
        const allStudents = await Students.find()
        return res.status(200).json({ success: true, message: "Student record deleted successfully", data: allStudents })
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error ----- ${error.message}` })
    }
}

module.exports = { getAllStudents, getStudentByRoomNum, addStudent, updateStudent, deleteStudent }