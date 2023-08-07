import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";

const checkIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = Number(req.params.id);

  const queryString: string = `
    SELECT 
      * 
    FROM 
      "developers" 
    WHERE 
      id=$1;
    `;

  const developer = await client.query(queryString, [id]);

  if (!developer) throw new AppError("Developer not found.", 404);

  res.locals = { ...res.locals, id, developer };

  return next();
};

export default checkIdExists;
