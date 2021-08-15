const { user: service } = require('../../services');
const sendMail = require('../../utils/sendMail');

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      const { verify, verifyCode } = user;
      if (verify) {
        res.status(400).json({
          status: 'error',
          code: 400,
          message: "Verification has already been passed",
        });
        return;
      };
      try {
        await service.add({ email, password, verifyCode });
        const mail = {
          to: email,
          subject: "Подтвердите свой email",
          text: `<a href="https://mysite.com/api/auth/verify/${verifyCode}">Нажмите для подтверждения email</a>`
        };
        sendMail(mail);
      } catch (error) {
        next(error);
      };

      res.status(200).json({
        status: 'success',
        code: 200,
        message: "Verification email sent",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
