const {Schema,model} = require('mongoose')

const ComplaintSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'Students',
        required:[true,"Student details are required"]
    },
    subject:{
        type:String,
        required:[true,"Subject is required"],
    },
    description:{
        type:String,
        required:[true,"Detailed description of the issue is required"],
    },
    assignedTo:{
        type:String,
        default:'Unassigned',
    },
    status:{
        type:String,
        required:[true,"Status is required"],
        enum:['New','Resolved','In Progress'],
        default:'New'
    },
    category:{
        type:String,
        enum:['Electrical','Plumbing','Cleanliness','Other'],
        default:'Other'
    }
},{timestamps:true})

const ComplaintModel = model("Complaints",ComplaintSchema)
module.exports = ComplaintModel