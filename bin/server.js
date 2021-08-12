const app = require('../app')
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs/promises');
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

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
};

createFolderIsNotExist(UPLOAD_DIR);
