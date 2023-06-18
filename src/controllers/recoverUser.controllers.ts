import { Request, Response } from "express";
import recoverUserService from "../services/recoverUser.service";

const recoverUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await recoverUserService(id);

  return res.json(user);
};

export default recoverUserController;
