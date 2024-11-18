



const express = require('express');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', emailRoutes);

module.exports = app;
