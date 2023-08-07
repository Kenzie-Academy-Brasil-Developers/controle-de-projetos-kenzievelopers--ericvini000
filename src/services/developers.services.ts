import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";

const create = async (payload: any) => {
  const queryString: string = format(
    `
        INSERT INTO "developers"
            (%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

const read = async (id: number) => {
  const queryString: string = `
  SELECT 
    "dev"."id" AS "developerId",
    "dev"."name" AS "developerName",
    "dev"."email" AS "developerEmail",
    "di"."developerSince" AS "developerInfoDeveloperSince",
    "di"."preferredOS" AS "developerInfoPreferredOS"
  FROM 
    "developers" AS "dev"
  JOIN
    "developerInfos" AS "di"
  ON
    "dev"."id" = "di"."developerId"
  WHERE 
    id=$1;`;

  const queryResult = await client.query(queryString, [id]);

  return queryResult.rows[0];
};

const update = async (payload: any, id: number) => {};

const destroy = async (id: number) => {};

export default { create, read, update, destroy };
