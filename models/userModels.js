// Import the database connection
const db = require('../config/db');

// User Model: Defines SQL queries and functions for interacting with the users table
const UserModel = {
  
  // Create a new user
  createUser: async (userData) => {
    const { name, email, password } = userData;
    try {
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?, ?)', 
        [name, email, password]
      );
      return result[0]; // Returns the newly created user ID or result
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM users');
      return rows; // Returns all users
    } catch (error) {
      throw error;
    }
  },

  // Get a single user by ID
  getUserById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0]; // Returns a single user object
    } catch (error) {
      throw error;
    }
  },

  // Update a user
  updateUser: async (id, userData) => {
    const { name, email, password } = userData;
    try {
      const result = await db.query(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', 
        [name, email, password, id]
      );
      return result[0]; // Returns affected rows or the result of the update
    } catch (error) {
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      const result = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result[0]; // Returns affected rows or the result of the delete
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserModel;
