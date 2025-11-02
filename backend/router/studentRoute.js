const express = require('express')
const router = express.Router()
const {getAllStudents,addStudent,findStudent,updateStudent} = require('../controllers/studentController')
const app = express()

app.use(express.json())

// Students route
router.get('/getAllStudents',getAllStudents)
router.post('/addStudent',addStudent)
router.get('/findStudent',findStudent)
router.put('/students/:id',updateStudent)

module.exports = router