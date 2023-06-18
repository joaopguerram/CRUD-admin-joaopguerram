import { Request, Response } from "express";
import listUserProfileService from "../services/listUserProfile.service";
import { responseUserSchema } from "../schemas/users.schema";
import { TUserResponse } from "../interfaces/users.interfaces";

const listUserProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  let token = req.headers.authorization;
  token = token!.split(" ")[1];

  const user = await listUserProfileService(token);

  return res.json(user);
};

export default listUserProfileController;
