require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Single Combined Routes
app.use('/api', require('./routes/route'));

app.get('/', (req, res) => {
    res.send('Restaurant API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
