import { MongoHelper } from "../database/mongodb/mongo-helper";
import Contact from "../schemas/Contact";

describe('ListContactsService', () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection("contacts");
  });

  it('should be able to list all contacts', async () => {
    const contact = new Contact({
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "123456789",
      website: "johndoe.com",
      company: "John Doe Company",
    });
    await contact.save();

    const contacts = await Contact.find();
    expect(contacts).toHaveLength(1);
  });
});