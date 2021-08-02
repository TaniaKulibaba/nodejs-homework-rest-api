const { user: service } = require('../../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: "Bad request"
      });
    }
    const token = "asdbnuyt6gva.bcxjsdfy.7uhncjas";
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