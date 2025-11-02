const {Schema,model} = require('mongoose')

const FeeSchema = new Schema({
    studentDetails:{
        type:Schema.Types.ObjectId,
        ref:'Students',
        required:[true,"Student ID is required"],
        unique:true,
    },
    roomDetails:{
        type:Schema.Types.ObjectId,
        ref:'Rooms'
    },
    feeType:{
        type:String,
        enum:["Hostel Fees","College fees"],
        default:"Hostel Fees"
    },
    totalAmount:{
        type:Number,
        required:[true,"Total amount is required"],
    },
    amountPaid:{
        type:Number,
        required:[true,"Amount paid is required"],
    },
    // dueAmount:{
    //     type:Number,
    //     required:[true,"Due amount is required"],
    // },
    paymentStatus:{
        type:String,
        required:[true,"Payment status is required"],
        enum:['Pending','Paid'],
        default:'Pending',
    },
    lastPaymentDate:{
        type:Date,
        default:null,
    },
    paymentHistory:{
        type:[
            {
                amount: { type: Number, required: true },
                date: { type: Date, default: Date.now },
                method: { type: String, enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'] },
                transactionId: { type: String }
            }
        ],
        default:[]
    }
},{timestamps:true})

const FeesModel = model("Fees",FeeSchema)
module.exports = FeesModel