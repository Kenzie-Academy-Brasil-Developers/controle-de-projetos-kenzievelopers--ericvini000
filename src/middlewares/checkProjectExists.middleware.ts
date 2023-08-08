import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";

const checkProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const projectId = Number(req.params.id);

  const queryString: string = `
      SELECT 
        * 
      FROM 
        "projects" 
      WHERE 
        id=$1;
      `;

  const project = await client.query(queryString, [projectId]);

  if (!project.rowCount) throw new AppError("Project not found.", 404);

  res.locals = { ...res.locals, projectId };

  return next();
};

export default checkProjectExists;
