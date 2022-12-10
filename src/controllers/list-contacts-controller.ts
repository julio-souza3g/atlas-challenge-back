import { Request, Response } from "express";
import { ListContactsService } from "../services/list-contacts-service";

export class ListContactsController {
  async handle(request: Request, response: Response) {
    const token = request.headers.authorization;
    if (!token) {
      return response.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const listContactsService = new ListContactsService();
      const contacts = await listContactsService.execute();
      return response.status(200).json(contacts);
    } catch (error) {
      return response.status(400).json({ success: false, message: error.message });
    }
  }
}