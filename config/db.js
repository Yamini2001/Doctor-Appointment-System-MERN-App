// config/db.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',      // Your database host (default is localhost)
  user: 'root',           // Your MySQL username (default is root)
  password: '',           // Your MySQL password (default is empty for XAMPP)
  database: 'doctorapp' // The name of your MySQL database
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
