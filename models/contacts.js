const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactPath = path.join(__dirname, '/contacts.json');
const updateContacts = async(contacts) => await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    const data = await fs.readFile(contactPath);
    const contacts = JSON.parse(data);
    return contacts;
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(i => i.id === contactId);
    return result;
};

async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

async function removeContactById(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(i => i.id === contactId.toString());
    if (index === -1) {
        return null
    };
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(i => i.id === id);
  if (index === -1) {
    return null
  };

  contacts[index] = { id, ...data };
  updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
};