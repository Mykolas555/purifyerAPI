const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'https://vigilant-zebra-97jrrw7j54jc994j-3000.app.github.dev/', 
  credentials: true
}));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/messages', messageRoutes);
module.exports = app;
