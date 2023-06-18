import { Request, Response } from "express";
import createUserService from "../services/createUser.service";
import { requestUserSchema } from "../schemas/users.schema";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dataUser = requestUserSchema.parse(req.body);

  const newUser = await createUserService(dataUser);

  return res.status(201).json(newUser);
};

export default createUserController;
