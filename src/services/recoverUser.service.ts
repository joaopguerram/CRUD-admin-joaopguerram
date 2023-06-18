import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import { responseUserSchema } from "../schemas/users.schema";

const recoverUserService = async (id: number) => {
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

  const queryResult: QueryResult = await client.query(queryConfig);

  const user = queryResult.rows[0];

  const { active } = user;

  console.log(active);

  if (active === false || active === undefined || active === null) {
    const queryString: string = `
    UPDATE 
    users
    SET 
    "active" = 'true'
    WHERE
    id = $1
    RETURNING *;
    `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    const user = responseUserSchema.parse(queryResult.rows[0]);

    return user;
  } else {
    throw new AppError("User already active", 400);
  }
};

export default recoverUserService;
