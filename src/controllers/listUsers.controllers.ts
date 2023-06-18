import { Request, Response } from "express";
import listUsersService from "../services/listUsers.service";

const listUsersControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();
  return res.json(users);
};

export default listUsersControllers;
