import { Router } from "express";
import { createSessionController } from "../controllers/login/createSession.controllers";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { resquestLoginSchema } from "../schemas/login.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserActiveMiddleware from "../middlewares/ensureUserActive.middleware";

const sessionRoutes: Router = Router();

sessionRoutes.post(
  "",
  ensureBodyIsValidMiddleware(resquestLoginSchema),
  // ensureUserActiveMiddleware,
  createSessionController
);

export default sessionRoutes;
