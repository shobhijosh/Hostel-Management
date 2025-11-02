const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB