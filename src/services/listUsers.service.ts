import { QueryResult } from "pg";
import { client } from "../database";
import { TUser, TUserResponse } from "../interfaces/users.interfaces";
import { responseUserSchema } from "../schemas/users.schema";

const listUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
        SELECT
            "id",
            "name",
            "email",
            "admin",
            "active"
        FROM
            users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listUsersService;
