import { NextFunction, Request, Response } from "express";
import {
  IProject,
  TProjectCreate,
  TProjectUpdate,
} from "../interfaces/project.interfaces";
import { projectServices } from "../services";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload: TProjectCreate = req.body;

  const newProject: IProject = await projectServices.create(payload);

  return res.status(201).json(newProject);
};

const findProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { projectId } = res.locals;

  const foundProject: IProject = await projectServices.retrieve(projectId);

  return res.status(200).json(foundProject);
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload: TProjectUpdate = req.body;

  const { projectId } = res.locals;

  const newProject: IProject = await projectServices.update(payload, projectId);

  return res.status(200).json(newProject);
};

export { createProject, findProject, updateProject };
