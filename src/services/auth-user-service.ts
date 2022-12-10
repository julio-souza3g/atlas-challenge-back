import 'dotenv/config';
import jwt from "jsonwebtoken";
import User from "../schemas/User";

export class AuthUserService {
  async execute(email: string, password: string) {
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {});
    return token;
  }
}