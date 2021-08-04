const { Contact } = require('../model/schemas/contact');

const listContacts = () => {
  return Contact.find({});
};

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId);
    return result;
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw error;
  }
};

const addContact = (newContact) => {
  return Contact.create(newContact)
};

const updateContact = async (contactId, updateContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, { new: true });
    return result;
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
};
