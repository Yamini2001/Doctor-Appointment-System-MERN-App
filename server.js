const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes'); // Adjust the path if necessary
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Adjust according to your client URL
    credentials: true
}));

app.use(express.json());
// app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8800; // Adjust port if needed
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
