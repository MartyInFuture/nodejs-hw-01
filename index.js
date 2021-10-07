const contactsCRUD = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      contactsCRUD.listContacts();
      break;
    case 'get':
      contactsCRUD.getContactById(id);
      break;
    case 'add':
      contactsCRUD.addContact(name, email, phone);
      break;
    case 'remove':
      contactsCRUD.removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
invokeAction(argv);
