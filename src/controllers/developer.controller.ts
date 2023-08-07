import { Request, Response } from "express";
import { developerServices } from "../services";

const createDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: any = req.body;

  const newDev = developerServices.create(payload);

  return res.status(201).json(newDev);
};

const findDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: any = req.body;

  return res.status(201).json();
};

const updateDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: any = req.body;

  return res.status(201).json();
};

const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: any = req.body;

  return res.status(204).send();
};

export { createDeveloper, findDeveloper, updateDeveloper, deleteDeveloper };
