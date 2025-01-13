const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config.env' });

const app = express();

const corsOptionsDev = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptionsDev));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/products/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRoutes);

module.exports = app;