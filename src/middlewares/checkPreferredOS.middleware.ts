import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";

const checkPreferredOS = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const OS = req.body.preferredOS;

  if (!OS) return next();

    if( OS !== "Windows" || OS !== "Linux" || OS !== "MacOS")

  return next();
};

export default checkPreferredOS;
