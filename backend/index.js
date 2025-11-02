const express = require('express')
require('dotenv').config()
const connectDB = require('./db')
const app = express()
const studentRoute = require('./router/studentRoute')
const roomRoute = require('./router/roomRoute')
const feeRoute = require('./router/feeRoute')
const complaintRoute = require('./router/complaintRoute')
const roomRequestRoute = require('./router/requestRoomRoute')

// Connect to database
connectDB()

app.use(express.json())

// Routes
app.use('/api',studentRoute,roomRoute,feeRoute,complaintRoute,roomRequestRoute)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})