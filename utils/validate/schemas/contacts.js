const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(7).required(),
});

module.exports = contactSchema;
