import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schema";
import usersRoutes from "../routers/users.router";

const listUserProfileService = async (token: any) => {
  const idToken = jwt.decode(token)!.sub;

  const queryString: string = `
          SELECT
              *
          FROM
              users
          WHERE
              id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idToken],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const user = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default listUserProfileService;
