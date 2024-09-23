// models/usermodel.js
const prisma = require("../config/db");
const bcrypt = require("bcryptjs");

// Create a new user (register)
const createUser = async (name, email, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Save hashed password
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user. Email may already exist.");
  }
};

// Find a user by email (for login)
const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Unable to find user by email.");
  }
};

// Validate password
const validatePassword = async (enteredPassword, storedPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(enteredPassword, storedPassword);
    return isPasswordValid;
  } catch (error) {
    console.error("Error validating password:", error);
    throw new Error("Password validation failed.");
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  validatePassword,
};
