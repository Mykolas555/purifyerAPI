const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './config.env' });

const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend to access this server
  credentials: true
}));

//app.use('/api/v1/players', playerRouter);
//app.use('/api/v1/players/users', usersRouter);


module.exports = app;
