const userModel = require('../models/userModels'); // Import user model for MySQL queries
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken');

// Register Controller
const registerController = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists in the database
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(409).send({ message: 'User Already Exists', success: false }); // Use 409 Conflict for existing user
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database
        await userModel.createUser(name, email, hashedPassword);
        res.status(201).send({ message: 'Registered Successfully', success: true });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
    }
};

// Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await userModel.getUserByEmail(email);
        if (user.length === 0) {
            return res.status(400).send({ message: 'User not found', success: false });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials', success: false });
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        // If login successful, return success response (JWT can be added here)
        res.status(200).send({ message: 'Login successful', success: true,token});
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ success: false, message: `Login Controller Error: ${error.message}` });
    }
};

module.exports = { registerController, loginController };
