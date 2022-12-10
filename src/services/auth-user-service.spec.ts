import { MongoHelper } from "../database/mongodb/mongo-helper";
import User from "../schemas/User";
import { AuthUserService } from "./auth-user-service";

const makeFakeAuthData = () => ({
  email: "any@email.com",
  password: "any_password",
});

const makeSut = () => {
  const sut = new AuthUserService();
  return { sut };
};

describe("AuthUserService", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection("users");
  });

  it("should be able to find a user if exists", async () => {
    const user = new User(makeFakeAuthData());
    await user.save();
    const userExists = await User.findOne(makeFakeAuthData());
    expect(userExists).toBeTruthy();
  });

  it("should not be able to find a user if not exists", async () => {
    const userExists = await User.findOne(makeFakeAuthData());
    expect(userExists).toBeFalsy();
  });

  it('should throws an error if user not exists', async () => {
    const { sut } = makeSut();
    const promise = sut.execute(makeFakeAuthData().email, makeFakeAuthData().password);
    await expect(promise).rejects.toThrowError('Invalid credentials');
  });

  it('should return a token if user exists', async () => {
    const { sut } = makeSut();
    const user = new User(makeFakeAuthData());
    await user.save();
    const token = await sut.execute(makeFakeAuthData().email, makeFakeAuthData().password);
    expect(token).toBeTruthy();
  });
});
