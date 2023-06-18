import { z } from "zod";
import {
  requestUserSchema,
  responseUserSchema,
  updateRequestUserSchema,
  updateUserSchema,
  userSchema,
} from "../schemas/users.schema";

type TUser = z.infer<typeof userSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserResponseUpdate = z.infer<typeof updateUserSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserUpdate = z.infer<typeof updateRequestUserSchema>;

export { TUser, TUserResponse, TUserRequest, TUserUpdate, TUserResponseUpdate };
