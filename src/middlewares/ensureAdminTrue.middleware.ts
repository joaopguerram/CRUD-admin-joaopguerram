import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureAdminTrueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals;

  if (admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export default ensureAdminTrueMiddleware;
