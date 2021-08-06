require('dotenv').config();
// const { user: service } = require('../../services');

const getProfile = async (req, res, next) => {
  const userProfile = {
    email: req.userProfile.email,
    _id: req.userProfile._id
  };
  res.json({
    status: "success",
    code: 200,
    data: {
      result: userProfile
    }
  })
};

module.exports = getProfile;
