import { QueryConfig } from "pg";
import { AppError } from "../error";
import {
  TUserResponse,
  TUserResponseUpdate,
  TUserUpdate,
} from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";
import { client } from "../database";
import { responseUserSchema, updateUserSchema } from "../schemas/users.schema";

const updateUserService = async (
  id: number,
  newData: TUserUpdate,
  token: string
) => {
  let admin = "";
  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 403);
    }
    admin = decoded.admin;
  });
  const idToken: number = Number(jwt.decode(token)!.sub);

  if (admin) {
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
      values: [id],
    };

    const queryResult: any = await client.query(queryConfig);

    let newUser: TUserResponse = {
      ...queryResult.rows[0],
      ...newData,
    };

    const user = updateUserSchema.parse(newUser);

    return user;
  } else if (id === idToken) {
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
      values: [id],
    };

    const queryResult: any = await client.query(queryConfig);

    let newUser: TUserResponse = {
      ...queryResult.rows[0],
      ...newData,
    };

    const user = updateUserSchema.parse(newUser);

    return user;
  } else {
    throw new AppError("Insufficient Permission", 403);
  }
};

export default updateUserService;
