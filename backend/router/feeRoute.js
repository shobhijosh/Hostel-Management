const express = require('express')
const router = express.Router()
const {getAllStudentFees,addFeeDetails,depositFees,updateFeeDetails} = require('../controllers/feeController')
const app = express()

app.use(express.json())

// Fees routes
router.get('/getAllFees',getAllStudentFees)
router.post('/fees/addFeeDetails',addFeeDetails)
router.put('/fees/updateDetails/:id',updateFeeDetails)
router.put('/fees/depositFees/:id',depositFees)

module.exports = router