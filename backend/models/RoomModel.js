const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
    roomNum: {
        type: String,
        required: [true, "Room number is required"],
        unique:true,
        trim:true,
    },
    roomType: {
        type: String,
        required: [true, "Room type is required"],
        enum:["Single","Double","Shared","Delux"],
    },
    description: {
        type: String,
        required: [true, "Description of room amenities is required"],
    },
    price: {
        type: Number,
        required: [true, "Room price is required"],
    },
    capacity: {
        type: Number,
        required: [true, "Room capacity is required"],
        min: [1, "Capacity must be at least 1"],
    },
    media: {
        type: [String],
        required: [true, "At least one image URL is required"],
        validate: {
            validator: function (arr) {
                return arr.length <= 5
            },
            message: "A maximum of 5 images are allowed"
        }
    },
    status:{
        type:String,
        required:[true,"Status is required"],
        enum:["Alloted","Available"],
        default:"Available",
    }
}, { timestamps: true })

const RoomModel = model("Rooms", RoomSchema)
module.exports = RoomModel