const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const AllContacts = await contacts.listContacts();
      console.table(AllContacts);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      console.table(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// --- 1 вариант --- //

invokeAction(argv).then().catch()

// --- 2 вариант --- //

// const start = async (argv) => {
//     try {
//         await invokeAction(argv);
//     } catch (error) {
//         console.log(error);
//     }
// };

// start(argv);

// --- 3 вариант --- //

// (async () => {
//   await invokeAction(argv)
// })();