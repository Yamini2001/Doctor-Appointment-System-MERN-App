const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db'); // Path to your db.js file

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Server running",
    });
});

// Example route to get users from MySQL database
app.get('/users', async (req, res) => {
    try {
        // Perform a query
        const [rows] = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Port configuration
const port = process.env.PORT || 8080;

app.listen(port, () => {
    const environment = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is undefined
    console.log(`Server running in ${environment} mode on port ${port}`.bgCyan.white);
});

