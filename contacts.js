const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const getContacts = async () => {
  return await fs
    .readFile(contactsPath, 'utf-8')
    .then((contacts) => JSON.parse(contacts));
};

const listContacts = async () => {
  await getContacts().then((contacts) => {
    const outputContactsArr = contacts.map((contact) => contact);
    console.table(outputContactsArr);
  });
};

const getContactById = async (contactId) => {
  await getContacts().then((contacts) => {
    const singleContact = contacts.find(
      (contact) => Number(contact.id) === Number(contactId)
    );
    singleContact
      ? console.table(singleContact)
      : console.log('No contacts with input id exists!');
  });
};

const removeContact = async (contactId) => {
  await getContacts().then((contacts) => {
    const updatedContacts = contacts.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), 'utf-8');
    console.table(updatedContacts);
  });
};

const addContact = async (name, email, phone) => {
  await getContacts().then((contacts) => {
    const outputContactsArr = contacts.map((contact) => contact);
    const contactToAdd = {
      id: outputContactsArr[outputContactsArr.length - 1].id + 1,
      name,
      email,
      phone,
    };
    outputContactsArr.push(contactToAdd);
    fs.writeFile(contactsPath, JSON.stringify(outputContactsArr), 'utf-8');
    console.table(outputContactsArr);
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
