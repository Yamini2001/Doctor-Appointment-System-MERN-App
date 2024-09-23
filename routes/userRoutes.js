// routes/userRoutes.js
const express = require("express");
const { registerUser, loginUser, getUserData } = require("../controllers/userController");
const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUserData", getUserData);

module.exports = router;
