import jwt from "jsonwebtoken";
import { AppError } from "../error";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const deleteUserService = async (id: number, token: string) => {
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
        UPDATE 
            users
        SET 
            "active" = 'false'
        WHERE
            id = $1;
        `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };

    const queryResult: QueryResult = await client.query(queryConfig);
  } else if (id === idToken) {
    const queryString: string = `
        UPDATE 
            users
        SET 
            "active" = 'false'
        WHERE
            id = $1;
    `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };

    const queryResult: QueryResult = await client.query(queryConfig);
  } else {
    throw new AppError("Insufficient Permission", 403);
  }
};

export default deleteUserService;
