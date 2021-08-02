const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validateMiddleware } = require('../../middleware');
const { contact: { validateContact } } = require('../../model');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateMiddleware(validateContact), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', ctrl.updateContact);

router.patch('/:contactId/favorite', validateMiddleware(validateContact), ctrl.updateStatus);

module.exports = router;
