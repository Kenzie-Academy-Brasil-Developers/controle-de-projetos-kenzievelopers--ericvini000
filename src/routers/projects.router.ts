import { Router } from "express";
import { createProject, findProject, updateProject } from "../controllers";
import { checkIdExists, checkProjectExists } from "../middlewares";

const projectRouter: Router = Router();

projectRouter.post("", checkIdExists, createProject);

projectRouter.use("/:id", checkProjectExists);

projectRouter.get("/:id", findProject);

projectRouter.patch("/:id", checkIdExists, updateProject);

export default projectRouter;
