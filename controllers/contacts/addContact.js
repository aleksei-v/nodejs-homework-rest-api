const contacts = require('../../models/contacts');

const addContact = async (req, res, next) => {
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
};


module.exports = addContact;