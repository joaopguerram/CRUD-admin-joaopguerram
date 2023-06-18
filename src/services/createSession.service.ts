import format from "pg-format";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import { TUser } from "../interfaces/users.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const createSessionService = async (
  userData: TLoginRequest
): Promise<TLoginResponse> => {
  const { email } = userData;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const user = queryResult.rows[0];

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (comparePassword === false) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createSessionService;
