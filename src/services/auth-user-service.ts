import User from "../schemas/User";

export class AuthUserService {
  async execute(email: string, password: string) {
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
}