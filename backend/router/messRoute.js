const express = require('express')
const router = express.Router()
const {getAllItems,updateItems,addMenuItems} = require('../controllers/messController')
const app = express()

app.use(express.json())

router.get('/menuItems',getAllItems)
router.post('/menuItems/add',addMenuItems)
router.put('/menuItems/edit/:id',updateItems)

module.exports = router