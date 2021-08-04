// const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { user: service } = require('../../services');

const getProfile = async (req, res, next) => {
//   const { Authorization } = req.headers;
//   const [, token] = Authorization.split(" ");
//   const { SECRET_KEY } = process.env;
//   try {
//     const {id} = jwt.verify(token, SECRET_KEY);
//     const user = service.findById(id);
//   } catch (error) {
//     res.status(401).json({
//
//     })
//   }
};

module.exports = getProfile;
