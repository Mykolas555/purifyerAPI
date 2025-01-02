const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config({ path: './config.env' });

const DATABASE = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DATABASE)
  .then(() => { console.log('Connected to DATABASE') })
  .catch(err => { console.error('Error connecting to database:', err.message) });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
