const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
const updateBooks = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(response);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((el) => el.id === contactId.toString());
    return contactById || null;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexEl = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );
    if (indexEl === -1) {
      return null;
    }
    const [result] = contacts.splice(indexEl, 1);
    await updateBooks(contacts);
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    const addData = JSON.stringify(contacts, null, 2);

    await fs.writeFile(contactsPath, addData, "utf8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};