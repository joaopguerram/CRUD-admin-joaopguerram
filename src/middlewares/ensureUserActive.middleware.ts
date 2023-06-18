import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureUserActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = req.body.email;
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

  const userActive = queryResult.rows[0].active;

  if (userActive === false) {
    throw new AppError("User inactive", 400);
  }

  next();
};

export default ensureUserActiveMiddleware;
