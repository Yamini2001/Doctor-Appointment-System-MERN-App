const express = require('express')
const {loginController,registerController } = require('../controllers/useController');

//router object
const router = express.Router()


//routes
//LOGIN || POST
router.post('/login',loginController)

//Register || POST
router.post('/register',registerController)
module.exports = router;