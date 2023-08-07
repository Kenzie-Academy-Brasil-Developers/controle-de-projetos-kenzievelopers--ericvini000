import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const checkPreferredOS = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const OS: string = req.body.preferredOS;

  if (!OS) return next();

  if (OS !== "Windows" && OS !== "Linux" && OS !== "MacOS")
    throw new AppError("Invalid OS option.");

  return next();
};

export default checkPreferredOS;
