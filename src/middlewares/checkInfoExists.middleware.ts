import { QueryResult } from "pg";
import { client } from "../database";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { IDeveloperInfos } from "../interfaces/developer.interfaces";

const checkInfoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = res.locals;

  const queryString = `
    SELECT
        *
    FROM 
        "developerInfos"
    WHERE
        "developerId"=$1;
    `;
    
  const queryResult: QueryResult<IDeveloperInfos> = await client.query(
    queryString,
    [id]
  );

  if (queryResult.rowCount)
    throw new AppError("Developer infos already exists.", 409);

  return next();
};

export default checkInfoExists;
