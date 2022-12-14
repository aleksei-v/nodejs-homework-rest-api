const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContactById));

router.put('/:contactId', validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContactById));

module.exports = router;
