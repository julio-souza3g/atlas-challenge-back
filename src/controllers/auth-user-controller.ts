import { Request, Response } from "express";
import { AuthUserService } from "../services/auth-user-service";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const authUserService = new AuthUserService();
      const token = await authUserService.execute(email, password);
      return response.status(200).json({ success: true, token });      
    } catch (error) {
      return response.status(400).json({ success: false, message: error.message });
    } 
  }
}