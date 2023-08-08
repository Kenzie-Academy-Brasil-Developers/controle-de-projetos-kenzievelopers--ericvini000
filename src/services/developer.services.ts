import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import {
  IDeveloperInfos,
  IDeveloperResponse,
  IDevelopers,
  TDeveloperCreate,
  TDeveloperInfosCreate,
  TDeveloperUpdate,
} from "../interfaces/developer.interfaces";

const create = async (payload: TDeveloperCreate) => {
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

  const queryResult: QueryResult<IDevelopers> = await client.query(queryString);

  return queryResult.rows[0];
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
    "dev"."id"=$1;`;

  const queryResult: QueryResult<IDeveloperResponse> = await client.query(
    queryString,
    [id]
  );

  return queryResult.rows[0];
};

const update = async (payload: TDeveloperUpdate, id: number) => {
  const queryString: string = format(
    `
  UPDATE 
    "developers"
  SET 
    (%I)=ROW(%L)
  WHERE
    id=$1
  RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<IDevelopers> = await client.query(
    queryString,
    [id]
  );

  return queryResult.rows[0];
};

const destroy = async (id: number) => {
  const queryString = `DELETE FROM "developers" WHERE id=$1;`;

  await client.query(queryString, [id]);

  return;
};

const newInfo = async (payload: TDeveloperInfosCreate, id: number) => {
  const newPayload = {
    ...payload,
    developerSince: new Date(payload.developerSince),
  };

  const queryString: string = format(
    `
        INSERT INTO "developerInfos"
            (%I, "developerId")
        VALUES
            (%L, $1)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(newPayload)
  );

  const queryResult: QueryResult<IDeveloperInfos> = await client.query(
    queryString,
    [id]
  );

  return queryResult.rows[0];
};

export default { create, read, update, destroy, newInfo };
