import { Request, Response } from "express";
import { developerServices } from "../services";
import {
  IDeveloperResponse,
  IDevelopers,
  TDeveloperCreate,
  TDeveloperUpdate,
} from "../interfaces/developer.interfaces";

const createDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperCreate = req.body;

  const newDev: IDevelopers = await developerServices.create(payload);

  return res.status(201).json(newDev);
};

const findDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = res.locals;

  const foundDev: IDeveloperResponse = await developerServices.read(id);

  return res.status(201).json(foundDev);
};

const updateDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperUpdate = req.body;

  const { id } = res.locals;

  const updatedDev: IDevelopers = await developerServices.update(payload, id);

  return res.status(201).json(updatedDev);
};

const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = res.locals;

  await developerServices.destroy(id)

  return res.status(204).send();
};

export { createDeveloper, findDeveloper, updateDeveloper, deleteDeveloper };
