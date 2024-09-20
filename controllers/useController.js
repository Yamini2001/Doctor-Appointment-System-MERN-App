const userModel = require('../models/userModels'); // Import your user model for MySQL queries
const bcrypt = require('bcryptjs'); // For password hashing

// Register Controller
const registerController = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists in the database
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(200).send({ message: 'User Already Exists', success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        };

        // Save the new user to the database
        await userModel.createUser(newUser.name, newUser.email, newUser.password);
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

        // If login successful, return success response (JWT can be added here)
        res.status(200).send({ message: 'Login successful', success: true });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ success: false, message: `Login Controller Error: ${error.message}` });
    }
};

module.exports = { registerController, loginController };
