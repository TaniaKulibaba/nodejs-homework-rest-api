const { user: service } = require('../../services');

const verify = async (req, res, next) => {
  const { verifyCode } = req.params;
  try {
    const user = await service.getOne({ verifyCode });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found'
      });
    }
    await service.updateById(user._id, { verify: true, verifyCode: "" });
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful'
    })
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
