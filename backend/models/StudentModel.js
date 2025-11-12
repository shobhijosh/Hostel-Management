const {Schema,model} = require('mongoose')

const StudentSchema = new Schema({
    fullName:{
        type:String,
        required:[true,"Full Name is required"],
        minLength:[1,"Full Name cannot be empty"]
    },
    studentID:{
        type:String,
        required:[true,"Student ID is required"],
        unique:true,
    },
    course:{
        type:String,
        required:[true,"Course is required"],
    },
    contactNum:{
        type:Number,
        required:[true,"Contact number is required"],
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v)
            },
            message: "Contact number must be exactly 10 digits"
        },
    },
    roomNo:{
        type:String,
        default:'None',
    },
    roomType:{
        type:String,
        default:'None',
    },
},{timestamps:true})

const StudentModel = model("Students",StudentSchema)
module.exports = StudentModel