// const bcrypt = require('bcryptjs');
const { User } = require('../model/user');

const getById = (id) => User.findById(id);

const getOne = (filter) => {
  return User.findOne(filter);
};

const add = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
// bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// email, password: hashPassword });
};

module.exports = {
  getById,
  getOne,
  add
};
