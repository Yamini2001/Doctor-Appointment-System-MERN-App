const express = require('express')
const {loginController,registerController} = require('../controllers/useController');
const authMiddleware = require('../middlewares/authMiddleware');
const { authController } = require('../controllers/userController');


//router object
const router = express.Router()


//routes
//LOGIN || POST
router.post('/login',loginController);

//Register || POST
router.post('/register',registerController);
//Auth || POST
router.post('/getUserData',authMiddleware,authController);
module.exports = router;