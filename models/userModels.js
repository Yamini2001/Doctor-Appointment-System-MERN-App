// userModel.js
const pool = require('../config/db');

// Get user by email
async function getUserByEmail(email) {
    const query = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows;
}

// Create a new user
async function createUser(name, email, password) {
    const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    await pool.execute(query, [name, email, password]);
}

module.exports = {
    getUserByEmail,
    createUser
};
