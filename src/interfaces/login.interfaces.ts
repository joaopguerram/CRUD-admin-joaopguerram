import { z } from "zod";
import {
  responseLoginSchema,
  resquestLoginSchema,
} from "../schemas/login.schemas";

type TLoginRequest = z.infer<typeof resquestLoginSchema>;
type TLoginResponse = z.infer<typeof responseLoginSchema>;

export { TLoginRequest, TLoginResponse };
