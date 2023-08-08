import format from "pg-format";
import {
  IProject,
  TProjectCreate,
  TProjectUpdate,
} from "../interfaces/project.interfaces";
import { QueryResult } from "pg";
import { client } from "../database";

const create = async (payload: TProjectCreate) => {
  const queryString: string = format(
    `
    INSERT INTO "projects"
        (%I)
    VALUES
        (%L)
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<IProject> = await client.query(queryString);

  return queryResult.rows[0];
};

const retrieve = async (id: number) => {
  const queryString: string = `
    SELECT 
        *
    FROM
        "projects"
    WHERE
        id=$1;
    `;

  const queryResult: QueryResult<IProject> = await client.query(queryString, [
    id,
  ]);

  return queryResult.rows[0];
};

const update = async (payload: TProjectUpdate, id: number) => {
  const queryString: string = format(
    `
    UPDATE "projects"
        SET (%I) = ROW(%L)
    WHERE
        id=$1;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<IProject> = await client.query(queryString, [
    id,
  ]);

  return queryResult.rows[0];
};

export default { create, retrieve, update };
