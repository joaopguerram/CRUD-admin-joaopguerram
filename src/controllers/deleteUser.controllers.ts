import { Request, Response } from "express";
import deleteUserService from "../services/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  let token = req.headers.authorization;
  token = token!.split(" ")[1];
  const id: number = Number(req.params.id);
  const user = await deleteUserService(id, token);
  res.status(204).send();
};

export default deleteUserController;
