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
        "pj"."id" AS "projectId",
        "pj"."name" AS "projectName",
        "pj"."description" AS "projectDescription",
        "pj"."repository" AS "projectRepository",
        "pj"."startDate" AS "projectStartDate",
        "pj"."endDate" AS "projectEndDate",
        "dev"."name" AS "projectDeveloperName"
    FROM
        "projects" AS "pj"
    JOIN
        "developers" AS "dev"
    ON
        "pj"."developerId" = "dev"."id"
    WHERE
        "pj"."id"=$1;
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
        id=$1
    RETURNING *;
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
