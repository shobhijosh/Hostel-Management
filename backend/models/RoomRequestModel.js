const {Schema,model} = require('mongoose')

const RoomRequestSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'Students',
        required:[true,"Student details is required"],
    },
    status:{
        type:String,
        enum:['Approved','Rejected','Pending'],
        default:'Pending'
    },
    requestedRoom:{
        type:Schema.Types.ObjectId,
        ref:'Rooms'
    }
},{timestamps:true})

const RoomRequestModel = model('RoomRequests',RoomRequestSchema)
module.exports = RoomRequestModel