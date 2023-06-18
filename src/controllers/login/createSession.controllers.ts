import { Request, Response } from "express";
import createSessionService from "../../services/createSession.service";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";

export const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TLoginRequest = req.body;
  const token: TLoginResponse = await createSessionService(userData);
  return res.json(token);
};
