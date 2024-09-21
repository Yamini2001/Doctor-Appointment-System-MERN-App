const promisePool = require('../config/db'); // MySQL connection

// Function to get a user by email
const getUserByEmail = async (email) => {
    const [rows] = await promisePool.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows;
};

// Function to create a new user
const createUser = async (name, email, password) => {
    const [result] = await promisePool.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    return result;
};

module.exports = {
    getUserByEmail,
    createUser
};
