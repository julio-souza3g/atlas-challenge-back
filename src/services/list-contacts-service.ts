import Contact from "../schemas/Contact";

export class ListContactsService {
  async execute() {
    const contacts = await Contact.find();
    return contacts;
  }
}