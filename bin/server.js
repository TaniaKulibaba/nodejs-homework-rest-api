const app = require('../app')
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT);
})
  .catch(error => console.log(error));
