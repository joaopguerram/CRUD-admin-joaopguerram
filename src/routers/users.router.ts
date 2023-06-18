import { Router } from "express";
import createUserController from "../controllers/createUser.controllers";
import verifyEmailExistsMiddleware from "../middlewares/verifyEmailExists.middleware";
import { requestUserSchema } from "../schemas/users.schema";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import ensureAdminTrueMiddleware from "../middlewares/ensureAdminTrue.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import listUsersControllers from "../controllers/listUsers.controllers";
import listUserProfileController from "../controllers/listUserProfile.controllers";
import verifyIdExists from "../middlewares/verifyIdExists.middlewares";
import updateUserController from "../controllers/updateUser.controllers";
import deleteUserController from "../controllers/deleteUser.controllers";
import recoverUserController from "../controllers/recoverUser.controllers";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  verifyEmailExistsMiddleware,
  createUserController
);
usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminTrueMiddleware,
  listUsersControllers
);
usersRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  listUserProfileController
);
usersRoutes.patch(
  "/:id",
  verifyIdExists,
  verifyEmailExistsMiddleware,
  ensureTokenIsValidMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  verifyIdExists,
  deleteUserController
);
usersRoutes.put(
  "/:id/recover",
  verifyIdExists,
  ensureTokenIsValidMiddleware,
  ensureAdminTrueMiddleware,
  recoverUserController
);

export default usersRoutes;
