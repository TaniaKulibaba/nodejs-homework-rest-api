const { contact: service } = require('../../services');

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  try {
    const result = await service.updateContact(contactId, { favorite });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: `missing field favorite`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = updateStatus;
