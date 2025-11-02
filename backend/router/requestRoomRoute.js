const express = require('express')
const {getAllRoomRequests,addRoomRequest} = require('../controllers//requestRoomController')
const router = express.Router()
const app = express()

// Room Request routes
router.get('/getAllRoomRequests',getAllRoomRequests)
router.post('/roomRequest/addRoomRequest',addRoomRequest)

module.exports = router