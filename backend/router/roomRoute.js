const express = require('express')
const router = express.Router()
const {getAllRooms,addRoom,editRoom,findRoomAvailability} = require('../controllers/roomController')
const app = express()

app.use(express.json())

// Room Routes
router.get('/getAllRooms',getAllRooms)
router.post('/rooms/addRoom',addRoom)
router.put('/rooms/editRoom/:id',editRoom)
router.get('/findRoomAvailability',findRoomAvailability)

module.exports = router