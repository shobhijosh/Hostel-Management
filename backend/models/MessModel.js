const {Schema,model} = require('mongoose')

const MessSchema = new Schema({
    day:{
        type:String,
        require:[true,"Day is required"],
    },
    breakfast:{
        type:String,
    },
    lunch:{type:String},
    dinner:{type:String},
})

const MessModel = model('menuItem',MessSchema)
module.exports = MessModel