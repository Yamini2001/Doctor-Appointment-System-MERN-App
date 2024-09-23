// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/user", userRoutes);

// WebSocket connection
wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
    });

    ws.send("Welcome to the WebSocket server!");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
