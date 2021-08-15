const { User } = require('../model/user');

const getById = (id) => User.findById(id);

const getOne = (filter) => {
  return User.findOne(filter);
};

const add = ({ password, ...other }) => {
  const newUser = new User(other);
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo)
};

module.exports = {
  getById,
  getOne,
  add,
  updateById
};
