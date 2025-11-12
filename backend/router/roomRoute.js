const express = require('express')
const router = express.Router()
const {getAllRooms,addRoom,editRoom,findRoomAvailability,getAvailableRooms,deleteRoom} = require('../controllers/roomController')
const app = express()

app.use(express.json())

// Room Routes
router.get('/getAllRooms',getAllRooms)
router.get('/getAllAvailableRooms',getAvailableRooms)
router.post('/rooms/addRoom',addRoom)
router.put('/rooms/editRoom/:id',editRoom)
router.post('/findRoomAvailability',findRoomAvailability)
router.delete('/rooms/deleteRoom/:roomNum',deleteRoom)

module.exports = router