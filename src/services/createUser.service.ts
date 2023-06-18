import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { responseUserSchema } from "../schemas/users.schema";
import * as bcrypt from "bcryptjs";

const createUserService = async (
  dataUser: TUserRequest
): Promise<TUserResponse> => {
  dataUser.password = await bcrypt.hash(dataUser.password, 10);

  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(dataUser),
    Object.values(dataUser)
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default createUserService;
