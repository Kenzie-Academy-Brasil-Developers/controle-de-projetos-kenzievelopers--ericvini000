import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email = req.body.email;

  if (!email) return next();

  const queryString: string = `
    SELECT 
      * 
    FROM 
      "developers" 
    WHERE 
      email=$1;
    `;

  const emailExists = await client.query(queryString, [email]);

  if (emailExists.rowCount) throw new AppError("Email already exists.", 409);

  return next();
};

export default checkEmailExists;
