const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend to access this server
  credentials: true
}));

app.use('/api/v1/users', userRoutes);


module.exports = app;
