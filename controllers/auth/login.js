const jwt = require('jsonwebtoken');
require('dotenv').config();
const { user: service } = require('../../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: "Email or password is wrong"
      });
      return
    }
    if (!user.verify) {
      return res.status(403).json({
        message: "Email not verified",
      });
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
