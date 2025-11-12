const express = require('express')
const router = express.Router()
const {getAllStudents,addStudent,updateStudent,deleteStudent,getStudentByRoomNum} = require('../controllers/studentController')
const app = express()

app.use(express.json())

// Students route
router.get('/getAllStudents',getAllStudents)
// router.get('/findStudent/:id',findStudent)
router.get('/getStudent/:roomNum',getStudentByRoomNum)
router.post('/students/addStudent',addStudent)
router.put('/students/editStudent/:id',updateStudent)
router.delete('/students/deleteStudent/:id',deleteStudent)

module.exports = router