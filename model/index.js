const contacts = require('./contacts.json')
const { v4 } = require('uuid')
const contactSchema = require('../utils/validate/schemas/contacts')

const listContacts = (req, res) => {
  res.json(contacts)
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const selectContact = contacts.find(item => item.id.toString() === contactId);
  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    });
    return;
  };
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact,
    }
  });
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(item => item.id.toString() === contactId);
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
    return;
  };
  contacts.splice(index, 1);
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

const addContact = (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    });
    return;
  };
  const newContact = { ...req.body, id: v4() };
  contacts.push(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    });
    return;
  };
  const index = contacts.findIndex(item => item.id.toString() === contactId);
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
    return;
  };
  contacts[index] = { ...req.body, id: contactId };
  res.json({
    status: 'seccess',
    code: 200,
    data: {
      result: contacts[index]
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
