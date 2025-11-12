const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db')
const app = express()
const studentRoute = require('./router/studentRoute')
const roomRoute = require('./router/roomRoute')
const feeRoute = require('./router/feeRoute')
const complaintRoute = require('./router/complaintRoute')
const roomRequestRoute = require('./router/requestRoomRoute')
const messRoute = require('./router/messRoute')

// Connect to database
connectDB()

// Allow frontend origin
app.use(cors({
    origin:'http://localhost:3000', //frontend url
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(express.json())

// Routes
app.use('/api',studentRoute,roomRoute,feeRoute,complaintRoute,roomRequestRoute,messRoute)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})