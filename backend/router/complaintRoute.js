const express = require('express')
const {getAllComplaints,addComplaint,updateComplaintDetails} = require('../controllers/complaintController')
const router = express.Router()
const app = express()

app.use(express.json())

// Complaints routes
router.get('/getAllComplaints',getAllComplaints)
router.post('/complaints/addComplaint',addComplaint)
router.put('/complaints/editComplaint/:id',updateComplaintDetails)

module.exports = router