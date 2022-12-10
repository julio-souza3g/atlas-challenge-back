import { MongoHelper } from "../database/mongodb/mongo-helper";
import User from "../schemas/User";

describe('AuthUserService', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('User')
  })

  it('should be able to authenticate a user', async () => {
    const authData = {
      email: 'any@email.com',
      password: 'any_password'
    }

    const user = new User({
      email: 'any@email.com',
      password: 'any_password'
    })

    await user.save()
    const userExists = await User.findOne({ email: authData.email, password: authData.password })
    expect(userExists).toBeTruthy()
  })
});