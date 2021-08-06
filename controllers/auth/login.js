const jwt = require('jsonwebtoken');
require('dotenv').config();
const { user: service } = require('../../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: "Неверный email или password"
      });
      return
    }

    const { SECRET_KEY } = process.env;

    const payload = {
      id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await service.updateById(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: token
      }
    })
  } catch (error) {
    next(error);
  }
};

module.exports = login;

// const decodeToken = jwt.decode(token);
//
// try {
//   const result = jwt.verify(token, SECRET_KEY);
//   console.log(result);
// } catch (error) {
//   console.log(error)
// };
