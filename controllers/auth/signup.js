const { nanoid } = require('nanoid');
const { user: service } = require('../../services');
const { sendMail } = require('../../utils/sendMail');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOne({ email });
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: "Email in use"
      });
      return;
    }
    const verifyCode = nanoid();
    await service.add({ email, password, verifyCode });
    const mail = {
      to: email,
      subject: "Подтвердите свой email",
      text: `<a href="https://mysite.com/api/auth/verify/${verifyCode}">Нажмите для подтверждения email</a>`
    };
    await sendMail(mail);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Created. Verification email sent'
    })
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
