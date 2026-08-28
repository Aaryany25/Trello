const express = require('express');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(express.json());

// Root & Health Check
app.get('/', (req, res) => {
    res.send("Server is Live!");
});

// API Routes
app.use('/', routes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
