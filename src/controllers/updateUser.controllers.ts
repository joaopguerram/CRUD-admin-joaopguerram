import { Request, Response } from "express";
import updateUserService from "../services/updateUsers.service";

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let token = req.headers.authorization;
  token = token!.split(" ")[1];
  const id: number = Number(req.params.id);
  const newData = req.body;
  const user = await updateUserService(id, newData, token);
  return res.json(user);
};

export default updateUserController;
