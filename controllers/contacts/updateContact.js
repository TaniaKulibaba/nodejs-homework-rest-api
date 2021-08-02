const { contact: service } = require('../../services');

const updateContact = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  try {
    const result = await service.updateContact(contactId, body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      error.ode = 400;
    }
    next(error)
  }
};

module.exports = updateContact;
