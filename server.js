require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import Routes
const weatherRoutes = require('./routes/weatherRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);

// Fallback to index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});