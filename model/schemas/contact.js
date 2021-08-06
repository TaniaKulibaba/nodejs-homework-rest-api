const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
}, { versionKey: false, timestamps: true });

const Contact = model("contact", contactSchema);

const validateContact = (newContact) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(7).required(),
  });
  const { error } = schema.validate(newContact);
  return error;
}

module.exports = {
  Contact,
  validateContact
};
